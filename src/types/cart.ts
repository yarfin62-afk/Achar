export interface CartItem {
  key: string; // `${productId}__${weightId}`
  productId: string;
  nameBn: string;
  nameEn: string;
  weightId: string;
  weightLabelBn: string;
  weightLabelEn: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export type DeliveryArea = 'dhaka' | 'outside';

export interface SavedCustomerInfo {
  name: string;
  phone: string;
  address: string;
  area: DeliveryArea;
}

export interface DemoOrderRecord {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: SavedCustomerInfo;
}
