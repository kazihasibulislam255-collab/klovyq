import { Link } from 'react-router-dom';
import { X, ChevronRight, Home, Sparkles, Tag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CategoryDrawer({ open, onClose }: CategoryDrawerProps) {
  const { categories } = useStore();

  const drawerCategories = [
    categories.find(c => c.slug === 'stock-clearance'),
    categories.find(c => c.slug === 'glasses'),
    categories.find(c => c.slug === 'wallets'),
    categories.find(c => c.slug === 'caps'),
    categories.find(c => c.slug === 'lifestyle'),
    categories.find(c => c.slug === 'panjabi'),
    categories.find(c => c.slug === 'shoes'),
    categories.find(c => c.slug === 'bags'),
    categories.find(c => c.slug === 'clothing'),
    categories.find(c => c.slug === 'belts'),
  ].filter(Boolean);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-ink-900 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-white">Klovyq</h2>
            <p className="text-xs text-ink-300 mt-0.5">Modern Style, Everyday Choice</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-3 gap-2 p-3 border-b border-ink-50">
          <Link
            to="/"
            onClick={onClose}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl hover:bg-ink-50 transition-colors"
          >
            <Home size={20} className="text-ink-700" />
            <span className="text-xs font-medium text-ink-700">Home</span>
          </Link>
          <Link
            to="/category/new-arrivals"
            onClick={onClose}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl hover:bg-ink-50 transition-colors"
          >
            <Sparkles size={20} className="text-success-600" />
            <span className="text-xs font-medium text-ink-700">New Arrivals</span>
          </Link>
          <Link
            to="/category/all"
            onClick={onClose}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl hover:bg-ink-50 transition-colors"
          >
            <Tag size={20} className="text-ink-700" />
            <span className="text-xs font-medium text-ink-700">All Products</span>
          </Link>
        </div>

        {/* Categories list */}
        <div className="overflow-y-auto flex-1">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide px-5 pt-3 pb-1">Categories</p>
          {drawerCategories.map(cat => (
            <Link
              key={cat!.id}
              to={`/category/${cat!.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-3 hover:bg-ink-50 transition-colors border-b border-ink-50/70"
            >
              <img
                src={cat!.image}
                alt={cat!.name}
                className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
              />
              <span className={`font-medium flex-1 ${cat!.slug === 'stock-clearance' ? 'text-danger-600' : 'text-ink-800'}`}>
                {cat!.name}
              </span>
              <ChevronRight size={16} className="text-ink-300" />
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-ink-50 p-4">
          <p className="text-xs text-ink-400 text-center">Hotline: +880 1700-000000</p>
        </div>
      </aside>
    </>
  );
}
