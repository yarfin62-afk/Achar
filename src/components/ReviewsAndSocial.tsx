import React, { useState } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Facebook,
  MessageCircle,
  Play,
  ExternalLink,
} from 'lucide-react';
import { BRAND_CONTACT, CUSTOMER_REVIEWS } from '../data/products';
import { COPY, Lang } from '../data/translations';
import { ResilientImage } from './ResilientImage';
import { BrandLogo } from './BrandLogo';

interface ReviewsAndSocialProps {
  lang: Lang;
}

export const ReviewsAndSocial: React.FC<ReviewsAndSocialProps> = ({ lang }) => {
  const t = COPY[lang];
  const [reviewStart, setReviewStart] = useState(0);

  const handlePrevReview = () => {
    setReviewStart(
      (prev) => (prev - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length
    );
  };

  const handleNextReview = () => {
    setReviewStart((prev) => (prev + 1) % CUSTOMER_REVIEWS.length);
  };

  // Display 3 visible reviews on desktop, rotating smoothly; 1-2 on mobile
  const orderedReviews = [
    CUSTOMER_REVIEWS[reviewStart % CUSTOMER_REVIEWS.length],
    CUSTOMER_REVIEWS[(reviewStart + 1) % CUSTOMER_REVIEWS.length],
    CUSTOMER_REVIEWS[(reviewStart + 2) % CUSTOMER_REVIEWS.length],
  ];

  return (
    <>
      {/* Customer Reviews Carousel */}
      <section id="reviews" className="py-12 sm:py-16 bg-[#EDF5EE]/65">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2E6B34]">
                {t.reviews.kicker}
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#1C241D]">
                {t.reviews.title}
              </h2>
              <p className="mt-1 text-sm text-[#1C241D]/70">{t.reviews.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handlePrevReview}
                aria-label="Previous review"
                className="w-11 h-11 rounded-full bg-white hover:bg-[#2E6B34] hover:text-white text-[#1C241D] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextReview}
                aria-label="Next review"
                className="w-11 h-11 rounded-full bg-white hover:bg-[#2E6B34] hover:text-white text-[#1C241D] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {orderedReviews.map((rev, idx) => (
              <article
                key={rev.id}
                className={`rounded-2xl bg-white p-6 shadow-[0_4px_18px_rgba(28,36,29,0.06)] flex flex-col justify-between ${
                  idx > 0 ? 'hidden md:flex' : 'flex'
                }`}
              >
                <div>
                  <div
                    className="flex items-center gap-1 text-[#E8A317]"
                    aria-label={`${rev.rating} out of 5 stars`}
                  >
                    {Array.from({ length: rev.rating }).map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="mt-3.5 text-sm sm:text-[15px] text-[#1C241D]/85 leading-relaxed">
                    “{lang === 'bn' ? rev.commentBn : rev.commentEn}”
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1C241D]/8">
                  <p className="text-sm font-bold text-[#1C241D]">
                    {lang === 'bn' ? rev.nameBn : rev.nameEn}
                  </p>
                  <p className="text-xs text-[#1C241D]/60 mt-0.5">
                    {lang === 'bn' ? rev.locationBn : rev.locationEn} ·{' '}
                    <span className="text-[#2E6B34] font-medium">
                      {lang === 'bn' ? rev.productBn : rev.productEn}
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Video / Social Hub — Jk Kakoli Vlog & Facebook Page Card */}
      <section id="vlog" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Social & Jk Kakoli Vlog Links */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C62828]">
                {t.social.kicker}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#1C241D] leading-snug">
                {t.social.title}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[#1C241D]/75 leading-relaxed">
                {t.social.subtitle}
              </p>

              {/* Featured YouTube Vlog Preview Card */}
              <a
                href={BRAND_CONTACT.youtubeVlogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 group block rounded-2xl overflow-hidden bg-[#1C241D] text-white shadow-lg relative"
              >
                <div className="aspect-[16/9] w-full overflow-hidden opacity-85 group-hover:opacity-95 transition-opacity">
                  <ResilientImage
                    src="/src/assets/images/kakoli_kitchen_story_1794915903737.jpg"
                    alt="Jk Kakoli Vlog YouTube Video Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#C62828] px-3 py-1 rounded-full">
                      <Youtube className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Jk Kakoli Vlog</span>
                    </span>
                    <ExternalLink className="w-4 h-4 text-white/80" aria-hidden="true" />
                  </div>

                  <div className="flex items-center gap-3.5">
                    <span className="w-12 h-12 rounded-full bg-white text-[#C62828] flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {t.social.watchYoutube}
                      </p>
                      <p className="text-xs text-white/80">
                        {lang === 'bn'
                          ? 'পাহাড়ি আচার তৈরি ও পাহাড়ের জীবনযাত্রার ভ্লগ দেখুন'
                          : 'Watch authentic hill-kitchen pickle making & lifestyle vlogs'}
                      </p>
                    </div>
                  </div>
                </div>
              </a>

              {/* Direct Social Buttons */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <a
                  href={BRAND_CONTACT.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#1465d1] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Facebook className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">Facebook</span>
                </a>

                <a
                  href={`https://wa.me/${BRAND_CONTACT.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-[#0E2414] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">WhatsApp</span>
                </a>

                <a
                  href={BRAND_CONTACT.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#1C241D] hover:bg-[#2d382f] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">TikTok</span>
                </a>
              </div>
            </div>

            {/* Right: Facebook Page Embed Placeholder Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(28,36,29,0.08)]">
                {/* Page Header */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#1C241D]/10">
                  <div className="flex items-center gap-3 min-w-0">
                    <BrandLogo variant="compact" className="scale-90 origin-left" />
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-[#1C241D] truncate">
                        {t.social.fbPageName}
                      </h3>
                      <p className="text-xs text-[#1C241D]/60 truncate">
                        {t.social.fbPageHandle}
                      </p>
                    </div>
                  </div>

                  <a
                    href={BRAND_CONTACT.facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[40px] px-4 py-2 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.social.visitFb}</span>
                  </a>
                </div>

                {/* Simulated Recent Facebook Post */}
                <div className="mt-4">
                  <p className="text-xs text-[#1C241D]/55 mb-2">{t.social.fbPostTime}</p>
                  <p className="text-sm text-[#1C241D]/85 leading-relaxed">
                    {t.social.fbPostText}
                  </p>
                  <div className="mt-3 aspect-[16/10] rounded-2xl overflow-hidden bg-[#FBF3E4]">
                    <ResilientImage
                      src="/src/assets/images/pickle_combo_trio_1794915901830.jpg"
                      alt="Pahari Shad by Kakoli Facebook Page showcase"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
