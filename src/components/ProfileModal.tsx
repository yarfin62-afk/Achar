import React from 'react';
import { X, MapPin, Phone, Globe, Receipt } from 'lucide-react';
import { DemoOrderRecord, SavedCustomerInfo } from '../types/cart';
import { COPY, Lang } from '../data/translations';

interface ProfileModalProps {
  lang: Lang;
  isOpen: boolean;
  onClose: () => void;
  onToggleLang: () => void;
  customerInfo: SavedCustomerInfo;
  orders: DemoOrderRecord[];
  onClearData: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  lang,
  isOpen,
  onClose,
  onToggleLang,
  customerInfo,
  orders,
  onClearData,
}) => {
  const t = COPY[lang];
  if (!isOpen) return null;

  const hasSavedAddress = Boolean(customerInfo.name && customerInfo.phone);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.profile.title}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md max-h-[88vh] bg-[#FFF8EC] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-white border-b border-[#1C241D]/10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1C241D]">{t.profile.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="w-10 h-10 rounded-full hover:bg-[#1C241D]/8 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          {/* Language Switcher */}
          <div className="rounded-2xl bg-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-[#2E6B34]" aria-hidden="true" />
              <span className="text-sm font-semibold text-[#1C241D]">
                {t.profile.languageTitle}
              </span>
            </div>
            <button
              type="button"
              onClick={onToggleLang}
              className="min-h-[38px] px-4 py-1.5 rounded-full bg-[#2E6B34] text-white text-xs font-ui font-bold cursor-pointer"
            >
              {lang === 'bn' ? 'বাংলা → English' : 'English → বাংলা'}
            </button>
          </div>

          {/* Saved Delivery Info */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="text-sm font-bold text-[#1C241D] mb-2">
              {t.profile.savedAddressTitle}
            </h3>
            {hasSavedAddress ? (
              <div className="text-xs sm:text-sm text-[#1C241D]/80 space-y-1.5">
                <p className="font-semibold text-[#1C241D]">{customerInfo.name}</p>
                <p className="flex items-center gap-1.5 font-ui">
                  <Phone className="w-3.5 h-3.5 text-[#2E6B34]" />
                  <span>{customerInfo.phone}</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2E6B34] shrink-0 mt-0.5" />
                  <span>{customerInfo.address}</span>
                </p>
              </div>
            ) : (
              <p className="text-xs text-[#1C241D]/60 leading-relaxed">
                {t.profile.noSavedAddress}
              </p>
            )}
          </div>

          {/* Recent Demo Orders */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="text-sm font-bold text-[#1C241D] mb-2.5">
              {t.profile.orderHistoryTitle}
            </h3>
            {orders.length === 0 ? (
              <p className="text-xs text-[#1C241D]/60">{t.profile.noOrders}</p>
            ) : (
              <ul className="space-y-2.5">
                {orders.map((ord) => (
                  <li
                    key={ord.orderId}
                    className="rounded-xl bg-[#FFF8EC] p-3 text-xs flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Receipt className="w-4 h-4 text-[#2E6B34] shrink-0" />
                      <div className="min-w-0">
                        <p className="font-ui font-bold text-[#1C241D]">
                          #{ord.orderId}
                        </p>
                        <p className="text-[#1C241D]/65 truncate">
                          {ord.items.length} items · {ord.customer.name}
                        </p>
                      </div>
                    </div>
                    <span className="font-ui font-bold text-[#2E6B34] tabular-nums shrink-0">
                      ৳{ord.total}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {(hasSavedAddress || orders.length > 0) && (
            <button
              type="button"
              onClick={onClearData}
              className="w-full min-h-[42px] rounded-xl text-xs font-semibold text-[#C62828] hover:bg-[#C62828]/10 transition-colors cursor-pointer"
            >
              {t.profile.clearData}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
