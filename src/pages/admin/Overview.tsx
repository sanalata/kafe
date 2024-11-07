import React from 'react';
import { BarChart2, Package, ShoppingCart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  {
    name: 'Total Orders',
    value: '156',
    change: '+12%',
    changeType: 'increase',
    icon: ShoppingCart,
    link: '/admin/orders',
  },
  {
    name: 'Active Products',
    value: '43',
    change: '+3',
    changeType: 'increase',
    icon: Package,
    link: '/admin/products',
  },
  {
    name: 'Low Stock Items',
    value: '5',
    change: '-2',
    changeType: 'decrease',
    icon: BarChart2,
    link: '/admin/products',
  },
  {
    name: 'Active Users',
    value: '89',
    change: '+7%',
    changeType: 'increase',
    icon: Users,
    link: '/admin/analytics',
  },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <dt>
              <div className="absolute bg-amber-100 rounded-md p-3">
                <stat.icon className="h-6 w-6 text-amber-600" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
          {/* Recent orders list will be implemented here */}
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alerts</h3>
          {/* Low stock alerts will be implemented here */}
        </div>
      </div>
    </div>
  );
}