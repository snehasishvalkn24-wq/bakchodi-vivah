import React, { useState } from 'react';
import { SUCCESS_STORIES } from '../data/mockProfiles';
import { Sparkles, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';

export const LoveStoriesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  };

  const story = SUCCESS_STORIES[activeIndex];

  return (
    <section id="success-stories" className="py-14 sm:py-20 bg-ivory border-b border-amber-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-crimson-900 border border-rose-300 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 text-crimson-800 fill-crimson-800" />
            <span>Real Unions, Blessed Beginnings</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Stories Where Tradition Embraces Modern Love
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Read how couples navigated modern career ambitions and family traditions to discover their lifelong companions on Bandhan.
          </p>
        </div>

        {/* Story Spotlight Card */}
        <div className="bg-white rounded-3xl border border-amber-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Story Image */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] bg-stone-100">
              <img
                src={story.image}
                alt={story.couple}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                  Wedding Celebrated {story.marriedYear}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold mt-0.5">
                  {story.couple}
                </h4>
                <p className="text-xs text-stone-200 mt-0.5">
                  {story.location}
                </p>
              </div>
            </div>

            {/* Story Narrative & Quote */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Kundli Match: {story.gunaMilan}</span>
                  </div>

                  <span className="text-xs text-stone-500 font-medium">
                    {story.community}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  &ldquo;{story.tagline}&rdquo;
                </h3>

                <div className="relative pl-6 border-l-2 border-amber-300">
                  <Quote className="w-6 h-6 text-amber-400 absolute -top-1 left-0 -translate-x-1/2 fill-amber-100" />
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed italic">
                    {story.quote}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  {SUCCESS_STORIES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Go to story ${i + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === activeIndex ? 'w-8 bg-crimson-900' : 'w-2 bg-stone-200 hover:bg-stone-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous story"
                    className="p-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next story"
                    className="p-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
