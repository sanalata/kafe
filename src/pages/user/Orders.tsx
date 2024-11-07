import React from 'react';
import { Clock, CheckCircle, Truck, Check } from 'lucide-react';
import { Order } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

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

const statusTranslations = {
  pending: 'pending',
  preparing: 'preparing',
  delivering: 'delivering',
  completed: 'completed',
};

export default function Orders() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleConfirmDelivery = async (orderId: string) => {
    try {
      // In a real app, this would make an API call
      console.log('Confirming delivery for order:', orderId);
      // After confirmation, the order status would be updated to 'completed'
      // and credits would be deducted from the user's account
    } catch (error) {
      console.error('Failed to confirm delivery:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('orders')}</h2>
      
      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        {mockOrders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          const statusColor = statusColors[order.status];
          
          return (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {t(statusTranslations[order.status])}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {t('orderNumber')} {order.id}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <div>{t('roomNumber')}: {order.roomNumber}</div>
                <div>{t('total')}: {order.totalCredits} {t('credits')}</div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">{t('orderDetails')}:</h4>
                <ul className="mt-2 divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <li key={index} className="py-2">
                      <div className="flex justify-between">
                        <span>{item.quantity}x Product {item.productId}</span>
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

              {order.status === 'delivering' && (
                <div className="mt-4">
                  <button
                    onClick={() => handleConfirmDelivery(order.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {t('confirmDelivery')}
                  </button>
                </div>
              )}

              {order.status === 'completed' && (
                <div className="mt-4 text-sm text-green-600 font-medium">
                  {t('orderCompleted')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}