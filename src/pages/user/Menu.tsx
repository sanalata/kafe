import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Product, Category } from '../../types';
import ProductCard from '../../components/ProductCard';

// Mock data - In a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cappuccino',
    price: 5,
    category: 'hot-drinks',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    description: 'Rich espresso with steamed milk foam',
  },
  {
    id: '2',
    name: 'Iced Latte',
    price: 6,
    category: 'cold-drinks',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400',
    description: 'Smooth espresso with cold milk and ice',
  },
  // Add more mock products as needed
];

const categories: { id: Category; name: string }[] = [
  { id: 'hot-drinks', name: 'Hot Drinks' },
  { id: 'cold-drinks', name: 'Cold Drinks' },
  { id: 'pastries', name: 'Pastries' },
  { id: 'market', name: 'Market' },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const { addToCart } = useCart();

  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === 'all'
                ? 'bg-amber-100 text-amber-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}