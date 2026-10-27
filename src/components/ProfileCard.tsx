import React, { useState, useEffect } from 'react';
import { MatrimonyProfile } from '../types/matrimony';
import { ViewMode } from './DualModeToggle';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Home, 
  Compass, 
  Utensils 
} from 'lucide-react';
import { playAudioPreviewNote } from '../utils/audioSimulation';

interface ProfileCardProps {
  profile: MatrimonyProfile;
  viewMode: ViewMode;
  seniorFont: boolean;
  isShortlisted: boolean;
  onToggleShortlist: (profileId: string) => void;
  onOpenBiodata: (profile: MatrimonyProfile) => void;
  onSendInterest: (profile: MatrimonyProfile) => void;
  onShare: (profile: MatrimonyProfile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  viewMode,
  seniorFont,
  isShortlisted,
  onToggleShortlist,
  onOpenBiodata,
  onSendInterest,
  onShare,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isShieldActive, setIsShieldActive] = useState(profile.photoPrivacy === 'BLURRED');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [accessRequested, setAccessRequested] = useState(false);

  const photos = [profile.image, ...(profile.additionalPhotos || [])];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playAudioPreviewNote(profile.voiceBioDurationSeconds ? 3 : 2.5);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setTimeout(() => {
        setIsPlayingAudio(false);
      }, (profile.voiceBioDurationSeconds || 20) * 120); // quick preview cycle
    }
    return () => clearTimeout(timer);
  }, [isPlayingAudio, profile.voiceBioDurationSeconds]);

  return (
    <div className="group bg-white rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between">
      
      {/* Top Container: Image Carousel & Privacy Shield */}
      <div className="relative h-72 sm:h-80 bg-stone-100 overflow-hidden select-none">
        <img
          src={photos[photoIndex]}
          alt={profile.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isShieldActive ? 'blur-md scale-105' : 'blur-none scale-100 group-hover:scale-102'
          }`}
        />

        {/* Fallback pattern in case image fails */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-100 to-rose-50 flex items-center justify-center text-stone-400 text-xs">
          <span>{profile.name}</span>
        </div>

        {/* Gradient Scrim for readable badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          {/* Trust Verification Badge */}
          {profile.verified && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-950/85 backdrop-blur-md border border-teal-400/40 text-teal-200 text-xs font-medium shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Level {profile.verificationLevel} Verified</span>
            </div>
          )}

          {/* Privacy Shield Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsShieldActive(!isShieldActive);
            }}
            aria-label="Toggle photo privacy shield"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-stone-200 text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
            title="Privacy Shield: Blurs photo for discretion"
          >
            {isShieldActive ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[11px]">Shield On</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-stone-300" />
                <span className="text-[11px]">Shield Off</span>
              </>
            )}
          </button>
        </div>

        {/* Privacy Shield Overlay Screen when active */}
        {isShieldActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/40 backdrop-blur-xs p-4 text-center z-10">
            <p className="text-white text-xs font-semibold tracking-wide uppercase drop-shadow">
              [Confidential - Shield Active]
            </p>
            <p className="text-stone-200 text-xs mt-1 max-w-[200px]">
              Family requested privacy protection for initial discovery.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAccessRequested(true);
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              {accessRequested ? '✓ Access Requested' : 'Request Photo Access'}
            </button>
          </div>
        )}

        {/* Carousel Prev/Next Buttons */}
        {photos.length > 1 && !isShieldActive && (
          <>
            <button
              type="button"
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextPhoto}
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Carousel Indicator Dots */}
        {photos.length > 1 && (
          <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5 z-10">
            {photos.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === photoIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Bottom Image Info Banner */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 text-white z-10 pointer-events-none">
          <div className="flex items-baseline justify-between">
            <h3 className={`font-serif font-bold tracking-tight drop-shadow-sm ${
              seniorFont ? 'text-2xl' : 'text-xl'
            }`}>
              {profile.name}, {profile.age}
            </h3>
            <span className="text-xs text-amber-300 font-semibold drop-shadow-sm">
              {profile.height}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-200 mt-0.5">
            <span>{profile.community}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.onlineStatus}</span>
          </div>
        </div>

      </div>

      {/* Middle Container: Dynamic Mode-Specific Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Core Credentials */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-stone-700">
            <Briefcase className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="font-semibold text-stone-900 truncate">{profile.profession}</span>
            <span className="text-stone-300">·</span>
            <span className="text-amber-800 font-medium shrink-0">{profile.income}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <GraduationCap className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="truncate">{profile.education} ({profile.college})</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="truncate">{profile.location}</span>
            {profile.workLocationCountry !== 'India' && (
              <span className="px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold text-[10px]">
                NRI ({profile.workLocationCountry})
              </span>
            )}
          </div>
        </div>

        {/* DUAL-MODE CONTENT BLOCK */}
        {viewMode === 'CANDIDATE' ? (
          /* CANDIDATE MODE VIEW: Lifestyle, Passions, Diet, Voice */
          <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                <Utensils className="w-3.5 h-3.5 text-crimson-800" />
                <span>{profile.diet}</span>
                <span className="text-stone-300">·</span>
                <span>Drink: {profile.lifestyle.drinking}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>{profile.gunaScore}/36 Gunas</span>
              </div>
            </div>

            <p className={`text-stone-600 line-clamp-2 italic ${
              seniorFont ? 'text-sm' : 'text-xs'
            }`}>
              &ldquo;{profile.lifestyle.weekendVibe}&rdquo;
            </p>

            {/* Clickable Voice Prompt Waveform Bar */}
            <button
              type="button"
              onClick={handleAudioClick}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-rose-200/80 hover:bg-rose-50 text-stone-800 text-xs font-medium transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-crimson-900 text-white flex items-center justify-center shrink-0">
                  {isPlayingAudio ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </span>
                <span className="truncate">
                  {isPlayingAudio ? 'Listening to voice intro...' : 'Play 20s Voice Bio'}
                </span>
              </div>

              {/* Mini Waveform */}
              <div className="flex items-center gap-0.5 h-3.5 px-1">
                {[30, 80, 50, 100, 60, 90, 40].map((h, i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-full transition-all ${
                      isPlayingAudio ? 'bg-crimson-800 animate-pulse' : 'bg-stone-300'
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </button>
          </div>
        ) : (
          /* PARENT & FAMILY MODE VIEW: Roots, Gotra, Family Values, Astrological compatibility */
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-stone-800 font-semibold">
                <Home className="w-3.5 h-3.5 text-amber-800" />
                <span>{profile.family.familyType} Family</span>
                <span className="text-stone-300">·</span>
                <span>{profile.family.familyValues} Values</span>
              </div>
              <span className="text-[11px] font-bold text-amber-900 bg-amber-100/90 px-1.5 py-0.5 rounded">
                Gotra: {profile.family.gotra}
              </span>
            </div>

            <div className={`text-stone-700 space-y-1 ${
              seniorFont ? 'text-sm' : 'text-xs'
            }`}>
              <p className="line-clamp-1">
                <strong className="text-stone-900">Father:</strong> {profile.family.fatherOccupation}
              </p>
              <p className="line-clamp-1">
                <strong className="text-stone-900">Mother:</strong> {profile.family.motherOccupation}
              </p>
              <div className="flex items-center justify-between text-[11px] text-stone-600 pt-0.5">
                <span>Native: {profile.family.nativePlace}</span>
                <span className="text-emerald-800 font-semibold">
                  Kundli: {profile.astro.manglik} ({profile.gunaScore}/36)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons Toolbar */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Express Interest (Namaste Icon) */}
            <button
              onClick={() => onSendInterest(profile)}
              className="px-3 py-2 bg-crimson-900 hover:bg-crimson-950 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-98 cursor-pointer"
            >
              <span className="text-base leading-none">🙏</span>
              <span>Send Interest</span>
            </button>

            {/* View Full Biodata */}
            <button
              onClick={() => onOpenBiodata(profile)}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer"
            >
              <span>View Biodata</span>
            </button>
          </div>

          {/* Secondary Actions: Shortlist & Share */}
          <div className="flex items-center justify-between px-1 text-xs text-stone-500">
            <button
              onClick={() => onToggleShortlist(profile.id)}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                isShortlisted ? 'text-crimson-800 font-semibold' : 'hover:text-crimson-900'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-crimson-800 text-crimson-800' : ''}`} />
              <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
            </button>

            <button
              onClick={() => onShare(profile)}
              className="flex items-center gap-1 hover:text-stone-800 transition-colors cursor-pointer"
              title="Share profile biodata summary with family"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share with Family</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
