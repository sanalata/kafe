import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Modal from './Modal';

// Mock data - In a real app, this would come from an API
const mockProducts = {
  '1': {
    id: '1',
    name: 'Cappuccino',
    price: 5,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
  },
  '2': {
    id: '2',
    name: 'Iced Latte',
    price: 6,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400',
  },
};

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();

  const totalCredits = items.reduce((sum, item) => {
    const product = mockProducts[item.productId];
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    try {
      // In a real app, this would make an API call
      console.log('Processing order:', {
        items,
        totalCredits,
        userId: user?.id,
        roomNumber: user?.roomNumber,
      });
      clearCart();
      setIsOpen(false);
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-amber-600"
      >
        <ShoppingCart className="h-6 w-6" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Your Cart">
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => {
                  const product = mockProducts[item.productId];
                  if (!product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="flex items-center space-x-4 py-4 border-b"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.price} credits each
                        </p>
                        {item.notes && (
                          <p className="text-sm text-gray-500">Note: {item.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                          }
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>{totalCredits} credits</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Available credits: {user?.credits || 0}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  disabled={totalCredits > (user?.credits || 0)}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {totalCredits > (user?.credits || 0)
                    ? 'Insufficient Credits'
                    : 'Place Order'}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}