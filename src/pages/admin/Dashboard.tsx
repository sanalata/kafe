import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../components/layouts/AdminLayout';
import Overview from './Overview';
import Products from './Products';
import Orders from './Orders';
import Categories from './Categories';
import Analytics from './Analytics';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </AdminLayout>
  );
}