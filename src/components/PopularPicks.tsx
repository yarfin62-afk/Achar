import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Product } from '../data/products';
import { COPY, Lang } from '../data/translations';
import { ResilientImage } from './ResilientImage';

interface PopularPicksProps {
  lang: Lang;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const PopularPicks: React.FC<PopularPicksProps> = ({
  lang,
  products,
  onSelectProduct,
  onQuickAdd,
}) => {
  const t = COPY[lang];
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAdd(product);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 900);
  };

  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C241D]">
              {t.popular.title}
            </h2>
            <p className="text-sm text-[#1C241D]/70 mt-1">{t.popular.subtitle}</p>
          </div>
          <span className="text-xs font-medium text-[#2E6B34] sm:hidden whitespace-nowrap">
            {t.popular.scrollHint} →
          </span>
        </div>

        {/* Horizontal scroll strip on mobile/tablet, crisp multi-card row on desktop */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {products.map((product) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(product);
                  }
                }}
                role="button"
                tabIndex={0}
                className="group snap-start shrink-0 w-[230px] sm:w-[252px] rounded-2xl bg-white p-3 shadow-[0_4px_18px_rgba(28,36,29,0.06)] hover:shadow-[0_10px_28px_rgba(28,36,29,0.1)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col focus-visible:outline-2 focus-visible:outline-[#2E6B34]"
              >
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#FBF3E4]">
                  <ResilientImage
                    src={product.image}
                    alt={lang === 'bn' ? product.nameBn : product.nameEn}
                    fallbackTitle={lang === 'bn' ? product.nameBn : product.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="pt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#1C241D]/60">
                      <span>{lang === 'bn' ? product.baseWeightBn : product.baseWeightEn}</span>
                      {product.tagBn && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#C62828] font-semibold">
                            {lang === 'bn' ? product.tagBn : product.tagEn}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-[#1C241D] leading-snug line-clamp-1">
                      {lang === 'bn' ? product.nameBn : product.nameEn}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-ui font-bold text-[#2E6B34] tabular-nums">
                        ৳{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-ui text-[#1C241D]/45 line-through tabular-nums">
                          ৳{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, product)}
                      aria-label={
                        lang === 'bn'
                          ? `${product.nameBn} কার্টে যোগ করুন`
                          : `Add ${product.nameEn} to cart`
                      }
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-95 ${
                        isAdded
                          ? 'bg-[#E8A317] text-[#1C241D]'
                          : 'bg-[#2E6B34] hover:bg-[#235328] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <Check className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <Plus className="w-5 h-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
