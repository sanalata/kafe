import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../../components/layouts/UserLayout';
import Menu from './Menu';
import Orders from './Orders';
import Profile from './Profile';

export default function UserDashboard() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </UserLayout>
  );
}