/**
 * @license
 * FAZZA FOOD - Dashboard Pengelola / Admin Toko
 * Lengkap dengan Kelola Pesanan, Menu, Paket Katering, Pengaturan Bisnis, dan Laporan.
 */

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Product,
  CateringPackage,
  Order,
  OrderStatus,
  ProductCategory,
  ProductLabel,
} from '../../types';
import {
  X,
  Lock,
  LayoutDashboard,
  ClipboardList,
  Utensils,
  Package,
  Settings,
  BarChart3,
  LogOut,
  Search,
  Printer,
  MessageSquare,
  CheckCircle,
  Clock,
  Truck,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  Download,
  ShieldAlert,
  AlertTriangle,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import chefLogo from '../../assets/images/fazza_chef_logo_1793023852083.jpg';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    config,
    updateConfig,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    packages,
    updatePackage,
    orders,
    updateOrderStatus,
    deleteOrder,
    resetDemoData,
    formatRupiah,
    showToast,
  } = useStore();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'menu' | 'packages' | 'settings' | 'reports'>('overview');

  // Login PIN input
  const [pinInput, setPinInput] = useState('');

  // Selected Order for Modal Viewer / Invoice Print
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Menu Management Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'Nasi Box',
    price: 20000,
    minOrder: 5,
    shortDescription: '',
    fullDescription: '',
    ingredients: [],
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    label: 'Tersedia',
    available: true,
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(config);

  // Reset confirmation modal
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isAdminOpen) return null;

  // Handler Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(pinInput);
    if (success) {
      setPinInput('');
    }
  };

  // Kalkulasi Statistik Ringkasan
  const todayStr = new Date().toISOString().slice(0, 10);
  const ordersToday = orders.filter((o) => o.createdAt.startsWith(todayStr));
  const pendingOrders = orders.filter((o) => o.status === 'Menunggu Konfirmasi');
  const completedOrders = orders.filter((o) => o.status === 'Selesai');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const totalPortions = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0
  );

  // Filter Orders
  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter !== 'all' && order.status !== orderStatusFilter) return false;
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const matchName = order.customer.fullName.toLowerCase().includes(q);
      const matchNum = order.orderNumber.toLowerCase().includes(q);
      const matchWa = order.customer.whatsapp.includes(q);
      if (!matchName && !matchNum && !matchWa) return false;
    }
    return true;
  });

  // Export CSV Helper
  const handleExportCSV = () => {
    const headers = ['Nomor Pesanan', 'Tanggal Pesan', 'Nama Pelanggan', 'WhatsApp', 'Jadwal Acara', 'Layanan', 'Total (Rp)', 'Status'];
    const rows = orders.map((o) => [
      o.orderNumber,
      o.createdAt.slice(0, 10),
      `"${o.customer.fullName}"`,
      `"${o.customer.whatsapp}"`,
      `"${o.customer.deliveryDate} ${o.customer.deliveryTime}"`,
      o.customer.deliveryMethod,
      o.total,
      o.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Pesanan_FAZZA_FOOD_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Laporan pesanan CSV berhasil diunduh!', 'success');
  };

  // Cetak Pesanan (Print View)
  const handlePrintOrder = (order: Order) => {
    setSelectedOrder(order);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Balas WA ke Pelanggan
  const handleReplyWhatsApp = (order: Order) => {
    const replyText = `Halo Kak ${order.customer.fullName}, kami dari *${config.businessName}* terkait pesanan katering dengan nomor *#${order.orderNumber}*.`;
    const url = createWhatsAppUrl(order.customer.whatsapp, replyText);
    window.open(url, '_blank');
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...productForm,
      } as Product);
      setEditingProduct(null);
    } else {
      addProduct(productForm as any);
      setIsAddingProduct(false);
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(settingsForm);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[94vh]">
        {/* Top Navbar Admin */}
        <div className="bg-[#3B1F0E] text-white px-6 py-4 flex items-center justify-between border-b border-orange-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-orange-400 bg-orange-100 shrink-0">
              <img src={chefLogo} alt="Logo Koki FAZZA" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg">Area Pengelola FAZZA FOOD</h3>
                <span className="text-[10px] bg-amber-400 text-stone-900 font-extrabold px-2 py-0.5 rounded uppercase">
                  Mode Demo
                </span>
              </div>
              <p className="text-xs text-white/70">Karanggintung, Gandrungmangu, Cilacap</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={adminLogout}
                className="text-white/70 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Layar Login Jika Belum Autentikasi */}
        {!isAdminAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#FFF8F0]">
            <div className="bg-white p-8 rounded-3xl border border-orange-200/80 shadow-xl max-w-md w-full space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 text-[#EA580C] flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-2xl text-[#3B1F0E]">
                  Masuk ke Panel Pengelola
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
                  Masukkan PIN admin Anda untuk mengakses pengaturan bisnis, menu, dan riwayat pesanan.
                </p>
              </div>

              {/* Banner Peringatan Mode Demo */}
              <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-2xl text-left text-xs text-amber-900 flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Pemberitahuan Demo:</strong> PIN default demo adalah <span className="font-mono font-bold bg-amber-200/80 px-1.5 py-0.5 rounded text-stone-900">1234</span>. Data tersimpan di peramban (localStorage) ini saja.
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    maxLength={10}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Masukkan PIN (Default: 1234)"
                    className="w-full text-center tracking-widest text-lg font-bold py-3 px-4 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-[#FFF8F0]"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Buka Dashboard
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ================= DASHBOARD UTAMA SETELAH LOGIN ================= */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tab Menu */}
            <div className="w-full md:w-60 bg-[#FFF8F0] border-r border-orange-200/80 p-3 sm:p-4 flex md:flex-col gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-[#EA580C] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-orange-100/70'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Ringkasan</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'orders'
                    ? 'bg-[#EA580C] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-orange-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ClipboardList className="w-4 h-4 shrink-0" />
                  <span>Kelola Pesanan</span>
                </div>
                {pendingOrders.length > 0 && (
                  <span className="bg-amber-400 text-stone-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {pendingOrders.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'menu'
                    ? 'bg-[#EA580C] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-orange-100/70'
                }`}
              >
                <Utensils className="w-4 h-4 shrink-0" />
                <span>Kelola Menu</span>
              </button>

              <button
                onClick={() => setActiveTab('packages')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'packages'
                    ? 'bg-[#EA580C] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-orange-100/70'
                }`}
              >
                <Package className="w-4 h-4 shrink-0" />
                <span>Paket Katering</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-[#EA580C] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-orange-100/70'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Pengaturan Bisnis</span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'reports'
                    ? 'bg-[#EA580C] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-orange-100/70'
                }`}
              >
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span>Laporan & Ekspor</span>
              </button>

              <div className="hidden md:block mt-auto pt-4 border-t border-orange-200">
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full text-left text-xs text-rose-600 hover:text-rose-800 font-bold p-2 rounded-lg hover:bg-rose-50 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Data Demo</span>
                </button>
              </div>
            </div>

            {/* Konten Tab Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
              {/* ================= TAB 1: OVERVIEW ================= */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#3B1F0E]">
                      Ringkasan Operasional Toko
                    </h3>
                    <p className="text-xs text-stone-500">
                      Pantau perkembangan pesanan dan status dapur hari ini ({todayStr}).
                    </p>
                  </div>

                  {/* 4 Kartu Statistik */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-orange-200">
                      <span className="text-[11px] font-bold text-stone-500 uppercase block">
                        Pesanan Masuk Hari Ini
                      </span>
                      <span className="font-serif font-bold text-3xl text-[#3B1F0E] mt-1 block">
                        {ordersToday.length}
                      </span>
                      <span className="text-[11px] text-orange-600 mt-1 block">Pesanan</span>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                      <span className="text-[11px] font-bold text-amber-800 uppercase block">
                        Menunggu Konfirmasi
                      </span>
                      <span className="font-serif font-bold text-3xl text-amber-700 mt-1 block">
                        {pendingOrders.length}
                      </span>
                      <span className="text-[11px] text-amber-800 mt-1 block">Perlu dicek admin</span>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase block">
                        Total Pendapatan Selesai
                      </span>
                      <span className="font-serif font-bold text-2xl text-emerald-700 mt-1 block">
                        {formatRupiah(totalRevenue)}
                      </span>
                      <span className="text-[11px] text-emerald-800 mt-1 block">Dari pesanan berstatus selesai</span>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                      <span className="text-[11px] font-bold text-stone-600 uppercase block">
                        Total Porsi Terpesan
                      </span>
                      <span className="font-serif font-bold text-3xl text-stone-800 mt-1 block">
                        {totalPortions}
                      </span>
                      <span className="text-[11px] text-stone-500 mt-1 block">Porsi makanan & minuman</span>
                    </div>
                  </div>

                  {/* Pesanan Terbaru yang Perlu Ditindaklanjuti */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-lg text-[#3B1F0E]">
                        Pesanan Membutuhkan Tindakan
                      </h4>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-bold text-[#EA580C] hover:underline"
                      >
                        Lihat Semua Pesanan →
                      </button>
                    </div>

                    {pendingOrders.length === 0 ? (
                      <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs text-emerald-800">
                        🎉 Semua pesanan sudah dikonfirmasi atau belum ada pesanan baru yang menunggu.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {pendingOrders.slice(0, 3).map((ord) => (
                          <div
                            key={ord.id}
                            className="p-4 bg-[#FFF8F0] rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-xs text-[#EA580C]">
                                  #{ord.orderNumber}
                                </span>
                                <span className="text-xs font-bold text-[#3B1F0E]">
                                  {ord.customer.fullName}
                                </span>
                                <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
                                  Menunggu Konfirmasi
                                </span>
                              </div>
                              <p className="text-xs text-stone-600 mt-1">
                                Acara: {ord.customer.eventType} • Tanggal: {ord.customer.deliveryDate} (Pukul {ord.customer.deliveryTime} WIB)
                              </p>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'Dikonfirmasi')}
                                className="bg-[#EA580C] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#C2410C]"
                              >
                                Konfirmasi
                              </button>
                              <button
                                onClick={() => handleReplyWhatsApp(ord)}
                                className="bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WA</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ================= TAB 2: KELOLA PESANAN ================= */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-[#3B1F0E]">
                        Daftar Pesanan Katering ({filteredOrders.length})
                      </h3>
                      <p className="text-xs text-stone-500">
                        Cek pesanan masuk, ubah status pengerjaan dapur, dan cetak invoice.
                      </p>
                    </div>
                  </div>

                  {/* Filter & Search Bar Pesanan */}
                  <div className="flex flex-col sm:flex-row gap-3 bg-[#FFF8F0] p-3 rounded-2xl border border-orange-200">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={orderSearchQuery}
                        onChange={(e) => setOrderSearchQuery(e.target.value)}
                        placeholder="Cari nama pemesan, nomor pesanan, atau nomor WA..."
                        className="w-full bg-white pl-9 pr-3 py-2 text-xs rounded-xl border border-orange-200 focus:outline-none focus:ring-1 focus:ring-[#EA580C]"
                      />
                    </div>

                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="bg-white px-3 py-2 text-xs rounded-xl border border-orange-200 font-semibold"
                    >
                      <option value="all">Semua Status</option>
                      <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                      <option value="Dikonfirmasi">Dikonfirmasi</option>
                      <option value="Diproses">Diproses Dapur</option>
                      <option value="Dikirim">Sedang Dikirim</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </div>

                  {/* Tabel / Kartu Daftar Pesanan */}
                  <div className="space-y-3">
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-12 text-stone-500 text-xs">
                        Tidak ada pesanan yang sesuai filter.
                      </div>
                    ) : (
                      filteredOrders.map((ord) => {
                        const statusColors: Record<OrderStatus, string> = {
                          'Menunggu Konfirmasi': 'bg-amber-100 text-amber-900 border-amber-300',
                          Dikonfirmasi: 'bg-blue-100 text-blue-900 border-blue-300',
                          Diproses: 'bg-orange-100 text-orange-900 border-orange-300',
                          Dikirim: 'bg-purple-100 text-purple-900 border-purple-300',
                          Selesai: 'bg-emerald-100 text-emerald-900 border-emerald-300',
                          Dibatalkan: 'bg-stone-200 text-stone-700 border-stone-300',
                        };

                        return (
                          <div
                            key={ord.id}
                            className="bg-white rounded-2xl p-4 border border-orange-200/90 shadow-xs space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-orange-100">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-mono font-bold text-sm text-[#EA580C]">
                                    #{ord.orderNumber}
                                  </span>
                                  <span className="font-serif font-bold text-base text-[#3B1F0E]">
                                    {ord.customer.fullName}
                                  </span>
                                  <span
                                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                      statusColors[ord.status]
                                    }`}
                                  >
                                    {ord.status}
                                  </span>
                                </div>
                                <span className="text-[11px] text-stone-500 block mt-0.5">
                                  Dipesan: {new Date(ord.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                                <button
                                  onClick={() => setSelectedOrder(ord)}
                                  className="text-xs bg-orange-50 text-[#EA580C] px-2.5 py-1.5 rounded-lg font-bold hover:bg-orange-100 flex items-center gap-1"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Detail</span>
                                </button>
                                <button
                                  onClick={() => handlePrintOrder(ord)}
                                  className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1.5 rounded-lg font-bold hover:bg-stone-200 flex items-center gap-1"
                                  title="Cetak Ringkasan Pesanan"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                  <span>Cetak</span>
                                </button>
                                <button
                                  onClick={() => handleReplyWhatsApp(ord)}
                                  className="text-xs bg-[#25D366] text-white px-2.5 py-1.5 rounded-lg font-bold hover:bg-[#20ba59] flex items-center gap-1"
                                  title="Chat WhatsApp Pelanggan"
                                >
                                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                                  <span>WA</span>
                                </button>
                              </div>
                            </div>

                            {/* Info Pengiriman & Item Singkat */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700">
                              <div>
                                <span className="text-stone-500 block">Jadwal Pengiriman:</span>
                                <strong>{ord.customer.deliveryDate}</strong> (Pukul {ord.customer.deliveryTime} WIB)
                              </div>
                              <div>
                                <span className="text-stone-500 block">Alamat / Layanan:</span>
                                <span className="truncate block">
                                  {ord.customer.deliveryMethod === 'delivery'
                                    ? ord.customer.address
                                    : 'Ambil Sendiri di Dapur'}
                                </span>
                              </div>
                              <div className="sm:text-right">
                                <span className="text-stone-500 block">Total Tagihan:</span>
                                <strong className="text-sm text-[#EA580C]">
                                  {formatRupiah(ord.total)}
                                </strong>
                              </div>
                            </div>

                            {/* Stepper Ubah Status Cepat */}
                            <div className="pt-2 border-t border-orange-100 flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-[11px] font-bold text-stone-600">
                                Ubah Status Pesanan:
                              </span>
                              <div className="flex items-center gap-1 flex-wrap">
                                {(
                                  [
                                    'Menunggu Konfirmasi',
                                    'Dikonfirmasi',
                                    'Diproses',
                                    'Dikirim',
                                    'Selesai',
                                    'Dibatalkan',
                                  ] as OrderStatus[]
                                ).map((st) => (
                                  <button
                                    key={st}
                                    onClick={() => updateOrderStatus(ord.id, st)}
                                    className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                                      ord.status === st
                                        ? 'bg-[#3B1F0E] text-white'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                                  >
                                    {st}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* ================= TAB 3: KELOLA MENU ================= */}
              {activeTab === 'menu' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-[#3B1F0E]">
                        Kelola Menu Katering ({products.length})
                      </h3>
                      <p className="text-xs text-stone-500">
                        Tambah, edit harga, ubah ketersediaan, atau hapus menu.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsAddingProduct(true);
                        setProductForm({
                          name: '',
                          category: 'Nasi Box',
                          price: 20000,
                          minOrder: 5,
                          shortDescription: '',
                          fullDescription: '',
                          ingredients: ['Beras pulen', 'Ayam segar', 'Sambal', 'Lalap'],
                          image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
                          label: 'Tersedia',
                          available: true,
                        });
                      }}
                      className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Menu Baru</span>
                    </button>
                  </div>

                  {/* Grid Menu Management */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3.5 rounded-2xl border border-orange-200 bg-[#FFF8F0] flex gap-3 relative"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-20 h-20 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase text-orange-600 block">
                            {prod.category}
                          </span>
                          <h4 className="font-serif font-bold text-sm text-[#3B1F0E] truncate">
                            {prod.name}
                          </h4>
                          <span className="font-serif font-extrabold text-sm text-[#EA580C] block mt-0.5">
                            {formatRupiah(prod.price)}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                prod.available ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                              }`}
                            >
                              {prod.available ? 'Tersedia' : 'Habis'}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              Min. {prod.minOrder} porsi
                            </span>
                          </div>
                        </div>

                        {/* Aksi Edit & Hapus */}
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setProductForm(prod);
                            }}
                            className="p-1.5 rounded-lg bg-white hover:bg-orange-100 text-stone-700"
                            title="Edit Menu"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 rounded-lg bg-white hover:bg-rose-100 text-rose-600"
                            title="Hapus Menu"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 4: PAKET KATERING ================= */}
              {activeTab === 'packages' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#3B1F0E]">
                      Kelola 7 Paket Katering
                    </h3>
                    <p className="text-xs text-stone-500">
                      Ubah harga per porsi, minimal porsi, dan ketersediaan paket acara.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="bg-[#FFF8F0] p-4 rounded-2xl border border-orange-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif font-bold text-base text-[#3B1F0E]">
                                {pkg.name}
                              </h4>
                              {pkg.isPopular && (
                                <span className="bg-[#EA580C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Paling Dipilih
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-stone-500 block">{pkg.tag}</span>
                            <span className="text-xs text-[#EA580C] font-bold">
                              {formatRupiah(pkg.pricePerPortion)} / porsi (Min. {pkg.minPortion} porsi)
                            </span>
                          </div>
                        </div>

                        {/* Input Cepat Harga & Minimal */}
                        <div className="flex items-center gap-2">
                          <div className="text-xs">
                            <span className="text-stone-500 block text-[10px]">Harga Baru:</span>
                            <input
                              type="number"
                              value={pkg.pricePerPortion}
                              onChange={(e) =>
                                updatePackage({ ...pkg, pricePerPortion: Number(e.target.value) })
                              }
                              className="w-24 bg-white px-2 py-1 rounded border border-orange-200 text-xs font-bold"
                            />
                          </div>

                          <div className="text-xs">
                            <span className="text-stone-500 block text-[10px]">Min. Porsi:</span>
                            <input
                              type="number"
                              value={pkg.minPortion}
                              onChange={(e) =>
                                updatePackage({ ...pkg, minPortion: Number(e.target.value) })
                              }
                              className="w-16 bg-white px-2 py-1 rounded border border-orange-200 text-xs font-bold"
                            />
                          </div>

                          <button
                            onClick={() => updatePackage({ ...pkg, available: !pkg.available })}
                            className={`text-xs px-3 py-2 rounded-xl font-bold mt-3 ${
                              pkg.available
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {pkg.available ? 'Aktif' : 'Nonaktif'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= TAB 5: PENGATURAN BISNIS ================= */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#3B1F0E]">
                      Pengaturan Toko & WhatsApp
                    </h3>
                    <p className="text-xs text-stone-500">
                      Ganti nomor WhatsApp penerima pesanan, jam kerja, alamat, tarif ongkir, dan kode promo.
                    </p>
                  </div>

                  {/* WhatsApp Resmi Toko */}
                  <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-orange-200 space-y-3">
                    <label className="text-xs font-bold text-[#3B1F0E] block">
                      Nomor WhatsApp Toko (Penerima Pesanan Pelanggan) *
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                      }
                      placeholder="Contoh: 6281234567890 (awali 62 tanpa + atau spasi)"
                      className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-orange-200 text-xs sm:text-sm font-mono font-bold"
                    />
                    <p className="text-[11px] text-stone-500">
                      💡 Format yang benar diawali kode negara 62. Contoh: <strong className="text-[#EA580C]">6281234567890</strong>. Jangan gunakan strip atau spasi.
                    </p>
                  </div>

                  {/* Nama Toko & Slogan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
                        Nama Usaha Katering
                      </label>
                      <input
                        type="text"
                        value={settingsForm.businessName}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, businessName: e.target.value })
                        }
                        className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-orange-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
                        Kota / Area Layanan
                      </label>
                      <input
                        type="text"
                        value={settingsForm.city}
                        onChange={(e) => setSettingsForm({ ...settingsForm, city: e.target.value })}
                        className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-orange-200 text-xs"
                      />
                    </div>
                  </div>

                  {/* Alamat Dapur */}
                  <div>
                    <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
                      Alamat Dapur Resmi
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-orange-200 text-xs"
                    />
                  </div>

                  {/* Jam Operasional */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
                        Jam Buka (WIB)
                      </label>
                      <input
                        type="time"
                        value={settingsForm.operatingHours.open}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            operatingHours: {
                              ...settingsForm.operatingHours,
                              open: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-orange-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
                        Jam Tutup (WIB)
                      </label>
                      <input
                        type="time"
                        value={settingsForm.operatingHours.close}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            operatingHours: {
                              ...settingsForm.operatingHours,
                              close: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-orange-200 text-xs"
                      />
                    </div>
                  </div>

                  {/* Ambang Gratis Ongkir & Minimal Hari Pesan */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
                        Ambang Gratis Ongkir (Rp)
                      </label>
                      <input
                        type="number"
                        value={settingsForm.freeShippingThreshold}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            freeShippingThreshold: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-orange-200 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
                        Minimal Hari Pesan (H-X)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={14}
                        value={settingsForm.minOrderDays}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            minOrderDays: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-orange-200 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold py-3 px-6 rounded-xl shadow-md text-xs cursor-pointer"
                  >
                    Simpan Perubahan Pengaturan
                  </button>
                </form>
              )}

              {/* ================= TAB 6: LAPORAN & EKSPOR ================= */}
              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-[#3B1F0E]">
                        Laporan Penjualan & Analisis
                      </h3>
                      <p className="text-xs text-stone-500">
                        Unduh data riwayat pesanan ke format CSV (Excel) atau cetak laporan.
                      </p>
                    </div>
                    <button
                      onClick={handleExportCSV}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Ekspor Data ke CSV</span>
                    </button>
                  </div>

                  {/* Ringkasan Performa */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#FFF8F0] rounded-2xl border border-orange-200">
                      <span className="text-xs text-stone-500 block">Total Semua Pesanan:</span>
                      <strong className="font-serif text-2xl text-[#3B1F0E]">{orders.length} Pesanan</strong>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                      <span className="text-xs text-emerald-700 block">Total Omset Sukses:</span>
                      <strong className="font-serif text-2xl text-emerald-800">{formatRupiah(totalRevenue)}</strong>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                      <span className="text-xs text-amber-800 block">Rata-rata Nilai Pesanan:</span>
                      <strong className="font-serif text-2xl text-amber-900">
                        {orders.length > 0 ? formatRupiah(Math.round(totalRevenue / (completedOrders.length || 1))) : 'Rp0'}
                      </strong>
                    </div>
                  </div>

                  {/* Daftar Pesanan Terbaru dalam Tabel */}
                  <div className="border border-orange-200 rounded-2xl overflow-hidden">
                    <div className="bg-[#FFF8F0] p-3 text-xs font-bold text-[#3B1F0E] border-b border-orange-200">
                      Ringkasan 10 Pesanan Terakhir
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                          <tr>
                            <th className="p-3">No. Pesanan</th>
                            <th className="p-3">Pelanggan</th>
                            <th className="p-3">Jadwal Acara</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {orders.slice(0, 10).map((ord) => (
                            <tr key={ord.id} className="hover:bg-orange-50/50">
                              <td className="p-3 font-mono font-bold text-[#EA580C]">#{ord.orderNumber}</td>
                              <td className="p-3 font-medium">{ord.customer.fullName}</td>
                              <td className="p-3">{ord.customer.deliveryDate} ({ord.customer.deliveryTime})</td>
                              <td className="p-3 font-bold">{formatRupiah(ord.total)}</td>
                              <td className="p-3">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                                  {ord.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= MODAL DETAIL / CETAK INVOICE PESANAN ================= */}
        {selectedOrder && (
          <div
            id="printable-invoice"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="no-print absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-orange-200 pb-4 text-center">
                <h3 className="font-serif font-bold text-xl text-[#3B1F0E]">{config.businessName}</h3>
                <p className="text-xs text-stone-500">{config.address}, {config.city}</p>
                <p className="text-xs text-stone-500">WhatsApp: +{config.whatsappNumber}</p>
                <span className="inline-block mt-2 font-mono font-bold text-xs bg-orange-100 text-[#EA580C] px-2.5 py-0.5 rounded">
                  INVOICE #{selectedOrder.orderNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                <div>
                  <span className="text-stone-500 block">Pemesan:</span>
                  <strong>{selectedOrder.customer.fullName}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">WhatsApp:</span>
                  <strong>{selectedOrder.customer.whatsapp}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Jadwal Acara:</span>
                  <strong>{selectedOrder.customer.deliveryDate} ({selectedOrder.customer.deliveryTime} WIB)</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Metode:</span>
                  <strong>{selectedOrder.customer.deliveryMethod === 'delivery' ? 'Pengantaran' : 'Ambil Sendiri'}</strong>
                </div>
                {selectedOrder.customer.deliveryMethod === 'delivery' && (
                  <div className="col-span-2">
                    <span className="text-stone-500 block">Alamat Antar:</span>
                    <span>{selectedOrder.customer.address}</span>
                  </div>
                )}
              </div>

              {/* Rincian Menu */}
              <div className="border-t border-b border-orange-100 py-3 space-y-2 text-xs">
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <div>
                      <span>{it.quantity}x {it.name}</span>
                      {it.selectedVariant && <span className="text-[10px] text-stone-400 block">({it.selectedVariant})</span>}
                    </div>
                    <span className="font-bold">{formatRupiah(it.price * it.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatRupiah(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Diskon:</span>
                    <span>-{formatRupiah(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Ongkos Kirim:</span>
                  <span>{selectedOrder.deliveryFee === 0 ? 'GRATIS' : formatRupiah(selectedOrder.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#EA580C] pt-2 border-t border-orange-200">
                  <span>Total Pembayaran:</span>
                  <span>{formatRupiah(selectedOrder.total)}</span>
                </div>
              </div>

              <div className="no-print pt-2 flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-[#EA580C] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Struk Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL TAMBAH / EDIT MENU ================= */}
        {(isAddingProduct || editingProduct) && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => {
              setIsAddingProduct(false);
              setEditingProduct(null);
            }}
          >
            <div
              className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setIsAddingProduct(false);
                  setEditingProduct(null);
                }}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="font-serif font-bold text-lg text-[#3B1F0E]">
                {editingProduct ? 'Ubah Data Menu' : 'Tambah Menu Baru'}
              </h4>

              <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Nama Menu</label>
                  <input
                    type="text"
                    required
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-[#FFF8F0] p-2 rounded-xl border border-orange-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Kategori</label>
                    <select
                      value={productForm.category || 'Nasi Box'}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })}
                      className="w-full bg-[#FFF8F0] p-2 rounded-xl border border-orange-200"
                    >
                      <option value="Nasi Box">Nasi Box</option>
                      <option value="Snack Box">Snack Box</option>
                      <option value="Kue">Kue</option>
                      <option value="Minuman">Minuman</option>
                      <option value="Prasmanan">Prasmanan</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Label Badge</label>
                    <select
                      value={productForm.label || 'Tersedia'}
                      onChange={(e) => setProductForm({ ...productForm, label: e.target.value as ProductLabel })}
                      className="w-full bg-[#FFF8F0] p-2 rounded-xl border border-orange-200"
                    >
                      <option value="Terlaris">Terlaris</option>
                      <option value="Baru">Baru</option>
                      <option value="Tersedia">Tersedia</option>
                      <option value="Habis">Habis</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Harga per Porsi (Rp)</label>
                    <input
                      type="number"
                      required
                      value={productForm.price || 0}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full bg-[#FFF8F0] p-2 rounded-xl border border-orange-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Minimal Pesan (Porsi)</label>
                    <input
                      type="number"
                      required
                      value={productForm.minOrder || 1}
                      onChange={(e) => setProductForm({ ...productForm, minOrder: Number(e.target.value) })}
                      className="w-full bg-[#FFF8F0] p-2 rounded-xl border border-orange-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Deskripsi Singkat</label>
                  <input
                    type="text"
                    required
                    value={productForm.shortDescription || ''}
                    onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                    className="w-full bg-[#FFF8F0] p-2 rounded-xl border border-orange-200"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">URL Foto Makanan (Unsplash / Gambar)</label>
                  <input
                    type="url"
                    required
                    value={productForm.image || ''}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full bg-[#FFF8F0] p-2 rounded-xl border border-orange-200"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isAvailableCheck"
                    checked={productForm.available ?? true}
                    onChange={(e) => setProductForm({ ...productForm, available: e.target.checked })}
                    className="w-4 h-4 accent-[#EA580C]"
                  />
                  <label htmlFor="isAvailableCheck" className="font-semibold cursor-pointer">
                    Menu aktif & tersedia untuk dipesan pelanggan
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold py-2.5 rounded-xl shadow-md cursor-pointer mt-2"
                >
                  {editingProduct ? 'Perbarui Menu' : 'Simpan Menu Baru'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= MODAL KONFIRMASI RESET DATA DEMO ================= */}
        {showResetConfirm && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowResetConfirm(false)}
          >
            <div
              className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#3B1F0E]">
                Reset ke Data Awal Demo?
              </h4>
              <p className="text-xs text-stone-600">
                Tindakan ini akan mengembalikan seluruh produk, paket, pengaturan WhatsApp, dan riwayat pesanan ke kondisi bawaan awal.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 bg-stone-100 text-stone-700 font-bold py-2 rounded-xl text-xs"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    resetDemoData();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs"
                >
                  Ya, Reset Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
