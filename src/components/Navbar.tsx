import React from 'react';
import { Heart } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenShortlist: () => void;
  onOpenArchitecture: () => void;
  shortlistCount: number;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenShortlist,
  onOpenArchitecture,
  shortlistCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-18">
        {/* Zone 1: Brand Wordmark (Single text element in Serif) */}
        <a 
          href="#" 
          className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-crimson-900 whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-gold-600 inline-block shadow-xs"></span>
          <span>Bandhan</span>
        </a>

        {/* Zone 2: 4–5 Clean single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <a
            href="#explore-matches"
            className="hover:text-crimson-900 transition-colors whitespace-nowrap shrink-0"
          >
            Explore Matches
          </a>
          <a
            href="#kundli-calculator"
            className="hover:text-crimson-900 transition-colors whitespace-nowrap shrink-0"
          >
            Kundli Milan
          </a>
          <a
            href="#trust-verification"
            className="hover:text-crimson-900 transition-colors whitespace-nowrap shrink-0"
          >
            Trust & Verification
          </a>
          <a
            href="#success-stories"
            className="hover:text-crimson-900 transition-colors whitespace-nowrap shrink-0"
          >
            Love Stories
          </a>
          <button
            onClick={onOpenArchitecture}
            className="hover:text-crimson-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Prisma & API Schema
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenShortlist}
            aria-label="View shortlisted profiles"
            className="relative p-2.5 rounded-xl border border-amber-200/80 bg-white hover:bg-amber-50/50 text-stone-700 transition-all cursor-pointer"
            title="Shortlisted Profiles"
          >
            <Heart className={`w-5 h-5 ${shortlistCount > 0 ? 'text-crimson-800 fill-crimson-800' : 'text-stone-600'}`} />
            {shortlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-crimson-900 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {shortlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenRegister}
            className="px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-crimson-900 via-crimson-800 to-crimson-900 rounded-xl hover:from-crimson-950 hover:to-crimson-900 transition-all shadow-sm shadow-crimson-900/20 active:scale-98 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Register Free
          </button>
        </div>
      </div>
    </header>
  );
};
