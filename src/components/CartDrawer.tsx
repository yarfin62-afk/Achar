import React, { useState, useEffect } from 'react';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Send,
  Copy,
  Check,
  Truck,
} from 'lucide-react';
import {
  CartItem,
  DeliveryArea,
  DemoOrderRecord,
  SavedCustomerInfo,
} from '../types/cart';
import { BRAND_CONTACT } from '../data/products';
import { COPY, Lang } from '../data/translations';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  customerInfo: SavedCustomerInfo;
  onSaveCustomerInfo: (info: SavedCustomerInfo) => void;
  onOrderConfirmed: (order: DemoOrderRecord) => void;
}

const FREE_DELIVERY_THRESHOLD = 1500;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  lang,
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  customerInfo,
  onSaveCustomerInfo,
  onOrderConfirmed,
}) => {
  const t = COPY[lang];
  const [name, setName] = useState(customerInfo.name);
  const [phone, setPhone] = useState(customerInfo.phone);
  const [address, setAddress] = useState(customerInfo.address);
  const [area, setArea] = useState<DeliveryArea>(customerInfo.area);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<DemoOrderRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(customerInfo.name);
      setPhone(customerInfo.phone);
      setAddress(customerInfo.address);
      setArea(customerInfo.area);
      setErrorMsg('');
    }
  }, [isOpen, customerInfo]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const qualifiesFree = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee =
    items.length === 0 ? 0 : qualifiesFree ? 0 : area === 'dhaka' ? 60 : 120;
  const grandTotal = subtotal + deliveryFee;
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const buildOrderText = (order: DemoOrderRecord) => {
    const itemLines = order.items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.nameBn} (${i.weightLabelBn}) x ${i.quantity} = ৳${
            i.unitPrice * i.quantity
          }`
      )
      .join('\n');

    const areaText =
      order.customer.area === 'dhaka' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে';

    return [
      `🌿 *নতুন অর্ডার - Pahari Shad by Kakoli*`,
      `অর্ডার আইডি: #${order.orderId}`,
      ``,
      `*পণ্যসমূহ:*`,
      itemLines,
      ``,
      `পণ্যের মূল্য: ৳${order.subtotal}`,
      `ডেলিভারি চার্জ (${areaText}): ${
        order.deliveryFee === 0 ? 'ফ্রি' : `৳${order.deliveryFee}`
      }`,
      `*সর্বমোট (Cash on Delivery): ৳${order.total}*`,
      ``,
      `*গ্রাহকের তথ্য:*`,
      `নাম: ${order.customer.name}`,
      `ফোন: ${order.customer.phone}`,
      `ঠিকানা: ${order.customer.address}`,
    ].join('\n');
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[\s-]/g, '');
    const validPhone = /^(?:\+?88)?01[3-9]\d{8}$/.test(cleanPhone);

    if (!name.trim() || !validPhone || address.trim().length < 6) {
      setErrorMsg(t.cart.validationError);
      return;
    }

    setErrorMsg('');
    const customer: SavedCustomerInfo = {
      name: name.trim(),
      phone: cleanPhone,
      address: address.trim(),
      area,
    };
    onSaveCustomerInfo(customer);

    const newOrder: DemoOrderRecord = {
      orderId: `PSK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      items: [...items],
      subtotal,
      deliveryFee,
      total: grandTotal,
      customer,
    };

    setConfirmedOrder(newOrder);
    onOrderConfirmed(newOrder);
  };

  const handleCopySummary = async () => {
    if (!confirmedOrder) return;
    try {
      await navigator.clipboard.writeText(buildOrderText(confirmedOrder));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard fallback ignored safely
    }
  };

  const resetToShop = () => {
    setConfirmedOrder(null);
    onClose();
  };

  const orderMessage = confirmedOrder ? buildOrderText(confirmedOrder) : '';
  const whatsappUrl = `https://wa.me/${BRAND_CONTACT.whatsappNumber}?text=${encodeURIComponent(
    orderMessage
  )}`;
  const messengerUrl = `https://m.me/${BRAND_CONTACT.messengerPageUsername}?text=${encodeURIComponent(
    orderMessage
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#FFF8EC] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#1C241D]/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#2E6B34]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#1C241D]">{t.cart.title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="w-10 h-10 rounded-full hover:bg-[#1C241D]/8 flex items-center justify-center text-[#1C241D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {confirmedOrder ? (
            /* Order Confirmation Receipt + WhatsApp & Messenger Launchers */
            <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm space-y-5">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#EDF5EE] text-[#2E6B34] mx-auto flex items-center justify-center mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <span className="text-xs font-ui font-semibold text-[#2E6B34]">
                  #{confirmedOrder.orderId}
                </span>
                <h3 className="text-xl font-bold text-[#1C241D] mt-1">
                  {t.cart.confirmedTitle}
                </h3>
                <p className="text-sm text-[#1C241D]/70 mt-1.5 leading-relaxed">
                  {t.cart.confirmedSub}
                </p>
              </div>

              {/* Order Summary Box */}
              <div className="rounded-2xl bg-[#FFF8EC] p-4 text-xs sm:text-sm space-y-2 text-[#1C241D]">
                {confirmedOrder.items.map((item) => (
                  <div key={item.key} className="flex justify-between gap-2">
                    <span className="line-clamp-1">
                      {lang === 'bn' ? item.nameBn : item.nameEn} (
                      {lang === 'bn' ? item.weightLabelBn : item.weightLabelEn}) ×{' '}
                      {item.quantity}
                    </span>
                    <span className="font-ui font-semibold tabular-nums shrink-0">
                      ৳{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#1C241D]/10 flex justify-between font-bold text-base">
                  <span>{t.cart.total}</span>
                  <span className="font-ui text-[#2E6B34] tabular-nums">
                    ৳{confirmedOrder.total}
                  </span>
                </div>
              </div>

              {/* WhatsApp & Messenger Direct Links */}
              <div className="space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-[#0E2414] font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>{t.cart.sendWhatsapp}</span>
                </a>

                <a
                  href={messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#0084FF] hover:bg-[#0073e0] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{t.cart.sendMessenger}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full min-h-[44px] px-4 py-2 rounded-full bg-[#FBF3E4] hover:bg-[#F3E6CE] text-[#1C241D] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#2E6B34]" />
                      <span>{t.cart.copiedText}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t.cart.copySummary}</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={resetToShop}
                className="w-full text-center text-sm font-semibold text-[#2E6B34] hover:underline pt-1 cursor-pointer"
              >
                {t.cart.newOrder}
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart State */
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#EDF5EE] text-[#2E6B34] flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#1C241D]">{t.cart.emptyTitle}</h3>
              <p className="text-sm text-[#1C241D]/65 mt-1.5 max-w-xs">
                {t.cart.emptyDesc}
              </p>
              <a
                href="#catalog"
                onClick={onClose}
                className="mt-6 min-h-[44px] px-6 py-2.5 rounded-full bg-[#2E6B34] hover:bg-[#235328] text-white text-sm font-semibold inline-flex items-center justify-center transition-colors"
              >
                {t.cart.browseBtn}
              </a>
            </div>
          ) : (
            /* Populated Cart + Checkout Form */
            <div className="space-y-6">
              {/* Free delivery progress note */}
              {!qualifiesFree && (
                <div className="rounded-2xl bg-[#EDF5EE] px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium text-[#235328]">
                  <Truck className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    {t.cart.freeDeliveryHint.replace(
                      '{amount}',
                      String(remainingForFree)
                    )}
                  </span>
                </div>
              )}

              {/* Item List */}
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="rounded-2xl bg-white p-3 flex items-center gap-3 shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FBF3E4] shrink-0">
                      <ResilientImage
                        src={item.image}
                        alt={lang === 'bn' ? item.nameBn : item.nameEn}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#1C241D] truncate">
                        {lang === 'bn' ? item.nameBn : item.nameEn}
                      </h3>
                      <p className="text-xs text-[#1C241D]/60">
                        {lang === 'bn' ? item.weightLabelBn : item.weightLabelEn} ·{' '}
                        <span className="font-ui font-semibold text-[#2E6B34] tabular-nums">
                          ৳{item.unitPrice}
                        </span>
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 bg-[#FFF8EC] rounded-full p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-[#1C241D] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="min-w-[20px] text-center text-xs font-ui font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-[#1C241D] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label="Remove item"
                          className="w-8 h-8 rounded-full hover:bg-[#C62828]/10 text-[#C62828]/80 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Totals Summary */}
              <div className="rounded-2xl bg-white p-4 space-y-2 text-sm shadow-sm">
                <div className="flex justify-between text-[#1C241D]/75">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-ui font-semibold tabular-nums">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#1C241D]/75">
                  <span>{t.cart.delivery}</span>
                  <span className="font-ui font-semibold tabular-nums">
                    {deliveryFee === 0 ? t.cart.freeDelivery : `৳${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#1C241D]/10 flex justify-between text-base font-bold text-[#1C241D]">
                  <span>{t.cart.total}</span>
                  <span className="font-ui text-[#2E6B34] tabular-nums">
                    ৳{grandTotal}
                  </span>
                </div>
              </div>

              {/* Cash on Delivery Form */}
              <form id="cod-checkout-form" onSubmit={handleConfirm} className="space-y-3.5">
                <h3 className="text-base font-bold text-[#1C241D]">
                  {t.cart.checkoutTitle}
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#1C241D]/75 mb-1">
                    {t.cart.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.cart.namePlaceholder}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-[#2E6B34]/15 text-sm text-[#1C241D] focus:outline-none focus:ring-2 focus:ring-[#2E6B34]/35"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C241D]/75 mb-1">
                    {t.cart.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.cart.phonePlaceholder}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-[#2E6B34]/15 text-sm font-ui text-[#1C241D] focus:outline-none focus:ring-2 focus:ring-[#2E6B34]/35"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C241D]/75 mb-1">
                    {t.cart.areaLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setArea('dhaka')}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        area === 'dhaka'
                          ? 'bg-[#2E6B34] text-white border-[#2E6B34]'
                          : 'bg-white text-[#1C241D] border-[#2E6B34]/15'
                      }`}
                    >
                      {t.cart.dhakaOption}
                    </button>
                    <button
                      type="button"
                      onClick={() => setArea('outside')}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        area === 'outside'
                          ? 'bg-[#2E6B34] text-white border-[#2E6B34]'
                          : 'bg-white text-[#1C241D] border-[#2E6B34]/15'
                      }`}
                    >
                      {t.cart.outsideOption}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C241D]/75 mb-1">
                    {t.cart.addressLabel}
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.cart.addressPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#2E6B34]/15 text-sm text-[#1C241D] focus:outline-none focus:ring-2 focus:ring-[#2E6B34]/35"
                  />
                </div>

                <p className="text-xs font-medium text-[#2E6B34] bg-[#EDF5EE] px-3.5 py-2 rounded-xl">
                  {t.cart.paymentBadge}
                </p>

                {errorMsg && (
                  <p className="text-xs font-semibold text-[#C62828] bg-[#C62828]/10 px-3.5 py-2 rounded-xl">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full min-h-[48px] px-6 py-3 rounded-full bg-[#2E6B34] hover:bg-[#235328] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer"
                >
                  {t.cart.confirmBtn} · ৳{grandTotal}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
