'use client';

export function TextLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          DataFlow
        </span>
        <span className="ml-1 text-2xl font-light text-gray-400">Analytics</span>
      </div>
    </div>
  );
}

export function IconLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FF6B00' }} />
          <stop offset="100%" style={{ stopColor: '#FF8C00' }} />
        </linearGradient>
      </defs>
      
      <path
        d="M 5 20 Q 10 10 15 20 Q 20 30 25 20 Q 30 10 35 20"
        stroke="url(#flowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 5 28 Q 10 18 15 28 Q 20 38 25 28 Q 30 18 35 28"
        stroke="url(#flowGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 5 12 Q 10 2 15 12 Q 20 22 25 12 Q 30 2 35 12"
        stroke="url(#flowGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      
      <path
        d="M 32 20 L 35 20 L 33 18 M 35 20 L 33 22"
        stroke="url(#flowGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
