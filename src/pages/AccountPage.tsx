import { useState } from 'react';
import { User, Package, Heart, MapPin, LogOut, Settings } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatBDT } from '@/data/mockData';
import type { OrderStatus } from '@/types';
import { Link } from 'react-router-dom';

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-gold-100 text-gold-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-gold-100 text-gold-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-success-100 text-success-700',
  cancelled: 'bg-danger-100 text-danger-700',
};

export default function AccountPage() {
  const { orders } = useStore();
  const { count: wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');

  const sampleOrders = orders.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-28 lg:pb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-ink-900 mb-6">My Account</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-ink-50">
              <div className="w-12 h-12 rounded-full bg-ink-900 text-white flex items-center justify-center font-bold text-lg">
                G
              </div>
              <div>
                <p className="font-semibold text-ink-900">Guest User</p>
                <p className="text-xs text-ink-400">Not signed in</p>
              </div>
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'profile' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-50'}`}
              >
                <User size={18} /> Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-50'}`}
              >
                <Package size={18} /> Orders
              </button>
              <Link to="/wishlist" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-600 hover:bg-ink-50">
                <Heart size={18} /> Wishlist ({wishlistCount})
              </Link>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-600 hover:bg-ink-50">
                <MapPin size={18} /> Addresses
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-600 hover:bg-ink-50">
                <Settings size={18} /> Settings
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-danger-600 hover:bg-danger-50">
                <LogOut size={18} /> Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card p-6">
              <h3 className="font-semibold text-ink-900 mb-4">Profile Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-ink-700 mb-1.5 block">Full Name</label>
                  <input type="text" placeholder="Enter your name" className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-700 mb-1.5 block">Phone</label>
                  <input type="tel" placeholder="01XXXXXXXXX" className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-700 mb-1.5 block">Email</label>
                  <input type="email" placeholder="your@email.com" className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium text-ink-700 mb-1.5 block">City</label>
                  <input type="text" placeholder="Dhaka" className="input-field" />
                </div>
              </div>
              <button className="btn-primary mt-4">Save Changes</button>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              {sampleOrders.length === 0 ? (
                <div className="card p-8 text-center">
                  <Package size={36} className="text-ink-300 mx-auto mb-3" />
                  <p className="text-ink-400">No orders yet.</p>
                </div>
              ) : (
                sampleOrders.map(order => (
                  <div key={order.id} className="card p-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                      <div>
                        <p className="font-semibold text-ink-900">{order.orderNumber}</p>
                        <p className="text-xs text-ink-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`badge ${STATUS_COLORS[order.status]} capitalize`}>{order.status}</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                      {order.items.map((item, i) => (
                        <img key={i} src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-50">
                      <span className="text-sm text-ink-500">{order.items.length} item(s)</span>
                      <span className="font-bold text-ink-900">{formatBDT(order.total)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
