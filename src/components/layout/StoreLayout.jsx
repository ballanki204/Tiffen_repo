import { useState } from "react";
import { TopNav } from "./TopNav";
import { StoreSideNav } from "./StoreSideNav";
import { Routes, Route } from "react-router-dom";
import StoreDashboard from "../../pages/admin/StoreDashboard";
import StoreProfile from "../../pages/admin/store/StoreProfile";
import StoreTiming from "../../pages/admin/store/StoreTiming";
import StoreLocation from "../../pages/admin/store/StoreLocation";
import StorePayment from "../../pages/admin/store/StorePayment";

export const StoreLayout = () => {
  // collapsed = icons-only sidebar; false = expanded (full labels)
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background w-full">
      <TopNav
        onMenuClick={() => setCollapsed(!collapsed)}
        collapsed={collapsed}
      />
      <div className="flex pt-16 w-full">
        <StoreSideNav collapsed={collapsed} />
        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            collapsed ? "ml-20 md:ml-20" : "ml-64"
          } p-6`}
        >
          <Routes>
            <Route index element={<StoreDashboard />} />
            <Route path="profile" element={<StoreProfile />} />
            <Route path="timing" element={<StoreTiming />} />
            <Route path="location" element={<StoreLocation />} />
            <Route path="payment" element={<StorePayment />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </div>
  );
};
