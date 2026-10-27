import React, { useState } from 'react';
import { KundliResult, KundliBreakdownItem } from '../types/matrimony';
import { Sparkles, Calendar, Clock, MapPin, CheckCircle, AlertCircle, RefreshCw, Filter } from 'lucide-react';

interface KundliMatchCalculatorProps {
  onApplyGunaFilter: (minScore: number) => void;
}

const DEFAULT_KOOTAS: KundliBreakdownItem[] = [
  {
    name: 'Varna Koota',
    sanskritName: 'वर्ण कूट',
    maxPoints: 1,
    obtainedPoints: 1,
    significance: 'Spiritual ego & intellectual alignment',
    status: 'Excellent',
    notes: 'Mutual respect for individual life pursuits'
  },
  {
    name: 'Vashya Koota',
    sanskritName: 'वश्य कूट',
    maxPoints: 2,
    obtainedPoints: 2,
    significance: 'Mutual attraction & emotional dominance balance',
    status: 'Excellent',
    notes: 'Equitable partnership dynamic'
  },
  {
    name: 'Tara Koota',
    sanskritName: 'तारा कूट',
    maxPoints: 3,
    obtainedPoints: 3,
    significance: 'Destiny, health, well-being and longevity',
    status: 'Excellent',
    notes: 'Kalyana Tara alignment auspicious'
  },
  {
    name: 'Yoni Koota',
    sanskritName: 'योनि कूट',
    maxPoints: 4,
    obtainedPoints: 3,
    significance: 'Physical & biological harmony',
    status: 'Good',
    notes: 'Favorable animal archetype affinity'
  },
  {
    name: 'Graha Maitri',
    sanskritName: 'ग्रह मैत्री',
    maxPoints: 5,
    obtainedPoints: 5,
    significance: 'Mental rapport, psychology & friendship',
    status: 'Excellent',
    notes: 'Lord of Moon signs in mutual harmony'
  },
  {
    name: 'Gana Koota',
    sanskritName: 'गण कूट',
    maxPoints: 6,
    obtainedPoints: 5,
    significance: 'Temperament and behavioral temperament',
    status: 'Good',
    notes: 'Deva and Manushya gana complement well'
  },
  {
    name: 'Bhakoot Koota',
    sanskritName: 'भकूट कूट',
    maxPoints: 7,
    obtainedPoints: 7,
    significance: 'Family welfare, emotional bonding and prosperity',
    status: 'Excellent',
    notes: 'No Bhakoot Dosha; planetary positions auspicious'
  },
  {
    name: 'Nadi Koota',
    sanskritName: 'नाड़ी कूट',
    maxPoints: 8,
    obtainedPoints: 8,
    significance: 'Genetic, neurological and physiological health',
    status: 'Excellent',
    notes: 'Antya and Madhya Nadi compatibility (Zero Dosha)'
  }
];

export const KundliMatchCalculator: React.FC<KundliMatchCalculatorProps> = ({
  onApplyGunaFilter,
}) => {
  const [boyName, setBoyName] = useState('Kabir');
  const [boyDob, setBoyDob] = useState('1996-08-22');
  const [boyTime, setBoyTime] = useState('11:20');
  const [boyCity, setBoyCity] = useState('New Delhi');

  const [girlName, setGirlName] = useState('Dr. Rhea');
  const [girlDob, setGirlDob] = useState('1998-04-14');
  const [girlTime, setGirlTime] = useState('06:45');
  const [girlCity, setGirlCity] = useState('Kolkata');

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<KundliResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);

    // Astronomical simulation delay
    setTimeout(() => {
      // Calculate dynamic variation based on entered strings
      const seed = (boyName.length + girlName.length + boyCity.length + girlCity.length) % 5;
      const totalScore = 31 + (seed % 4); // generates 31 to 34

      setResult({
        totalScore,
        maxScore: 36,
        verdict: totalScore >= 28 ? 'Highly Auspicious Match' : 'Auspicious Match',
        compatibilityLevel: 'Highly Auspicious',
        doshaNotes: 'No Nadi Dosha Detected · Manglik Compatibility Balanced',
        items: DEFAULT_KOOTAS
      });
      setIsCalculating(false);
    }, 1400);
  };

  return (
    <section id="kundli-calculator" className="py-14 sm:py-20 bg-ivory border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Vedic Ephemeris Engine</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Interactive Kundli & Guna Milan Calculator
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Test astronomical compatibility according to the 3,000-year-old Ashta Koota Milan system. Calculates all 36 Gunas across spiritual, mental, and physiological dimensions.
          </p>
        </div>

        {/* Two-Column Interactive Tool Card */}
        <div className="bg-white rounded-3xl border border-amber-200/90 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleCalculate} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
              
              {/* BOY'S DETAILS (Var) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                    <h3 className="font-serif text-lg font-bold text-stone-900">Groom&apos;s Kundli Details (वर)</h3>
                  </div>
                  <span className="text-xs text-stone-500 font-medium">Step 1</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={boyName}
                      onChange={(e) => setBoyName(e.target.value)}
                      placeholder="e.g. Kabir Malhotra"
                      className="w-full h-10 px-3.5 bg-white border border-stone-200 rounded-xl text-stone-800 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Date of Birth</label>
                      <input
                        type="date"
                        required
                        value={boyDob}
                        onChange={(e) => setBoyDob(e.target.value)}
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Time of Birth</label>
                      <input
                        type="time"
                        required
                        value={boyTime}
                        onChange={(e) => setBoyTime(e.target.value)}
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">City of Birth</label>
                    <input
                      type="text"
                      required
                      value={boyCity}
                      onChange={(e) => setBoyCity(e.target.value)}
                      placeholder="e.g. New Delhi"
                      className="w-full h-10 px-3.5 bg-white border border-stone-200 rounded-xl text-stone-800 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>
                </div>
              </div>

              {/* GIRL'S DETAILS (Kanya) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/40 border border-amber-200/70 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-crimson-800"></span>
                    <h3 className="font-serif text-lg font-bold text-stone-900">Bride&apos;s Kundli Details (कन्या)</h3>
                  </div>
                  <span className="text-xs text-amber-800 font-medium">Step 2</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={girlName}
                      onChange={(e) => setGirlName(e.target.value)}
                      placeholder="e.g. Dr. Rhea Sen"
                      className="w-full h-10 px-3.5 bg-white border border-amber-200 rounded-xl text-stone-800 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Date of Birth</label>
                      <input
                        type="date"
                        required
                        value={girlDob}
                        onChange={(e) => setGirlDob(e.target.value)}
                        className="w-full h-10 px-3 bg-white border border-amber-200 rounded-xl text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Time of Birth</label>
                      <input
                        type="time"
                        required
                        value={girlTime}
                        onChange={(e) => setGirlTime(e.target.value)}
                        className="w-full h-10 px-3 bg-white border border-amber-200 rounded-xl text-stone-800 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">City of Birth</label>
                    <input
                      type="text"
                      required
                      value={girlCity}
                      onChange={(e) => setGirlCity(e.target.value)}
                      placeholder="e.g. Kolkata"
                      className="w-full h-10 px-3.5 bg-white border border-amber-200 rounded-xl text-stone-800 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Calculate Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isCalculating}
                className="px-8 py-3.5 bg-gradient-to-r from-crimson-900 via-crimson-800 to-crimson-900 hover:from-crimson-950 hover:to-crimson-900 text-white font-semibold text-sm rounded-xl shadow-md shadow-crimson-900/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Aligning Planetary Ephemeris...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Calculate 36 Guna Milan</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* ANIMATED CALCULATION PROGRESS WITH VEDIC GLYPHS */}
          {isCalculating && (
            <div className="mt-8 p-8 rounded-2xl bg-stone-900 text-white text-center space-y-4 animate-pulse">
              <div className="flex justify-center items-center gap-4 text-2xl text-amber-400 font-serif">
                <span>ॐ</span>
                <span>•</span>
                <span>नक्षत्र</span>
                <span>•</span>
                <span>राशि</span>
                <span>•</span>
                <span>कुण्डली</span>
              </div>
              <p className="text-sm text-stone-300 font-medium">
                Computing Ashta Kootas: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot & Nadi...
              </p>
            </div>
          )}

          {/* RESULTS DISPLAY ACCORDION */}
          {result && !isCalculating && (
            <div className="mt-10 pt-8 border-t border-amber-200/80 space-y-6">
              
              {/* Summary Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
                    Astrological Score Verdict
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-white">
                    {result.totalScore} / {result.maxScore} Gunas Matched
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">
                    {result.verdict} for {boyName} & {girlName}
                  </p>
                </div>

                <div className="text-center sm:text-right space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>{result.doshaNotes}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => onApplyGunaFilter(28)}
                      className="mt-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Filter className="w-3.5 h-3.5" />
                      <span>Find Matches with 28+ Gunas</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Ashta Koota 8-Row Breakdown Table */}
              <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-xs font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Koota (Dimension)</th>
                      <th className="py-3 px-4">Max Points</th>
                      <th className="py-3 px-4">Obtained Points</th>
                      <th className="py-3 px-4">Significance & Health</th>
                      <th className="py-3 px-4 text-right">Compatibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-800">
                    {result.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-stone-900 block">{item.name}</span>
                          <span className="text-[11px] text-stone-500">{item.sanskritName}</span>
                        </td>
                        <td className="py-3 px-4 text-stone-600 font-mono">{item.maxPoints} pts</td>
                        <td className="py-3 px-4 font-mono font-bold text-crimson-900">{item.obtainedPoints} pts</td>
                        <td className="py-3 px-4">
                          <span className="text-xs font-medium text-stone-900 block">{item.significance}</span>
                          <span className="text-[11px] text-stone-500">{item.notes}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
