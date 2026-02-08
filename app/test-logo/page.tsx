import { TextLogo, IconLogo, CompactLogo } from '@/components/Logo';

export default function TestLogoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold mb-8">TradeFlow AI - Logo Variants</h1>
        
        {/* Text Logo */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">1. Text Logo (Minimal)</h2>
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <TextLogo />
          </div>
        </div>

        {/* Icon + Text Logo */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">2. Icon + Text Logo (Main)</h2>
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <IconLogo />
          </div>
        </div>

        {/* Compact Logo */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">3. Compact Logo</h2>
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <CompactLogo />
          </div>
        </div>

        {/* Dark Background Test */}
        <div className="bg-gray-900 p-8 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Dark Background Test</h2>
          <div className="flex items-center justify-center h-32">
            <IconLogo />
          </div>
        </div>
      </div>
    </div>
  );
}
