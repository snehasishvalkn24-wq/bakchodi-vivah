import React, { useState } from 'react';
import { ShieldCheck, Lock, Smartphone, FileCheck, CheckCircle2, UserCheck, Eye, EyeOff } from 'lucide-react';

export const TrustVerificationCenter: React.FC = () => {
  const [activeTier, setActiveTier] = useState<number>(2);
  const [photoPrivacyMode, setPhotoPrivacyMode] = useState<'PUBLIC' | 'RESTRICTED' | 'WATERMARK'>('WATERMARK');
  const [maskPhoneNumber, setMaskPhoneNumber] = useState<boolean>(true);

  const tiers = [
    {
      level: 1,
      title: 'Level 1: Telephony & OTP Authentication',
      desc: 'Dual-factor verification linking verified Indian/International mobile number and work email address.',
      trustSignal: '100% Active Profiles Authenticated',
      features: ['SMS OTP Instant verification', 'Official Work/Domain email check', 'Zero duplicate spam accounts']
    },
    {
      level: 2,
      title: 'Level 2: Government ID & DigiLocker Integration',
      desc: 'Real-time API match with UIDAI DigiLocker (Aadhaar masked UID) or Indian Passport for age & legal name authenticity.',
      trustSignal: 'Legally Validated Identity',
      features: ['Aadhaar QR XML cryptographic verification', 'DOB & legal name match guarantee', 'Tamper-proof government record verification']
    },
    {
      level: 3,
      title: 'Level 3: Educational & Professional Pedigree',
      desc: 'Verification of university degrees (IIT, IIM, AIIMS, NID, LSE) and current employer credentials via official work portals.',
      trustSignal: 'Pedigree & Income Authenticated',
      features: ['University alumni register cross-referencing', 'Workplace domain validation', 'Verified annual salary brackets']
    },
    {
      level: 4,
      title: 'Level 4: High-Trust Video & In-Person Verification',
      desc: 'Live 60-second video liveness selfie with dynamic gesture confirmation or in-home executive verification for VIP families.',
      trustSignal: 'Elite VIP Trust Mark',
      features: ['3D biometric facial match with uploaded gallery', 'Family representative video verification', 'Exclusive badge visible to verified members']
    }
  ];

  return (
    <section id="trust-verification" className="py-14 sm:py-20 bg-stone-50 border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>Highest Trust Standard in Indian Matrimony</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Trust, Verification & Privacy Architecture
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Eliminating fake profiles, unverified claims, and unwanted intrusion. Designed specifically to grant total peace of mind to both young professionals and protective parents.
          </p>
        </div>

        {/* 2-Column Grid: 4-Tier Verification on Left, Photo & Contact Privacy on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 4-Tier Verification Interactive Checklist */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                  4-Tier Verification Ladder
                </h3>
                <p className="text-xs text-stone-500">Click each tier to explore our rigorous validation criteria</p>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                100% ID Safe
              </span>
            </div>

            {/* Tier Buttons */}
            <div className="space-y-3">
              {tiers.map((tier) => (
                <div
                  key={tier.level}
                  onClick={() => setActiveTier(tier.level)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeTier === tier.level
                      ? 'bg-amber-50/60 border-amber-300 shadow-xs'
                      : 'bg-stone-50/60 border-stone-200 hover:bg-stone-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                        activeTier === tier.level
                          ? 'bg-crimson-900 text-white'
                          : 'bg-stone-200 text-stone-700'
                      }`}>
                        {tier.level}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900">{tier.title}</h4>
                    </div>

                    <span className="text-xs text-teal-700 font-semibold hidden sm:inline">
                      {tier.trustSignal}
                    </span>
                  </div>

                  {/* Expanded view for active tier */}
                  {activeTier === tier.level && (
                    <div className="mt-3 pt-3 border-t border-amber-200/60 text-xs text-stone-700 space-y-2">
                      <p className="leading-relaxed">{tier.desc}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                        {tier.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-stone-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Photo Privacy & Masking Simulator */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                Privacy Controls Simulator
              </h3>
              <p className="text-xs text-stone-500">Test how your photographs and contacts appear to others</p>
            </div>

            {/* Privacy Modes Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-700 block">Photo Visibility Setting</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'PUBLIC', label: 'Visible to All' },
                  { id: 'RESTRICTED', label: 'Only to Liked' },
                  { id: 'WATERMARK', label: 'Watermarked' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setPhotoPrivacyMode(mode.id as any)}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center ${
                      photoPrivacyMode === mode.id
                        ? 'bg-crimson-900 text-white border-crimson-900 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Preview Box */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-200/90 bg-stone-100 h-52">
              <img
                src="https://images.unsplash.com/photo-1601055903647-87e144a67e81?auto=format&fit=crop&w=600&q=80"
                alt="Privacy Demo"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all ${
                  photoPrivacyMode === 'RESTRICTED' ? 'blur-lg' : 'blur-none'
                }`}
              />

              {/* Watermark overlay when active */}
              {photoPrivacyMode === 'WATERMARK' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <div className="transform -rotate-25 px-4 py-2 bg-stone-950/60 backdrop-blur-xs text-amber-200 text-xs font-bold tracking-widest border border-amber-300/40 uppercase">
                    [CONFIDENTIAL · BANDHAN VERIFIED ONLY]
                  </div>
                </div>
              )}

              {/* Blurred notice */}
              {photoPrivacyMode === 'RESTRICTED' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-stone-900/40">
                  <Lock className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-white text-xs font-bold">Photo Access Restricted</span>
                  <span className="text-stone-200 text-[11px] mt-0.5">Visible only after mutual interest accepted</span>
                </div>
              )}
            </div>

            {/* Phone Number Masking Switch */}
            <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                  <span>Direct Phone Number Masking</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  {maskPhoneNumber ? 'Phone displayed as: +91 98••• ••214' : 'Phone visible to verified members'}
                </p>
              </div>

              <button
                onClick={() => setMaskPhoneNumber(!maskPhoneNumber)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  maskPhoneNumber
                    ? 'bg-teal-700 text-white'
                    : 'bg-stone-200 text-stone-700'
                }`}
              >
                {maskPhoneNumber ? 'Masked (On)' : 'Visible'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
