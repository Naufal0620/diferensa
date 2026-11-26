import { useState } from 'react';
import { Heart, MessageSquare, Send } from 'lucide-react';
import type { CommunityPost, TeacherProfile } from '../types/diferensa';

interface KomunitasGuruPageProps {
  posts: CommunityPost[];
  profile: TeacherProfile;
  onAddPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'replies'>) => void;
  onToggleLike: (postId: string) => void;
  onAddReply: (postId: string, content: string) => void;
}

const CATEGORIES: ('Semua' | CommunityPost['category'])[] = [
  'Semua',
  'Strategi Konten',
  'Manajemen Kelas',
  'Asesmen Diagnostik',
  'Berbagi RPP',
];

export function KomunitasGuruPage({
  posts,
  profile,
  onAddPost,
  onToggleLike,
  onAddReply,
}: KomunitasGuruPageProps) {
  const [filter, setFilter] = useState<'Semua' | CommunityPost['category']>('Semua');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CommunityPost['category']>('Strategi Konten');
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const visiblePosts =
    filter === 'Semua' ? posts : posts.filter((p) => p.category === filter);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setFormError('Mohon isi judul pengalaman dan cerita praktik baik Anda.');
      return;
    }
    setFormError('');
    onAddPost({
      author: profile.name,
      role: profile.gradeTaught,
      school: profile.school,
      category,
      title: title.trim(),
      content: content.trim(),
    });
    setTitle('');
    setContent('');
  };

  const handleReplySubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const text = (replyDrafts[postId] ?? '').trim();
    if (!text) return;
    onAddReply(postId, text);
    setReplyDrafts((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7">
        <p className="text-xs font-semibold text-violet-700 mb-1">
          Ruang Berbagi Praktik Baik Guru SD
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Komunitas Guru DIFERENSA
        </h1>
        <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
          Berdiskusi, berbagi strategi manajemen kelas, serta saling menginspirasi antar pendidik
          sekolah dasar di seluruh Indonesia.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                filter === cat
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section className="lg:col-span-4">
          <form
            onSubmit={handleCreatePost}
            className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4"
            noValidate
          >
            <h2 className="font-display text-lg font-bold text-slate-900">
              Bagikan Pengalaman Mengajar
            </h2>

            <div>
              <label
                htmlFor="post-category"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Topik Diskusi
              </label>
              <select
                id="post-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CommunityPost['category'])}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-2 focus:outline-blue-900"
              >
                <option value="Strategi Konten">Strategi Konten</option>
                <option value="Manajemen Kelas">Manajemen Kelas</option>
                <option value="Asesmen Diagnostik">Asesmen Diagnostik</option>
                <option value="Berbagi RPP">Berbagi RPP</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="post-title"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Judul Singkat
              </label>
              <input
                id="post-title"
                type="text"
                placeholder="Contoh: Kartu baca warna di kelas 1 SD"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-blue-900"
              />
            </div>

            <div>
              <label
                htmlFor="post-content"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Cerita Praktik atau Pertanyaan
              </label>
              <textarea
                id="post-content"
                rows={4}
                placeholder="Ceritakan tantangan kelas atau strategi yang berhasil Anda terapkan..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-blue-900"
              />
            </div>

            {formError && (
              <div
                role="alert"
                className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs font-medium text-amber-900"
              >
                {formError}
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Kirim ke Komunitas</span>
            </button>
          </form>
        </section>

        <section className="lg:col-span-8 space-y-4" aria-label="Daftar Diskusi Guru">
          {visiblePosts.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-sm text-slate-600">
              Belum ada diskusi pada kategori ini. Jadilah guru pertama yang berbagi!
            </div>
          ) : (
            visiblePosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-900">{post.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.school}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-violet-700 font-medium">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.createdAt}</span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">{post.title}</h3>
                  <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{post.content}</p>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onToggleLike(post.id)}
                    aria-pressed={Boolean(post.likedByUser)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      post.likedByUser
                        ? 'text-rose-600'
                        : 'text-slate-600 hover:text-rose-600'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${post.likedByUser ? 'fill-rose-600' : ''}`}
                      aria-hidden="true"
                    />
                    <span className="tabular-nums">{post.likes} Apresiasi</span>
                  </button>

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 tabular-nums">
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    {post.replies.length} Tanggapan
                  </span>
                </div>

                {post.replies.length > 0 && (
                  <div className="space-y-2.5 pl-4">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-1">
                          <span className="font-semibold text-slate-800">{reply.author}</span>
                          <span aria-hidden="true">·</span>
                          <span>{reply.school}</span>
                          <span aria-hidden="true">·</span>
                          <span>{reply.createdAt}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <form
                  onSubmit={(e) => handleReplySubmit(e, post.id)}
                  className="flex items-center gap-2 pt-1"
                >
                  <label htmlFor={`reply-${post.id}`} className="sr-only">
                    Tulis tanggapan untuk {post.title}
                  </label>
                  <input
                    id={`reply-${post.id}`}
                    type="text"
                    placeholder="Tulis tanggapan atau saran Anda..."
                    value={replyDrafts[post.id] ?? ''}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))
                    }
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-blue-900"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-semibold text-blue-900 whitespace-nowrap cursor-pointer"
                  >
                    Balas
                  </button>
                </form>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
