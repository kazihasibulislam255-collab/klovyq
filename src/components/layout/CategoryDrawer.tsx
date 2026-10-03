import { Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
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
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-ink-100">
          <h2 className="font-serif text-xl font-bold text-ink-900">Categories</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-ink-50 flex items-center justify-center text-ink-600"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-65px)]">
          <Link
            to="/category/all"
            onClick={onClose}
            className="flex items-center justify-between px-5 py-3.5 hover:bg-ink-50 transition-colors border-b border-ink-50"
          >
            <span className="font-medium text-ink-800">All Products</span>
            <ChevronRight size={18} className="text-ink-300" />
          </Link>

          {drawerCategories.map(cat => (
            <Link
              key={cat!.id}
              to={`/category/${cat!.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-50 transition-colors border-b border-ink-50"
            >
              <img
                src={cat!.image}
                alt={cat!.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="font-medium text-ink-800 flex-1">{cat!.name}</span>
              <ChevronRight size={18} className="text-ink-300" />
            </Link>
          ))}

          <div className="p-4 mt-2">
            <Link
              to="/category/new-arrivals"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-success-500 text-white font-medium py-3 rounded-xl hover:bg-success-600 transition-colors"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
