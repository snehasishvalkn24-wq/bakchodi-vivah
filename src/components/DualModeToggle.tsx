import React from 'react';
import { User, Users, Sparkles, ShieldCheck } from 'lucide-react';

export type ViewMode = 'CANDIDATE' | 'PARENT';

interface DualModeToggleProps {
  currentMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
  seniorFont: boolean;
  onToggleSeniorFont: () => void;
}

export const DualModeToggle: React.FC<DualModeToggleProps> = ({
  currentMode,
  onToggle,
  seniorFont,
  onToggleSeniorFont,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-2xl p-2.5 sm:p-3 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl">
          <button
            onClick={() => onToggle('CANDIDATE')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentMode === 'CANDIDATE'
                ? 'bg-crimson-900 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Candidate Mode</span>
            <span className="hidden md:inline-block text-[11px] font-normal opacity-80">
              (Lifestyle, Passions & Vibe)
            </span>
          </button>

          <button
            onClick={() => onToggle('PARENT')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentMode === 'PARENT'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Family & Parent Mode</span>
            <span className="hidden md:inline-block text-[11px] font-normal opacity-80">
              (Roots, Gotra & Pedigree)
            </span>
          </button>
        </div>

        {/* Status / Senior Friendly Toggle */}
        <div className="flex items-center gap-3 text-xs text-stone-600 px-1">
          <div className="flex items-center gap-1.5 text-stone-700">
            {currentMode === 'CANDIDATE' ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span className="font-medium">Active: Personal Chemistry View</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-medium">Active: Lineage & Kundli View</span>
              </>
            )}
          </div>

          <span className="text-stone-300">|</span>

          <button
            onClick={onToggleSeniorFont}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border ${
              seniorFont
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
            title="Increase font contrast and size for elder family members"
          >
            {seniorFont ? '✓ Senior Font Size (On)' : 'Senior Font Size'}
          </button>
        </div>
      </div>
    </div>
  );
};
