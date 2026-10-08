import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { heroImages, customerReviews, formatBDT } from '@/data/mockData';
import ProductGrid from '@/components/ui/ProductGrid';
import StarRating from '@/components/ui/StarRating';

export default function HomePage() {
  const { products, categories } = useStore();
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 8);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);
  const stockClearance = products.filter(p => p.isStockClearance).slice(0, 4);
  const discounted = products
    .filter(p => p.previousPrice > p.price && p.inStock)
    .sort((a, b) => {
      const da = (a.previousPrice - a.price) / a.previousPrice;
      const db = (b.previousPrice - b.price) / b.previousPrice;
      return db - da;
    })
    .slice(0, 8);

  const mainCategories = categories.filter(c => !['new-arrivals', 'stock-clearance'].includes(c.slug));

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[560px] overflow-hidden bg-ink-900">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === heroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={img} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
        ))}

        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-xl text-white">
            <p className="text-gold-400 font-medium text-sm md:text-base mb-3 tracking-wide uppercase">Modern Style, Everyday Choice</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Elevate Your Style with Klovyq
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-6 max-w-md">
              Discover premium fashion and lifestyle products. Quality you can trust, styles you'll love.
            </p>
            <div className="flex gap-3">
              <Link to="/category/all" className="inline-flex items-center gap-2 bg-white text-ink-900 font-semibold px-6 py-3 rounded-xl hover:bg-gold-400 hover:text-white transition-all active:scale-95">
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link to="/category/stock-clearance" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all">
                Clearance Sale
              </Link>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === heroIndex ? 'w-8 bg-gold-400' : 'w-2 bg-white/40'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'Fast Delivery', desc: '2-4 days nationwide' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: 'Cash on Delivery' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '7-day return policy' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-ink-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-ink-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{item.title}</p>
                    <p className="text-xs text-ink-400">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/category/all" className="text-sm font-medium text-ink-500 hover:text-ink-900 flex items-center gap-1">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 md:gap-4">
          {mainCategories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-ink-100 group-hover:border-gold-400 transition-all group-hover:scale-105">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs md:text-sm font-medium text-ink-700 group-hover:text-ink-900 text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional banner */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden h-48 md:h-56 bg-ink-900 group">
            <img src={heroImages[3]} alt="Men's Collection" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
              <p className="text-gold-400 text-sm font-medium mb-1">Men's Collection</p>
              <h3 className="text-white text-2xl font-bold mb-2">Up to 40% Off</h3>
              <Link to="/category/clothing" className="inline-flex items-center gap-1 text-white text-sm font-medium hover:text-gold-400 transition-colors">
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-48 md:h-56 bg-ink-900 group">
            <img src={heroImages[1]} alt="Accessories" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
              <p className="text-gold-400 text-sm font-medium mb-1">Accessories</p>
              <h3 className="text-white text-2xl font-bold mb-2">New Season Drops</h3>
              <Link to="/category/glasses" className="inline-flex items-center gap-1 text-white text-sm font-medium hover:text-gold-400 transition-colors">
                Explore <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="section-title">New Arrivals</h2>
            <p className="text-sm text-ink-400 mt-1">Fresh styles just landed</p>
          </div>
          <Link to="/category/new-arrivals" className="text-sm font-medium text-ink-500 hover:text-ink-900 flex items-center gap-1">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <ProductGrid products={newArrivals} />
      </section>

      {/* Best Sellers */}
      <section className="bg-ink-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title">Best Sellers</h2>
              <p className="text-sm text-ink-400 mt-1">Customer favorites this month</p>
            </div>
            <Link to="/category/all?sort=popularity" className="text-sm font-medium text-ink-500 hover:text-ink-900 flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      {/* Stock Clearance */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-danger-500 to-danger-600 rounded-2xl p-5 md:p-8 mb-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-white">Stock Clearance Offer</h2>
              <p className="text-white/80 mt-1 text-sm md:text-base">Last chance to grab these deals before they're gone!</p>
            </div>
            <Link to="/category/stock-clearance" className="inline-flex items-center gap-2 bg-white text-danger-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-danger-50 transition-all text-sm">
              Shop Clearance <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <ProductGrid products={stockClearance} />
      </section>

      {/* Discount products */}
      <section className="bg-ink-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title">Top Discounts</h2>
              <p className="text-sm text-ink-400 mt-1">Biggest savings on premium products</p>
            </div>
          </div>
          <ProductGrid products={discounted} />
        </div>
      </section>

      {/* Customer reviews */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="text-sm text-ink-400 mt-1">Trusted by thousands across Bangladesh</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {customerReviews.map(review => (
            <div key={review.id} className="card p-5">
              <StarRating rating={review.rating} size={16} />
              <p className="text-sm text-ink-600 mt-3 leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-ink-50">
                <div className="w-10 h-10 rounded-full bg-ink-900 text-white flex items-center justify-center text-sm font-bold">
                  {review.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{review.name}</p>
                  <p className="text-xs text-ink-400">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
