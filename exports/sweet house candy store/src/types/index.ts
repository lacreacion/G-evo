export interface GEvoMetadata {
  gEvoId: string;
  barcode: string;
  stock: number;
  syncStatus: 'synced' | 'pending' | 'offline';
  dynamicImageEndpoint: string;
  lastModified: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  categoryName: string;
  costPrice?: number;
  price: number;
  oldPrice?: number | null;
  promoDiscountPercent?: number | null;
  isBlocked?: boolean;
  weight: string;
  badge?: string | null;
  rating: number;
  reviews: number;
  flavors: string[];
  description: string;
  image: string;
  gEvo: GEvoMetadata;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  sku: string;
  name: string;
  price: number;
  costPrice?: number;
  wasPromo?: boolean;
  image: string;
  weight: string;
  categoryName?: string;
  quantity: number;
  gEvoId?: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  freeShipping?: boolean;
  description: string;
}

export interface CustomerData {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export type OrderDeliveryStatus = 'PENDIENTE' | 'PAGADO' | 'ENVIADO' | 'ENTREGADO';

export interface Order {
  id: string;
  paymentReference?: string;
  date: string;
  timestamp: number;
  customer: CustomerData;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  estimatedFee?: number;
  netProfit?: number;
  orderStatus?: OrderDeliveryStatus;
  status: string;
  statusClass?: string;
  trackingCode: string;
}

export interface StorySlide {
  type: 'image' | 'video';
  url: string;
  caption: string;
  timeAgo: string;
  productLinkSku?: string | null;
  ctaText?: string;
}

export interface Story {
  id: string;
  user: string;
  title: string;
  avatar: string;
  isLive: boolean;
  hasUnseen: boolean;
  slides: StorySlide[];
}

