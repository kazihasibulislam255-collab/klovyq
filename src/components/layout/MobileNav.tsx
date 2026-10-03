import { Link } from 'react-router-dom';
import { Home, LayoutGrid, Tag, MessageCircle, User } from 'lucide-react';

export default function MobileNav() {
  const items = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/category/all', label: 'Categories', icon: LayoutGrid },
    { to: '/category/stock-clearance', label: 'Offers', icon: Tag },
    { to: 'https://wa.me/8801700000000', label: 'WhatsApp', icon: MessageCircle, external: true },
    { to: '/account', label: 'Account', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ink-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16">
        {items.map(item => {
          const Icon = item.icon;
          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 text-success-600"
              >
                <Icon size={22} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          }
          return (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center gap-0.5 text-ink-500 hover:text-ink-900 transition-colors"
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
