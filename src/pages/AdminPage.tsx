import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { formatBDT } from '@/data/mockData';
import type { OrderStatus, Product } from '@/types';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tags, TrendingUp,
  Plus, Edit2, Trash2, X, Search, DollarSign, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';

const STATUS_OPTIONS: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-gold-100 text-gold-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-gold-100 text-gold-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-success-100 text-success-700',
  cancelled: 'bg-danger-100 text-danger-700',
};

type AdminTab = 'dashboard' | 'products' | 'orders' | 'customers' | 'categories';

export default function AdminPage() {
  const {
    products, categories, orders,
    addProduct, updateProduct, deleteProduct,
    addCategory, deleteCategory,
    updateOrderStatus, customerCount,
  } = useStore();

  const [tab, setTab] = useState<AdminTab>('dashboard');
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const lowStock = products.filter(p => p.stockCount > 0 && p.stockCount < 10).length;
  const outOfStock = products.filter(p => !p.inStock).length;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ink-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-ink-900">Admin Dashboard</h1>
            <p className="text-sm text-ink-400 mt-1">Manage your store</p>
          </div>
          <a href="/" className="text-sm font-medium text-ink-500 hover:text-ink-900">← Back to Store</a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar mb-6 border-b border-ink-100">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { key: 'products', label: 'Products', icon: Package },
            { key: 'orders', label: 'Orders', icon: ShoppingBag },
            { key: 'customers', label: 'Customers', icon: Users },
            { key: 'categories', label: 'Categories', icon: Tags },
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key as AdminTab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  tab === t.key ? 'border-ink-900 text-ink-900' : 'border-transparent text-ink-400 hover:text-ink-700'
                }`}
              >
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Revenue', value: formatBDT(totalRevenue), icon: DollarSign, trend: '+12%', up: true, color: 'bg-success-500' },
                { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingBag, trend: '+8%', up: true, color: 'bg-blue-500' },
                { label: 'Products', value: products.length.toString(), icon: Package, trend: `${outOfStock} out of stock`, up: false, color: 'bg-gold-500' },
                { label: 'Customers', value: customerCount.toString(), icon: Users, trend: '+5%', up: true, color: 'bg-indigo-500' },
              ].map(card => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className={`text-xs font-medium flex items-center gap-0.5 ${card.up ? 'text-success-600' : 'text-ink-400'}`}>
                        {card.up && <ArrowUpRight size={14} />}
                        {card.trend}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-ink-900">{card.value}</p>
                    <p className="text-sm text-ink-400 mt-1">{card.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Sales chart placeholder */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-ink-900 flex items-center gap-2">
                  <TrendingUp size={18} /> Sales Overview
                </h3>
              </div>
              <div className="flex items-end gap-2 h-48">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const heights = [40, 65, 45, 80, 55, 90, 70];
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-ink-900 to-ink-600 rounded-t-lg transition-all hover:from-gold-500 hover:to-gold-400"
                        style={{ height: `${heights[i]}%` }}
                      />
                      <span className="text-xs text-ink-400">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent orders */}
            <div className="card p-6">
              <h3 className="font-semibold text-ink-900 mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink-100 text-ink-400 text-xs uppercase">
                      <th className="text-left py-2.5 pr-4">Order</th>
                      <th className="text-left py-2.5 pr-4">Customer</th>
                      <th className="text-left py-2.5 pr-4 hidden md:table-cell">Date</th>
                      <th className="text-right py-2.5 pr-4">Total</th>
                      <th className="text-left py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-b border-ink-50">
                        <td className="py-3 pr-4 font-medium text-ink-900">{order.orderNumber}</td>
                        <td className="py-3 pr-4 text-ink-600">{order.customerName}</td>
                        <td className="py-3 pr-4 text-ink-400 hidden md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 pr-4 font-bold text-ink-900 text-right">{formatBDT(order.total)}</td>
                        <td className="py-3">
                          <span className={`badge ${STATUS_COLORS[order.status]} capitalize`}>{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Alerts */}
            <div className="grid md:grid-cols-2 gap-4">
              {pendingOrders > 0 && (
                <div className="card p-4 border-l-4 border-gold-400">
                  <p className="text-sm font-semibold text-ink-900">{pendingOrders} Pending Orders</p>
                  <p className="text-xs text-ink-400 mt-1">Orders waiting for confirmation</p>
                </div>
              )}
              {lowStock > 0 && (
                <div className="card p-4 border-l-4 border-danger-400">
                  <p className="text-sm font-semibold text-ink-900">{lowStock} Low Stock Products</p>
                  <p className="text-xs text-ink-400 mt-1">Products with less than 10 in stock</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products */}
        {tab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-ink-200 text-sm focus:outline-none focus:border-ink-400"
                />
              </div>
              <button
                onClick={() => { setEditingProduct(null); setShowProductForm(true); }}
                className="btn-primary"
              >
                <Plus size={18} /> Add Product
              </button>
            </div>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink-100 text-ink-400 text-xs uppercase">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4 hidden md:table-cell">Category</th>
                      <th className="text-right py-3 px-4">Price</th>
                      <th className="text-center py-3 px-4 hidden sm:table-cell">Stock</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="border-b border-ink-50 hover:bg-ink-50/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                            <span className="font-medium text-ink-900 line-clamp-1 max-w-[200px]">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-ink-600 capitalize hidden md:table-cell">{product.category.replace('-', ' ')}</td>
                        <td className="py-3 px-4 font-bold text-ink-900 text-right">{formatBDT(product.price)}</td>
                        <td className="py-3 px-4 text-center hidden sm:table-cell">
                          <span className={product.stockCount < 10 ? 'text-danger-600 font-medium' : 'text-ink-600'}>
                            {product.stockCount}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {product.inStock ? (
                            <span className="badge bg-success-100 text-success-700">Active</span>
                          ) : (
                            <span className="badge bg-ink-800 text-white">Stock Out</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => { setEditingProduct(product); setShowProductForm(true); }}
                              className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="w-8 h-8 rounded-lg hover:bg-danger-50 flex items-center justify-center text-danger-500"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
        {tab === 'orders' && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-ink-400 text-xs uppercase">
                    <th className="text-left py-3 px-4">Order</th>
                    <th className="text-left py-3 px-4 hidden md:table-cell">Customer</th>
                    <th className="text-left py-3 px-4 hidden lg:table-cell">Items</th>
                    <th className="text-right py-3 px-4">Total</th>
                    <th className="text-center py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-ink-50 hover:bg-ink-50/50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-ink-900">{order.orderNumber}</p>
                        <p className="text-xs text-ink-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <p className="text-ink-900">{order.customerName}</p>
                        <p className="text-xs text-ink-400">{order.phone}</p>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell text-ink-600">{order.items.length} items</td>
                      <td className="py-3 px-4 font-bold text-ink-900 text-right">{formatBDT(order.total)}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 cursor-pointer capitalize ${STATUS_COLORS[order.status]}`}
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s} className="capitalize bg-white text-ink-900">{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers */}
        {tab === 'customers' && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-ink-400 text-xs uppercase">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4 hidden md:table-cell">Contact</th>
                    <th className="text-center py-3 px-4">Orders</th>
                    <th className="text-right py-3 px-4">Total Spent</th>
                    <th className="text-left py-3 px-4 hidden sm:table-cell">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'u1', name: 'Rahim Ahmed', email: 'rahim@example.com', phone: '+8801712345678', totalOrders: 12, totalSpent: 34890, joinedAt: '2024-03-15' },
                    { id: 'u2', name: 'Sadia Islam', email: 'sadia@example.com', phone: '+8801823456789', totalOrders: 8, totalSpent: 21990, joinedAt: '2024-06-20' },
                    { id: 'u3', name: 'Karim Hassan', email: 'karim@example.com', phone: '+8801934567890', totalOrders: 5, totalSpent: 12450, joinedAt: '2024-08-10' },
                    { id: 'u4', name: 'Nusrat Jahan', email: 'nusrat@example.com', phone: '+8801612345671', totalOrders: 15, totalSpent: 42600, joinedAt: '2023-12-05' },
                    { id: 'u5', name: 'Arif Rahman', email: 'arif@example.com', phone: '+8801512345672', totalOrders: 3, totalSpent: 5670, joinedAt: '2025-01-22' },
                  ].map(customer => (
                    <tr key={customer.id} className="border-b border-ink-50 hover:bg-ink-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-ink-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {customer.name.charAt(0)}
                          </div>
                          <span className="font-medium text-ink-900">{customer.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <p className="text-ink-600 text-xs">{customer.email}</p>
                        <p className="text-ink-400 text-xs">{customer.phone}</p>
                      </td>
                      <td className="py-3 px-4 text-center text-ink-600">{customer.totalOrders}</td>
                      <td className="py-3 px-4 font-bold text-ink-900 text-right">{formatBDT(customer.totalSpent)}</td>
                      <td className="py-3 px-4 text-ink-400 hidden sm:table-cell text-xs">{new Date(customer.joinedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories */}
        {tab === 'categories' && (
          <div className="space-y-4">
            <button
              onClick={() => {
                const name = prompt('Enter category name:');
                if (name) {
                  addCategory({
                    name,
                    slug: name.toLowerCase().replace(/\s+/g, '-') as any,
                    image: 'https://images.pexels.com/photos/27046146/pexels-photo-27046146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
                  });
                }
              }}
              className="btn-primary"
            >
              <Plus size={18} /> Add Category
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="card p-4 text-center group">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-danger-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="font-medium text-ink-900 text-sm">{cat.name}</p>
                  <p className="text-xs text-ink-400 mt-0.5 capitalize">{cat.slug.replace('-', ' ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product form modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSave={(data) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, data);
            } else {
              addProduct({
                ...data,
                slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
                images: data.images.length > 0 ? data.images : ['https://images.pexels.com/photos/27046146/pexels-photo-27046146.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
                reviewCount: 0,
                rating: 0,
                description: data.description || 'No description available.',
                specifications: data.specifications || [],
                deliveryInfo: 'Free delivery on orders over ৳2000. Standard delivery in 2-4 business days.',
                variants: data.variants || { sizes: ['One Size'], colors: [{ name: 'Black', hex: '#1a1a1a' }] },
                popularity: 50,
                isBestSeller: false,
                isNewArrival: true,
                isStockClearance: false,
              } as any);
            }
            setShowProductForm(false);
            setEditingProduct(null);
          }}
          onClose={() => { setShowProductForm(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}

interface ProductFormProps {
  product: Product | null;
  categories: { id: string; name: string; slug: string }[];
  onSave: (data: Partial<Product>) => void;
  onClose: () => void;
}

function ProductForm({ product, categories, onSave, onClose }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [price, setPrice] = useState(product?.price ?? 0);
  const [previousPrice, setPreviousPrice] = useState(product?.previousPrice ?? 0);
  const [category, setCategory] = useState(product?.category ?? 'shoes');
  const [stockCount, setStockCount] = useState(product?.stockCount ?? 0);
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [description, setDescription] = useState(product?.description ?? '');
  const [imageUrl, setImageUrl] = useState(product?.images[0] ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      price: Number(price),
      previousPrice: Number(previousPrice),
      category: category as any,
      stockCount: Number(stockCount),
      inStock,
      description,
      images: imageUrl ? [imageUrl] : [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-ink-100 sticky top-0 bg-white">
          <h3 className="font-semibold text-ink-900">{product ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-ink-50 flex items-center justify-center">
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink-700 mb-1.5 block">Product Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-ink-700 mb-1.5 block">Price (৳)</label>
              <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required min="0" className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-ink-700 mb-1.5 block">Previous Price (৳)</label>
              <input type="number" value={previousPrice} onChange={e => setPreviousPrice(Number(e.target.value))} min="0" className="input-field" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-ink-700 mb-1.5 block">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value as any)} className="input-field">
              {categories.map(c => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-ink-700 mb-1.5 block">Stock Count</label>
              <input type="number" value={stockCount} onChange={e => setStockCount(Number(e.target.value))} min="0" className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-ink-700 mb-1.5 block">Availability</label>
              <select value={inStock ? 'yes' : 'no'} onChange={e => setInStock(e.target.value === 'yes')} className="input-field">
                <option value="yes">In Stock</option>
                <option value="no">Stock Out</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-ink-700 mb-1.5 block">Image URL</label>
            <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." className="input-field" />
            {imageUrl && <img src={imageUrl} alt="Preview" className="w-20 h-20 rounded-lg object-cover mt-2" />}
          </div>
          <div>
            <label className="text-sm font-medium text-ink-700 mb-1.5 block">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="input-field" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 btn-outline">Cancel</button>
            <button type="submit" className="flex-1 btn-primary">{product ? 'Save Changes' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
