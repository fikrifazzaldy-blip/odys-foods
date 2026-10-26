/**
 * @license
 * FAZZA FOOD - State Management & Context
 * 
 * Mengelola seluruh data: Keranjang, Produk, Paket, Pesanan, Konfigurasi,
 * dan Toast Notifikasi dengan sinkronisasi ke browser localStorage.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CateringPackage,
  CartItem,
  Order,
  AppConfig,
  OrderStatus,
} from '../types';
import { DEFAULT_CONFIG } from '../config';
import { INITIAL_PRODUCTS, INITIAL_PACKAGES } from '../data';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Konfigurasi
  config: AppConfig;
  updateConfig: (newConfig: AppConfig) => void;

  // Produk Menu
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Paket Katering
  packages: CateringPackage[];
  updatePackage: (pkg: CateringPackage) => void;

  // Keranjang Belanja
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  updateCartNote: (id: string, note: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;

  // Kode Promo
  appliedPromo: string;
  discountAmount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Pesanan
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Navigasi UI
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (prod: Product | null) => void;
  activeOrderSuccess: Order | null;
  setActiveOrderSuccess: (order: Order | null) => void;

  // Autentikasi Admin Demo
  isAdminAuthenticated: boolean;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;

  // Reset Demo
  resetDemoData: () => void;

  // Notifikasi Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Helper Functions
  formatRupiah: (amount: number) => string;
  isStoreOpen: () => boolean;
  getMinOrderDate: () => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Inisialisasi contoh pesanan untuk demo admin
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-demo-1',
    orderNumber: 'FZ-20261025-001',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    customer: {
      fullName: 'Bapak Ahmad Fauzi (Contoh)',
      whatsapp: '081234567890',
      deliveryMethod: 'delivery',
      address: 'Kantor Kecamatan Gandrungmangu, Jl. Raya Gandrungmangu No. 12',
      landmark: 'Sebelah Bank BRI Gandrungmangu',
      deliveryAreaId: 'area-1',
      deliveryDate: new Date(Date.now() + 3600000 * 48).toISOString().split('T')[0],
      deliveryTime: '11:30',
      eventType: 'Rapat Koordinasi Kecamatan',
      specialNotes: 'Tolong sambalnya dipisah saja, jangan dicampur ke nasi.',
      paymentMethod: 'transfer',
    },
    items: [
      {
        id: 'cart-1',
        productId: 'prod-ayam-bakar',
        itemType: 'product',
        name: 'Nasi Box Ayam Bakar Madu',
        price: 23000,
        quantity: 25,
        minOrder: 5,
        image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
        note: 'Sambal sedang',
      },
      {
        id: 'cart-2',
        productId: 'prod-es-teh-melati',
        itemType: 'product',
        name: 'Es Teh Manis Melati Jumbo (500ml)',
        price: 5000,
        quantity: 25,
        minOrder: 5,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
      },
    ],
    subtotal: 700000,
    deliveryFee: 0,
    discount: 50000,
    promoCode: 'FAZZA10',
    total: 650000,
    status: 'Diproses',
  },
  {
    id: 'ord-demo-2',
    orderNumber: 'FZ-20261026-002',
    createdAt: new Date().toISOString(),
    customer: {
      fullName: 'Ibu Nurlaila Dewi (Contoh)',
      whatsapp: '085712349999',
      deliveryMethod: 'delivery',
      address: 'Desa Karanggintung RT 02 RW 03, Gandrungmangu',
      landmark: 'Dekat Masjid Baiturrahman Karanggintung',
      deliveryAreaId: 'area-1',
      deliveryDate: new Date(Date.now() + 3600000 * 72).toISOString().split('T')[0],
      deliveryTime: '15:00',
      eventType: 'Pengajian Rutin Muslimat',
      specialNotes: 'Mohon box diikat kuat dan jangan ditumpuk lebih dari 4 lapis.',
      paymentMethod: 'qris',
    },
    items: [
      {
        id: 'cart-3',
        productId: 'prod-snack-box-a',
        itemType: 'product',
        name: 'Snack Box Komplit Gurih Manis',
        price: 12000,
        quantity: 35,
        minOrder: 10,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      },
    ],
    subtotal: 420000,
    deliveryFee: 8000,
    discount: 0,
    total: 428000,
    status: 'Menunggu Konfirmasi',
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Konfigurasi dengan LocalStorage
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem('fazza_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.address || parsed.address.includes('Kebayoran') || parsed.address.includes('Melati')) {
          parsed.address = DEFAULT_CONFIG.address;
          parsed.city = DEFAULT_CONFIG.city;
          parsed.deliveryAreas = DEFAULT_CONFIG.deliveryAreas;
          parsed.about = DEFAULT_CONFIG.about;
        }
        return { ...DEFAULT_CONFIG, ...parsed };
      }
      return DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  // State Produk dengan LocalStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('fazza_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // State Paket Katering dengan LocalStorage
  const [packages, setPackages] = useState<CateringPackage[]>(() => {
    try {
      const saved = localStorage.getItem('fazza_packages');
      return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
    } catch {
      return INITIAL_PACKAGES;
    }
  });

  // State Keranjang dengan LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fazza_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State Pesanan dengan LocalStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('fazza_orders');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  // State Kode Promo Terpasang
  const [appliedPromo, setAppliedPromo] = useState<string>(() => {
    try {
      return localStorage.getItem('fazza_applied_promo') || '';
    } catch {
      return '';
    }
  });

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [activeOrderSuccess, setActiveOrderSuccess] = useState<Order | null>(null);

  // Status Login Admin Demo
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('fazza_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Simpan perubahan ke LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('fazza_config', JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('fazza_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('fazza_packages', JSON.stringify(packages));
    } catch {
      // ignore
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem('fazza_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('fazza_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('fazza_applied_promo', appliedPromo);
    } catch {
      // ignore
    }
  }, [appliedPromo]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper Format Rupiah (misal: "Rp20.000" atau "Rp1.250.000")
  const formatRupiah = (amount: number): string => {
    return 'Rp' + amount.toLocaleString('id-ID');
  };

  // Helper Cek Toko Buka/Tutup
  const isStoreOpen = (): boolean => {
    try {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeVal = currentHour * 60 + currentMinute;

      const [openH, openM] = config.operatingHours.open.split(':').map(Number);
      const [closeH, closeM] = config.operatingHours.close.split(':').map(Number);

      const openVal = openH * 60 + (openM || 0);
      const closeVal = closeH * 60 + (closeM || 0);

      return currentTimeVal >= openVal && currentTimeVal <= closeVal;
    } catch {
      return true;
    }
  };

  // Helper Tanggal Minimal Pemesanan (H + minOrderDays)
  const getMinOrderDate = (): string => {
    const d = new Date();
    d.setDate(d.getDate() + (config.minOrderDays || 2));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Operasi Konfigurasi
  const updateConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    showToast('Pengaturan bisnis berhasil diperbarui!', 'success');
  };

  // Operasi Produk
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...prodData,
      id: 'prod-' + Date.now(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Menu "${newProduct.name}" berhasil ditambahkan!`, 'success');
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
    showToast(`Menu "${updatedProd.name}" berhasil diperbarui!`, 'success');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Menu "${target?.name || ''}" berhasil dihapus`, 'info');
  };

  // Operasi Paket Katering
  const updatePackage = (updatedPkg: CateringPackage) => {
    setPackages((prev) => prev.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)));
    showToast(`Paket "${updatedPkg.name}" berhasil diperbarui!`, 'success');
  };

  // Operasi Keranjang
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const itemId = `${item.productId}-${item.selectedVariant || 'default'}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id: itemId }];
    });
    showToast(`${item.quantity}x "${item.name}" ditambahkan ke keranjang`, 'success');
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const updateCartNote = (id: string, note: string) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, note } : item)));
  };

  const removeFromCart = (id: string) => {
    const item = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(`"${item.name}" dihapus dari keranjang`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo('');
    showToast('Keranjang berhasil dikosongkan', 'info');
  };

  // Kalkulasi Keranjang
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Kalkulasi Diskon Promo
  let discountAmount = 0;
  if (appliedPromo) {
    const promo = config.promoCodes.find(
      (p) => p.code.toUpperCase() === appliedPromo.toUpperCase() && p.active
    );
    if (promo && cartSubtotal >= promo.minSpend) {
      const calculated = (cartSubtotal * promo.discountPercent) / 100;
      discountAmount = Math.min(calculated, promo.maxDiscount);
    }
  }

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const promo = config.promoCodes.find((p) => p.code.toUpperCase() === cleanCode && p.active);

    if (!promo) {
      return { success: false, message: 'Kode promo tidak valid atau telah berakhir.' };
    }
    if (cartSubtotal < promo.minSpend) {
      return {
        success: false,
        message: `Minimal belanja untuk kode "${cleanCode}" adalah ${formatRupiah(promo.minSpend)}.`,
      };
    }

    setAppliedPromo(cleanCode);
    showToast(`Kode promo "${cleanCode}" berhasil dipasang!`, 'success');
    return { success: true, message: `Diskon ${promo.discountPercent}% berhasil diterapkan!` };
  };

  const removePromoCode = () => {
    setAppliedPromo('');
    showToast('Kode promo dibatalkan', 'info');
  };

  // Operasi Pemesanan
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Order => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randSuffix = Math.floor(100 + Math.random() * 900);
    const orderNumber = `FZ-${dateStr}-${randSuffix}`;

    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber,
      createdAt: now.toISOString(),
      status: 'Menunggu Konfirmasi',
    };

    setOrders((prev) => [newOrder, ...prev]);
    // Kosongkan keranjang setelah checkout sukses
    setCart([]);
    setAppliedPromo('');
    setActiveOrderSuccess(newOrder);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Status pesanan diperbarui menjadi "${newStatus}"`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('Pesanan berhasil dihapus dari riwayat', 'info');
  };

  // Autentikasi Demo Admin
  const adminLogin = (pin: string): boolean => {
    if (pin.trim() === config.demoAdminPin) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('fazza_admin_auth', 'true');
      } catch {
        // ignore
      }
      showToast('Berhasil masuk ke Dashboard Admin!', 'success');
      return true;
    }
    showToast('PIN Admin salah. Coba gunakan: ' + config.demoAdminPin, 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('fazza_admin_auth');
    } catch {
      // ignore
    }
    showToast('Anda telah keluar dari Dashboard Admin', 'info');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    setConfig(DEFAULT_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    setPackages(INITIAL_PACKAGES);
    setOrders(INITIAL_DEMO_ORDERS);
    setCart([]);
    setAppliedPromo('');
    try {
      localStorage.removeItem('fazza_config');
      localStorage.removeItem('fazza_products');
      localStorage.removeItem('fazza_packages');
      localStorage.removeItem('fazza_orders');
      localStorage.removeItem('fazza_cart');
      localStorage.removeItem('fazza_applied_promo');
    } catch {
      // ignore
    }
    showToast('Seluruh data berhasil di-reset ke kondisi awal demo!', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        config,
        updateConfig,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        packages,
        updatePackage,
        cart,
        addToCart,
        updateCartQuantity,
        updateCartNote,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        appliedPromo,
        discountAmount,
        applyPromoCode,
        removePromoCode,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        activeOrderSuccess,
        setActiveOrderSuccess,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        resetDemoData,
        toasts,
        showToast,
        removeToast,
        formatRupiah,
        isStoreOpen,
        getMinOrderDate,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
