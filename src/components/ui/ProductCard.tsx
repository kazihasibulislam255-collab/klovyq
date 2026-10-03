import type { Product } from '@/types';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Zap } from 'lucide-react';
import StarRating from './StarRating';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatBDT } from '@/data/mockData';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const discount = Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100);
  const wished = has(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.variants.sizes[0], product.variants.colors[0].name);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.variants.sizes[0], product.variants.colors[0].name);
    window.location.href = '/cart';
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-50">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="badge bg-danger-500 text-white">-{discount}%</span>
          )}
          {product.isNewArrival && (
            <span className="badge bg-success-500 text-white">New</span>
          )}
          {product.isBestSeller && (
            <span className="badge bg-gold-500 text-white">Best Seller</span>
          )}
          {product.isStockClearance && (
            <span className="badge bg-ink-600 text-white">Clearance</span>
          )}
        </div>
        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            wished
              ? 'bg-danger-500 text-white'
              : 'bg-white/90 text-ink-400 hover:text-danger-500'
          } shadow-sm`}
        >
          <Heart size={18} className={wished ? 'fill-white' : ''} />
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-black text-white px-6 py-2 rounded-lg text-sm font-bold tracking-wide">
              Stock Out
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-ink-800 line-clamp-2 mb-1.5 group-hover:text-ink-900 transition-colors min-h-[2.5rem]">
          {product.name}
        </h3>
        <StarRating rating={product.rating} size={12} showValue reviewCount={product.reviewCount} />

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-ink-900">{formatBDT(product.price)}</span>
          {product.previousPrice > product.price && (
            <span className="text-sm text-ink-300 line-through">{formatBDT(product.previousPrice)}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          {product.inStock ? (
            <span className="text-xs font-medium text-success-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
              In Stock
            </span>
          ) : (
            <span className="text-xs font-medium text-danger-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-danger-500" />
              Stock Out
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label="Add to cart"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-ink-900 text-white text-xs font-medium px-3 py-2.5 rounded-lg transition-all hover:bg-ink-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            aria-label="Buy now"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gold-500 text-white text-xs font-medium px-3 py-2.5 rounded-lg transition-all hover:bg-gold-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Zap size={15} />
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}
