import { useState } from "react";
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  FileText,
  Building2,
  Users,
  Bike,
  UserCheck,
  ChevronDown,
  Settings,
  Zap,
  Percent,
  Utensils,
  Image,
  DollarSign,
  Calculator,
  Bell,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const menuSections = [
  {
    section: "Dashboard",
    items: [
      { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    section: "General",
    items: [
      { to: "/admin/outlets", icon: Store, label: "Outlets" },
      { to: "/admin/users", icon: Users, label: "Users" },
      { to: "/admin/riders", icon: Bike, label: "Riders" },
      { to: "/admin/staff", icon: UserCheck, label: "Staff" },
      { to: "/admin/vendors", icon: Building2, label: "Vendors" },
      { to: "/admin/stores", icon: Package, label: "Stores" },
    ],
  },
  {
    section: "Management",
    items: [
      { to: "/admin/orders", icon: Package, label: "Orders" },
      { to: "/admin/coupons", icon: Percent, label: "Coupons" },
      { to: "/admin/cuisine", icon: Utensils, label: "Cuisine" },
      { to: "/admin/banners", icon: Image, label: "Banners" },
      { to: "/admin/tipping", icon: DollarSign, label: "Tipping" },
      {
        to: "/admin/commission-rates",
        icon: Calculator,
        label: "Commission Rates",
      },
      {
        to: "/admin/withdraw-requests",
        icon: Building2,
        label: "Withdraw Requests",
      },
      { to: "/admin/notifications", icon: Bell, label: "Notifications" },
      { to: "/admin/reports", icon: FileText, label: "Reports" },
      { to: "/admin/items", icon: Package, label: "Items" },
      {
        to: "/admin/purchase-vendors",
        icon: ShoppingCart,
        label: "Purchase Vendors",
      },
    ],
  },
  {
    section: "Settings",
    items: [
      {
        to: "/admin/settings",
        icon: Settings,
        label: "Settings",
        comingSoon: true,
      },
    ],
  },
];

export const SideNav = ({ collapsed = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    Dashboard: !collapsed,
    General: false,
    Management: false,
    Settings: false,
  });

  const toggleSection = (section) => {
    if (!collapsed) {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ease-in-out z-40 overflow-y-auto",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <nav className="p-2 space-y-2">
        {menuSections.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <button
                onClick={() => toggleSection(section.section)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg",
                  "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {section.section}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    expandedSections[section.section] ? "rotate-180" : ""
                  )}
                />
              </button>
            )}

            {collapsed || expandedSections[section.section] ? (
              <div className={cn("space-y-1", !collapsed && "pl-2")}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-sm relative",
                        collapsed ? "justify-center" : "pl-4"
                      )}
                      activeClassName="bg-primary/10 text-primary font-medium"
                      onClick={(e) => {
                        if (item.comingSoon) {
                          e.preventDefault();
                        }
                      }}
                      style={
                        item.comingSoon
                          ? { opacity: 0.5, cursor: "not-allowed" }
                          : {}
                      }
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span>{item.label}</span>
                          {item.comingSoon && (
                            <span className="text-xs text-muted-foreground ml-auto bg-muted px-1.5 py-0.5 rounded">
                              Soon
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}
      </nav>
    </aside>
  );
};
