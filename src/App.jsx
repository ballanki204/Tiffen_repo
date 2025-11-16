import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { AdminLayout } from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Items from "./pages/admin/Items";
import Outlets from "./pages/admin/Outlets";
import PurchaseVendors from "./pages/admin/PurchaseVendors";
import Reports from "./pages/admin/Reports";
import AdminProfile from "./pages/admin/AdminProfile";
import PLStatement from "./pages/admin/reports/PLStatement";
import DailySales from "./pages/admin/reports/DailySales";
import ConsumptionVsSales from "./pages/admin/reports/ConsumptionVsSales";
import WastageReport from "./pages/admin/reports/WastageReport";
import FoodCost from "./pages/admin/reports/FoodCost";
import MultiVendorDashboard from "./pages/admin/MultiVendor/Dashboard";
import VendorsPage from "./pages/admin/MultiVendor/Vendors";
import StoresPage from "./pages/admin/MultiVendor/Stores";
import StoreDashboard from "./pages/admin/StoreDashboard";
import UsersPage from "./pages/admin/Users";
import RidersPage from "./pages/admin/Riders";
import StaffPage from "./pages/admin/Staff";
import SettingsPage from "./pages/admin/Settings";
import Vendors from "./pages/admin/Vendors";
import Stores from "./pages/admin/Stores";
import Orders from "./pages/admin/Orders";
import Coupons from "./pages/admin/Coupons";
import Cuisine from "./pages/admin/Cuisine";
import Banners from "./pages/admin/Banners";
import Tipping from "./pages/admin/Tipping";
import CommissionRates from "./pages/admin/CommissionRates";
import WithdrawRequests from "./pages/admin/WithdrawRequests";
import Notifications from "./pages/admin/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="outlets" element={<Outlets />} />
            <Route path="items" element={<Items />} />
            <Route path="purchase-vendors" element={<PurchaseVendors />} />
            <Route path="reports" element={<Reports />}>
              <Route index element={<PLStatement />} />
              <Route path="pl-statement" element={<PLStatement />} />
              <Route path="daily-sales" element={<DailySales />} />
              <Route path="consumption" element={<ConsumptionVsSales />} />
              <Route path="wastage" element={<WastageReport />} />
              <Route path="food-cost" element={<FoodCost />} />
            </Route>
            <Route path="profile" element={<AdminProfile />} />

            {/* Management Routes */}
            <Route path="users" element={<UsersPage />} />
            <Route path="riders" element={<RidersPage />} />
            <Route path="staff" element={<StaffPage />} />

            {/* Multi-Vendor Routes */}
            <Route path="multi-vendor" element={<MultiVendorDashboard />} />
            <Route path="multi-vendor/vendors" element={<VendorsPage />} />
            <Route path="multi-vendor/stores" element={<StoresPage />} />

            {/* Store Dashboard Route */}
            <Route
              path="store-dashboard/:storeId"
              element={<StoreDashboard />}
            />

            {/* Vendors */}
            <Route path="vendors" element={<Vendors />} />

            {/* Stores */}
            <Route path="stores" element={<Stores />} />

            {/* Management Routes */}
            <Route path="orders" element={<Orders />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="cuisine" element={<Cuisine />} />
            <Route path="banners" element={<Banners />} />
            <Route path="tipping" element={<Tipping />} />
            <Route path="commission-rates" element={<CommissionRates />} />
            <Route path="withdraw-requests" element={<WithdrawRequests />} />
            <Route path="notifications" element={<Notifications />} />

            {/* Settings */}
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
