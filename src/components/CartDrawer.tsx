import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useCartQuery, useUpdateCartItem, useRemoveFromCart, useProducts } from '../hooks/useShopify';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setCartOpen } = useStore();
  const { data: cartData, isLoading: isCartLoading } = useCartQuery();
  const { mutate: updateQtyMut, isPending: isUpdating } = useUpdateCartItem();
  const { mutate: removeMut, isPending: isRemoving } = useRemoveFromCart();
  const { data: products } = useProducts(3); // Fetch 3 products for upsell recommendations

  const cart = cartData;
  const lines = cart?.lines?.edges?.map(e => e.node) || [];
  const subtotal = cart?.cost?.subtotalAmount;

  const handleUpdateQty = (lineId: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty < 1) {
      removeMut(lineId);
    } else {
      updateQtyMut({ id: lineId, quantity: newQty });
    }
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    const value = parseFloat(amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-[#1c1c1c]/45 backdrop-blur-[4px]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#faf9f6] shadow-2xl flex flex-col border-l border-[#e6c89c]/20"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#faf9f6]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#0f2e24]" />
                <h2 className="font-serif text-xl font-semibold tracking-wider text-[#0f2e24] uppercase">
                  Your Cart
                </h2>
                {lines.length > 0 && (
                  <span className="bg-[#0f2e24] text-[#faf9f6] text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold">
                    {lines.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="text-[#1c1c1c] hover:text-[#c5a880] transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isCartLoading ? (
                <div className="h-48 flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 text-[#c5a880] animate-spin mb-2" />
                  <p className="text-xs tracking-wider text-gray-500 uppercase">Loading Cart Details...</p>
                </div>
              ) : lines.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center">
                  <ShoppingBag className="h-16 w-16 text-[#c5a880] opacity-30 mb-4 stroke-1" />
                  <p className="font-serif text-lg text-gray-600 mb-6">Your shopping cart is empty</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="inline-block bg-[#0f2e24] text-[#faf9f6] font-semibold text-xs tracking-widest px-8 py-3 rounded-full hover:bg-[#c5a880] transition-colors duration-300"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {lines.map((item) => {
                    const variant = item.merchandise;
                    const product = variant?.product;
                    const imgUrl = product?.images?.edges?.[0]?.node?.url || 'https://via.placeholder.com/100x120?text=Jewelry';
                    const price = variant?.price;

                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 bg-white border border-[#e6c89c]/10 rounded-lg shadow-sm relative group"
                      >
                        <div className="w-20 h-24 overflow-hidden rounded-md bg-gray-50 flex-shrink-0">
                          <img
                            src={imgUrl}
                            alt={product?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <h4 className="text-sm font-semibold tracking-wide text-[#1c1c1c] truncate hover:text-[#c5a880] transition-colors duration-300">
                              <Link to={`/product/${product?.handle}`} onClick={() => setCartOpen(false)}>
                                {product?.title}
                              </Link>
                            </h4>
                            {variant?.title && variant.title !== 'Default Title' && (
                              <p className="text-[10px] tracking-wider text-[#a88a5e] uppercase mt-0.5">
                                Option: {variant.title}
                              </p>
                            )}
                          </div>

                          <div className="flex justify-between items-end mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-200 rounded-full py-1 px-2.5">
                              <button
                                onClick={() => handleUpdateQty(item.id, item.quantity, -1)}
                                disabled={isUpdating || isRemoving}
                                className="text-gray-500 hover:text-[#c5a880] transition-colors p-0.5 disabled:opacity-50"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="text-xs font-semibold px-3 text-[#1c1c1c] min-w-[16px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQty(item.id, item.quantity, 1)}
                                disabled={isUpdating || isRemoving}
                                className="text-gray-500 hover:text-[#c5a880] transition-colors p-0.5 disabled:opacity-50"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="text-sm font-semibold text-[#0f2e24]">
                              {price ? formatPrice((parseFloat(price.amount) * item.quantity).toString(), price.currencyCode) : ''}
                            </span>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeMut(item.id)}
                          disabled={isRemoving}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Quick Upsell Section */}
              {lines.length > 0 && products && products.length > 0 && (
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-serif text-xs font-semibold tracking-widest text-[#a88a5e] uppercase mb-4">
                    Complete Your Look
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {products.map((p) => {
                      const img = p.images?.edges?.[0]?.node?.url || 'https://via.placeholder.com/100x120';
                      const pPrice = p.priceRange?.minVariantPrice;
                      return (
                        <Link
                          key={p.id}
                          to={`/product/${p.handle}`}
                          onClick={() => setCartOpen(false)}
                          className="group text-center bg-white p-2 border border-[#e6c89c]/10 rounded-md block transition-shadow hover:shadow-md"
                        >
                          <div className="aspect-[4/5] rounded overflow-hidden mb-1.5 bg-gray-50">
                            <img src={img} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                          </div>
                          <h4 className="text-[10px] font-semibold text-[#1c1c1c] truncate tracking-wide">{p.title}</h4>
                          <p className="text-[9px] text-[#0f2e24] font-bold mt-0.5">
                            {pPrice ? formatPrice(pPrice.amount, pPrice.currencyCode) : ''}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {lines.length > 0 && subtotal && (
              <div className="p-6 border-t border-gray-100 bg-[#faf9f6] space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Subtotal</span>
                  <span className="text-xl font-bold text-[#0f2e24]">
                    {formatPrice(subtotal.amount, subtotal.currencyCode)}
                  </span>
                </div>
                <p className="text-[10px] tracking-wide text-gray-400">
                  Shipping, taxes, and discounts will be calculated during checkout.
                </p>

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#0f2e24] py-4 text-xs font-semibold tracking-widest text-[#faf9f6] hover:bg-[#c5a880] transition-colors duration-300 shadow-md group"
                >
                  PROCEED TO SECURE CHECKOUT
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
