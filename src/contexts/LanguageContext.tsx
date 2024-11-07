import React, { createContext, useContext, useState } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  tr: {
    // Auth
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    username: 'Kullanıcı Adı',
    password: 'Şifre',
    fullName: 'Ad Soyad',
    roomNumber: 'Oda Numarası',
    dontHaveAccount: 'Hesabınız yok mu? Kayıt olun',
    alreadyHaveAccount: 'Zaten hesabınız var mı? Giriş yapın',
    createAccount: 'Hesap Oluştur',

    // Navigation
    menu: 'Menü',
    orders: 'Siparişlerim',
    profile: 'Profil',
    logout: 'Çıkış',

    // Cart
    cart: 'Sepet',
    addToCart: 'Sepete Ekle',
    placeOrder: 'Sipariş Ver',
    total: 'Toplam',
    emptyCart: 'Sepetiniz boş',
    addNote: 'Not Ekle',
    specialInstructions: 'Özel istekler...',
    removeFromCart: 'Sepetten Çıkar',

    // Credits
    credits: 'Kredi',
    availableCredits: 'Mevcut Kredi',
    insufficientCredits: 'Yetersiz Kredi',

    // Products
    hotDrinks: 'Sıcak İçecekler',
    coldDrinks: 'Soğuk İçecekler',
    pastries: 'Pastane Ürünleri',
    market: 'Market Ürünleri',
    all: 'Tümü',
    price: 'Fiyat',
    stock: 'Stok',
    quantity: 'Adet',

    // Order Status and Tracking
    confirmDelivery: 'Siparişi Teslim Aldım',
    orderCompleted: 'Sipariş tamamlandı',
    orderTracking: 'Sipariş Takibi',
    note: 'Not',
    orderStatus: 'Sipariş Durumu',
    pending: 'Beklemede',
    preparing: 'Hazırlanıyor',
    delivering: 'Yolda',
    completed: 'Tamamlandı',
    orderDetails: 'Sipariş Detayları',
    orderNumber: 'Sipariş No',
    orderDate: 'Sipariş Tarihi',
    searchOrders: 'Sipariş no veya oda numarası ile ara...',

    // Admin Panel
    adminPanel: 'Yönetici Paneli',
    overview: 'Genel Bakış',
    products: 'Ürünler',
    categories: 'Kategoriler',
    users: 'Kullanıcılar',
    analytics: 'Analizler',
    addProduct: 'Ürün Ekle',
    editProduct: 'Ürün Düzenle',
    addCategory: 'Kategori Ekle',
    editCategory: 'Kategori Düzenle',
    productName: 'Ürün Adı',
    categoryName: 'Kategori Adı',
    description: 'Açıklama',
    imageUrl: 'Resim URL',
    save: 'Kaydet',
    cancel: 'İptal',
    delete: 'Sil',
    update: 'Güncelle',
    create: 'Oluştur',

    // Analytics
    totalOrders: 'Toplam Sipariş',
    activeProducts: 'Aktif Ürünler',
    lowStockItems: 'Az Stoklu Ürünler',
    activeUsers: 'Aktif Kullanıcılar',
    dailyOrders: 'Günlük Siparişler',
    revenue: 'Gelir',
    ordersByCategory: 'Kategoriye Göre Siparişler',
    popularHours: 'Yoğun Saatler',

    // User Management
    userManagement: 'Kullanıcı Yönetimi',
    searchUsers: 'İsim, oda numarası veya kullanıcı adı ile ara...',
    creditManagement: 'Kredi Yönetimi',

    // Misc
    search: 'Ara',
    loading: 'Yükleniyor...',
    error: 'Hata',
    success: 'Başarılı',
    confirm: 'Onayla'
  },
  en: {
    // Auth
    login: 'Login',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    fullName: 'Full Name',
    roomNumber: 'Room Number',
    dontHaveAccount: "Don't have an account? Register",
    alreadyHaveAccount: 'Already have an account? Login',
    createAccount: 'Create Account',

    // Navigation
    menu: 'Menu',
    orders: 'Orders',
    profile: 'Profile',
    logout: 'Logout',

    // Cart
    cart: 'Cart',
    addToCart: 'Add to Cart',
    placeOrder: 'Place Order',
    total: 'Total',
    emptyCart: 'Your cart is empty',
    addNote: 'Add Note',
    specialInstructions: 'Special instructions...',
    removeFromCart: 'Remove from Cart',

    // Credits
    credits: 'Credits',
    availableCredits: 'Available Credits',
    insufficientCredits: 'Insufficient Credits',

    // Products
    hotDrinks: 'Hot Drinks',
    coldDrinks: 'Cold Drinks',
    pastries: 'Pastries',
    market: 'Market',
    all: 'All',
    price: 'Price',
    stock: 'Stock',
    quantity: 'Quantity',

    // Order Status and Tracking
    confirmDelivery: 'Confirm Delivery',
    orderCompleted: 'Order completed',
    orderTracking: 'Order Tracking',
    note: 'Note',
    orderStatus: 'Order Status',
    pending: 'Pending',
    preparing: 'Preparing',
    delivering: 'Delivering',
    completed: 'Completed',
    orderDetails: 'Order Details',
    orderNumber: 'Order #',
    orderDate: 'Order Date',
    searchOrders: 'Search by order number or room number...',

    // Admin Panel
    adminPanel: 'Admin Panel',
    overview: 'Overview',
    products: 'Products',
    categories: 'Categories',
    users: 'Users',
    analytics: 'Analytics',
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    addCategory: 'Add Category',
    editCategory: 'Edit Category',
    productName: 'Product Name',
    categoryName: 'Category Name',
    description: 'Description',
    imageUrl: 'Image URL',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    update: 'Update',
    create: 'Create',

    // Analytics
    totalOrders: 'Total Orders',
    activeProducts: 'Active Products',
    lowStockItems: 'Low Stock Items',
    activeUsers: 'Active Users',
    dailyOrders: 'Daily Orders',
    revenue: 'Revenue',
    ordersByCategory: 'Orders by Category',
    popularHours: 'Popular Hours',

    // User Management
    userManagement: 'User Management',
    searchUsers: 'Search by name, room number, or username...',
    creditManagement: 'Credit Management',

    // Misc
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    confirm: 'Confirm'
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('tr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}