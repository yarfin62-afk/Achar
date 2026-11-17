import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { BRAND_CONTACT } from '../data/products';
import { COPY, Lang } from '../data/translations';

interface FloatingChatWidgetProps {
  lang: Lang;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({ lang }) => {
  const t = COPY[lang];
  const [open, setOpen] = useState(false);

  const greetingText = encodeURIComponent(
    lang === 'bn'
      ? 'আসসালামু আলাইকুম, আমি Pahari Shad by Kakoli থেকে অর্ডার করতে চাই।'
      : 'Hello! I would like to ask about ordering from Pahari Shad by Kakoli.'
  );

  return (
    <div className="fixed bottom-20 right-3.5 md:bottom-6 md:right-6 z-40 flex flex-col items-end">
      {open && (
        <div className="mb-2.5 w-64 rounded-2xl bg-white p-4 shadow-2xl border border-[#2E6B34]/15">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <p className="text-sm font-bold text-[#1C241D]">{t.chatWidget.title}</p>
              <p className="text-xs text-[#1C241D]/65 mt-0.5">{t.chatWidget.sub}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat options"
              className="w-7 h-7 rounded-full hover:bg-[#1C241D]/8 flex items-center justify-center text-[#1C241D]/60 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <a
              href={`https://wa.me/${BRAND_CONTACT.whatsappNumber}?text=${greetingText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-[#0E2414] text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.chatWidget.whatsapp}</span>
            </a>

            <a
              href={`https://m.me/${BRAND_CONTACT.messengerPageUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#0084FF] hover:bg-[#0073e0] text-white text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.chatWidget.messenger}</span>
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t.chatWidget.title}
        aria-expanded={open}
        className="w-12 h-12 rounded-full bg-[#2E6B34] hover:bg-[#235328] text-white shadow-[0_8px_22px_rgba(28,36,29,0.28)] flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
      >
        {open ? (
          <X className="w-5 h-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
