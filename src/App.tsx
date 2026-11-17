import React, { useState, useEffect, useMemo } from 'react';
import {
  PRODUCTS,
  Product,
  CategoryId,
  OfferBanner,
} from './data/products';
import { Lang } from './data/translations';
import {
  CartItem,
  DemoOrderRecord,
  SavedCustomerInfo,
} from './types/cart';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OfferCarousel } from './components/OfferCarousel';
import { PopularPicks } from './components/PopularPicks';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { StoryAndTrust } from './components/StoryAndTrust';
import { ReviewsAndSocial } from './components/ReviewsAndSocial';
import { Footer } from './components/Footer';
import { MobileBottomNav, MobileTab } from './components/MobileBottomNav';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { ProfileModal } from './components/ProfileModal';

const STORAGE_CART_KEY = 'pahari_swad_cart_v1';
const STORAGE_CUSTOMER_KEY = 'pahari_swad_customer_v1';
const STORAGE_ORDERS_KEY = 'pahari_swad_orders_v1';
const STORAGE_LANG_KEY = 'pahari_swad_lang_v1';

const DEFAULT_CUSTOMER: SavedCustomerInfo = {
  name: '',
  phone: '',
  address: '',
  area: 'dhaka',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() =>
    loadFromStorage<Lang>(STORAGE_LANG_KEY, 'bn')
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>(STORAGE_CART_KEY, [])
  );
  const [customerInfo, setCustomerInfo] = useState<SavedCustomerInfo>(() =>
    loadFromStorage<SavedCustomerInfo>(STORAGE_CUSTOMER_KEY, DEFAULT_CUSTOMER)
  );
  const [orderHistory, setOrderHistory] = useState<DemoOrderRecord[]>(() =>
    loadFromStorage<DemoOrderRecord[]>(STORAGE_ORDERS_KEY, [])
  );

  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('home');

  // Persist language, cart, customer info, and orders in localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_LANG_KEY, JSON.stringify(lang));
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage quota errors
    }
  }, [lang]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_CUSTOMER_KEY,
        JSON.stringify(customerInfo)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [customerInfo]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_ORDERS_KEY,
        JSON.stringify(orderHistory)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [orderHistory]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const shelfProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isShelfFeatured).slice(0, 4),
    []
  );

  const popularProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isPopular),
    []
  );

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleAddToCart = (
    product: Product,
    weightId: string,
    weightLabelBn: string,
    weightLabelEn: string,
    unitPrice: number,
    quantity: number
  ) => {
    const key = `${product.id}__${weightId}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          nameBn: product.nameBn,
          nameEn: product.nameEn,
          weightId,
          weightLabelBn,
          weightLabelEn,
          unitPrice,
          quantity,
          image: product.image,
        },
      ];
    });
  };

  const handleQuickAdd = (product: Product) => {
    const defaultOpt =
      product.weightOptions.find((w) => w.price === product.price) ||
      product.weightOptions[0];
    if (!defaultOpt) return;
    handleAddToCart(
      product,
      defaultOpt.id,
      defaultOpt.labelBn,
      defaultOpt.labelEn,
      defaultOpt.price,
      1
    );
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handleOrderConfirmed = (order: DemoOrderRecord) => {
    setOrderHistory((prev) => [order, ...prev].slice(0, 10));
    setCart([]);
  };

  const handleClearProfileData = () => {
    setCustomerInfo(DEFAULT_CUSTOMER);
    setOrderHistory([]);
    try {
      window.localStorage.removeItem(STORAGE_CUSTOMER_KEY);
      window.localStorage.removeItem(STORAGE_ORDERS_KEY);
    } catch {
      // Ignore
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOfferAction = (banner: OfferBanner) => {
    if (banner.targetProductId) {
      const target = PRODUCTS.find((p) => p.id === banner.targetProductId);
      if (target) {
        setSelectedProduct(target);
        return;
      }
    }
    if (banner.targetCategory) {
      setActiveCategory(banner.targetCategory);
    }
    scrollToSection('catalog');
  };

  const handleMobileTabSelect = (tab: MobileTab) => {
    setMobileTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'menu') {
      scrollToSection('catalog');
    } else if (tab === 'offers') {
      scrollToSection('offers');
    } else if (tab === 'cart') {
      setIsCartOpen(true);
    } else if (tab === 'profile') {
      setIsProfileOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8EC] text-[#1C241D]">
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          lang={lang}
          shelfProducts={shelfProducts}
          onSelectProduct={setSelectedProduct}
          onOrderNow={() => scrollToSection('catalog')}
        />

        <OfferCarousel lang={lang} onAction={handleOfferAction} />

        <PopularPicks
          lang={lang}
          products={popularProducts}
          onSelectProduct={setSelectedProduct}
          onQuickAdd={handleQuickAdd}
        />

        <ProductCatalog
          lang={lang}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectProduct={setSelectedProduct}
          onQuickAdd={handleQuickAdd}
        />

        <StoryAndTrust lang={lang} />

        <ReviewsAndSocial lang={lang} />
      </main>

      <Footer lang={lang} />

      {/* Mobile Floating Bottom Navigation */}
      <MobileBottomNav
        lang={lang}
        activeTab={mobileTab}
        cartCount={cartCount}
        onSelectTab={handleMobileTabSelect}
      />

      {/* Floating WhatsApp / Messenger Chat Launcher */}
      <FloatingChatWidget lang={lang} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        lang={lang}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Cash-on-Delivery Checkout Drawer */}
      <CartDrawer
        lang={lang}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        customerInfo={customerInfo}
        onSaveCustomerInfo={setCustomerInfo}
        onOrderConfirmed={handleOrderConfirmed}
      />

      {/* Profile, Saved Address & Order History Sheet */}
      <ProfileModal
        lang={lang}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onToggleLang={handleToggleLang}
        customerInfo={customerInfo}
        orders={orderHistory}
        onClearData={handleClearProfileData}
      />
    </div>
  );
}
