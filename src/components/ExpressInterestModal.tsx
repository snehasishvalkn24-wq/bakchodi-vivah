import React, { useState } from 'react';
import { MatrimonyProfile } from '../types/matrimony';
import { ViewMode } from './DualModeToggle';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface ExpressInterestModalProps {
  profile: MatrimonyProfile | null;
  isOpen: boolean;
  onClose: () => void;
  viewMode: ViewMode;
  onConfirmSend: (profileId: string, note: string) => void;
}

export const ExpressInterestModal: React.FC<ExpressInterestModalProps> = ({
  profile,
  isOpen,
  onClose,
  viewMode,
  onConfirmSend,
}) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [customNote, setCustomNote] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !profile) return null;

  const candidateTemplates = [
    `Hi ${profile.name.split(' ')[0]}, your profile and personal passions really resonated with me. I would love to connect and exchange thoughts over a conversation.`,
    `Warm greetings! I appreciate your perspective on balancing career aspirations with meaningful family traditions. Looking forward to connecting.`,
    `Hello! Your bio reflects wonderful values and warmth. Wishing to take this conversation forward respectfully.`
  ];

  const parentTemplates = [
    `Namaste, our family carefully reviewed ${profile.name}'s biodata and was deeply impressed by your family background and educational pedigree. We would be honored to connect and discuss potential compatibility.`,
    `Pranam, after reviewing the gotra (${profile.family.gotra}) and astrological alignment, we find this match auspicious. Our family welcomes an initial conversation.`,
    `Respected Family, we appreciate the shared cultural values and would like to express our warm interest on behalf of our son/daughter.`
  ];

  const templates = viewMode === 'CANDIDATE' ? candidateTemplates : parentTemplates;

  const handleSend = () => {
    const finalNote = customNote.trim() || templates[selectedTemplateIndex];
    onConfirmSend(profile.id, finalNote);
    setIsSent(true);

    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-ivory rounded-3xl border border-amber-200/90 shadow-2xl overflow-hidden my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-crimson-950 via-crimson-900 to-crimson-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🙏</span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                Express Interest to {profile.name}
              </h3>
              <p className="text-xs text-amber-200/90">
                {viewMode === 'CANDIDATE' ? 'Personal Connection Request' : 'Respectful Family-to-Family Proposal'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isSent ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Interest Sent Auspiciously!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xs mx-auto">
                {profile.name} and family have received your connection note. You will be notified immediately upon acceptance.
              </p>
            </div>
          ) : (
            <>
              {/* Profile Card Snippet */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200">
                <img
                  src={profile.image}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="text-xs">
                  <h4 className="font-bold text-stone-900">{profile.name}, {profile.age}</h4>
                  <p className="text-stone-500">{profile.community} · {profile.profession}</p>
                  <p className="text-emerald-700 font-medium">Kundli Harmony: {profile.gunaScore}/36 Gunas</p>
                </div>
              </div>

              {/* Template Choices */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 block">
                  Select a Respectful Message Template
                </label>
                <div className="space-y-2">
                  {templates.map((tpl, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedTemplateIndex(idx);
                        setCustomNote('');
                      }}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedTemplateIndex === idx && !customNote
                          ? 'bg-amber-50/80 border-amber-300 shadow-xs text-stone-900 font-medium'
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      &ldquo;{tpl}&rdquo;
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Note Option */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 block">
                  Or Write a Custom Message (Optional)
                </label>
                <textarea
                  rows={3}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Type a polite personalized message..."
                  className="w-full p-3 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-crimson-800"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleSend}
                  className="w-full py-3 bg-gradient-to-r from-crimson-900 via-crimson-800 to-crimson-900 hover:from-crimson-950 hover:to-crimson-900 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <span className="text-lg leading-none">🙏</span>
                  <span>Send Namaste & Express Interest</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
