import { Link } from 'react-router-dom';
import { Home, Phone, Tag, MessageCircle, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function MobileNav() {
  const location = useLocation();
  const items = [
    { to: '/', label: 'Home', icon: Home },
    { to: 'tel:+8801700000000', label: 'Contact', icon: Phone, external: true },
    { to: '/category/stock-clearance', label: 'Offers', icon: Tag },
    { to: 'https://wa.me/8801700000000', label: 'WhatsApp', icon: MessageCircle, external: true },
    { to: '/account', label: 'Account', icon: User },
  ];

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ink-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {items.map(item => {
          const Icon = item.icon;
          const active = !item.external && isActive(item.to);
          if (item.external) {
            const isWhatsApp = item.label === 'WhatsApp';
            return (
              <a
                key={item.label}
                href={item.to}
                target={item.label === 'WhatsApp' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  isWhatsApp ? 'text-success-600' : 'text-ink-500'
                }`}
              >
                <Icon size={21} />
                <span className="text-[9px] font-medium">{item.label}</span>
              </a>
            );
          }
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 transition-colors ${
                active ? 'text-ink-900' : 'text-ink-400 hover:text-ink-700'
              }`}
            >
              <Icon size={21} className={active ? 'fill-ink-100' : ''} />
              <span className="text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
