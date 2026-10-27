import React, { useState } from 'react';
import { MatrimonyProfile } from '../types/matrimony';
import { 
  X, 
  Heart, 
  Printer, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Home, 
  Utensils, 
  Moon, 
  Calendar, 
  Clock, 
  Compass, 
  CheckCircle2 
} from 'lucide-react';

interface ProfileBiodataModalProps {
  profile: MatrimonyProfile | null;
  isOpen: boolean;
  onClose: () => void;
  isShortlisted: boolean;
  onToggleShortlist: (id: string) => void;
  onSendInterest: (profile: MatrimonyProfile) => void;
}

type BiodataTab = 'ABOUT' | 'FAMILY' | 'KUNDLI' | 'PREFERENCES';

export const ProfileBiodataModal: React.FC<ProfileBiodataModalProps> = ({
  profile,
  isOpen,
  onClose,
  isShortlisted,
  onToggleShortlist,
  onSendInterest,
}) => {
  const [activeTab, setActiveTab] = useState<BiodataTab>('ABOUT');
  const [showPrintView, setShowPrintView] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  if (!isOpen || !profile) return null;

  const handleShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-ivory rounded-3xl border border-amber-200/90 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-crimson-950 via-crimson-900 to-crimson-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <img
              src={profile.image}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-amber-300/80 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                  {profile.name}
                </h2>
                {profile.verified && (
                  <span className="p-1 rounded-full bg-teal-500/20 border border-teal-300 text-teal-300" title="Aadhaar & DigiLocker Verified">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                {profile.age} yrs · {profile.height} · {profile.community} · {profile.location}
              </p>
            </div>
          </div>

          {/* Close & Print Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrintView(!showPrintView)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-amber-100 transition-colors cursor-pointer"
              title="Printable Family Biodata view"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{showPrintView ? 'Interactive View' : 'Printable Biodata'}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE / TRADITIONAL BIODATA FORMAT */}
        {showPrintView ? (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white font-serif">
            <div className="text-center border-b border-amber-300/60 pb-4">
              <span className="text-xs uppercase tracking-widest text-crimson-900 font-bold">|| Om Shree Ganeshay Namah ||</span>
              <h1 className="text-2xl font-bold text-stone-900 mt-1">Marriage Biodata</h1>
              <p className="text-xs text-stone-500">Confidential family profile presented via Bandhan Luxe</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-800">
              <div className="space-y-3">
                <h3 className="font-bold text-crimson-900 uppercase tracking-wider text-xs border-b pb-1">Personal Details</h3>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Date & Time of Birth:</strong> {profile.astro.dob} at {profile.astro.timeOfBirth}</p>
                <p><strong>Place of Birth:</strong> {profile.astro.placeOfBirth}</p>
                <p><strong>Height & Complexion:</strong> {profile.height}</p>
                <p><strong>Rashi / Nakshatra:</strong> {profile.astro.rashi} / {profile.astro.nakshatra}</p>
                <p><strong>Manglik Status:</strong> {profile.astro.manglik}</p>
                <p><strong>Dietary Habits:</strong> {profile.diet}</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-crimson-900 uppercase tracking-wider text-xs border-b pb-1">Education & Career</h3>
                <p><strong>Highest Degree:</strong> {profile.education}</p>
                <p><strong>Alma Mater:</strong> {profile.college}</p>
                <p><strong>Designation:</strong> {profile.profession}</p>
                <p><strong>Current Location:</strong> {profile.location} ({profile.workLocationCountry})</p>
                <p><strong>Annual Package:</strong> {profile.income}</p>
              </div>

              <div className="space-y-3 md:col-span-2">
                <h3 className="font-bold text-crimson-900 uppercase tracking-wider text-xs border-b pb-1">Family & Ancestral Lineage</h3>
                <p><strong>Native Place:</strong> {profile.family.nativePlace}</p>
                <p><strong>Father:</strong> {profile.family.fatherOccupation}</p>
                <p><strong>Mother:</strong> {profile.family.motherOccupation}</p>
                <p><strong>Siblings:</strong> {profile.family.siblings}</p>
                <p><strong>Gotra (Paternal / Maternal):</strong> {profile.family.gotra} / {profile.family.maternalGotra || 'N/A'}</p>
                <p><strong>Family Values & Type:</strong> {profile.family.familyValues} · {profile.family.familyType}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end gap-3 print:hidden">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-crimson-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Biodata</span>
              </button>
            </div>
          </div>
        ) : (
          /* INTERACTIVE 4-TAB BIODATA VIEW */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Header */}
            <div className="flex border-b border-amber-200/80 bg-white px-4 sm:px-6 overflow-x-auto shrink-0">
              {[
                { id: 'ABOUT', label: '1. About & Lifestyle' },
                { id: 'FAMILY', label: '2. Family & Roots' },
                { id: 'KUNDLI', label: '3. Horoscope & Kundli' },
                { id: 'PREFERENCES', label: '4. Partner Preferences' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as BiodataTab)}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-crimson-900 text-crimson-900 bg-amber-50/40'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-stone-800">
              
              {/* TAB 1: ABOUT ME & LIFESTYLE */}
              {activeTab === 'ABOUT' && (
                <div className="space-y-6">
                  {/* Bio Statement */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                    <h3 className="font-serif text-base font-bold text-stone-900">Personal Perspective</h3>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {profile.personalBio}
                    </p>
                  </div>

                  {/* Career & Alma Mater */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold uppercase tracking-wider">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Professional Pursuit</span>
                      </div>
                      <p className="text-sm font-bold text-stone-900">{profile.profession}</p>
                      <p className="text-xs text-stone-500">Income Bracket: {profile.income}</p>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold uppercase tracking-wider">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Education & College</span>
                      </div>
                      <p className="text-sm font-bold text-stone-900">{profile.education}</p>
                      <p className="text-xs text-stone-500">{profile.college}</p>
                    </div>
                  </div>

                  {/* Lifestyle Matrix */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
                    <h3 className="font-serif text-base font-bold text-stone-900">Lifestyle & Routine</h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-stone-50 rounded-xl">
                        <span className="text-stone-500 block">Diet</span>
                        <span className="font-semibold text-stone-900">{profile.diet}</span>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-xl">
                        <span className="text-stone-500 block">Drinking</span>
                        <span className="font-semibold text-stone-900">{profile.lifestyle.drinking}</span>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-xl">
                        <span className="text-stone-500 block">Smoking</span>
                        <span className="font-semibold text-stone-900">{profile.lifestyle.smoking}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-semibold text-stone-500">Weekend Energy & Passions:</span>
                      <p className="text-xs sm:text-sm text-stone-700 bg-amber-50/60 p-3 rounded-xl border border-amber-200/50">
                        {profile.lifestyle.weekendVibe}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-stone-500">Favorite Books & Melodies:</span>
                      <p className="text-xs sm:text-sm text-stone-700">
                        {profile.lifestyle.favoriteBooksOrMusic}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FAMILY & ROOTS */}
              {activeTab === 'FAMILY' && (
                <div className="space-y-6">
                  {/* Family Summary */}
                  <div className="bg-white p-5 rounded-2xl border border-amber-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                      <Home className="w-4 h-4 text-amber-700" />
                      <span>Family Background Statement</span>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {profile.familySummary}
                    </p>
                  </div>

                  {/* Detailed Tree Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
                      <span className="text-xs text-stone-500">Father&apos;s Profession</span>
                      <p className="text-sm font-semibold text-stone-900">{profile.family.fatherOccupation}</p>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
                      <span className="text-xs text-stone-500">Mother&apos;s Profession</span>
                      <p className="text-sm font-semibold text-stone-900">{profile.family.motherOccupation}</p>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
                      <span className="text-xs text-stone-500">Siblings Details</span>
                      <p className="text-sm font-semibold text-stone-900">{profile.family.siblings}</p>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
                      <span className="text-xs text-stone-500">Native Ancestral Place</span>
                      <p className="text-sm font-semibold text-stone-900">{profile.family.nativePlace}</p>
                    </div>
                  </div>

                  {/* Gotra & Lineage Card */}
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-stone-500 block">Paternal Gotra</span>
                      <span className="font-bold text-stone-900 text-sm">{profile.family.gotra}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Maternal Gotra</span>
                      <span className="font-bold text-stone-900 text-sm">{profile.family.maternalGotra || 'Available on Request'}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Family Structure</span>
                      <span className="font-bold text-stone-900 text-sm">{profile.family.familyType} ({profile.family.familyValues})</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: HOROSCOPE / KUNDLI */}
              {activeTab === 'KUNDLI' && (
                <div className="space-y-6">
                  {/* Score Highlights */}
                  <div className="p-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 text-white rounded-2xl shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs text-emerald-200 uppercase tracking-widest font-semibold">Guna Milan Compatibility</span>
                      <h4 className="font-serif text-2xl font-bold mt-0.5">
                        {profile.gunaScore} / 36 Gunas Matched
                      </h4>
                      <p className="text-xs text-emerald-100/90 mt-1">
                        High planetary harmony (Nadi & Bhakoot favorable)
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold">
                        Auspicious
                      </span>
                    </div>
                  </div>

                  {/* Astronomical Parameters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <span className="text-stone-500 block">Date of Birth</span>
                      <span className="font-bold text-stone-900">{profile.astro.dob}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <span className="text-stone-500 block">Birth Time</span>
                      <span className="font-bold text-stone-900">{profile.astro.timeOfBirth}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <span className="text-stone-500 block">Rashi (Moon Sign)</span>
                      <span className="font-bold text-stone-900">{profile.astro.rashi}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <span className="text-stone-500 block">Nakshatra</span>
                      <span className="font-bold text-stone-900">{profile.astro.nakshatra}</span>
                    </div>
                  </div>

                  {/* Manglik Assessment */}
                  <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-stone-800 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span>Manglik Dosha Assessment: {profile.astro.manglik}</span>
                    </div>
                    <p className="text-stone-600">
                      Verified via automated ephemeris Vedic calculation. Suitable for {profile.astro.manglik === 'Non-Manglik' ? 'both Non-Manglik and mild Anshik profiles' : 'Manglik / compatible astrological charts'}.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: PARTNER PREFERENCES */}
              {activeTab === 'PREFERENCES' && (
                <div className="space-y-5">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
                    <h3 className="font-serif text-base font-bold text-stone-900">What {profile.name.split(' ')[0]} and Family Seek</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 bg-stone-50 rounded-xl space-y-1">
                        <span className="text-stone-500 font-medium">Desired Age Bracket</span>
                        <p className="font-bold text-stone-900">{profile.preferences.ageRange[0]} to {profile.preferences.ageRange[1]} years</p>
                      </div>

                      <div className="p-3.5 bg-stone-50 rounded-xl space-y-1">
                        <span className="text-stone-500 font-medium">Height Expectation</span>
                        <p className="font-bold text-stone-900">{profile.preferences.heightRange}</p>
                      </div>

                      <div className="p-3.5 bg-stone-50 rounded-xl space-y-1">
                        <span className="text-stone-500 font-medium">Educational Alignment</span>
                        <p className="font-bold text-stone-900">{profile.preferences.education.join(' · ')}</p>
                      </div>

                      <div className="p-3.5 bg-stone-50 rounded-xl space-y-1">
                        <span className="text-stone-500 font-medium">Locations Considered</span>
                        <p className="font-bold text-stone-900">{profile.preferences.locations.join(', ')}</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs space-y-1">
                      <span className="text-stone-700 font-semibold">Community & Cultural Flexibility:</span>
                      <p className="text-stone-600">{profile.preferences.communityPreference}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-amber-200/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleShortlist(profile.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isShortlisted 
                  ? 'bg-crimson-50 border-crimson-200 text-crimson-800' 
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
              title="Shortlist profile"
            >
              <Heart className={`w-5 h-5 ${isShortlisted ? 'fill-crimson-800' : ''}`} />
            </button>

            <button
              onClick={handleShareLink}
              className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
              title="Copy share link for family WhatsApp"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {copyStatus && (
              <span className="text-xs text-emerald-700 font-medium animate-fade-in">
                Link copied!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onSendInterest(profile);
              }}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-crimson-900 hover:bg-crimson-950 shadow-md shadow-crimson-900/20 transition-all cursor-pointer flex items-center gap-2 active:scale-98"
            >
              <span>🙏</span>
              <span>Express Interest</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
