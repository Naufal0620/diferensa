'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Ilustrasi Pembelajaran SD',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // Normalize image path: if pointing to /src/assets/images, rewrite to /images/
  let normalizedSrc = src;
  if (normalizedSrc.includes('/src/assets/images/')) {
    normalizedSrc = normalizedSrc.replace('/src/assets/images/', '/images/');
  }

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-teal-50 to-violet-50 text-slate-700 p-6 text-center ${className}`}
      >
        <BookOpen className="w-10 h-10 text-sky-600 mb-2" aria-hidden="true" />
        <span className="text-sm font-semibold text-slate-800">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={normalizedSrc}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
