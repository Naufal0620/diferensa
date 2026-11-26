import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// System prompt as Socratic Mentor for Indonesian SD teachers
const SYSTEM_PROMPT = `
Anda adalah "Pendamping DIFERENSA", mentor pedagogis ramah, empatik, dan praktis khusus bagi Guru Sekolah Dasar (SD) di Indonesia.

Misi Anda:
Membantu guru mengatasi kebingungan dan miskonsepsi dalam menerapkan Pembelajaran Berdiferensiasi (Konten, Proses, dan Produk) sesuai kerangka Kurikulum Merdeka di jenjang SD.

Gaya Komunikasi (Socratic & Praktis):
1. Bicaralah dengan nada hangat, suportif, dan membumi (hindari jargon akademis yang membingungkan atau dingin).
2. Bersikap Sokratik yang Konstruktif:
   - Jika guru bertanya umum, ajukan 1-2 pertanyaan reflektif cepat tentang kondisi kesiapan/minat murid di kelasnya.
   - Jangan hanya memberi teori abstrak, selalu berikan opsi solusi konkret yang dibagi jelas ke dalam 3 Pilar:
     * Diferensiasi Konten (alat konkret, visual, teks bertingkat)
     * Diferensiasi Proses (scaffolding bertahap, kerja berpasangan, bimbingan langsung guru)
     * Diferensiasi Produk (pilihan karya lisan/gambar/tulisan dengan rubrik kriteria esensial yang sama)
3. Tegaskan Selalu Prinsip Anti-Miskonsepsi:
   - Diferensiasi BUKAN membuat 30 RPP berbeda untuk 30 murid.
   - Diferensiasi BUKAN memberi murid cepat 50 soal tambahan tanpa makna.
   - Diferensiasi BUKAN menurunkan tujuan esensial atau mengganti materi pokok.
4. Format jawaban dengan poin-poin singkat, tebalkan kata kunci, dan berikan contoh riil kelas SD (Fase A, B, atau C).
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check if API key is provided
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Provide a thoughtful pedagogical fallback simulation if API key is not yet set
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      const fallbackResponse = `Halo Bapak/Ibu Guru SD! 🌟\n\nTerima kasih telah berbagi situasi kelas Anda: "${lastUserMsg}".\n\n*(Catatan: Kunci API GOOGLE_GENERATIVE_AI_API_KEY belum dikonfigurasi di file .env.local, berikut simulasi panduan diferensiasi standar)*:\n\n### 💡 Rekomendasi 3 Pilar Diferensiasi:\n1. **Diferensiasi Konten (Akses Materi):**\n   - Sediakan benda konkret manipulatif untuk kelompok yang butuh pemahaman dasar.\n   - Sediakan kartu bergambar dan teks berjenjang untuk kelompok visual.\n   - Sediakan kartu tantangan eksploratif bagi siswa yang sudah mandiri.\n\n2. **Diferensiasi Proses (Pendampingan):**\n   - Luangkan 10-15 menit pertama mendampingi langsung kelompok yang membutuhkan bimbingan intensif (*I Do, We Do*).\n   - Berdayakan kelompok mandiri untuk eksplorasi dan sesekali menjadi tutor sebaya.\n\n3. **Diferensiasi Produk (Unjuk Pemahaman):**\n   - Berikan kebebasan memilih unjuk kerja (rekaman lisan, poster visual, atau lembar catatan analisis) yang dinilai dengan rubrik kriteria substansi yang sama.\n\nApakah Bapak/Ibu ingin mendiskusikan salah satu pilar di atas lebih spesifik? 😊`;

      // Return as standard response text
      return new Response(fallbackResponse, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    try {
      const result = streamText({
        model: google('gemini-3.8-flash'),
        system: SYSTEM_PROMPT,
        messages,
      });

      return result.toTextStreamResponse();
    } catch (modelError: any) {
      console.warn('Google AI live stream failed, using backup response:', modelError?.message);
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      const fallbackResponse = `Halo Bapak/Ibu Guru SD! 🌟\n\nTerima kasih telah berbagi situasi kelas Anda mengenai: "${lastUserMsg}".\n\n*(Sistem saat ini menyajikan panduan pedagogis terstandar karena server Google AI sedang mengalami antrean padat)*:\n\n### 💡 Rekomendasi 3 Pilar Diferensiasi:\n1. **Diferensiasi Konten (Akses Materi):**\n   - Sediakan benda konkret manipulatif untuk kelompok yang butuh pemahaman dasar.\n   - Sediakan kartu bergambar dan teks berjenjang untuk kelompok visual.\n   - Sediakan kartu tantangan eksploratif bagi siswa yang sudah mandiri.\n\n2. **Diferensiasi Proses (Pendampingan):**\n   - Luangkan 10-15 menit pertama mendampingi langsung kelompok yang membutuhkan bimbingan intensif (*I Do, We Do*).\n   - Berdayakan kelompok mandiri untuk eksplorasi dan sesekali menjadi tutor sebaya.\n\n3. **Diferensiasi Produk (Unjuk Pemahaman):**\n   - Berikan kebebasan memilih unjuk kerja (rekaman lisan, poster visual, atau lembar catatan analisis) yang dinilai dengan rubrik kriteria substansi yang sama.\n\nApakah Bapak/Ibu ingin mendiskusikan salah satu pilar di atas lebih spesifik? 😊`;

      return new Response(fallbackResponse, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return new Response(
      `Maaf, terjadi kendala saat memproses jawaban: ${error?.message || 'Silakan periksa API key Anda.'}`,
      { status: 500 }
    );
  }
}
