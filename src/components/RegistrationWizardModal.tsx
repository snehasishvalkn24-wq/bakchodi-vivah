import React, { useState } from 'react';
import { MatrimonyProfile, Gender, DietType } from '../types/matrimony';
import { X, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Sparkles, User, GraduationCap, Home, Camera } from 'lucide-react';

interface RegistrationWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (newProfile: MatrimonyProfile) => void;
}

export const RegistrationWizardModal: React.FC<RegistrationWizardModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [profileFor, setProfileFor] = useState<'SELF' | 'SON' | 'DAUGHTER' | 'SIBLING'>('SELF');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<Gender>('BRIDE');
  const [dob, setDob] = useState('1998-05-15');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('');

  // Step 2: Professional
  const [degree, setDegree] = useState('B.Tech & MBA');
  const [college, setCollege] = useState('IIT Delhi');
  const [profession, setProfession] = useState('Senior Product Manager');
  const [income, setIncome] = useState('₹40-55 Lakhs');
  const [city, setCity] = useState('Bengaluru');

  // Step 3: Cultural & Family
  const [religion, setReligion] = useState('Hindu');
  const [community, setCommunity] = useState('Punjabi • Khatri');
  const [gotra, setGotra] = useState('Kashyapa');
  const [familyType, setFamilyType] = useState<'Nuclear' | 'Joint'>('Nuclear');
  const [diet, setDiet] = useState<DietType>('Vegetarian');
  const [manglik, setManglik] = useState<'Non-Manglik' | 'Manglik' | 'Anshik Manglik'>('Non-Manglik');

  // Step 4: Verification & Photo
  const [aadhaarMasked, setAadhaarMasked] = useState('XXXX-XXXX-4891');
  const [photoPrivacy, setPhotoPrivacy] = useState<'PUBLIC' | 'BLURRED' | 'ON_REQUEST'>('PUBLIC');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80');

  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Finalize registration
      const newProfile: MatrimonyProfile = {
        id: `mat-${Date.now().toString().slice(-4)}`,
        name: fullName || 'New Registered Member',
        gender,
        age: 27,
        height: "5'7\"",
        heightCm: 170,
        religion,
        community,
        location: city,
        workLocationCountry: 'India',
        profession,
        education: degree,
        college,
        income,
        incomeNumericLakhs: 45,
        diet,
        manglik,
        gunaScore: 33,
        image: photoUrl,
        additionalPhotos: [],
        verified: true,
        verificationLevel: 2,
        voiceBio: "Looking forward to connecting with someone who shares progressive values, intellectual curiosity, and warmth for family traditions.",
        voiceBioDurationSeconds: 22,
        familySummary: `Well-respected ${familyType} family rooted in ${city}. Father and Mother values integrity and close bonds.`,
        personalBio: "Excited to meet an empathetic, curious companion who values lifelong friendship and shared growth.",
        family: {
          familyType,
          fatherOccupation: 'Executive Consultant',
          motherOccupation: 'Educator & Homemaker',
          siblings: '1 Sibling',
          nativePlace: city,
          gotra,
          familyValues: 'Moderate',
          affluenceLevel: 'Upper Middle Class'
        },
        astro: {
          dob,
          timeOfBirth: '07:30 AM',
          placeOfBirth: city,
          manglik,
          rashi: 'Simha (Leo)',
          nakshatra: 'Magha',
          gunaScoreDefault: 33
        },
        lifestyle: {
          diet,
          drinking: 'Socially',
          smoking: 'Never',
          passions: ['Reading', 'Travel', 'Culinary Arts'],
          weekendVibe: 'Exploring local food trails, quiet reading hours, and time with loved ones.',
          favoriteBooksOrMusic: 'Indian classical and acoustic soul.',
          languagesSpoken: ['English', 'Hindi']
        },
        preferences: {
          ageRange: [25, 32],
          heightRange: "5'4\" and above",
          education: ['Master\'s Degree / Professional'],
          locations: [city, 'Mumbai', 'Delhi-NCR'],
          dietaryFlexibility: 'Flexible',
          communityPreference: 'Caste No Bar'
        },
        photoPrivacy,
        onlineStatus: 'Active Today'
      };

      setIsCompleted(true);
      setTimeout(() => {
        onRegisterSuccess(newProfile);
        onClose();
        setIsCompleted(false);
        setStep(1);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-ivory rounded-3xl border border-amber-200/90 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-crimson-950 to-crimson-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
              Step {step} of 4: Progressive Registration
            </span>
            <h3 className="font-serif text-xl font-bold mt-0.5">
              Create Your Confidential Biodata
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close wizard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-stone-200 w-full">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-stone-800">
          
          {isCompleted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Auspicious Registration Completed!
              </h3>
              <p className="text-sm text-stone-600 max-w-sm mx-auto">
                Your profile has been created with DigiLocker Level 2 verification. Welcome to the Bandhan community.
              </p>
            </div>
          ) : (
            <>
              {/* STEP 1: BASIC IDENTITY */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-crimson-900 uppercase tracking-wider pb-1 border-b">
                    <User className="w-4 h-4" />
                    <span>Basic Identity & Representation</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Creating Profile For</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'SELF', label: 'Self' },
                        { id: 'SON', label: 'Son' },
                        { id: 'DAUGHTER', label: 'Daughter' },
                        { id: 'SIBLING', label: 'Sibling' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setProfileFor(item.id as any)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                            profileFor === item.id
                              ? 'bg-crimson-900 text-white border-crimson-900'
                              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Rhea Sen / Kabir Malhotra"
                      className="w-full h-10 px-3.5 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as Gender)}
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      >
                        <option value="BRIDE">Female (Bride)</option>
                        <option value="GROOM">Male (Groom)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Mobile Number (For OTP Verification)</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 px-3.5 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: EDUCATION & PROFESSION */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-crimson-900 uppercase tracking-wider pb-1 border-b">
                    <GraduationCap className="w-4 h-4" />
                    <span>Education & Career Credentials</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Highest Degree</label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. B.Tech / MD / MBA / CA"
                      className="w-full h-10 px-3.5 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Alma Mater / University</label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. IIT Delhi, AIIMS, IIM Ahmedabad, Stanford"
                      className="w-full h-10 px-3.5 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Occupation / Title</label>
                      <input
                        type="text"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        placeholder="e.g. AI Lead, VP, Doctor"
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Annual Package</label>
                      <select
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      >
                        <option value="₹25-35 Lakhs">₹25-35 Lakhs</option>
                        <option value="₹35-50 Lakhs">₹35-50 Lakhs</option>
                        <option value="₹50-75 Lakhs">₹50-75 Lakhs</option>
                        <option value="₹75 Lakhs - ₹1 Cr">₹75 Lakhs - ₹1 Cr</option>
                        <option value="₹1 Cr+">₹1 Crore+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Current Work Location</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bengaluru / Mumbai / London"
                      className="w-full h-10 px-3.5 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: CULTURAL & FAMILY DETAILS */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-crimson-900 uppercase tracking-wider pb-1 border-b">
                    <Home className="w-4 h-4" />
                    <span>Cultural Roots & Family Background</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Religion</label>
                      <select
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      >
                        <option value="Hindu">Hindu</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Jain">Jain</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Christian">Christian</option>
                        <option value="Parsi">Parsi</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Community / Tongue</label>
                      <input
                        type="text"
                        value={community}
                        onChange={(e) => setCommunity(e.target.value)}
                        placeholder="e.g. Punjabi Khatri, Bengali Brahmin"
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Gotra</label>
                      <input
                        type="text"
                        value={gotra}
                        onChange={(e) => setGotra(e.target.value)}
                        placeholder="e.g. Kashyapa / Sandilya"
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Family Structure</label>
                      <select
                        value={familyType}
                        onChange={(e) => setFamilyType(e.target.value as any)}
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      >
                        <option value="Nuclear">Nuclear Family</option>
                        <option value="Joint">Joint Family</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Dietary Habits</label>
                      <select
                        value={diet}
                        onChange={(e) => setDiet(e.target.value as DietType)}
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      >
                        <option value="Vegetarian">Strictly Vegetarian</option>
                        <option value="Eggetarian">Eggetarian</option>
                        <option value="Jain">Jain Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Manglik Status</label>
                      <select
                        value={manglik}
                        onChange={(e) => setManglik(e.target.value as any)}
                        className="w-full h-10 px-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-crimson-800"
                      >
                        <option value="Non-Manglik">Non-Manglik</option>
                        <option value="Anshik Manglik">Anshik Manglik</option>
                        <option value="Manglik">Manglik</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: VERIFICATION & PHOTO PRIVACY */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-crimson-900 uppercase tracking-wider pb-1 border-b">
                    <Camera className="w-4 h-4" />
                    <span>Government ID Verification & Privacy Shield</span>
                  </div>

                  <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200 text-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-teal-900">
                      <ShieldCheck className="w-4 h-4 text-teal-700" />
                      <span>DigiLocker / Aadhaar Instant Match</span>
                    </div>
                    <p className="text-teal-800">
                      Encrypted Aadhaar validation protects our network from impersonators. Only last 4 digits are stored.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Masked UID / Aadhaar Reference</label>
                    <input
                      type="text"
                      value={aadhaarMasked}
                      onChange={(e) => setAadhaarMasked(e.target.value)}
                      className="w-full h-10 px-3.5 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-crimson-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Photo Privacy Setting</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'PUBLIC', label: 'Visible to All' },
                        { id: 'BLURRED', label: 'Blurred (Shield)' },
                        { id: 'ON_REQUEST', label: 'On-Request Only' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPhotoPrivacy(item.id as any)}
                          className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                            photoPrivacy === item.id
                              ? 'bg-crimson-900 text-white border-crimson-900'
                              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer Navigation */}
        {!isCompleted && (
          <div className="p-4 sm:p-5 bg-white border-t border-amber-200/70 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                step === 1
                  ? 'text-stone-300 cursor-not-allowed'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-r from-crimson-900 to-crimson-800 hover:from-crimson-950 hover:to-crimson-900 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
            >
              <span>{step === 4 ? 'Complete Registration' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
