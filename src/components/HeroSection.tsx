import React, { useState, useEffect } from 'react';
import { MatrimonyProfile, SearchFilters } from '../types/matrimony';
import { 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react';
import { playAudioPreviewNote } from '../utils/audioSimulation';

interface HeroSectionProps {
  featuredProfiles: MatrimonyProfile[];
  filters: SearchFilters;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  onSearchSubmit: () => void;
  onSelectProfile: (profile: MatrimonyProfile) => void;
  onOpenRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredProfiles,
  filters,
  onFilterChange,
  onSearchSubmit,
  onSelectProfile,
  onOpenRegister,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const currentProfile = featuredProfiles[activeCardIndex] || featuredProfiles[0];

  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % featuredProfiles.length);
    setIsPlayingAudio(false);
    setAudioProgress(0);
  };

  const handlePrevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + featuredProfiles.length) % featuredProfiles.length);
    setIsPlayingAudio(false);
    setAudioProgress(0);
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      setAudioProgress(0);
    } else {
      setIsPlayingAudio(true);
      playAudioPreviewNote(currentProfile.voiceBioDurationSeconds ? 3 : 2.5);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-gradient-to-b from-amber-50/40 via-ivory to-ivory border-b border-amber-200/50">
      {/* Subtle traditional motif background gradient */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#881337 1px, transparent 1px), radial-gradient(#d4af37 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-300/60 text-amber-900 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>India&apos;s Next-Generation Matrimonial Experience</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
              Where Traditional Values <br className="hidden sm:inline" />
              Meet <span className="text-crimson-900 italic font-medium">Modern Hearts.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Curated for accomplished individuals and respected families. We blend the cultural sanctity of gotra and horoscope harmony with modern candidate lifestyle compatibility and verified trust signals.
            </p>

            {/* Live Statistics Ticker */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-stone-600 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                <span className="font-semibold text-stone-900">500k+</span>
                <span>Verified Profiles</span>
              </div>
              <span className="text-stone-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span className="font-semibold text-stone-900">100%</span>
                <span>Aadhaar & DigiLocker Verified</span>
              </div>
              <span className="text-stone-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="font-semibold text-stone-900">98%</span>
                <span>Family Satisfaction</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#explore-matches"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-crimson-900 hover:bg-crimson-950 rounded-xl shadow-md shadow-crimson-900/20 transition-all cursor-pointer whitespace-nowrap"
              >
                Find Compatible Matches
              </a>
              <button
                onClick={onOpenRegister}
                className="px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-amber-50/70 border border-amber-300/80 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                Register For My Son / Daughter
              </button>
            </div>
          </div>

          {/* Right Column: 3D-Tilt Floating Showcase Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Decorative gold backdrop glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-200/50 via-rose-200/40 to-amber-100/50 rounded-3xl blur-xl opacity-70 -z-10" />

              <div 
                onClick={() => onSelectProfile(currentProfile)}
                className="group relative bg-white/95 backdrop-blur-md rounded-2xl border border-amber-200/90 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer"
              >
                {/* Image Header with Scrim */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-stone-200">
                  <img
                    src={currentProfile.image}
                    alt={currentProfile.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if network image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Scrim for readable badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-900/80 backdrop-blur-md border border-teal-400/40 text-teal-100 text-xs font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                      <span>Govt ID Verified</span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{currentProfile.gunaScore}/36 Gunas</span>
                    </div>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                        {currentProfile.name}, {currentProfile.age}
                      </h3>
                      <span className="text-xs text-amber-200 font-medium">
                        {currentProfile.height}
                      </span>
                    </div>
                    <p className="text-xs text-stone-200 font-medium mt-0.5">
                      {currentProfile.community} · {currentProfile.location}
                    </p>
                  </div>
                </div>

                {/* Card Body & Audio Preview */}
                <div className="p-4 sm:p-5 space-y-3.5 bg-white">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span className="font-semibold text-stone-900">{currentProfile.profession}</span>
                    <span className="text-amber-800 font-medium">{currentProfile.income}</span>
                  </div>

                  {/* Interactive Voice Prompt Bar */}
                  <div 
                    onClick={toggleAudio}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 hover:bg-amber-100/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <button 
                        type="button"
                        className="w-8 h-8 rounded-full bg-crimson-900 text-white flex items-center justify-center shadow-xs shrink-0 cursor-pointer"
                      >
                        {isPlayingAudio ? (
                          <VolumeX className="w-4 h-4 animate-pulse" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-stone-900">
                          {isPlayingAudio ? 'Playing Voice Intro...' : `Listen to ${currentProfile.name.split(' ')[0]}'s Voice Intro`}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          20s audio: family vision & lifestyle
                        </p>
                      </div>
                    </div>

                    {/* Simulated Waveform */}
                    <div className="flex items-center gap-0.5 h-5 px-1">
                      {[40, 75, 55, 95, 60, 80, 45, 90, 65, 50].map((height, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-200 ${
                            isPlayingAudio 
                              ? 'bg-crimson-700 animate-pulse' 
                              : i * 10 < audioProgress 
                                ? 'bg-amber-600' 
                                : 'bg-amber-300'
                          }`}
                          style={{
                            height: isPlayingAudio ? `${Math.max(25, (height * (i % 2 === 0 ? 1 : 0.7)))}%` : `${height * 0.4}%`
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Navigation & View Biodata */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={handlePrevCard}
                        aria-label="Previous profile"
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {activeCardIndex + 1} of {featuredProfiles.length}
                      </span>
                      <button
                        onClick={handleNextCard}
                        aria-label="Next profile"
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectProfile(currentProfile)}
                      className="inline-flex items-center gap-1 text-crimson-900 font-semibold hover:text-crimson-950 transition-colors"
                    >
                      <span>View Full Biodata</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Quick-Match Filter Widget Spanning Bottom */}
        <div className="mt-10 sm:mt-12 bg-white/95 backdrop-blur-md rounded-2xl border border-amber-200/90 p-4 sm:p-5 shadow-lg shadow-amber-900/5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-end">
            
            {/* Looking For */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Looking For</label>
              <select
                value={filters.lookingFor}
                onChange={(e) => onFilterChange({ lookingFor: e.target.value as any })}
                className="w-full h-10 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-crimson-800 text-stone-800"
              >
                <option value="ALL">All Grooms & Brides</option>
                <option value="BRIDE">Bride (Seeking Groom)</option>
                <option value="GROOM">Groom (Seeking Bride)</option>
              </select>
            </div>

            {/* Age Range */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Age: {filters.ageRange[0]} - {filters.ageRange[1]} yrs
              </label>
              <div className="h-10 flex items-center px-2 bg-stone-50 border border-stone-200 rounded-xl">
                <input
                  type="range"
                  min="21"
                  max="45"
                  value={filters.ageRange[1]}
                  onChange={(e) => onFilterChange({ ageRange: [filters.ageRange[0], parseInt(e.target.value)] })}
                  className="w-full accent-crimson-900 cursor-pointer"
                />
              </div>
            </div>

            {/* Community / Mother Tongue */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Community / Tongue</label>
              <select
                value={filters.community}
                onChange={(e) => onFilterChange({ community: e.target.value })}
                className="w-full h-10 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-crimson-800 text-stone-800"
              >
                <option value="ALL">All Communities</option>
                <option value="Bengali">Bengali</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Marwari">Marwari</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayali">Malayali</option>
                <option value="North Indian">North Indian</option>
              </select>
            </div>

            {/* Living In */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Living In</label>
              <select
                value={filters.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
                className="w-full h-10 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-crimson-800 text-stone-800"
              >
                <option value="ALL">All Locations</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi-NCR</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="NRI">NRI (USA / UK / Canada / UAE)</option>
              </select>
            </div>

            {/* Manglik / Kundli Preference */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Manglik Status</label>
              <select
                value={filters.manglik}
                onChange={(e) => onFilterChange({ manglik: e.target.value })}
                className="w-full h-10 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-crimson-800 text-stone-800"
              >
                <option value="ALL">Doesn&apos;t Matter</option>
                <option value="Non-Manglik">Non-Manglik</option>
                <option value="Anshik Manglik">Anshik Manglik</option>
                <option value="Manglik">Manglik</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-transparent select-none">Action</label>
              <button
                onClick={onSearchSubmit}
                className="w-full h-10 px-4 bg-gradient-to-r from-crimson-900 to-crimson-800 hover:from-crimson-950 hover:to-crimson-900 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-98"
              >
                <Search className="w-4 h-4" />
                <span>Search Matches</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
