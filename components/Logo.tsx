'use client';
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.png" alt="TradeFlow AI" className="w-8 h-8 rounded-md object-cover" />
      <div className="relative">
        <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          TradeFlow
        </span>
        <span className="ml-1 text-xl font-light text-slate-400">AI</span>
      </div>
    </div>
  );
}
export function TextLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.png" alt="TradeFlow AI" className="w-8 h-8 rounded-md object-cover" />
      <div className="relative">
        <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          TradeFlow
        </span>
        <span className="ml-1 text-xl font-light text-slate-400">AI</span>
      </div>
    </div>
  );
}
export function IconLogo({ className = "" }: { className?: string }) {
  return (
    <img src="/logo.png" alt="TradeFlow AI" className={`rounded-md object-cover ${className}`} />
  );
}
