import type { Product } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Zap } from 'lucide-react';
import StarRating from './StarRating';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatBDT } from '@/data/mockData';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const navigate = useNavigate();
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
    navigate('/cart');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-ink-50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-ink-50">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-left badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-danger-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-md">
              {discount}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-success-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-md">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-md">
              Best Seller
            </span>
          )}
          {product.isStockClearance && (
            <span className="bg-ink-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-md">
              Clearance
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className={`absolute top-2 right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
            wished
              ? 'bg-danger-500 text-white'
              : 'bg-white/90 text-ink-400 hover:text-danger-500'
          }`}
        >
          <Heart size={16} className={wished ? 'fill-white' : ''} />
        </button>

        {/* Stock out overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="bg-black text-white px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide">
              Stock Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="text-xs sm:text-sm font-medium text-ink-800 line-clamp-2 mb-1 group-hover:text-ink-900 transition-colors min-h-[2.25rem] leading-snug">
          {product.name}
        </h3>

        <StarRating rating={product.rating} size={11} showValue reviewCount={product.reviewCount} />

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-base sm:text-lg font-bold text-ink-900">{formatBDT(product.price)}</span>
          {product.previousPrice > product.price && (
            <span className="text-xs sm:text-sm text-ink-300 line-through">{formatBDT(product.previousPrice)}</span>
          )}
        </div>

        {/* Stock status */}
        <div className="flex items-center gap-1.5 mt-1 mb-2.5">
          {product.inStock ? (
            <span className="text-[10px] sm:text-xs font-medium text-success-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
              In Stock
            </span>
          ) : (
            <span className="text-[10px] sm:text-xs font-medium text-danger-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-danger-500" />
              Stock Out
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-1.5 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label="Add to cart"
            className="flex-1 inline-flex items-center justify-center gap-1 bg-ink-900 text-white text-[11px] sm:text-xs font-medium px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all hover:bg-ink-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={13} />
            <span className="hidden xs:inline">Add to Cart</span>
            <span className="xs:hidden">Cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            aria-label="Buy now"
            className="flex-1 inline-flex items-center justify-center gap-1 bg-gold-500 text-white text-[11px] sm:text-xs font-medium px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all hover:bg-gold-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Zap size={13} />
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}
