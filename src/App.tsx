import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { StoreProvider } from '@/context/StoreContext';
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext';
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
import AdminLoginPage from '@/pages/AdminLoginPage';
import type { ReactNode } from 'react';

function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-50">
        <div className="w-8 h-8 border-2 border-ink-200 border-t-ink-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <StoreProvider>
          <CartProvider>
            <WishlistProvider>
              <Routes>
                {/* Admin login — standalone, no store header/footer */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Store pages with header, footer, mobile nav */}
                <Route
                  path="*"
                  element={
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
                          <Route
                            path="/admin"
                            element={
                              <ProtectedAdminRoute>
                                <AdminPage />
                              </ProtectedAdminRoute>
                            }
                          />
                        </Routes>
                      </main>
                      <Footer />
                      <MobileNav />
                    </div>
                  }
                />
              </Routes>
            </WishlistProvider>
          </CartProvider>
        </StoreProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
