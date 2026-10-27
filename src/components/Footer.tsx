import React from 'react';
import { ShieldCheck, Heart, Sparkles, Lock } from 'lucide-react';

interface FooterProps {
  onOpenArchitecture: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenArchitecture,
  onOpenRegister,
}) => {
  return (
    <footer className="bg-midnight text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Row: Wordmark, Value Proposition, Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-stone-800">
          <div className="space-y-2">
            <a href="#" className="font-serif text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-500 inline-block"></span>
              <span>Bandhan</span>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-sans font-medium px-2 py-0.5 rounded-md bg-stone-800">
                Luxe
              </span>
            </a>
            <p className="text-sm text-stone-400 max-w-md">
              Where traditional family sanctities meet modern candidate autonomy. India&apos;s most trusted relationship & matrimonial experience.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenArchitecture}
              className="px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-800/80 hover:bg-stone-800 text-xs font-semibold text-stone-200 transition-colors cursor-pointer"
            >
              Prisma & Architecture
            </button>
            <button
              onClick={onOpenRegister}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-crimson-800 to-crimson-900 hover:from-crimson-700 hover:to-crimson-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Register Free
            </button>
          </div>
        </div>

        {/* 4-Column Directory Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-stone-400">
          {/* Column 1: Communities */}
          <div className="space-y-3">
            <h4 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
              Explore Communities
            </h4>
            <ul className="space-y-2">
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">Bengali Matrimony</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">Punjabi Khatri & Arora</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">Tamil Iyer & Iyengar</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">Marwari & Maheshwari</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">Marathi & 96 Kuli</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">Gujarati Patel & Shah</a></li>
            </ul>
          </div>

          {/* Column 2: Global & Metros */}
          <div className="space-y-3">
            <h4 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
              Metros & NRI Hubs
            </h4>
            <ul className="space-y-2">
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">Bengaluru Tech Matches</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">Mumbai & South Bombay</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">Delhi-NCR & Gurgaon</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">USA (Silicon Valley & NYC)</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">UK (London & Midlands)</a></li>
              <li><a href="#explore-matches" className="hover:text-amber-300 transition-colors">UAE & Singapore NRIs</a></li>
            </ul>
          </div>

          {/* Column 3: Tools & Astrology */}
          <div className="space-y-3">
            <h4 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
              Astrology & Tools
            </h4>
            <ul className="space-y-2">
              <li><a href="#kundli-calculator" className="hover:text-amber-300 transition-colors">36 Guna Milan Calculator</a></li>
              <li><a href="#kundli-calculator" className="hover:text-amber-300 transition-colors">Manglik Dosha Assessment</a></li>
              <li><a href="#kundli-calculator" className="hover:text-amber-300 transition-colors">Nadi Koota Analysis</a></li>
              <li><a href="#trust-verification" className="hover:text-amber-300 transition-colors">Printable Biodata Generator</a></li>
              <li><a href="#trust-verification" className="hover:text-amber-300 transition-colors">Voice Prompt Studio</a></li>
            </ul>
          </div>

          {/* Column 4: Trust & Safety */}
          <div className="space-y-3">
            <h4 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
              Trust & Privacy
            </h4>
            <ul className="space-y-2">
              <li><a href="#trust-verification" className="hover:text-amber-300 transition-colors">DigiLocker Verification</a></li>
              <li><a href="#trust-verification" className="hover:text-amber-300 transition-colors">Photo Privacy Shield</a></li>
              <li><a href="#trust-verification" className="hover:text-amber-300 transition-colors">Phone Number Masking</a></li>
              <li><a href="#trust-verification" className="hover:text-amber-300 transition-colors">Grievance Officer Portal</a></li>
              <li><a href="#trust-verification" className="hover:text-amber-300 transition-colors">Zero-Tolerance Anti-Spam</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>100% Aadhaar & DigiLocker Validated Platform</span>
            <span>·</span>
            <Lock className="w-4 h-4 text-amber-400" />
            <span>256-bit SSL Protected Biodata</span>
          </div>

          <div>
            © {new Date().getFullYear()} Bandhan Matrimonial Technologies Pvt. Ltd. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
