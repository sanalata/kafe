import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Category } from '../../types';

interface CategoryWithStats {
  id: Category;
  name: string;
  productCount: number;
  totalOrders: number;
}

const mockCategories: CategoryWithStats[] = [
  { id: 'hot-drinks', name: 'Hot Drinks', productCount: 12, totalOrders: 156 },
  { id: 'cold-drinks', name: 'Cold Drinks', productCount: 8, totalOrders: 98 },
  { id: 'pastries', name: 'Pastries', productCount: 15, totalOrders: 234 },
  { id: 'market', name: 'Market', productCount: 25, totalOrders: 89 },
];

export default function Categories() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-500">
                    Products: {category.productCount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total Orders: {category.totalOrders}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {/* Handle edit */}}
                  className="p-2 text-amber-600 hover:text-amber-900 rounded-full hover:bg-amber-50"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {/* Handle delete */}}
                  className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}