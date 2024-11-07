import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, notes?: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, notes);
    setQuantity(1);
    setNotes('');
    setShowNotes(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-amber-600">
            {product.price} credits
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="text-sm text-amber-600 hover:text-amber-700"
            >
              Add Note
            </button>
          </div>

          {showNotes && (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special instructions..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              rows={2}
            />
          )}

          <button
            onClick={handleAddToCart}
            className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}