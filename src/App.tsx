import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import CategoryDrawer from '@/components/layout/CategoryDrawer';
import HomePage from '@/pages/HomePage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CategoryPage from '@/pages/CategoryPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import WishlistPage from '@/pages/WishlistPage';
import AccountPage from '@/pages/AccountPage';
import AdminPage from '@/pages/AdminPage';

function App() {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <BrowserRouter basename="/klovyq">
      <StoreProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen flex flex-col bg-white">
              <Header onOpenCategories={() => setCategoryOpen(true)} />
              <CategoryDrawer open={categoryOpen} onClose={() => setCategoryOpen(false)} />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>
              <Footer />
              <MobileNav />
            </div>
          </WishlistProvider>
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
