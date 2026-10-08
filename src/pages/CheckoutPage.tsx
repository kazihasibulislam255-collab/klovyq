import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Check, CreditCard, Truck, MapPin, User, Phone, Mail, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { formatBDT } from '@/data/mockData';

const DELIVERY_OPTIONS = [
  { value: 'standard', label: 'Standard (2–4 days)', charge: 60 },
  { value: 'express', label: 'Express (1–2 days)', charge: 100 },
];

interface PlacedOrder {
  orderNumber: string;
  customerName: string;
  total: number;
  deliveryOption: string;
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { addOrder } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { discount?: number; deliveryOption?: string } | null;
  const appliedDiscount = state?.discount ?? 0;

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    area: '',
    deliveryOption: state?.deliveryOption ?? 'standard',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const deliveryCharge = DELIVERY_OPTIONS.find(d => d.value === form.deliveryOption)?.charge ?? 60;
  const total = subtotal - appliedDiscount + deliveryCharge;

  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center pb-28 lg:pb-16">
        <div className="w-20 h-20 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-4">
          <Check size={40} className="text-success-600" />
        </div>
        <h2 className="text-2xl font-bold text-ink-900 mb-2">Order Placed Successfully!</h2>
        <p className="text-ink-400 mb-6">Thank you for your order. We'll contact you shortly to confirm.</p>

        <div className="card p-6 text-left max-w-md mx-auto mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-ink-500">Order ID</span>
              <span className="font-bold text-gold-500">{placedOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-ink-500">Customer Name</span>
              <span className="font-medium text-ink-900">{placedOrder.customerName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-ink-500">Total Amount</span>
              <span className="font-bold text-ink-900">{formatBDT(placedOrder.total)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-ink-500">Delivery Method</span>
              <span className="font-medium text-ink-900">{placedOrder.deliveryOption}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-ink-500">Payment Method</span>
              <span className="font-medium text-ink-900">{placedOrder.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-outline">Back to Home</Link>
          <Link to="/category/all" className="btn-primary">
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center pb-28 lg:pb-20">
        <ShoppingBag size={48} className="text-ink-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-ink-900 mb-2">Nothing to Checkout</h2>
        <Link to="/category/all" className="text-gold-500 font-medium hover:underline">Browse Products</Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.customerName.trim()) errs.customerName = 'Full Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone Number is required';
    else if (!/^(\+?880|0)?1[3-9]\d{8}$/.test(form.phone.replace(/[\s-]/g, ''))) errs.phone = 'Enter a valid Bangladeshi phone number';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.address.trim()) errs.address = 'Full Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.area.trim()) errs.area = 'Area is required';
    if (!form.deliveryOption) errs.deliveryOption = 'Please select a delivery option';
    if (!form.paymentMethod) errs.paymentMethod = 'Please select a payment method';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setPlacing(true);

    const deliveryLabel = DELIVERY_OPTIONS.find(d => d.value === form.deliveryOption)?.label ?? 'Standard (2–4 days)';
    const paymentLabel = 'Cash on Delivery';

    try {
      const orderNumber = await addOrder({
        customerName: form.customerName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        area: form.area,
        deliveryOption: deliveryLabel,
        items,
        subtotal,
        discount: appliedDiscount,
        deliveryCharge,
        total,
        paymentMethod: paymentLabel,
        status: 'pending',
      });

      setPlacedOrder({
        orderNumber,
        customerName: form.customerName,
        total,
        deliveryOption: deliveryLabel,
        paymentMethod: paymentLabel,
      });
      clearCart();
    } catch (err) {
      console.error('Order placement failed:', err);
    } finally {
      setPlacing(false);
    }
  };

  const inputClass = (field: string) => `w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-sm transition-all focus:outline-none ${
    errors[field] ? 'border-danger-400 focus:ring-2 focus:ring-danger-100' : 'border-ink-200 focus:border-ink-400 focus:ring-2 focus:ring-ink-100'
  }`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-28 lg:pb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-ink-900 mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Form fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact info */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <User size={18} /> Contact Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-ink-700 mb-1.5 block">Full Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                    placeholder="Your full name"
                    className={inputClass('customerName')}
                  />
                </div>
                {errors.customerName && <p className="text-xs text-danger-600 mt-1">{errors.customerName}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-ink-700 mb-1.5 block">Phone Number *</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="01XXXXXXXXX"
                    className={inputClass('phone')}
                  />
                </div>
                {errors.phone && <p className="text-xs text-danger-600 mt-1">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-ink-700 mb-1.5 block">Email *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className={inputClass('email')}
                  />
                </div>
                {errors.email && <p className="text-xs text-danger-600 mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <MapPin size={18} /> Delivery Address
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-ink-700 mb-1.5 block">Full Address *</label>
                <textarea
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="House, road, street details..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm transition-all focus:outline-none ${
                    errors.address ? 'border-danger-400 focus:ring-2 focus:ring-danger-100' : 'border-ink-200 focus:border-ink-400 focus:ring-2 focus:ring-ink-100'
                  }`}
                />
                {errors.address && <p className="text-xs text-danger-600 mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-ink-700 mb-1.5 block">City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  placeholder="e.g. Dhaka"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm focus:outline-none ${
                    errors.city ? 'border-danger-400 focus:ring-2 focus:ring-danger-100' : 'border-ink-200 focus:border-ink-400 focus:ring-2 focus:ring-ink-100'
                  }`}
                />
                {errors.city && <p className="text-xs text-danger-600 mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-ink-700 mb-1.5 block">Area *</label>
                <input
                  type="text"
                  value={form.area}
                  onChange={e => setForm(f => ({ ...f, area: e.target.value }))}
                  placeholder="e.g. Dhanmondi"
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-sm focus:outline-none ${
                    errors.area ? 'border-danger-400 focus:ring-2 focus:ring-danger-100' : 'border-ink-200 focus:border-ink-400 focus:ring-2 focus:ring-ink-100'
                  }`}
                />
                {errors.area && <p className="text-xs text-danger-600 mt-1">{errors.area}</p>}
              </div>
            </div>
          </div>

          {/* Delivery option */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <Truck size={18} /> Delivery Option *
            </h3>
            <div className="space-y-2">
              {DELIVERY_OPTIONS.map(opt => (
                <label
                  key={opt.value}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.deliveryOption === opt.value ? 'border-ink-900 bg-ink-50' : 'border-ink-200 hover:border-ink-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={form.deliveryOption === opt.value}
                      onChange={() => setForm(f => ({ ...f, deliveryOption: opt.value }))}
                      className="accent-ink-900"
                    />
                    <span className="text-sm font-medium text-ink-800">{opt.label}</span>
                  </div>
                  <span className="text-sm font-bold text-ink-900">{formatBDT(opt.charge)}</span>
                </label>
              ))}
              {errors.deliveryOption && <p className="text-xs text-danger-600 mt-1">{errors.deliveryOption}</p>}
            </div>
          </div>

          {/* Payment method */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <CreditCard size={18} /> Payment Method *
            </h3>
            <div className="space-y-2">
              <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${form.paymentMethod === 'cod' ? 'border-ink-900 bg-ink-50' : 'border-ink-200 hover:border-ink-300'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={form.paymentMethod === 'cod'}
                  onChange={() => setForm(f => ({ ...f, paymentMethod: 'cod' }))}
                  className="accent-ink-900"
                />
                <span className="text-sm font-medium text-ink-800">Cash on Delivery</span>
                <span className="ml-auto badge bg-success-100 text-success-700">Available</span>
              </label>
              <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-not-allowed opacity-60 border-ink-200`}>
                <input type="radio" disabled className="accent-ink-900" />
                <span className="text-sm font-medium text-ink-800">bKash / Nagad</span>
                <span className="ml-auto badge bg-ink-100 text-ink-500">Coming Soon</span>
              </label>
              {errors.paymentMethod && <p className="text-xs text-danger-600 mt-1">{errors.paymentMethod}</p>}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-24">
            <h3 className="font-semibold text-ink-900 mb-4">Order Summary</h3>

            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {items.map(item => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-ink-400">{item.size} • {item.color} • Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-ink-900">{formatBDT(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm border-t border-ink-50 pt-4">
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
                <span className="font-medium text-ink-900">{formatBDT(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-ink-900 border-t border-ink-100 pt-3">
                <span>Total</span>
                <span>{formatBDT(total)}</span>
              </div>
            </div>

            <button type="submit" disabled={placing} className="w-full btn-primary mt-4 disabled:opacity-60">
              {placing ? (
                <span className="flex items-center gap-2">
                  <Package size={18} className="animate-pulse" /> Placing Order...
                </span>
              ) : (
                'Place Order'
              )}
            </button>
            <p className="text-xs text-ink-400 text-center mt-3">By placing your order, you agree to our terms and conditions.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
