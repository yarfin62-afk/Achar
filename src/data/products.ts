/**
 * ============================================================================
 * PAHARI SWAD BY KAKOLI — CENTRAL PRODUCT, OFFER & REVIEW DATA
 * ============================================================================
 *
 * HOW TO EDIT PRODUCTS & REPLACE PHOTOS:
 * 1. To change price, weight options, or descriptions, edit the objects in `PRODUCTS` below.
 * 2. PHOTO REPLACEMENT NOTE:
 *    All `image` fields currently point to curated studio food photography assets.
 *    When replacing with Kakoli's real homemade jar & product photos:
 *    - Drop your `.jpg` / `.webp` photos inside `/public/images/products/`
 *    - Update the `image` path to e.g. `"/images/products/moricher-achar.jpg"`
 * 3. Every weight variant calculates pricing dynamically in the Product Detail view.
 */

export type CategoryId = 'all' | 'pickles' | 'spices' | 'fruits' | 'dry_others' | 'combo';

export interface WeightOption {
  id: string;
  labelBn: string;
  labelEn: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  category: Exclude<CategoryId, 'all'>;
  nameBn: string;
  nameEn: string;
  baseWeightBn: string;
  baseWeightEn: string;
  price: number;
  originalPrice?: number;
  isPopular: boolean;
  isShelfFeatured?: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'none';
  shortDescBn: string;
  shortDescEn: string;
  fullDescBn: string;
  fullDescEn: string;
  ingredientsBn: string;
  ingredientsEn: string;
  /** REPLACE PHOTO: Swap with real product photo path when ready */
  image: string;
  /** Optional subtle visual framing hint */
  imagePosition?: string;
  weightOptions: WeightOption[];
  tagBn?: string;
  tagEn?: string;
}

export interface OfferBanner {
  id: string;
  kickerBn: string;
  kickerEn: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  ctaBn: string;
  ctaEn: string;
  targetCategory?: CategoryId;
  targetProductId?: string;
  accentBg: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  nameBn: string;
  nameEn: string;
  locationBn: string;
  locationEn: string;
  productBn: string;
  productEn: string;
  rating: number;
  commentBn: string;
  commentEn: string;
  dateBn: string;
  dateEn: string;
}

export const BRAND_CONTACT = {
  /** Replace with Kakoli's real WhatsApp number in international format without + */
  whatsappNumber: '8801700000000',
  displayPhone: '+880 17XX-XXXXXX',
  messengerPageUsername: 'paharishadbykakoli',
  facebookPageUrl: 'https://www.facebook.com/paharishadbykakoli',
  youtubeVlogUrl: 'https://www.youtube.com/@JkKakoliVlog',
  tiktokUrl: 'https://www.tiktok.com/@jkkakolivlog',
  email: 'hello@paharishad.com',
  locationBn: 'খাগড়াছড়ি ও ঢাকা ডেলিভারি হাব, বাংলাদেশ',
  locationEn: 'Khagrachari & Dhaka Delivery Hub, Bangladesh',
};

export const PRODUCTS: Product[] = [
  {
    id: 'chili-pickle',
    slug: 'pahari-moricher-achar',
    category: 'pickles',
    nameBn: 'পাহাড়ি মরিচের আচার',
    nameEn: 'Hill Chili Pickle',
    baseWeightBn: '৫০০ গ্রাম',
    baseWeightEn: '500g',
    price: 350,
    isPopular: true,
    isShelfFeatured: true,
    spiceLevel: 'hot',
    shortDescBn: 'পাহাড়ি ঝাল মরিচ আর খাঁটি সরিষার তেলে রোদে শুকানো ঘরোয়া আচার।',
    shortDescEn: 'Sun-cured hill chilies marinated in pure mustard oil and roasted spices.',
    fullDescBn:
      'পাহাড়ি ঢাল থেকে সংগৃহীত তাজা লাল ও কাঁচা মরিচ, ঘানি ভাঙা খাঁটি সরিষার তেল, দেশি রসুন এবং কাকলির নিজস্ব ভাজা মশলায় ধাপে ধাপে রোদে শুকিয়ে তৈরি করা হয় এই ঝাল ও সুঘ্রাণযুক্ত মরিচের আচার। গরম ভাত, খিচুড়ি কিংবা পরোটার সাথে জমে দারুণ।',
    fullDescEn:
      'Hand-picked fresh hill chilies slow-cured under bright mountain sun with cold-pressed mustard oil, garlic, and Kakoli’s roasted five-spice blend. Zero artificial vinegar or preservatives.',
    ingredientsBn: 'পাহাড়ি লাল ও সবুজ মরিচ, খাঁটি সরিষার তেল, কালোজিরা, মেথি, রসুন, সামান্য বিট লবণ ও তেঁতুলের ক্বাথ।',
    ingredientsEn: 'Hill red & green chilies, cold-pressed mustard oil, nigella seeds, fenugreek, garlic, black salt, tamarind pulp.',
    // REPLACE PHOTO: Real photo of Kakoli's Pahari Moricher Achar jar
    image: '/src/assets/images/pickle_chili_jar_1794915900159.jpg',
    tagBn: 'বেস্টসেলার',
    tagEn: 'Bestseller',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 190 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 350 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 660 },
    ],
  },
  {
    id: 'garlic-mix-pickle',
    slug: 'roshun-mix-achar',
    category: 'pickles',
    nameBn: 'রসুন-মিক্স আচার',
    nameEn: 'Garlic Mixed Pickle',
    baseWeightBn: '৫০০ গ্রাম',
    baseWeightEn: '500g',
    price: 420,
    isPopular: true,
    isShelfFeatured: true,
    spiceLevel: 'medium',
    shortDescBn: 'আস্ত দেশি রসুনের কোয়া, তেঁতুল ও সরিষার ঝাঁজে মোড়ানো মিক্সড আচার।',
    shortDescEn: 'Whole garlic cloves slow-simmered in tangy tamarind, mustard oil, and hill spices.',
    fullDescBn:
      'বাছাইকৃত আস্ত দেশি রসুনের কোয়া আর পাহাড়ি মশলার ঘন গ্রেভিতে তৈরি রসুন-মিক্স আচার। প্রতিটি কামড়ে পাবেন নরম রসুন আর টক-ঝাল-মিষ্টি মশলার ভারসাম্যপূর্ণ স্বাদ। কোনো কৃত্রিম প্রিজারভেটিভ ছাড়াই কাঁচের জারে যত্ন করে সংরক্ষিত।',
    fullDescEn:
      'Tender whole local garlic cloves infused with roasted cumin, coriander, mustard oil, and mild chili heat. Naturally preserved in sterilized glass jars with zero synthetic additives.',
    ingredientsBn: 'দেশি রসুনের কোয়া, খাঁটি সরিষার তেল, তেঁতুল, ভাজা জিরা-ধনিয়া গুঁড়া, শুকনো মরিচ ও আখের গুড়।',
    ingredientsEn: 'Whole garlic cloves, pure mustard oil, tamarind, roasted cumin & coriander, dried chili, cane jaggery.',
    // REPLACE PHOTO: Real photo of Kakoli's Roshun-Mix Achar jar
    image: '/src/assets/images/pickle_garlic_jar_1794915899817.jpg',
    tagBn: 'হাতে তৈরি',
    tagEn: 'Handmade',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 230 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 420 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 790 },
    ],
  },
  {
    id: 'olive-pickle',
    slug: 'jolpai-achar',
    category: 'pickles',
    nameBn: 'জলপাইয়ের আচার',
    nameEn: 'Olive Pickle',
    baseWeightBn: '৫০০ গ্রাম',
    baseWeightEn: '500g',
    price: 380,
    isPopular: true,
    isShelfFeatured: true,
    spiceLevel: 'mild',
    shortDescBn: 'টক-মিষ্টি-ঝাল পাহাড়ি জলপাই ও পাঁচফোড়নের ঘ্রাণে ভরা ঐতিহ্যবাহী আচার।',
    shortDescEn: 'Tangy, sweet-and-spiced Bangladeshi hill olives with roasted panch phoron.',
    fullDescBn:
      'পাহাড়ি গাছের কচি ও পুষ্ট জলপাই রোদে শুকিয়ে আখের গুড়, পাঁচফোড়ন এবং সরিষার তেলে রান্না করা। মুখে দিলেই ছোটবেলার ঘরোয়া আচারের কথা মনে পড়ে যাবে। ভাত, ভুনা খিচুড়ি বা বিকেলের নাস্তায় অনন্য।',
    fullDescEn:
      'Orchard-fresh hill olives sun-dried and simmered with cane jaggery, panch phoron five-spice, and cold-pressed mustard oil for an authentic sweet-tart finish.',
    ingredientsBn: 'তাজা জলপাই, আখের গুড়, পাঁচফোড়ন, খাঁটি সরিষার তেল, বিট লবণ ও শুকনো মরিচ।',
    ingredientsEn: 'Fresh hill olives, cane jaggery, panch phoron, pure mustard oil, black salt, dried red chili.',
    // REPLACE PHOTO: Real photo of Kakoli's Jolpai Achar jar
    image: '/src/assets/images/pickle_olive_jar_1794915901532.jpg',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 210 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 380 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 720 },
    ],
  },
  {
    id: 'three-pickle-combo',
    slug: 'tin-rokomer-achar-combo',
    category: 'combo',
    nameBn: 'তিন রকমের আচার কম্বো',
    nameEn: '3-Pickle Combo',
    baseWeightBn: '৩ × ৫০০ গ্রাম',
    baseWeightEn: '3 × 500g',
    price: 1000,
    originalPrice: 1150,
    isPopular: true,
    isShelfFeatured: true,
    spiceLevel: 'medium',
    shortDescBn: 'মরিচ, রসুন-মিক্স ও জলপাইয়ের আচার—তিনটি ৫০০ গ্রামের জার একসাথে সাশ্রয়ী কম্বোতে।',
    shortDescEn: 'Complete trio of Chili, Garlic Mix & Olive pickles (three 500g jars) at a combo saving.',
    fullDescBn:
      'পরিবার বা প্রিয়জনকে উপহার দেওয়ার জন্য আদর্শ কম্বো প্যাক! এতে থাকছে আমাদের সবচেয়ে জনপ্রিয় ৩টি আচার—পাহাড়ি মরিচের আচার (৫০০ গ্রাম), রসুন-মিক্স আচার (৫০০ গ্রাম) এবং জলপাইয়ের আচার (৫০০ গ্রাম)। আলাদা কেনার চেয়ে ৳১৫০ সাশ্রয়!',
    fullDescEn:
      'Our signature tasting bundle featuring 500g jars of Hill Chili Pickle, Garlic Mixed Pickle, and Olive Pickle—save ৳150 compared to individual jars.',
    ingredientsBn: 'পাহাড়ি মরিচ, দেশি রসুন, জলপাই, খাঁটি সরিষার তেল, পাঁচফোড়ন ও ঘরোয়া মশলা (কোনো কেমিক্যাল নেই)।',
    ingredientsEn: 'Hill chilies, whole garlic, fresh olives, pure mustard oil, panch phoron & whole roasted spices.',
    // REPLACE PHOTO: Real photo of the 3-jar pickle combo box
    image: '/src/assets/images/pickle_combo_trio_1794915901830.jpg',
    tagBn: '৳১৫০ সাশ্রয়',
    tagEn: 'Save ৳150',
    weightOptions: [
      { id: '3x250g', labelBn: '৩ × ২৫০ গ্রাম', labelEn: '3 × 250g', price: 560 },
      { id: '3x500g', labelBn: '৩ × ৫০০ গ্রাম', labelEn: '3 × 500g', price: 1000 },
      { id: '3x1kg', labelBn: '৩ × ১ কেজি', labelEn: '3 × 1kg', price: 1920 },
    ],
  },
  {
    id: 'turmeric-powder',
    slug: 'holuder-gura',
    category: 'spices',
    nameBn: 'হলুদের গুঁড়া',
    nameEn: 'Turmeric Powder',
    baseWeightBn: '২৫০ গ্রাম',
    baseWeightEn: '250g',
    price: 180,
    isPopular: true,
    spiceLevel: 'none',
    shortDescBn: 'পাহাড়ি জুমের হলুদ রোদে শুকিয়ে ঘানিতে ভাঙা ১০০% খাঁটি হলুদ গুঁড়া।',
    shortDescEn: '100% pure sun-dried hill turmeric root, stone-milled with rich natural curcumin.',
    fullDescBn:
      'কোনো কৃত্রিম রঙ বা ভেজাল ছাড়াই খাগড়াছড়ির পাহাড়ি হলুদ ধুয়ে, সেদ্ধ করে রোদে শুকিয়ে ভাঙানো হয়। রান্নায় অল্প পরিমাণেই আসে প্রাকৃতিক সোনালি রঙ ও খাঁটি ঘ্রাণ।',
    fullDescEn:
      'Cultivated in mineral-rich hill soil without chemical fertilizers. Boiled, sun-dried, and milled in small batches for vibrant color and rich aroma.',
    ingredientsBn: '১০০% খাঁটি পাহাড়ি হলুদ (কোনো রঙ বা মিশ্রণ নেই)।',
    ingredientsEn: '100% pure dried hill turmeric rhizomes (no artificial color or fillers).',
    // REPLACE PHOTO: Real photo of Kakoli's pure turmeric powder pouch/jar
    image: '/src/assets/images/spices_turmeric_chili_1794915901664.jpg',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 180 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 340 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 650 },
    ],
  },
  {
    id: 'chili-powder',
    slug: 'moricher-gura',
    category: 'spices',
    nameBn: 'মরিচের গুঁড়া',
    nameEn: 'Chili Powder',
    baseWeightBn: '২৫০ গ্রাম',
    baseWeightEn: '250g',
    price: 220,
    isPopular: false,
    spiceLevel: 'hot',
    shortDescBn: 'বোঁটা ছাড়ানো বাছাইকৃত পাহাড়ি শুকনো মরিচের খাঁটি গুঁড়া।',
    shortDescEn: 'Stem-cleaned sun-dried hill red chilies finely ground for natural heat and color.',
    fullDescBn:
      'প্রতিটি শুকনো মরিচের বোঁটা হাত দিয়ে বেছে ফেলে রোদে মচমচে করে শুকিয়ে ভাঙানো হয়। এতে কোনো ইটের গুঁড়া বা কৃত্রিম লাল রঙ মেশানো হয় না, তাই তরকারির স্বাদ থাকে সম্পূর্ণ প্রাকৃতিক।',
    fullDescEn:
      'Hand-sorted dried hill chilies with stems removed before milling in small hygienic batches. Delivers clean heat and deep natural crimson hue.',
    ingredientsBn: '১০০% বাছাইকৃত পাহাড়ি লাল শুকনো মরিচ।',
    ingredientsEn: '100% hand-sorted sun-dried hill red chilies.',
    // REPLACE PHOTO: Real photo of Kakoli's pure chili powder
    image: '/src/assets/images/spices_turmeric_chili_1794915901664.jpg',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 220 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 420 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 800 },
    ],
  },
  {
    id: 'amla',
    slug: 'pahari-amloki',
    category: 'fruits',
    nameBn: 'আমলকি',
    nameEn: 'Amla',
    baseWeightBn: '৫০০ গ্রাম',
    baseWeightEn: '500g',
    price: 200,
    isPopular: true,
    spiceLevel: 'none',
    shortDescBn: 'গাছ থেকে সরাসরি পাড়া টাটকা, কচকচে ও ভিটামিন-সি সমৃদ্ধ বন্য পাহাড়ি আমলকি।',
    shortDescEn: 'Crisp, orchard-fresh wild hill Amla packed with natural Vitamin C.',
    fullDescBn:
      'কোনো ফরমালিন বা কৃত্রিম সংরক্ষণ ছাড়াই সরাসরি পাহাড়ি বাগান থেকে সংগৃহীত তাজা আমলকি। কাঁচা খাওয়া, ভর্তা কিংবা ঘরে আচার-মোরব্বা বানানোর জন্য সেরা।',
    fullDescEn:
      'Harvested fresh from hill orchards and packed without chemicals. Ideal for eating raw with black salt, blending into juice, or making homemade preserves.',
    ingredientsBn: 'তাজা পাহাড়ি আমলকি (১০০% কেমিক্যালমুক্ত)।',
    ingredientsEn: 'Fresh wild hill Amla (100% chemical-free).',
    // REPLACE PHOTO: Real photo of fresh hill Amla basket
    image: '/src/assets/images/fruits_amla_boroi_tamarind_1794915902476.jpg',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 110 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 200 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 380 },
    ],
  },
  {
    id: 'boroi',
    slug: 'pahari-boroi',
    category: 'fruits',
    nameBn: 'বরই',
    nameEn: 'Jujube / Boroi',
    baseWeightBn: '৫০০ গ্রাম',
    baseWeightEn: '500g',
    price: 160,
    isPopular: false,
    spiceLevel: 'none',
    shortDescBn: 'টক-মিষ্টি স্বাদের তাজা পাহাড়ি দেশি বরই, ভর্তা ও আচারের জন্য দারুণ।',
    shortDescEn: 'Sweet-tart fresh hill Boroi (jujube), crisp and juicy straight from the orchard.',
    fullDescBn:
      'পাহাড়ি মাটির মিষ্টি-টক দেশি বরই। ধনিয়াপাতা, কাঁচামরিচ ও কাসুন্দি দিয়ে বরই ভর্তা কিংবা রোদে শুকিয়ে আচার তৈরির জন্য সবার প্রিয়।',
    fullDescEn:
      'Naturally ripened hill jujube with the classic sweet-and-sour balance—delicious eaten fresh, mashed with chili-cilantro, or sun-dried.',
    ingredientsBn: 'টাটকা পাহাড়ি দেশি বরই।',
    ingredientsEn: 'Fresh hill-grown Boroi (jujube).',
    // REPLACE PHOTO: Real photo of fresh hill Boroi
    image: '/src/assets/images/fruits_amla_boroi_tamarind_1794915902476.jpg',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 90 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 160 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 300 },
    ],
  },
  {
    id: 'tamarind',
    slug: 'pahari-tetul',
    category: 'fruits',
    nameBn: 'তেঁতুল',
    nameEn: 'Tamarind',
    baseWeightBn: '৫০০ গ্রাম',
    baseWeightEn: '500g',
    price: 140,
    isPopular: false,
    spiceLevel: 'none',
    shortDescBn: 'রসালো ও পরিষ্কার পাহাড়ি পাকা তেঁতুল—টক, ভর্তা ও চটপটির জন্য উপযুক্ত।',
    shortDescEn: 'Rich, tangy sun-ripened hill tamarind pods—cleaned and ready for sauces & pickles.',
    fullDescBn:
      'পাহাড়ি গাছের পাকা, মাংসল ও রসালো তেঁতুল। ডাল, মাছের টক, চটপটি-ফুচকার টক এবং ঘরোয়া আচারের জন্য সম্পূর্ণ পরিষ্কার করে প্যাক করা।',
    fullDescEn:
      'Plump, tangy hill tamarind pods packed cleanly for traditional Bangladeshi sour curries, fuchka water, and homemade chutneys.',
    ingredientsBn: 'খাঁটি পাকা পাহাড়ি তেঁতুল।',
    ingredientsEn: 'Pure sun-ripened hill tamarind.',
    // REPLACE PHOTO: Real photo of hill Tamarind pods
    image: '/src/assets/images/fruits_amla_boroi_tamarind_1794915902476.jpg',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 80 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 140 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 260 },
    ],
  },
  {
    id: 'churi-shutki',
    slug: 'pahari-churi-shutki',
    category: 'dry_others',
    nameBn: 'ক্যামিক্যালমুক্ত ছুরি শুঁটকি',
    nameEn: 'Chemical-Free Churi Shutki',
    baseWeightBn: '২৫০ গ্রাম',
    baseWeightEn: '250g',
    price: 480,
    isPopular: false,
    spiceLevel: 'none',
    shortDescBn: 'লবণ ও কীটনাশক ছাড়াই প্রাকৃতিক রোদে শুকানো পরিষ্কার ছুরি শুঁটকি।',
    shortDescEn: 'Naturally sun-dried ribbon fish (Churi Shutki) cured with zero chemicals or DDT.',
    fullDescBn:
      'সম্পূর্ণ পরিষ্কার পরিবেশে নেটে ঢেকে সূর্যের তাপে শুকানো ছুরি শুঁটকি। কোনো ক্ষতিকর কেমিক্যাল বা অতিরিক্ত লবণ নেই, রান্নার আগে পরিষ্কার করা সহজ ও ঘ্রাণ খাঁটি।',
    fullDescEn:
      'Hygienically sun-dried in covered nets without pesticides or heavy salt. Clean aroma and tender texture for traditional shutki bhuna.',
    ingredientsBn: '১০০% খাঁটি ছুরি মাছ (কোনো কেমিক্যাল নেই)।',
    ingredientsEn: '100% pure sun-dried ribbon fish (chemical-free).',
    // REPLACE PHOTO: Real photo of Kakoli's Shutki pack
    image: '/src/assets/images/shutki_wild_honey_1794915902669.jpg',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 480 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 920 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 1780 },
    ],
  },
  {
    id: 'wild-hill-honey',
    slug: 'bonyo-pahari-modhu',
    category: 'dry_others',
    nameBn: 'বন্য পাহাড়ি মধু',
    nameEn: 'Raw Wild Hill Honey',
    baseWeightBn: '৫০০ গ্রাম',
    baseWeightEn: '500g',
    price: 650,
    isPopular: true,
    spiceLevel: 'none',
    shortDescBn: 'গভীর পাহাড়ি বন থেকে সংগৃহীত প্রাকৃতিক কাঁচা ও আনফিল্টার্ড মধু।',
    shortDescEn: 'Unheated, unfiltered raw wildflower honey harvested from deep hill forests.',
    fullDescBn:
      'পাহাড়ি চাকভাঙা খাঁটি মধু, যা কোনো তাপ বা মেশিন ছাড়াই চাক থেকে ছেঁকে কাঁচের জারে ভরা হয়। এর প্রাকৃতিক এনজাইম ও বন্য ফুলের ঘ্রাণ অটুট থাকে।',
    fullDescEn:
      'Raw wild forest honey strained gently without heat processing so every natural enzyme and mountain wildflower note remains intact.',
    ingredientsBn: '১০০% প্রাকৃতিক বন্য পাহাড়ি মধু (চিনি বা সিরাপমুক্ত)।',
    ingredientsEn: '100% pure raw wild forest honey (no added sugar or syrup).',
    // REPLACE PHOTO: Real photo of wild hill honey jar
    image: '/src/assets/images/shutki_wild_honey_1794915902669.jpg',
    tagBn: 'খাঁটি চাকের মধু',
    tagEn: 'Raw Forest Honey',
    weightOptions: [
      { id: '250g', labelBn: '২৫০ গ্রাম', labelEn: '250g', price: 350 },
      { id: '500g', labelBn: '৫০০ গ্রাম', labelEn: '500g', price: 650 },
      { id: '1kg', labelBn: '১ কেজি', labelEn: '1kg', price: 1250 },
    ],
  },
];

export const OFFER_BANNERS: OfferBanner[] = [
  {
    id: 'combo-offer',
    kickerBn: 'স্পেশাল অফার',
    kickerEn: 'Signature Bundle',
    titleBn: 'তিন রকমের আচার কম্বো মাত্র ৳১,০০০',
    titleEn: '3-Pickle Combo Pack at ৳1,000',
    subtitleBn: 'মরিচ, রসুন-মিক্স ও জলপাই আচার (১.৫ কেজি) — ৳১৫০ সরাসরি সাশ্রয়!',
    subtitleEn: 'Chili, Garlic Mix & Olive pickles (1.5kg total) — save ৳150 today.',
    ctaBn: 'এখনই অর্ডার করুন',
    ctaEn: 'Order Now',
    targetProductId: 'three-pickle-combo',
    accentBg: 'from-[#235328] to-[#2E6B34]',
    image: '/src/assets/images/pickle_combo_trio_1794915901830.jpg',
  },
  {
    id: 'free-delivery',
    kickerBn: 'সারা দেশে ডেলিভারি',
    kickerEn: 'Nationwide COD',
    titleBn: '৳১,৫০০+ অর্ডারে ফ্রি হোম ডেলিভারি',
    titleEn: 'Free Delivery on Orders Above ৳1,500',
    subtitleBn: 'খাঁটি পাহাড়ি মশলা ও ফলের সাথে আচার নিন ক্যাশ অন ডেলিভারিতে।',
    subtitleEn: 'Mix pickles, pure spices & fresh hill fruits with Cash on Delivery.',
    ctaBn: 'সব পণ্য দেখুন',
    ctaEn: 'Browse Catalog',
    targetCategory: 'all',
    accentBg: 'from-[#7A4B06] to-[#B4690E]',
    image: '/src/assets/images/spices_turmeric_chili_1794915901664.jpg',
  },
  {
    id: 'seasonal-harvest',
    kickerBn: 'মৌসুমি সংগ্রহ',
    kickerEn: 'Fresh Hill Harvest',
    titleBn: 'বাগান থেকে তাজা আমলকি, বরই ও তেঁতুল',
    titleEn: 'Orchard-Fresh Amla, Boroi & Tamarind',
    subtitleBn: 'ফরমালিন ও কেমিক্যালমুক্ত মৌসুমি পাহাড়ি ফল সরাসরি আপনার বাসায়।',
    subtitleEn: 'Chemical-free seasonal hill fruits packed fresh to order.',
    ctaBn: 'ফল দেখুন',
    ctaEn: 'Explore Fruits',
    targetCategory: 'fruits',
    accentBg: 'from-[#8A1C1C] to-[#C62828]',
    image: '/src/assets/images/fruits_amla_boroi_tamarind_1794915902476.jpg',
  },
];

export const CUSTOMER_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    nameBn: 'ফারহানা আক্তার',
    nameEn: 'Farhana Akter',
    locationBn: 'ধানমন্ডি, ঢাকা',
    locationEn: 'Dhanmondi, Dhaka',
    productBn: 'তিন রকমের আচার কম্বো',
    productEn: '3-Pickle Combo',
    rating: 5,
    commentBn:
      'কম্বো প্যাকটা নিয়েছিলাম আম্মুর জন্য। মরিচ আর রসুন-মিক্স আচারের ঘ্রাণ একদম বাসার তৈরি আচারের মতো! একটুও অতিরিক্ত তেল বা ভিনেগারের গন্ধ নেই।',
    commentEn:
      'Ordered the combo pack for my mother. The Chili and Garlic Mix pickles smell genuinely homemade with pure mustard oil and zero harsh vinegar.',
    dateBn: 'অক্টোবর ২০২৬',
    dateEn: 'October 2026',
  },
  {
    id: 'rev-2',
    nameBn: 'মাহমুদুল হাসান',
    nameEn: 'Mahmudul Hasan',
    locationBn: 'নাসিরাবাদ, চট্টগ্রাম',
    locationEn: 'Nasirabad, Chattogram',
    productBn: 'পাহাড়ি মরিচের আচার ও হলুদ গুঁড়া',
    productEn: 'Hill Chili Pickle & Turmeric',
    rating: 5,
    commentBn:
      'হলুদের গুঁড়ার রঙ আর ঘ্রাণ দেখেই বোঝা যায় কতটা খাঁটি। আর মরিচের আচারটা খিচুড়ির সাথে অসাধারণ লেগেছে। ডেলিভারি প্যাকিংও খুব মজবুত ছিল।',
    commentEn:
      'You can tell how pure the turmeric is from its natural aroma alone. The chili pickle with khichuri was unforgettable, and packaging arrived leak-proof.',
    dateBn: 'নভেম্বর ২০২৬',
    dateEn: 'November 2026',
  },
  {
    id: 'rev-3',
    nameBn: 'সুমাইয়া ইসলাম',
    nameEn: 'Sumaiya Islam',
    locationBn: 'জিন্দাবাজার, সিলেট',
    locationEn: 'Zindabazar, Sylhet',
    productBn: 'জলপাইয়ের আচার ও আমলকি',
    productEn: 'Olive Pickle & Fresh Amla',
    rating: 5,
    commentBn:
      'ফেসবুক লাইভ আর Jk Kakoli Vlog দেখে প্রথম অর্ডার করেছিলাম। তাজা আমলকি আর জলপাইয়ের আচার দুটোই মন ভরে গেছে। আবারও অর্ডার করব ইনশাআল্লাহ।',
    commentEn:
      'First ordered after watching Jk Kakoli Vlog. Both the fresh Amla and Jolpai pickle exceeded expectations—will definitely reorder soon.',
    dateBn: 'সেপ্টেম্বর ২০২৬',
    dateEn: 'September 2026',
  },
  {
    id: 'rev-4',
    nameBn: 'তানভীর আহমেদ',
    nameEn: 'Tanvir Ahmed',
    locationBn: 'কান্দিরপাড়, কুমিল্লা',
    locationEn: 'Kandirpar, Cumilla',
    productBn: 'বন্য পাহাড়ি মধু ও ছুরি শুঁটকি',
    productEn: 'Wild Hill Honey & Churi Shutki',
    rating: 5,
    commentBn:
      'চাকের মধু আর কেমিক্যালমুক্ত শুঁটকি একসাথে নিয়েছিলাম। শুঁটকিতে কোনো বাজে গন্ধ ছিল না, খুবই পরিষ্কার। ক্যাশ অন ডেলিভারিতে ঝামেলাহীন পেলাম।',
    commentEn:
      'Tried both the raw forest honey and chemical-free shutki. Extremely clean preparation and smooth cash-on-delivery service.',
    dateBn: 'নভেম্বর ২০২৬',
    dateEn: 'November 2026',
  },
];
