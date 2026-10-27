import React, { useState } from 'react';
import { MatrimonyProfile } from '../types/matrimony';
import { X, Heart, Trash2, ArrowRight, CheckCircle2, Clock, Send } from 'lucide-react';

interface ShortlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shortlistedProfiles: MatrimonyProfile[];
  sentInterestIds: string[];
  allProfiles: MatrimonyProfile[];
  onRemoveShortlist: (id: string) => void;
  onSelectProfile: (profile: MatrimonyProfile) => void;
}

export const ShortlistDrawer: React.FC<ShortlistDrawerProps> = ({
  isOpen,
  onClose,
  shortlistedProfiles,
  sentInterestIds,
  allProfiles,
  onRemoveShortlist,
  onSelectProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'SHORTLIST' | 'INTERESTS'>('SHORTLIST');

  if (!isOpen) return null;

  const sentProfiles = allProfiles.filter((p) => sentInterestIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-ivory h-full shadow-2xl flex flex-col border-l border-amber-200/80 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-crimson-950 to-crimson-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-amber-300 fill-amber-300" />
            <h3 className="font-serif text-lg font-bold">My Saved & Interests</h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-stone-200 bg-white">
          <button
            onClick={() => setActiveTab('SHORTLIST')}
            className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'SHORTLIST'
                ? 'border-crimson-900 text-crimson-900 bg-amber-50/40'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Shortlisted ({shortlistedProfiles.length})
          </button>

          <button
            onClick={() => setActiveTab('INTERESTS')}
            className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'INTERESTS'
                ? 'border-crimson-900 text-crimson-900 bg-amber-50/40'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Sent Interests ({sentProfiles.length})
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'SHORTLIST' ? (
            shortlistedProfiles.length === 0 ? (
              <div className="py-16 text-center text-stone-500 space-y-2">
                <Heart className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="text-sm font-medium">No shortlisted profiles yet</p>
                <p className="text-xs text-stone-400">Click the heart icon on any card to save profiles for family discussion.</p>
              </div>
            ) : (
              shortlistedProfiles.map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between gap-3 shadow-xs hover:border-amber-300 transition-colors"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                      {p.name}, {p.age}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">{p.community}</p>
                    <p className="text-[11px] text-amber-800 font-medium truncate">{p.profession}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onSelectProfile(p)}
                      className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Biodata
                    </button>

                    <button
                      onClick={() => onRemoveShortlist(p.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove from shortlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )
          ) : (
            sentProfiles.length === 0 ? (
              <div className="py-16 text-center text-stone-500 space-y-2">
                <Send className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="text-sm font-medium">No interests sent yet</p>
                <p className="text-xs text-stone-400">Click &apos;Send Interest&apos; on any profile to begin respectful communication.</p>
              </div>
            ) : (
              sentProfiles.map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-white rounded-2xl border border-stone-200 space-y-2 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                        {p.name}, {p.age}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">{p.community} · {p.location}</p>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold">
                      <Clock className="w-3 h-3 text-amber-700" />
                      <span>Pending Response</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onSelectProfile(p)}
                      className="text-xs text-crimson-900 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Biodata</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200 text-center">
          <p className="text-xs text-stone-500">
            All interests are protected by Bandhan&apos;s mutual privacy protocol.
          </p>
        </div>
      </div>
    </div>
  );
};
