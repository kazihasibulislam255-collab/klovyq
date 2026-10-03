export type CategorySlug =
  | 'shoes'
  | 'bags'
  | 'clothing'
  | 'belts'
  | 'wallets'
  | 'caps'
  | 'glasses'
  | 'lifestyle'
  | 'panjabi'
  | 'new-arrivals'
  | 'stock-clearance';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  image: string;
  description?: string;
}

export interface ProductVariant {
  sizes: string[];
  colors: { name: string; hex: string }[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  images: string[];
  price: number;
  previousPrice: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isStockClearance: boolean;
  description: string;
  specifications: { label: string; value: string }[];
  deliveryInfo: string;
  variants: ProductVariant;
  createdAt: string;
  popularity: number;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  area: string;
  deliveryOption: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
}

export interface FilterState {
  search: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  minDiscount: number;
  minRating: number;
  inStockOnly: boolean;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'popularity' | 'discount';
