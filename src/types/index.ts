export interface User {
  id: string;
  name: string;
  roomNumber: string;
  username: string;
  credits: number;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'delivering' | 'completed';
  totalCredits: number;
  roomNumber: string;
  createdAt: string;
  notes?: string;
}

export type Category = 'hot-drinks' | 'cold-drinks' | 'pastries' | 'market';