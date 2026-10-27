import React, { useState, useMemo } from 'react';
import { INITIAL_PROFILES } from './data/mockProfiles';
import { MatrimonyProfile, SearchFilters, Gender } from './types/matrimony';
import { ViewMode, DualModeToggle } from './components/DualModeToggle';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileCard } from './components/ProfileCard';
import { ProfileBiodataModal } from './components/ProfileBiodataModal';
import { KundliMatchCalculator } from './components/KundliMatchCalculator';
import { TrustVerificationCenter } from './components/TrustVerificationCenter';
import { LoveStoriesSection } from './components/LoveStoriesSection';
import { RegistrationWizardModal } from './components/RegistrationWizardModal';
import { ExpressInterestModal } from './components/ExpressInterestModal';
import { ShortlistDrawer } from './components/ShortlistDrawer';
import { PrismaArchitectureModal } from './components/PrismaArchitectureModal';
import { Footer } from './components/Footer';
import { 
  Filter, 
  RotateCcw, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronDown,
  Check
} from 'lucide-react';

export default function App() {
  const [profiles, setProfiles] = useState<MatrimonyProfile[]>(INITIAL_PROFILES);
  const [viewMode, setViewMode] = useState<ViewMode>('CANDIDATE');
  const [seniorFont, setSeniorFont] = useState<boolean>(false);
  
  // State for Shortlists & Sent Interests
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['mat-001', 'mat-002']);
  const [sentInterestIds, setSentInterestIds] = useState<string[]>(['mat-003']);

  // Modals
  const [selectedBiodataProfile, setSelectedBiodataProfile] = useState<MatrimonyProfile | null>(null);
  const [expressInterestProfile, setExpressInterestProfile] = useState<MatrimonyProfile | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isShortlistDrawerOpen, setIsShortlistDrawerOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Search Filters
  const initialFilters: SearchFilters = {
    lookingFor: 'ALL',
    ageRange: [21, 35],
    community: 'ALL',
    location: 'ALL',
    religion: 'ALL',
    casteNoBar: true,
    manglik: 'ALL',
    diet: 'ALL',
    minIncomeLakhs: 0,
    verifiedOnly: false,
    nriOnly: false,
    searchQuery: '',
  };

  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleFilterChange = (partial: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    showToast('Filters reset to default view.');
  };

  // Filter Logic
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // Gender / Looking For
      if (filters.lookingFor !== 'ALL' && p.gender !== filters.lookingFor) {
        return false;
      }

      // Age range
      if (p.age < filters.ageRange[0] || p.age > filters.ageRange[1]) {
        return false;
      }

      // Community / Mother Tongue
      if (filters.community !== 'ALL') {
        const commLower = p.community.toLowerCase();
        const target = filters.community.toLowerCase();
        if (!commLower.includes(target)) {
          return false;
        }
      }

      // Location
      if (filters.location !== 'ALL') {
        if (filters.location === 'NRI') {
          if (p.workLocationCountry === 'India') return false;
        } else {
          const locLower = (p.location + ' ' + p.family.nativePlace).toLowerCase();
          if (!locLower.includes(filters.location.toLowerCase())) {
            return false;
          }
        }
      }

      // Religion
      if (filters.religion !== 'ALL' && p.religion !== filters.religion) {
        return false;
      }

      // Manglik
      if (filters.manglik !== 'ALL' && p.manglik !== filters.manglik) {
        return false;
      }

      // Diet
      if (filters.diet !== 'ALL' && p.diet !== filters.diet) {
        return false;
      }

      // Min Income
      if (filters.minIncomeLakhs > 0 && p.incomeNumericLakhs < filters.minIncomeLakhs) {
        return false;
      }

      // Verified Only
      if (filters.verifiedOnly && !p.verified) {
        return false;
      }

      // NRI Only
      if (filters.nriOnly && p.workLocationCountry === 'India') {
        return false;
      }

      // Free text search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const fullContent = [
          p.name,
          p.profession,
          p.community,
          p.location,
          p.education,
          p.college,
          p.family.nativePlace,
          p.family.gotra,
          p.lifestyle.passions.join(' ')
        ].join(' ').toLowerCase();

        if (!fullContent.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [profiles, filters]);

  // Shortlist Toggle
  const handleToggleShortlist = (id: string) => {
    if (shortlistedIds.includes(id)) {
      setShortlistedIds(shortlistedIds.filter((item) => item !== id));
      showToast('Profile removed from your saved list.');
    } else {
      setShortlistedIds([...shortlistedIds, id]);
      showToast('Profile shortlisted for family review.');
    }
  };

  // Interest sent
  const handleSendInterest = (profile: MatrimonyProfile) => {
    setExpressInterestProfile(profile);
  };

  const handleConfirmSendInterest = (profileId: string, note: string) => {
    if (!sentInterestIds.includes(profileId)) {
      setSentInterestIds([...sentInterestIds, profileId]);
    }
    showToast('Namaste sent! Connection request delivered.');
  };

  // New Profile Registration
  const handleRegisterSuccess = (newProfile: MatrimonyProfile) => {
    setProfiles([newProfile, ...profiles]);
    showToast(`Welcome ${newProfile.name}! Your profile is live.`);
  };

  // Guna Score Filter from Calculator
  const handleApplyGunaFilter = (minScore: number) => {
    // Scroll to explorer
    const el = document.getElementById('explore-matches');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Showing high-compatibility matches with 30+ Gunas.`);
  };

  const shortlistedProfiles = useMemo(() => {
    return profiles.filter((p) => shortlistedIds.includes(p.id));
  }, [profiles, shortlistedIds]);

  return (
    <div className={`min-h-screen bg-ivory text-stone-900 selection:bg-crimson-100 selection:text-crimson-900 ${
      seniorFont ? 'text-base' : 'text-sm'
    }`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900/95 text-white px-5 py-3 rounded-2xl shadow-xl border border-amber-300/40 text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-in backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenShortlist={() => setIsShortlistDrawerOpen(true)}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        shortlistCount={shortlistedIds.length}
        activeSection="explore-matches"
      />

      {/* Hero Section */}
      <HeroSection
        featuredProfiles={profiles.slice(0, 4)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearchSubmit={() => {
          const el = document.getElementById('explore-matches');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectProfile={(profile) => setSelectedBiodataProfile(profile)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Main Match Feed Section */}
      <section id="explore-matches" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dual-Mode Selector Toolbar */}
        <div className="mb-8">
          <DualModeToggle
            currentMode={viewMode}
            onToggle={(mode) => setViewMode(mode)}
            seniorFont={seniorFont}
            onToggleSeniorFont={() => setSeniorFont(!seniorFont)}
          />
        </div>

        {/* Section Header & Search Matrix */}
        <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xs p-5 sm:p-7 mb-8 space-y-5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                  Explore Compatible Matches
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  {filteredProfiles.length} Profiles Available
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                {viewMode === 'CANDIDATE' 
                  ? 'Showing personal lifestyles, weekend vibes, and authentic voice bios'
                  : 'Showing ancestral gotra, native roots, family pedigree, and horoscope balance'}
              </p>
            </div>

            {/* Quick Gender Segmented Control */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl self-start md:self-auto">
              {[
                { id: 'ALL', label: 'All Profiles' },
                { id: 'BRIDE', label: 'Brides Only' },
                { id: 'GROOM', label: 'Grooms Only' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleFilterChange({ lookingFor: tab.id as any })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    filters.lookingFor === tab.id
                      ? 'bg-crimson-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar & Quick Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Free Text Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                placeholder="Search by college (IIT, AIIMS), profession, gotra, city..."
                className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-crimson-800"
              />
            </div>

            {/* Community Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={filters.community}
                onChange={(e) => handleFilterChange({ community: e.target.value })}
                className="w-full h-10 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-crimson-800"
              >
                <option value="ALL">All Communities & Tongues</option>
                <option value="Bengali">Bengali</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Tamil">Tamil</option>
                <option value="Marathi">Marathi</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Marwari">Marwari</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayali">Malayali</option>
                <option value="North Indian">North Indian</option>
              </select>
            </div>

            {/* Diet Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={filters.diet}
                onChange={(e) => handleFilterChange({ diet: e.target.value })}
                className="w-full h-10 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-crimson-800"
              >
                <option value="ALL">All Dietary Lifestyles</option>
                <option value="Vegetarian">Strictly Vegetarian</option>
                <option value="Eggetarian">Eggetarian</option>
                <option value="Jain">Jain Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>

            {/* Toggle Advanced Filters Button */}
            <div className="lg:col-span-2">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`w-full h-10 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  showAdvancedFilters 
                    ? 'bg-amber-100/80 border-amber-300 text-amber-900' 
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showAdvancedFilters ? 'Hide Filters' : 'More Filters'}</span>
              </button>
            </div>

          </div>

          {/* Advanced Filters Expandable Drawer */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in text-xs">
              
              {/* Religion */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Religion</label>
                <select
                  value={filters.religion}
                  onChange={(e) => handleFilterChange({ religion: e.target.value })}
                  className="w-full h-9 px-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800"
                >
                  <option value="ALL">All Religions</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Jain">Jain</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                </select>
              </div>

              {/* Min Annual Package */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">
                  Min Package: {filters.minIncomeLakhs > 0 ? `₹${filters.minIncomeLakhs} LPA+` : 'Any'}
                </label>
                <select
                  value={filters.minIncomeLakhs}
                  onChange={(e) => handleFilterChange({ minIncomeLakhs: parseInt(e.target.value) })}
                  className="w-full h-9 px-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800"
                >
                  <option value="0">Any Annual Package</option>
                  <option value="30">₹30 Lakhs+</option>
                  <option value="50">₹50 Lakhs+</option>
                  <option value="80">₹80 Lakhs+</option>
                  <option value="100">₹1 Crore+</option>
                </select>
              </div>

              {/* Verified Only Check */}
              <div className="space-y-1 flex flex-col justify-end">
                <label 
                  onClick={() => handleFilterChange({ verifiedOnly: !filters.verifiedOnly })}
                  className="flex items-center gap-2 cursor-pointer h-9 px-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-800"
                >
                  <input
                    type="checkbox"
                    checked={filters.verifiedOnly}
                    onChange={() => {}}
                    className="accent-teal-700"
                  />
                  <span>100% ID Verified Only</span>
                </label>
              </div>

              {/* NRI Only Check */}
              <div className="space-y-1 flex flex-col justify-end">
                <label 
                  onClick={() => handleFilterChange({ nriOnly: !filters.nriOnly })}
                  className="flex items-center gap-2 cursor-pointer h-9 px-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-800"
                >
                  <input
                    type="checkbox"
                    checked={filters.nriOnly}
                    onChange={() => {}}
                    className="accent-crimson-800"
                  />
                  <span>NRI Profiles (US/UK/UAE)</span>
                </label>
              </div>

            </div>
          )}

          {/* Active Filter Badges & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-stone-500">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">Active Filters:</span>
              <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                {filters.lookingFor === 'ALL' ? 'All Genders' : filters.lookingFor}
              </span>
              {filters.community !== 'ALL' && (
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                  {filters.community}
                </span>
              )}
              {filters.diet !== 'ALL' && (
                <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                  {filters.diet}
                </span>
              )}
              {filters.verifiedOnly && (
                <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-semibold">
                  Verified Only
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-crimson-900 hover:text-crimson-950 font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>

        </div>

        {/* Profile Card Grid */}
        {filteredProfiles.length === 0 ? (
          <div className="p-12 sm:p-16 bg-white rounded-3xl border border-stone-200 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-700">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              No Compatible Profiles Found
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Try relaxing your community, dietary, or annual income filters to explore more verified matches.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-crimson-900 hover:bg-crimson-950 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                viewMode={viewMode}
                seniorFont={seniorFont}
                isShortlisted={shortlistedIds.includes(profile.id)}
                onToggleShortlist={handleToggleShortlist}
                onOpenBiodata={(p) => setSelectedBiodataProfile(p)}
                onSendInterest={(p) => handleSendInterest(p)}
                onShare={(p) => {
                  setSelectedBiodataProfile(p);
                }}
              />
            ))}
          </div>
        )}

      </section>

      {/* Module 3: Interactive Kundli & Compatibility Calculator */}
      <KundliMatchCalculator onApplyGunaFilter={handleApplyGunaFilter} />

      {/* Trust, Verification & Privacy Center */}
      <TrustVerificationCenter />

      {/* Real Love Stories & Testimonials */}
      <LoveStoriesSection />

      {/* Footer */}
      <Footer
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* MODALS & DRAWERS */}
      
      {/* 4-Tab Detailed Profile Biodata Modal */}
      <ProfileBiodataModal
        profile={selectedBiodataProfile}
        isOpen={!!selectedBiodataProfile}
        onClose={() => setSelectedBiodataProfile(null)}
        isShortlisted={selectedBiodataProfile ? shortlistedIds.includes(selectedBiodataProfile.id) : false}
        onToggleShortlist={handleToggleShortlist}
        onSendInterest={(p) => handleSendInterest(p)}
      />

      {/* Express Interest Modal (Namaste Connect) */}
      <ExpressInterestModal
        profile={expressInterestProfile}
        isOpen={!!expressInterestProfile}
        onClose={() => setExpressInterestProfile(null)}
        viewMode={viewMode}
        onConfirmSend={handleConfirmSendInterest}
      />

      {/* 4-Step Registration Wizard Modal */}
      <RegistrationWizardModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Saved Shortlist & Interests Drawer */}
      <ShortlistDrawer
        isOpen={isShortlistDrawerOpen}
        onClose={() => setIsShortlistDrawerOpen(false)}
        shortlistedProfiles={shortlistedProfiles}
        sentInterestIds={sentInterestIds}
        allProfiles={profiles}
        onRemoveShortlist={handleToggleShortlist}
        onSelectProfile={(p) => {
          setIsShortlistDrawerOpen(false);
          setSelectedBiodataProfile(p);
        }}
      />

      {/* Full-Stack Prisma Schema & API Architecture Modal */}
      <PrismaArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

    </div>
  );
}
