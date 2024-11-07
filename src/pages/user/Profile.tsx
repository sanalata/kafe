import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
          
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1 text-sm text-gray-900">{user?.name}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Room Number</label>
              <div className="mt-1 text-sm text-gray-900">{user?.roomNumber}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1 text-sm text-gray-900">{user?.username}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Available Credits</label>
              <div className="mt-1 text-lg font-semibold text-amber-600">{user?.credits} credits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}