import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatBDT } from '@/data/mockData';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'KLOVYQ10') {
      setAppliedDiscount(Math.round(subtotal * 0.1));
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'WELCOME15') {
      setAppliedDiscount(Math.round(subtotal * 0.15));
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedDiscount(0);
    }
  };

  const deliveryCharge = subtotal >= 2000 || subtotal === 0 ? 0 : 60;
  const total = subtotal - appliedDiscount + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center pb-28 lg:pb-20">
        <div className="w-20 h-20 rounded-full bg-ink-50 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={36} className="text-ink-300" />
        </div>
        <h2 className="text-2xl font-bold text-ink-900 mb-2">Your Cart is Empty</h2>
        <p className="text-ink-400 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/category/all" className="inline-flex items-center gap-2 bg-ink-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-ink-800 transition-all">
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-28 lg:pb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-ink-900 mb-6">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="card p-4 flex gap-4">
              <Link to={`/product/${item.productId}`} className="flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.productId}`} className="font-medium text-ink-900 hover:text-ink-700 line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-xs text-ink-400 mt-1">Size: {item.size} • Color: {item.color}</p>
                <p className="text-lg font-bold text-ink-900 mt-1">{formatBDT(item.price)}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="inline-flex items-center border border-ink-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-ink-600 hover:text-ink-900"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-ink-600 hover:text-ink-900"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.size, item.color)}
                    className="text-danger-500 hover:text-danger-600 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-ink-400">Subtotal</p>
                <p className="font-bold text-ink-900">{formatBDT(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <Link to="/category/all" className="text-sm font-medium text-ink-500 hover:text-ink-900">
              ← Continue Shopping
            </Link>
            <button onClick={clearCart} className="text-sm text-danger-500 hover:text-danger-600 font-medium">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-24">
            <h3 className="font-semibold text-ink-900 mb-4">Order Summary</h3>

            {/* Coupon */}
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-ink-200 text-sm focus:outline-none focus:border-ink-400"
                  />
                </div>
                <button onClick={applyCoupon} className="px-4 py-2.5 rounded-lg bg-ink-900 text-white text-sm font-medium hover:bg-ink-800">
                  Apply
                </button>
              </div>
              {couponError && <p className="text-xs text-danger-600 mt-1">{couponError}</p>}
              {appliedDiscount > 0 && <p className="text-xs text-success-600 mt-1">Coupon applied! You saved {formatBDT(appliedDiscount)}</p>}
              <p className="text-xs text-ink-300 mt-1">Try: KLOVYQ10 or WELCOME15</p>
            </div>

            <div className="space-y-2.5 text-sm border-t border-ink-50 pt-4">
              <div className="flex justify-between text-ink-600">
                <span>Subtotal</span>
                <span className="font-medium text-ink-900">{formatBDT(subtotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-success-600">
                  <span>Discount</span>
                  <span className="font-medium">-{formatBDT(appliedDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-ink-600">
                <span>Delivery Charge</span>
                <span className="font-medium text-ink-900">{deliveryCharge === 0 ? 'FREE' : formatBDT(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-ink-900 border-t border-ink-100 pt-3">
                <span>Total</span>
                <span>{formatBDT(total)}</span>
              </div>
            </div>

            {deliveryCharge === 0 && subtotal > 0 && (
              <p className="text-xs text-success-600 mt-3 bg-success-50 rounded-lg p-2 text-center">
                You got FREE delivery!
              </p>
            )}

            <button
              onClick={() => navigate('/checkout', { state: { discount: appliedDiscount, deliveryCharge } })}
              className="w-full btn-primary mt-4"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
