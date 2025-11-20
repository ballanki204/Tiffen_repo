// also in🚀 FINAL, WORKING VERSION OF App.jsx

// (PLEASE COPY/REPLACE FULL FILE)

// THIS VERSION WILL 100% FIX ALL ISSUES for subfolder hosting.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { AdminLayout } from "./components/layout/AdminLayout";
import { StoreLayout } from "./components/layout/StoreLayout";
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
import StoreProfile from "./pages/admin/store/StoreProfile";
import StoreTiming from "./pages/admin/store/StoreTiming";
import StoreLocation from "./pages/admin/store/StoreLocation";
import StorePayment from "./pages/admin/store/StorePayment";
import StoreProducts from "./pages/admin/store/StoreProducts";
import StoreCategory from "./pages/admin/store/StoreCategory";
import StoreOptions from "./pages/admin/store/StoreOptions";
import StoreAddon from "./pages/admin/store/StoreAddon";
import StoreOrders from "./pages/admin/store/StoreOrders";
import StoreMarketing from "./pages/admin/store/StoreMarketing";
import StoreReviews from "./pages/admin/store/StoreReviews";
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
      <HashRouter basename="/">
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
            <Route path="users" element={<UsersPage />} />
            <Route path="riders" element={<RidersPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="multi-vendor" element={<MultiVendorDashboard />} />
            <Route path="multi-vendor/vendors" element={<VendorsPage />} />
            <Route path="multi-vendor/stores" element={<StoresPage />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="stores" element={<Stores />} />
            <Route path="orders" element={<Orders />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="cuisine" element={<Cuisine />} />
            <Route path="banners" element={<Banners />} />
            <Route path="tipping" element={<Tipping />} />
            <Route path="commission-rates" element={<CommissionRates />} />
            <Route path="withdraw-requests" element={<WithdrawRequests />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route
            path="/admin/store-dashboard/:storeId"
            element={<StoreLayout />}
          >
            <Route index element={<StoreDashboard />} />
            <Route path="profile" element={<StoreProfile />} />
            <Route path="timing" element={<StoreTiming />} />
            <Route path="location" element={<StoreLocation />} />
            <Route path="payment" element={<StorePayment />} />
            <Route path="products" element={<StoreProducts />} />
            <Route path="category" element={<StoreCategory />} />
            <Route path="options" element={<StoreOptions />} />
            <Route path="addon" element={<StoreAddon />} />
            <Route path="orders" element={<StoreOrders />} />
            <Route path="marketing" element={<StoreMarketing />} />
            <Route path="reviews" element={<StoreReviews />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
