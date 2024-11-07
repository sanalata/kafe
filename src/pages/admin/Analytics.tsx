import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format, subDays } from 'date-fns';

// Mock data - In a real app, this would come from an API
const salesData = Array.from({ length: 7 }, (_, i) => ({
  date: format(subDays(new Date(), i), 'MMM dd'),
  orders: Math.floor(Math.random() * 50) + 10,
  revenue: Math.floor(Math.random() * 500) + 100,
})).reverse();

const categoryData = [
  { name: 'Hot Drinks', value: 156 },
  { name: 'Cold Drinks', value: 98 },
  { name: 'Pastries', value: 234 },
  { name: 'Market', value: 89 },
];

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Orders</h3>
          <LineChart width={500} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#f59e0b"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue</h3>
          <BarChart width={500} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#f59e0b" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Orders by Category</h3>
          <PieChart width={500} height={300}>
            <Pie
              data={categoryData}
              cx={250}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Hours</h3>
          <BarChart
            width={500}
            height={300}
            data={Array.from({ length: 12 }, (_, i) => ({
              hour: `${(i + 8) % 24}:00`,
              orders: Math.floor(Math.random() * 30) + 5,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#f59e0b" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}