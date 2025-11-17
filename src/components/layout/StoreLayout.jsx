import { useState } from "react";
import { TopNav } from "./TopNav";
import { StoreSideNav } from "./StoreSideNav";
import { Outlet } from "react-router-dom";

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
          <Outlet />
        </main>
      </div>
    </div>
  );
};
