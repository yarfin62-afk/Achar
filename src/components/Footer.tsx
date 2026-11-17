import React from 'react';
import { Facebook, Youtube, MessageCircle, Play, MapPin, Phone } from 'lucide-react';
import { BRAND_CONTACT } from '../data/products';
import { COPY, Lang } from '../data/translations';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  lang: Lang;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = COPY[lang];

  return (
    <footer className="bg-[#1C241D] text-[#FFF8EC] pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#FFF8EC]/12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-3">
              <span className="font-display-serif text-2xl font-bold text-[#FFF8EC]">
                Pahari Shad{' '}
                <span className="italic font-semibold text-[#E8A317]">by Kakoli</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-[#FFF8EC]/75 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={BRAND_CONTACT.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONTACT.youtubeVlogUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jk Kakoli Vlog YouTube"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C62828] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${BRAND_CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-[#1C241D] flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONTACT.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#1C241D] flex items-center justify-center transition-colors"
              >
                <Play className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-[#E8A317] mb-3">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm text-[#FFF8EC]/80">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  {t.nav.menu}
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white transition-colors">
                  {t.bottomNav.offers}
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  {t.nav.story}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#vlog" className="hover:text-white transition-colors">
                  {t.nav.vlog}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-[#E8A317] mb-3">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FFF8EC]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8A317] shrink-0 mt-0.5" />
                <span>
                  {lang === 'bn' ? BRAND_CONTACT.locationBn : BRAND_CONTACT.locationEn}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8A317] shrink-0" />
                <span className="font-ui">{BRAND_CONTACT.displayPhone}</span>
              </li>
              <li className="text-xs text-[#FFF8EC]/60 pt-1">{t.footer.codNote}</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF8EC]/60">
          <p>{t.footer.copyright}</p>
          <BrandLogo variant="compact" className="opacity-80 invert brightness-200" />
        </div>
      </div>
    </footer>
  );
};
