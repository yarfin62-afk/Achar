import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Flame,
  Sprout,
  Citrus,
  Fish,
  Package,
  Plus,
  Check,
  X,
} from 'lucide-react';
import { CategoryId, Product, PRODUCTS } from '../data/products';
import { COPY, Lang } from '../data/translations';
import { ResilientImage } from './ResilientImage';

interface ProductCatalogProps {
  lang: Lang;
  activeCategory: CategoryId;
  onCategoryChange: (cat: CategoryId) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

const CATEGORY_CONFIG: Array<{
  id: CategoryId;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'all', icon: Sparkles },
  { id: 'pickles', icon: Flame },
  { id: 'spices', icon: Sprout },
  { id: 'fruits', icon: Citrus },
  { id: 'dry_others', icon: Fish },
  { id: 'combo', icon: Package },
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  lang,
  activeCategory,
  onCategoryChange,
  onSelectProduct,
  onQuickAdd,
}) => {
  const t = COPY[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Brief realistic skeleton shimmer feedback when switching category filters
  useEffect(() => {
    setIsFiltering(true);
    const timer = window.setTimeout(() => setIsFiltering(false), 160);
    return () => window.clearTimeout(timer);
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        p.nameBn.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.shortDescBn.toLowerCase().includes(q) ||
        p.shortDescEn.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAdd(product);
    setAddedId(product.id);
    window.setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 900);
  };

  return (
    <section id="catalog" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading + Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C241D]">
              {t.catalog.title}
            </h2>
            <p className="text-sm sm:text-base text-[#1C241D]/70 mt-1">
              {t.catalog.subtitle}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="w-4 h-4 text-[#1C241D]/45 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.catalog.searchPlaceholder}
              aria-label={t.catalog.searchPlaceholder}
              className="w-full min-h-[44px] pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#2E6B34]/15 text-sm text-[#1C241D] placeholder:text-[#1C241D]/45 focus:outline-none focus:ring-2 focus:ring-[#2E6B34]/35 shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="w-7 h-7 rounded-full hover:bg-[#1C241D]/10 flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 text-[#1C241D]/60 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Interactive Category Filter Chips */}
        <div
          role="tablist"
          aria-label="Product Categories"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CATEGORY_CONFIG.map(({ id, icon: Icon }) => {
            const active = activeCategory === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => onCategoryChange(id)}
                className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#2E6B34] text-[#FFF8EC] shadow-sm'
                    : 'bg-white text-[#1C241D]/80 hover:bg-[#EDF5EE] hover:text-[#2E6B34] border border-[#2E6B34]/12'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.categories[id]}</span>
              </button>
            );
          })}
        </div>

        {/* Skeleton Loaders during category transition */}
        {isFiltering ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4].map((skeleton) => (
              <div
                key={skeleton}
                className="rounded-2xl bg-white p-3 sm:p-4 animate-pulse shadow-sm"
              >
                <div className="aspect-[4/3] w-full rounded-xl bg-[#EFE6D4]" />
                <div className="h-3 w-1/2 bg-[#EFE6D4] rounded mt-3" />
                <div className="h-4 w-4/5 bg-[#E6DAC4] rounded mt-2" />
                <div className="flex justify-between items-center mt-4">
                  <div className="h-4 w-16 bg-[#EFE6D4] rounded" />
                  <div className="w-10 h-10 rounded-full bg-[#EFE6D4]" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty Search / Filter State */
          <div className="rounded-3xl bg-white/80 py-14 px-6 text-center max-w-md mx-auto shadow-sm">
            <p className="text-lg font-bold text-[#1C241D]">{t.catalog.emptyTitle}</p>
            <p className="text-sm text-[#1C241D]/70 mt-1">{t.catalog.emptyBody}</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('all');
              }}
              className="mt-5 min-h-[44px] px-6 py-2.5 rounded-full bg-[#2E6B34] hover:bg-[#235328] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              {t.catalog.resetFilter}
            </button>
          </div>
        ) : (
          /* Responsive 2-col (360px+) to 3/4-col (desktop) Product Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedId === product.id;
              return (
                <article
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
                  className="group rounded-2xl bg-white p-3 sm:p-4 shadow-[0_4px_18px_rgba(28,36,29,0.06)] hover:shadow-[0_12px_28px_rgba(28,36,29,0.1)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2E6B34]"
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
                      {/* Clean unboxed metadata with typographic dot separator */}
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#1C241D]/60 truncate">
                        <span>{t.categories[product.category]}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {lang === 'bn' ? product.baseWeightBn : product.baseWeightEn}
                        </span>
                      </div>

                      <h3 className="mt-1 text-[15px] sm:text-base font-semibold text-[#1C241D] leading-snug line-clamp-2">
                        {lang === 'bn' ? product.nameBn : product.nameEn}
                      </h3>

                      <p className="hidden sm:block mt-1.5 text-xs text-[#1C241D]/65 line-clamp-2 leading-relaxed">
                        {lang === 'bn' ? product.shortDescBn : product.shortDescEn}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#1C241D]/6 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-base sm:text-lg font-ui font-bold text-[#2E6B34] tabular-nums">
                          ৳{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="ml-1.5 text-xs font-ui text-[#1C241D]/45 line-through tabular-nums">
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
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
