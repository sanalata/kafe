import React, { useState } from 'react';
import { Search, Clock, CheckCircle, Truck } from 'lucide-react';
import { Order } from '../../types';
import { format } from 'date-fns';
import { useLanguage } from '../../contexts/LanguageContext';

// Mock data - In a real app, this would come from an API
const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      { productId: '1', quantity: 2, notes: 'Extra hot' },
      { productId: '2', quantity: 1 },
    ],
    status: 'preparing',
    totalCredits: 16,
    roomNumber: '101',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: '2',
    items: [
      { productId: '2', quantity: 1 },
    ],
    status: 'pending',
    totalCredits: 6,
    roomNumber: '203',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

const statusIcons = {
  pending: Clock,
  preparing: Clock,
  delivering: Truck,
  completed: CheckCircle,
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  delivering: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  const { t } = useLanguage();

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      // In a real app, this would make an API call
      console.log('Updating order status:', { orderId, newStatus });
      
      // If the order is marked as completed by admin (after customer confirmation)
      if (newStatus === 'completed') {
        // Update user credits and create transaction record
        console.log('Processing payment and updating credits');
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.roomNumber.includes(searchTerm) || 
                         order.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('orders')}</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchOrders')}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          />
        </div>
        <div className="flex space-x-2">
          {(['all', 'pending', 'preparing', 'delivering', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                statusFilter === status
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status === 'all' ? t('all') : t(status)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        {filteredOrders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          
          return (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {t(order.status)}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {t('orderNumber')} {order.id}
                  </span>
                  <span className="text-sm text-gray-500">
                    {t('roomNumber')} {order.roomNumber}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'MMM d, HH:mm')}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                    disabled={order.status === 'completed'}
                  >
                    <option value="pending">{t('pending')}</option>
                    <option value="preparing">{t('preparing')}</option>
                    <option value="delivering">{t('delivering')}</option>
                    <option value="completed">{t('completed')}</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">{t('orderDetails')}:</h4>
                <ul className="mt-2 divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <li key={index} className="py-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          {item.quantity}x Product {item.productId}
                        </span>
                        {item.notes && (
                          <span className="text-sm text-gray-500">
                            {t('note')}: {item.notes}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {t('total')}: {order.totalCredits} {t('credits')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}