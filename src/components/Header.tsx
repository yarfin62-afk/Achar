import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { COPY, Lang } from '../data/translations';

interface HeaderProps {
  lang: Lang;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
}) => {
  const t = COPY[lang];

  return (
    <>
      {/* Slim non-sticky top announcement & language utility strip (does not eat into mobile sticky cap) */}
      <div className="bg-[#235328] text-[#FFF8EC] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <p className="truncate font-medium tracking-wide">{t.promoStrip}</p>
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={lang === 'bn' ? 'Switch language to English' : 'বাংলা ভাষায় দেখুন'}
            className="inline-flex items-center gap-1 rounded-full bg-[#FFF8EC]/15 hover:bg-[#FFF8EC]/25 px-2.5 py-0.5 text-[11px] font-ui font-semibold text-[#FFF8EC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className={lang === 'bn' ? 'text-[#E8A317]' : 'opacity-75'}>BN</span>
            <span aria-hidden="true" className="opacity-50">/</span>
            <span className={lang === 'en' ? 'text-[#E8A317]' : 'opacity-75'}>EN</span>
          </button>
        </div>
      </div>

      {/* Main sticky header adhering strictly to the 3-zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FFF8EC]/90 backdrop-blur-md border-b border-[#2E6B34]/10 h-12 sm:h-16 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#hero"
            className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E6B34] rounded-md"
          >
            <BrandLogo variant="compact" />
          </a>

          {/* Zone 2: 4 clean single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#1C241D]/80"
          >
            <a
              href="#catalog"
              className="hover:text-[#2E6B34] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#2E6B34]"
            >
              {t.nav.menu}
            </a>
            <a
              href="#story"
              className="hover:text-[#2E6B34] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#2E6B34]"
            >
              {t.nav.story}
            </a>
            <a
              href="#reviews"
              className="hover:text-[#2E6B34] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#2E6B34]"
            >
              {t.nav.reviews}
            </a>
            <a
              href="#vlog"
              className="hover:text-[#2E6B34] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#2E6B34]"
            >
              {t.nav.vlog}
            </a>
          </nav>

          {/* Zone 3: 1 primary action button (Cart) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={t.nav.cart}
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-full bg-[#2E6B34] hover:bg-[#235328] text-[#FFF8EC] text-sm font-semibold shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E6B34]"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.nav.cart}</span>
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#E8A317] text-[#1C241D] text-xs font-ui font-bold tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
