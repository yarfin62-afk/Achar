import React from 'react';
import { Leaf, HandHeart, ShieldCheck, Truck } from 'lucide-react';
import { COPY, Lang } from '../data/translations';
import { ResilientImage } from './ResilientImage';

interface StoryAndTrustProps {
  lang: Lang;
}

const TRUST_ICONS = [Leaf, HandHeart, ShieldCheck, Truck];

export const StoryAndTrust: React.FC<StoryAndTrustProps> = ({ lang }) => {
  const t = COPY[lang];

  return (
    <>
      {/* "আমাদের গল্প" — Our Story with Photo Collage */}
      <section id="story" className="py-12 sm:py-16 bg-[#FBF3E4]/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Photo Collage */}
            <div className="lg:col-span-6 grid grid-cols-12 gap-3 sm:gap-4 items-stretch">
              <div className="col-span-7 aspect-[4/5] rounded-3xl overflow-hidden shadow-md bg-[#E9DEC8]">
                <ResilientImage
                  src="/src/assets/images/kakoli_kitchen_story_1794915903737.jpg"
                  alt={
                    lang === 'bn'
                      ? 'কাকলির পাহাড়ি বারান্দায় রোদে শুকানো ঘরোয়া আচারের জার'
                      : 'Homemade pickle jars curing in morning sun overlooking green hills'
                  }
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                <div className="flex-1 rounded-2xl overflow-hidden shadow-md bg-[#E9DEC8]">
                  <ResilientImage
                    src="/assets/aistudio/aa0c284b-ea78-46df-bd4d-abd553d84ace_27882c55.jpeg"
                    alt={
                      lang === 'bn'
                        ? 'সবুজ পাহাড়ি প্রকৃতি ও আকাশ'
                        : 'Lush green hills and mountain sky'
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden shadow-md bg-[#E9DEC8]">
                  <ResilientImage
                    src="/src/assets/images/spices_turmeric_chili_1794915901664.jpg"
                    alt={
                      lang === 'bn'
                        ? 'খাঁটি পাহাড়ি হলুদ ও মরিচ গুঁড়া'
                        : 'Pure hill turmeric and red chili spice bowls'
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Editorial Story Copy */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2E6B34]">
                {t.story.kicker}
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-[#1C241D] leading-snug">
                {t.story.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#1C241D]/80 leading-relaxed">
                {t.story.p1}
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#1C241D]/80 leading-relaxed">
                {t.story.p2}
              </p>

              {/* Quantitative Metrics Strip (no nested boxes, clean hairline dividers) */}
              <div className="mt-7 pt-6 border-t border-[#1C241D]/10 grid grid-cols-3 gap-4">
                {t.story.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-lg sm:text-2xl font-bold text-[#2E6B34] tabular-nums">
                      {m.value}
                    </p>
                    <p className="text-xs sm:text-sm text-[#1C241D]/70 mt-0.5">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us — 4 Trust Pillars */}
      <section className="py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-9">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C241D]">
              {t.whyUs.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#1C241D]/70">
              {t.whyUs.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.whyUs.items.map((item, idx) => {
              const Icon = TRUST_ICONS[idx] || Leaf;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-6 shadow-[0_4px_18px_rgba(28,36,29,0.05)]"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EDF5EE] text-[#2E6B34] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-[#1C241D]">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-[#1C241D]/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
