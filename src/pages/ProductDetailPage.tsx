import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Zap, Minus, Plus, Truck, ShieldCheck, RefreshCw, ChevronRight, Check } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { reviews, formatBDT } from '@/data/mockData';
import StarRating from '@/components/ui/StarRating';
import ProductGrid from '@/components/ui/ProductGrid';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products } = useStore();
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.variants.sizes[0] ?? '');
  const [selectedColor, setSelectedColor] = useState(product?.variants.colors[0]?.name ?? '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'delivery' | 'reviews'>('description');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-ink-900 mb-2">Product Not Found</h2>
        <Link to="/" className="text-gold-500 font-medium hover:underline">Back to Home</Link>
      </div>
    );
  }

  const discount = Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100);
  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wished = has(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  return (
    <div className="pb-20 lg:pb-0">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-1.5 text-sm text-ink-400">
          <Link to="/" className="hover:text-ink-700">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/category/${product.category}`} className="hover:text-ink-700 capitalize">{product.category.replace('-', ' ')}</Link>
          <ChevronRight size={14} />
          <span className="text-ink-700 truncate">{product.name}</span>
        </div>
      </div>

      {/* Product main */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image gallery */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-ink-50 mb-4">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              {discount > 0 && (
                <span className="absolute top-4 left-4 badge bg-danger-500 text-white text-sm">-{discount}%</span>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-black text-white px-6 py-2.5 rounded-lg font-bold">Stock Out</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-ink-900' : 'border-ink-100 hover:border-ink-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.isNewArrival && <span className="badge bg-success-500 text-white">New Arrival</span>}
              {product.isBestSeller && <span className="badge bg-gold-500 text-white">Best Seller</span>}
              {product.isStockClearance && <span className="badge bg-ink-600 text-white">Clearance</span>}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-ink-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} size={18} showValue reviewCount={product.reviewCount} />
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-ink-900">{formatBDT(product.price)}</span>
              {product.previousPrice > product.price && (
                <>
                  <span className="text-lg text-ink-300 line-through">{formatBDT(product.previousPrice)}</span>
                  <span className="text-sm font-semibold text-danger-600">Save {formatBDT(product.previousPrice - product.price)}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <span className="text-sm font-medium text-success-600 flex items-center gap-1.5">
                  <Check size={16} /> In Stock ({product.stockCount} available)
                </span>
              ) : (
                <span className="text-sm font-medium text-danger-600">Out of Stock</span>
              )}
            </div>

            {/* Sizes */}
            {product.variants.sizes.length > 1 && (
              <div className="mb-5">
                <p className="text-sm font-medium text-ink-700 mb-2">Size: <span className="text-ink-900">{selectedSize}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                        selectedSize === size
                          ? 'border-ink-900 bg-ink-900 text-white'
                          : 'border-ink-200 text-ink-700 hover:border-ink-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            <div className="mb-5">
              <p className="text-sm font-medium text-ink-700 mb-2">Color: <span className="text-ink-900">{selectedColor}</span></p>
              <div className="flex gap-2">
                {product.variants.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? 'border-ink-900 ring-2 ring-ink-200' : 'border-ink-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium text-ink-700 mb-2">Quantity</p>
              <div className="inline-flex items-center border border-ink-200 rounded-xl">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-ink-600 hover:text-ink-900"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium text-ink-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stockCount || 99, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-ink-600 hover:text-ink-900"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 btn-gold"
              >
                <Zap size={18} />
                Buy Now
              </button>
              <button
                onClick={() => toggle(product.id)}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                  wished ? 'border-danger-500 bg-danger-500 text-white' : 'border-ink-200 text-ink-400 hover:border-danger-500 hover:text-danger-500'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={20} className={wished ? 'fill-white' : ''} />
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-ink-100">
              {[
                { icon: Truck, label: 'Fast Delivery' },
                { icon: ShieldCheck, label: 'Secure Payment' },
                { icon: RefreshCw, label: '7-Day Returns' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex flex-col items-center text-center gap-1.5">
                    <Icon size={20} className="text-ink-500" />
                    <span className="text-xs text-ink-500">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-1 border-b border-ink-100 overflow-x-auto no-scrollbar">
            {(['description', 'specifications', 'delivery', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-ink-900 text-ink-900'
                    : 'border-transparent text-ink-400 hover:text-ink-700'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${productReviews.length})` : tab}
              </button>
            ))}
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <p className="text-ink-600 leading-relaxed max-w-3xl">{product.description}</p>
            )}
            {activeTab === 'specifications' && (
              <div className="max-w-2xl">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map(spec => (
                      <tr key={spec.label} className="border-b border-ink-50">
                        <td className="py-3 text-sm font-medium text-ink-700 w-1/3">{spec.label}</td>
                        <td className="py-3 text-sm text-ink-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'delivery' && (
              <div className="max-w-3xl space-y-4">
                <p className="text-ink-600 leading-relaxed">{product.deliveryInfo}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="card p-4">
                    <Truck size={20} className="text-ink-700 mb-2" />
                    <p className="text-sm font-medium text-ink-900">Inside Dhaka</p>
                    <p className="text-sm text-ink-500">2-4 business days — ৳60</p>
                  </div>
                  <div className="card p-4">
                    <Truck size={20} className="text-ink-700 mb-2" />
                    <p className="text-sm font-medium text-ink-900">Outside Dhaka</p>
                    <p className="text-sm text-ink-500">3-7 business days — ৳120</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                {productReviews.length === 0 ? (
                  <p className="text-ink-400">No reviews yet. Be the first to review this product!</p>
                ) : (
                  <div className="space-y-4">
                    {productReviews.map(review => (
                      <div key={review.id} className="card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-ink-900 text-white flex items-center justify-center text-sm font-bold">
                              {review.customerName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-ink-900">{review.customerName}</p>
                              <p className="text-xs text-ink-400">{review.date}</p>
                            </div>
                          </div>
                          <StarRating rating={review.rating} size={14} />
                        </div>
                        <p className="text-sm text-ink-600 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 pb-12">
            <h2 className="section-title mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
