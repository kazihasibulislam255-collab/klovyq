import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useStore } from '@/context/StoreContext';

interface HeaderProps {
  onOpenCategories: () => void;
}

export default function Header({ onOpenCategories }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { categories } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const mainCategories = categories.filter(c => !['new-arrivals', 'stock-clearance'].includes(c.slug));

  return (
    <>
      {/* Top bar — desktop only */}
      <div className="bg-ink-900 text-ink-200 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>Fast delivery: Standard 2–4 days / Express 1–2 days</span>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link>
            <span>Hotline: +880 1700-000000</span>
          </div>
        </div>
      </div>

      {/* Main header — compact on mobile */}
      <header className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 md:h-20 gap-2 sm:gap-4">
            {/* Hamburger — mobile */}
            <button
              onClick={onOpenCategories}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-ink-700 hover:text-ink-900 flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-ink-900">
                Klovyq
              </span>
            </Link>

            {/* Search — desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for products, categories..."
                  className="w-full pl-4 pr-12 py-2.5 rounded-full border border-ink-200 bg-ink-50 text-sm focus:bg-white focus:border-ink-400 focus:ring-2 focus:ring-ink-100 focus:outline-none transition-all"
                />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink-900 text-white flex items-center justify-center hover:bg-ink-800 transition-colors">
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0">
              {/* Search — mobile */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-ink-50 flex items-center justify-center text-ink-700"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              {/* Wishlist */}
              <Link to="/wishlist" className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-ink-50 flex items-center justify-center text-ink-700 hover:text-ink-900 transition-colors" aria-label="Wishlist">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-danger-500 text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              {/* Cart */}
              <Link to="/cart" className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-ink-50 flex items-center justify-center text-ink-700 hover:text-ink-900 transition-colors" aria-label="Cart">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-gold-500 text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              {/* Account */}
              <Link to="/account" className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-ink-50 text-ink-700 hover:text-ink-900 transition-colors" aria-label="Account">
                <User size={22} />
                <span className="text-sm font-medium">Account</span>
              </Link>
              {/* Account — mobile icon only */}
              <Link to="/account" className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-ink-50 flex items-center justify-center text-ink-700 hover:text-ink-900 transition-colors" aria-label="Account">
                <User size={20} />
              </Link>
            </div>
          </div>

          {/* Category nav — desktop */}
          <nav className="hidden lg:flex items-center gap-1 h-12 border-t border-ink-50">
            <button
              onClick={onOpenCategories}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 hover:bg-ink-50 rounded-lg transition-all"
            >
              <Menu size={16} />
              All Categories
              <ChevronDown size={14} />
            </button>
            <Link to="/" className="px-3 py-2 text-sm font-medium text-ink-600 hover:text-ink-900 hover:bg-ink-50 rounded-lg transition-all">Home</Link>
            {mainCategories.slice(0, 8).map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-ink-600 hover:text-ink-900 hover:bg-ink-50 rounded-lg transition-all"
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/category/new-arrivals" className="px-3 py-2 text-sm font-medium text-success-600 hover:bg-success-50 rounded-lg transition-all">New Arrivals</Link>
            <Link to="/category/stock-clearance" className="px-3 py-2 text-sm font-medium text-danger-600 hover:bg-danger-50 rounded-lg transition-all">Stock Clearance</Link>
          </nav>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden border-t border-ink-100 p-3 animate-slide-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                autoFocus
                className="w-full pl-4 pr-12 py-2.5 rounded-full border border-ink-200 bg-ink-50 text-sm focus:bg-white focus:border-ink-400 focus:outline-none"
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink-900 text-white flex items-center justify-center">
                <Search size={16} />
              </button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}
