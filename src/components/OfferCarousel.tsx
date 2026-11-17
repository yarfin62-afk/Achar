import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { OFFER_BANNERS, OfferBanner, CategoryId } from '../data/products';
import { Lang } from '../data/translations';
import { ResilientImage } from './ResilientImage';

interface OfferCarouselProps {
  lang: Lang;
  onAction: (banner: OfferBanner) => void;
  onSelectCategory?: (category: CategoryId) => void;
}

export const OfferCarousel: React.FC<OfferCarouselProps> = ({ lang, onAction }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % OFFER_BANNERS.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const current = OFFER_BANNERS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + OFFER_BANNERS.length) % OFFER_BANNERS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % OFFER_BANNERS.length);
  };

  return (
    <section id="offers" aria-label="Featured Offers" className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${current.accentBg} text-[#FFF8EC] shadow-lg`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* Copy column */}
            <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E8A317]">
                {lang === 'bn' ? current.kickerBn : current.kickerEn}
              </span>
              <h2 className="mt-1.5 text-xl sm:text-3xl font-bold leading-snug text-white">
                {lang === 'bn' ? current.titleBn : current.titleEn}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#FFF8EC]/85 max-w-xl leading-relaxed">
                {lang === 'bn' ? current.subtitleBn : current.subtitleEn}
              </p>

              <div className="mt-5 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onAction(current)}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#E8A317] hover:bg-[#d89412] text-[#1C241D] font-bold text-sm shadow-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{lang === 'bn' ? current.ctaBn : current.ctaEn}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                {/* Carousel Controls */}
                <div className="flex items-center gap-1.5 ml-auto md:ml-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous offer"
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next offer"
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Visual column */}
            <div className="md:col-span-5 relative min-h-[170px] md:min-h-[240px]">
              <ResilientImage
                src={current.image}
                alt={lang === 'bn' ? current.titleBn : current.titleEn}
                fallbackTitle={lang === 'bn' ? current.titleBn : current.titleEn}
                className="w-full h-full object-cover md:absolute md:inset-0"
              />
              <div
                className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/25 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-3 left-6 flex items-center gap-1.5">
            {OFFER_BANNERS.map((banner, idx) => (
              <button
                key={banner.id}
                type="button"
                aria-label={`Offer slide ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex ? 'w-6 bg-[#E8A317]' : 'w-2 bg-white/45 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
