import React, { useState } from 'react';
import { Search, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { User } from '../../types';

// Mock data - In a real app, this would come from an API
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    roomNumber: '101',
    username: 'testuser',
    credits: 100,
    role: 'user',
  },
  {
    id: '2',
    name: 'John Doe',
    roomNumber: '102',
    username: 'johndoe',
    credits: 50,
    role: 'user',
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();
  const [users, setUsers] = useState(mockUsers);

  const handleAddCredits = (userId: string, amount: number) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? { ...user, credits: Math.max(0, user.credits + amount) }
          : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.roomNumber.includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="İsim, oda numarası veya kullanıcı adı ile ara..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanıcı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Oda Numarası
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanıcı Adı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kredi
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kredi Yönetimi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.roomNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-amber-600">
                    {user.credits} {t('credits')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleAddCredits(user.id, -10)}
                      className="p-1 rounded-md hover:bg-red-100 text-red-600"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleAddCredits(user.id, 10)}
                      className="p-1 rounded-md hover:bg-green-100 text-green-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}