import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Product, Category, Order, OrderStatus } from '@/types';
import { products as initialProducts, categories as initialCategories, customers as initialCustomers } from '@/data/mockData';
import { supabase } from '@/lib/supabase';

interface StoreContextValue {
  products: Product[];
  categories: Category[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'orderNumber'>) => Promise<string>;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  customerCount: number;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const SEED_ORDERS: Order[] = [
  {
    id: 'o1',
    orderNumber: 'KLVQ-2025-0001',
    customerName: 'Rahim Ahmed',
    phone: '+8801712345678',
    email: 'rahim@example.com',
    address: 'House 42, Road 5, Dhanmondi',
    city: 'Dhaka',
    area: 'Dhanmondi',
    deliveryOption: 'Standard',
    items: [
      { productId: 'p1', name: 'Classic Oxford Leather Shoes', image: initialProducts[0].images[0], price: 2890, quantity: 1, size: '42', color: 'Black' },
      { productId: 'p22', name: 'Handcrafted Leather Wallet', image: initialProducts[18].images[0], price: 690, quantity: 2, size: 'One Size', color: 'Brown' },
    ],
    subtotal: 4270,
    discount: 200,
    deliveryCharge: 60,
    total: 4130,
    paymentMethod: 'Cash on Delivery',
    status: 'delivered',
    createdAt: '2025-09-20T10:30:00Z',
  },
  {
    id: 'o2',
    orderNumber: 'KLVQ-2025-0002',
    customerName: 'Sadia Islam',
    phone: '+8801823456789',
    email: 'sadia@example.com',
    address: 'Flat 3B, Gulshan 2',
    city: 'Dhaka',
    area: 'Gulshan',
    deliveryOption: 'Express',
    items: [
      { productId: 'p7', name: 'Luxury Black Leather Handbag', image: initialProducts[6].images[0], price: 3490, quantity: 1, size: 'One Size', color: 'Black' },
    ],
    subtotal: 3490,
    discount: 0,
    deliveryCharge: 100,
    total: 3590,
    paymentMethod: 'Cash on Delivery',
    status: 'shipped',
    createdAt: '2025-09-28T14:15:00Z',
  },
  {
    id: 'o3',
    orderNumber: 'KLVQ-2025-0003',
    customerName: 'Karim Hassan',
    phone: '+8801934567890',
    email: 'karim@example.com',
    address: '13 Kazi Nazrul Islam Road, Mohammadpur',
    city: 'Dhaka',
    area: 'Mohammadpur',
    deliveryOption: 'Standard',
    items: [
      { productId: 'p25', name: 'Premium Cotton Panjabi — White', image: initialProducts[24].images[0], price: 1490, quantity: 2, size: 'L', color: 'White' },
    ],
    subtotal: 2980,
    discount: 150,
    deliveryCharge: 60,
    total: 2890,
    paymentMethod: 'Cash on Delivery',
    status: 'processing',
    createdAt: '2025-10-01T09:00:00Z',
  },
  {
    id: 'o4',
    orderNumber: 'KLVQ-2025-0004',
    customerName: 'Nusrat Jahan',
    phone: '+8801612345671',
    email: 'nusrat@example.com',
    address: 'House 101, Banani DOHS',
    city: 'Dhaka',
    area: 'Banani',
    deliveryOption: 'Express',
    items: [
      { productId: 'p28', name: 'Designer Aviator Sunglasses', image: initialProducts[27].images[0], price: 890, quantity: 1, size: 'One Size', color: 'Black' },
      { productId: 'p20', name: 'Classic Black Sports Cap', image: initialProducts[19].images[0], price: 490, quantity: 1, size: 'One Size', color: 'Black' },
    ],
    subtotal: 1380,
    discount: 0,
    deliveryCharge: 100,
    total: 1480,
    paymentMethod: 'Cash on Delivery',
    status: 'pending',
    createdAt: '2025-10-02T16:45:00Z',
  },
];

function mapDbOrder(row: any): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    city: row.city,
    area: row.area,
    deliveryOption: row.delivery_option,
    items: row.items ?? [],
    subtotal: Number(row.subtotal),
    discount: Number(row.discount),
    deliveryCharge: Number(row.delivery_charge),
    total: Number(row.total),
    paymentMethod: row.payment_method,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [customerCount] = useState(initialCustomers.length);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setOrders(data.map(mapDbOrder));
      }
    })();
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id' | 'createdAt'>) => {
    setProducts(prev => [
      { ...product, id: `p${Date.now()}`, createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    setCategories(prev => [...prev, { ...category, id: `c${Date.now()}` }]);
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  const addOrder = useCallback(async (order: Omit<Order, 'id' | 'createdAt' | 'orderNumber'>) => {
    const orderNumber = `KLVQ-2025-${String(Date.now()).slice(-4)}`;
    const newOrder: Order = {
      ...order,
      id: `o${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: order.customerName,
          phone: order.phone,
          email: order.email,
          address: order.address,
          city: order.city,
          area: order.area,
          delivery_option: order.deliveryOption,
          items: order.items,
          subtotal: order.subtotal,
          discount: order.discount,
          delivery_charge: order.deliveryCharge,
          total: order.total,
          payment_method: order.paymentMethod,
          status: order.status,
        })
        .select('id')
        .maybeSingle();

      if (error) {
        console.error('Supabase order save failed:', error.message);
      } else if (data) {
        newOrder.id = data.id;
        setOrders(prev => prev.map(o => (o.orderNumber === orderNumber ? { ...o, id: data.id } : o)));
      }
    } catch (err) {
      console.error('Supabase order save error:', err);
    }

    return orderNumber;
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
    supabase.from('orders').update({ status }).eq('id', id).then(({ error }) => {
      if (error) console.error('Failed to update order status in Supabase:', error.message);
    });
  }, []);

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addOrder,
        updateOrderStatus,
        customerCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
