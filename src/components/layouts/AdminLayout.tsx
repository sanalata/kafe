import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Coffee,
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  TagsIcon,
  Users,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitch from '../LanguageSwitch';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: t('overview') },
    { path: '/admin/products', icon: Package, label: t('products') },
    { path: '/admin/orders', icon: ShoppingCart, label: t('orders') },
    { path: '/admin/categories', icon: TagsIcon, label: t('categories') },
    { path: '/admin/users', icon: Users, label: t('users') },
    { path: '/admin/analytics', icon: BarChart2, label: t('analytics') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Coffee className="h-8 w-8 text-amber-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">{t('adminPanel')}</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      isActive(item.path)
                        ? 'border-amber-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitch />
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}