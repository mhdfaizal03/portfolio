import React from 'react';

export default function SectionHeading({ subtitle, title, description, align = 'center' }) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-16 max-w-2xl ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
      {subtitle && (
        <span className="font-mono text-accent text-xs uppercase tracking-widest font-bold block mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-zinc-900 dark:text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
          {description}
        </p>
      )}
      <div className={`mt-4 w-12 h-1 bg-accent rounded-full ${isCenter ? 'mx-auto' : ''}`} />
    </div>
  );
}
