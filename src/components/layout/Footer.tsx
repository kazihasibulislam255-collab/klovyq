import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useState } from 'react';

export default function Footer() {
  const { categories } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const mainCategories = categories.filter(c => !['new-arrivals', 'stock-clearance'].includes(c.slug));

  return (
    <footer className="bg-ink-900 text-ink-200 mt-16">
      {/* Newsletter */}
      <div className="border-b border-ink-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stay in Style</h3>
              <p className="text-ink-300 text-sm">Subscribe to get exclusive offers, new arrivals, and style updates delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-ink-800 text-white placeholder-ink-400 border border-ink-700 focus:border-gold-400 focus:outline-none text-sm"
              />
              <button type="submit" className="btn-gold">
                {subscribed ? 'Subscribed!' : (
                  <>
                    <Send size={16} />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <h2 className="font-serif text-2xl font-bold text-white mb-3">Klovyq</h2>
            <p className="text-sm text-ink-300 mb-4 max-w-xs">
              Modern Style, Everyday Choice. Premium fashion and lifestyle products for the modern Bangladeshi.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-ink-800 flex items-center justify-center hover:bg-gold-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-ink-800 flex items-center justify-center hover:bg-gold-500 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://wa.me/8801700000000" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-ink-800 flex items-center justify-center hover:bg-success-500 transition-colors">
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {mainCategories.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="text-ink-300 hover:text-gold-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/category/new-arrivals" className="text-ink-300 hover:text-gold-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/category/stock-clearance" className="text-ink-300 hover:text-gold-400 transition-colors">Stock Clearance</Link></li>
              <li><Link to="/cart" className="text-ink-300 hover:text-gold-400 transition-colors">Cart</Link></li>
              <li><Link to="/wishlist" className="text-ink-300 hover:text-gold-400 transition-colors">Wishlist</Link></li>
              <li><Link to="/account" className="text-ink-300 hover:text-gold-400 transition-colors">My Account</Link></li>
              <li><Link to="/admin" className="text-ink-300 hover:text-gold-400 transition-colors">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm text-ink-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Dhanmondi, Dhaka-1205, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <span>support@klovyq.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-700 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>&copy; 2025 Klovyq. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Cash on Delivery</span>
            <span>bKash</span>
            <span>Nagad</span>
            <span>SSL Commerz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
