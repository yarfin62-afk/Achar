import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, Tag, User } from 'lucide-react';
import { COPY, Lang } from '../data/translations';

export type MobileTab = 'home' | 'menu' | 'cart' | 'offers' | 'profile';

interface MobileBottomNavProps {
  lang: Lang;
  activeTab: MobileTab;
  cartCount: number;
  onSelectTab: (tab: MobileTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  lang,
  activeTab,
  cartCount,
  onSelectTab,
}) => {
  const t = COPY[lang];

  const items: Array<{
    id: MobileTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }> = [
    { id: 'home', label: t.bottomNav.home, icon: Home },
    { id: 'menu', label: t.bottomNav.menu, icon: UtensilsCrossed },
    { id: 'cart', label: t.bottomNav.cart, icon: ShoppingBag, badge: cartCount },
    { id: 'offers', label: t.bottomNav.offers, icon: Tag },
    { id: 'profile', label: t.bottomNav.profile, icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-2.5 left-3 right-3 z-40 rounded-2xl bg-[#FFFFFF]/95 backdrop-blur-md border border-[#2E6B34]/12 shadow-[0_10px_30px_rgba(28,36,29,0.16)] pb-safe"
    >
      <div className="grid grid-cols-5 items-center h-[54px]">
        {items.map(({ id, label, icon: Icon, badge }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectTab(id)}
              aria-current={active ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center h-full min-w-[44px] transition-colors cursor-pointer ${
                active ? 'text-[#2E6B34]' : 'text-[#1C241D]/65 hover:text-[#2E6B34]'
              }`}
            >
              <div className="relative">
                <Icon className="w-[19px] h-[19px]" aria-hidden="true" />
                {typeof badge === 'number' && badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#C62828] text-white text-[10px] font-ui font-bold flex items-center justify-center tabular-nums">
                    {badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold mt-0.5 leading-none truncate max-w-[64px]">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
