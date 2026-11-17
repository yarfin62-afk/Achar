import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../data/products';
import { COPY, Lang } from '../data/translations';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  lang: Lang;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    weightId: string,
    weightLabelBn: string,
    weightLabelEn: string,
    unitPrice: number,
    quantity: number
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  lang,
  product,
  onClose,
  onAddToCart,
}) => {
  const t = COPY[lang];
  const [selectedWeightId, setSelectedWeightId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      // Pick the default middle/base weight option matching base price if present
      const defaultOpt =
        product.weightOptions.find((w) => w.price === product.price) ||
        product.weightOptions[0];
      setSelectedWeightId(defaultOpt?.id || '');
      setQuantity(1);
      setExpanded(false);
      setJustAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const activeWeight =
    product.weightOptions.find((w) => w.id === selectedWeightId) ||
    product.weightOptions[0];
  const totalPrice = (activeWeight?.price ?? product.price) * quantity;

  const handleConfirmAdd = () => {
    if (!activeWeight) return;
    onAddToCart(
      product,
      activeWeight.id,
      activeWeight.labelBn,
      activeWeight.labelEn,
      activeWeight.price,
      quantity
    );
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 650);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-2xl max-h-[92vh] bg-[#FFF8EC] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Mobile Sheet Grab Handle & Close */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-[#FFF8EC]">
          <span className="w-10 h-1.5 rounded-full bg-[#1C241D]/20" aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-3.5 right-3.5 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1C241D] shadow-md flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Product Body */}
        <div className="overflow-y-auto flex-1 pb-4">
          {/* Large Product Visual */}
          <div className="aspect-[4/3] sm:aspect-[16/10] w-full bg-[#FBF3E4] overflow-hidden">
            <ResilientImage
              src={product.image}
              alt={lang === 'bn' ? product.nameBn : product.nameEn}
              fallbackTitle={lang === 'bn' ? product.nameBn : product.nameEn}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-5 sm:p-7">
            {/* Clean unboxed category & authentic note */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#2E6B34]">
              <span>{t.categories[product.category]}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#1C241D]/65">{t.productDetail.authenticNote}</span>
            </div>

            <div className="mt-2 flex items-start justify-between gap-4">
              <h2
                id="pdp-title"
                className="text-2xl sm:text-3xl font-bold text-[#1C241D] leading-tight"
              >
                {lang === 'bn' ? product.nameBn : product.nameEn}
              </h2>

              <div className="shrink-0 rounded-full bg-[#EDF5EE] px-3.5 py-1.5 text-lg font-ui font-bold text-[#2E6B34] tabular-nums">
                ৳{activeWeight?.price ?? product.price}
              </div>
            </div>

            {/* Weight Selector */}
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1C241D]/70 mb-2.5">
                {t.productDetail.weightLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.weightOptions.map((opt) => {
                  const selected = opt.id === activeWeight?.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedWeightId(opt.id)}
                      className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        selected
                          ? 'bg-[#2E6B34] text-[#FFF8EC] shadow-sm'
                          : 'bg-white text-[#1C241D] border border-[#2E6B34]/15 hover:border-[#2E6B34]'
                      }`}
                    >
                      <span>{lang === 'bn' ? opt.labelBn : opt.labelEn}</span>
                      <span className="ml-1.5 font-ui tabular-nums opacity-85">
                        · ৳{opt.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-5 flex items-center justify-between py-3 border-y border-[#1C241D]/10">
              <span className="text-sm font-semibold text-[#1C241D]">
                {t.productDetail.quantityLabel}
              </span>
              <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 border border-[#2E6B34]/15">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 rounded-full hover:bg-[#EDF5EE] flex items-center justify-center text-[#1C241D] transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="min-w-[28px] text-center font-ui font-bold text-base tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 rounded-full hover:bg-[#EDF5EE] flex items-center justify-center text-[#1C241D] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description with "Read more" toggle + Ingredients */}
            <div className="mt-4">
              <p className="text-sm sm:text-base text-[#1C241D]/85 leading-relaxed">
                {expanded
                  ? lang === 'bn'
                    ? product.fullDescBn
                    : product.fullDescEn
                  : lang === 'bn'
                  ? product.shortDescBn
                  : product.shortDescEn}
              </p>

              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-1.5 text-sm font-semibold text-[#2E6B34] hover:underline cursor-pointer"
              >
                {expanded ? t.productDetail.readLess : t.productDetail.readMore}
              </button>

              <div className="mt-4 pt-4 border-t border-[#1C241D]/10">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[#1C241D]/65">
                  {t.productDetail.ingredientsTitle}
                </h3>
                <p className="mt-1 text-sm text-[#1C241D]/80 leading-relaxed">
                  {lang === 'bn' ? product.ingredientsBn : product.ingredientsEn}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Snack-shop Style Dark Rounded Sticky Bottom Bar */}
        <div className="p-3 sm:p-4 bg-[#FFF8EC] border-t border-[#1C241D]/10">
          <div className="rounded-2xl bg-[#1C241D] text-[#FFF8EC] px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
            <div>
              <span className="block text-[11px] text-[#FFF8EC]/70">
                {t.productDetail.totalLabel}
              </span>
              <span className="text-xl font-ui font-bold tabular-nums text-[#E8A317]">
                ৳{totalPrice}
              </span>
            </div>

            <button
              type="button"
              onClick={handleConfirmAdd}
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 rounded-full bg-[#2E6B34] hover:bg-[#387f3f] active:scale-[0.98] text-white font-semibold text-sm sm:text-base transition-all cursor-pointer whitespace-nowrap"
            >
              {justAdded ? (
                <>
                  <Check className="w-5 h-5" aria-hidden="true" />
                  <span>{t.productDetail.addedToast}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  <span>{t.productDetail.addToCart}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
