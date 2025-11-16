import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  FileText,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const menuItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/outlets", icon: Store, label: "Outlets" },
  { to: "/admin/items", icon: Package, label: "Items" },
  {
    to: "/admin/purchase-vendors",
    icon: ShoppingCart,
    label: "Purchase Vendors",
  },
  { to: "/admin/reports", icon: FileText, label: "Reports" },
];

export const SideNav = ({ collapsed = false }) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ease-in-out z-40 overflow-hidden",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <nav className="p-2 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                collapsed ? "justify-center" : "pl-4"
              )}
              activeClassName="bg-primary/10 text-primary font-medium"
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
