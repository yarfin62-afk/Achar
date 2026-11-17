import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { ResilientImage } from './ResilientImage';
import { COPY, Lang } from '../data/translations';
import { Product } from '../data/products';

interface HeroSectionProps {
  lang: Lang;
  shelfProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onOrderNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  shelfProducts,
  onSelectProduct,
  onOrderNow,
}) => {
  const t = COPY[lang];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#4993DF] via-[#7AC0E8] to-[#FFF8EC]"
    >
      {/* Attached User Mountain-and-Blue-Sky Landscape Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/assets/aistudio/aa0c284b-ea78-46df-bd4d-abd553d84ace_27882c55.jpeg"
          alt={
            lang === 'bn'
              ? 'সবুজ পাহাড়, নীল আকাশ ও পাহাড়ি ফুলের প্রাকৃতিক দৃশ্য'
              : 'Misty green hills and blue sky mountain landscape'
          }
          className="w-full h-full object-cover object-center opacity-95"
        />
        {/* Soft misty valley + winding river artistic overlay blending landscape to warm cream */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#133526]/55 via-[#1C4730]/40 to-[#FFF8EC]" />
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-20 left-0 w-full h-44 sm:h-64 opacity-70"
          aria-hidden="true"
        >
          {/* Misty green mountain silhouette */}
          <path
            d="M0,190 C220,120 420,240 720,160 C1020,80 1240,180 1440,130 L1440,320 L0,320 Z"
            fill="#2E6B34"
            opacity="0.35"
          />
          {/* Winding misty mountain river ribbon */}
          <path
            d="M640,168 C730,195 540,240 780,275 C900,292 1040,305 1120,320 L840,320 C720,295 450,250 560,195 Z"
            fill="#BCE4FA"
            opacity="0.55"
          />
        </svg>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6 sm:pt-12 sm:pb-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrandLogo variant="badge" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-4 text-xs sm:text-sm font-medium tracking-wide text-[#FFF8EC]/95 drop-shadow-sm"
          >
            {t.hero.originNote}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-2 text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.18] text-[#FFFFFF] drop-shadow-[0_2px_12px_rgba(14,32,20,0.45)]"
          >
            {t.hero.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3.5 text-sm sm:text-lg text-[#FFF8EC]/95 max-w-xl font-medium leading-relaxed drop-shadow-[0_1px_8px_rgba(14,32,20,0.4)]"
          >
            {t.hero.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={onOrderNow}
              className="inline-flex items-center gap-2.5 min-h-[48px] px-7 py-3 rounded-full bg-[#2E6B34] hover:bg-[#235328] active:scale-[0.98] text-[#FFF8EC] font-semibold text-base shadow-[0_10px_28px_rgba(24,62,28,0.4)] border border-[#FFF8EC]/25 transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317]"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <a
              href="#story"
              className="inline-flex items-center gap-1.5 min-h-[48px] px-5 py-3 rounded-full bg-[#FFF8EC]/90 hover:bg-[#FFFFFF] text-[#1C241D] font-semibold text-sm sm:text-base shadow-md transition-colors whitespace-nowrap"
            >
              <span>{t.hero.secondaryCta}</span>
              <ChevronDown className="w-4 h-4 opacity-70" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* Stone Shelf with Floating Featured Product Jars */}
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#1C241D]/70 mb-3">
            {t.hero.shelfLabel}
          </p>

          <div className="relative">
            {/* Jar Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 px-2 sm:px-6 relative z-10">
              {shelfProducts.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 + idx * 0.07 }}
                  className="group flex flex-col items-center text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E6B34] rounded-2xl"
                >
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FBF3E4] shadow-[0_14px_26px_-8px_rgba(28,36,29,0.32)] group-hover:-translate-y-1.5 transition-transform duration-200 border border-[#FFFFFF]/70">
                    <ResilientImage
                      src={item.image}
                      alt={lang === 'bn' ? item.nameBn : item.nameEn}
                      fallbackTitle={lang === 'bn' ? item.nameBn : item.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Grounding contact shadow on stone shelf */}
                  <div
                    className="w-3/4 h-2 bg-[#1C241D]/20 blur-[4px] rounded-full -mt-1 mb-2"
                    aria-hidden="true"
                  />

                  <span className="text-xs sm:text-sm font-semibold text-[#1C241D] group-hover:text-[#2E6B34] transition-colors line-clamp-1">
                    {lang === 'bn' ? item.nameBn : item.nameEn}
                  </span>
                  <span className="text-xs font-ui font-bold text-[#2E6B34] tabular-nums mt-0.5">
                    ৳{item.price}{' '}
                    <span className="font-normal text-[#1C241D]/65">
                      / {lang === 'bn' ? item.baseWeightBn : item.baseWeightEn}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Tactile Natural Travertine Stone Shelf Ledge */}
            <div
              className="mt-2 h-6 sm:h-7 rounded-2xl bg-gradient-to-b from-[#E9DEC8] via-[#DFD0B4] to-[#CBB896] shadow-[0_12px_24px_-8px_rgba(44,34,18,0.22)] border-t border-[#FFFDF8]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
