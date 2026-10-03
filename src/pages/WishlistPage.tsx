import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useStore } from '@/context/StoreContext';
import ProductGrid from '@/components/ui/ProductGrid';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { products } = useStore();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center pb-28 lg:pb-20">
        <div className="w-20 h-20 rounded-full bg-ink-50 flex items-center justify-center mx-auto mb-4">
          <Heart size={36} className="text-ink-300" />
        </div>
        <h2 className="text-2xl font-bold text-ink-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-ink-400 mb-6">Save items you love to your wishlist.</p>
        <Link to="/category/all" className="inline-flex items-center gap-2 bg-ink-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-ink-800 transition-all">
          Explore Products <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-28 lg:pb-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-ink-900">My Wishlist</h1>
        <span className="text-sm text-ink-400">{wishlistProducts.length} items</span>
      </div>
      <ProductGrid products={wishlistProducts} />
    </div>
  );
}
