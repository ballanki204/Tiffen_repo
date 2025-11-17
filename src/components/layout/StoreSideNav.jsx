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
  ArrowLeft,
  Clock,
  MapPin,
  CreditCard,
  Tag,
  Plus,
  Star,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuSections = [
  {
    section: "Dashboard",
    items: [
      {
        to: "",
        icon: LayoutDashboard,
        label: "Dashboard",
      },
    ],
  },
  {
    section: "Store",
    items: [
      {
        to: "profile",
        icon: UserCheck,
        label: "Profile",
      },
      { to: "timing", icon: Clock, label: "Timing" },
      {
        to: "location",
        icon: MapPin,
        label: "Location",
      },
      {
        to: "payment",
        icon: CreditCard,
        label: "Payment",
      },
    ],
  },
  {
    section: "Products Management",
    items: [
      {
        to: "products",
        icon: Package,
        label: "Products",
      },
      { to: "category", icon: Tag, label: "Category" },
      {
        to: "options",
        icon: Settings,
        label: "Options",
      },
      { to: "addon", icon: Plus, label: "Addon" },
    ],
  },
  {
    section: "Orders",
    items: [{ to: "orders", icon: Package, label: "Orders" }],
  },
  {
    section: "Marketing",
    items: [{ to: "marketing", icon: Zap, label: "Marketing" }],
  },
  {
    section: "Reviews",
    items: [{ to: "reviews", icon: Star, label: "Reviews" }],
  },
];

export const StoreSideNav = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    Dashboard: !collapsed,
    Store: false,
    "Products Management": false,
    Orders: false,
    Marketing: false,
    Reviews: false,
  });

  const toggleSection = (section) => {
    if (!collapsed) {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    }
  };

  const handleBackToAdmin = () => {
    navigate("/admin/vendors");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ease-in-out z-40 overflow-y-auto",
        collapsed ? "w-20" : "w-60"
      )}
    >
      <nav className="p-2 space-y-2">
        {/* Back to Admin Button */}
        <div className="mb-4">
          <button
            onClick={handleBackToAdmin}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-sm",
              collapsed ? "justify-center" : ""
            )}
          >
            <ArrowLeft className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Back to Admin</span>}
          </button>
        </div>

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
