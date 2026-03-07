'use client';
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.png" alt="TradeFlow AI" className="w-8 h-8 rounded-md object-cover" />
    </div>
  );
}
export function TextLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.png" alt="TradeFlow AI" className="w-8 h-8 rounded-md object-cover" />
    </div>
  );
}
export function IconLogo({ className = "" }: { className?: string }) {
  return (
    <img src="/logo.png" alt="TradeFlow AI" className={`rounded-md object-cover ${className}`} />
  );
}
