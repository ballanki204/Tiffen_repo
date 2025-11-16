import { useState } from "react";
import {
  Store,
  Phone,
  Star,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Package,
  Clock,
  AlertTriangle,
  DollarSign,
  Users,
  FileText,
  CreditCard,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock vendor data
const vendors = [
  {
    id: 1,
    name: "Fresh Valley Vegetables",
    category: "Vegetables",
    contactNumber: "+91-9876543210",
    email: "contact@freshvalley.com",
    rating: 4.8,
    totalPurchase: "₹45,280",
    lastOrderDate: "Nov 15, 2024",
    status: "Active",
    avgDeliveryDays: 1,
    itemsSupplied: 24,
    reliability: 95,
  },
  {
    id: 2,
    name: "Golden Grains Co.",
    category: "Grains",
    contactNumber: "+91-9876543211",
    email: "sales@goldengrains.com",
    rating: 4.6,
    totalPurchase: "₹38,450",
    lastOrderDate: "Nov 14, 2024",
    status: "Active",
    avgDeliveryDays: 2,
    itemsSupplied: 18,
    reliability: 92,
  },
  {
    id: 3,
    name: "Spice Master Trading",
    category: "Spices",
    contactNumber: "+91-9876543212",
    email: "info@spicemaster.com",
    rating: 4.7,
    totalPurchase: "₹28,920",
    lastOrderDate: "Nov 13, 2024",
    status: "Active",
    avgDeliveryDays: 2,
    itemsSupplied: 32,
    reliability: 98,
  },
  {
    id: 4,
    name: "Dairy Delights",
    category: "Dairy",
    contactNumber: "+91-9876543213",
    email: "supply@dairydelights.com",
    rating: 4.5,
    totalPurchase: "₹35,680",
    lastOrderDate: "Nov 16, 2024",
    status: "Active",
    avgDeliveryDays: 1,
    itemsSupplied: 12,
    reliability: 88,
  },
  {
    id: 5,
    name: "Premium Oils Ltd",
    category: "Oils",
    contactNumber: "+91-9876543214",
    email: "bulk@premimumoils.com",
    rating: 4.4,
    totalPurchase: "₹22,150",
    lastOrderDate: "Nov 12, 2024",
    status: "Inactive",
    avgDeliveryDays: 3,
    itemsSupplied: 8,
    reliability: 85,
  },
];

// Mock purchase data
const purchaseOrders = [
  {
    id: "PO-2024-001",
    vendor: "Fresh Valley Vegetables",
    amount: "₹8,500",
    date: "Nov 16, 2024",
    status: "Delivered",
    items: 15,
  },
  {
    id: "PO-2024-002",
    vendor: "Golden Grains Co.",
    amount: "₹6,200",
    date: "Nov 15, 2024",
    status: "Delivered",
    items: 8,
  },
  {
    id: "PO-2024-003",
    vendor: "Dairy Delights",
    amount: "₹3,450",
    date: "Nov 16, 2024",
    status: "Pending",
    items: 6,
  },
  {
    id: "PO-2024-004",
    vendor: "Spice Master Trading",
    amount: "₹4,200",
    date: "Nov 14, 2024",
    status: "Processing",
    items: 12,
  },
];

// Mock GRN data
const grnEntries = [
  {
    id: "GRN-2024-001",
    vendor: "Fresh Valley Vegetables",
    amount: "₹8,500",
    date: "Nov 16, 2024",
    items: 15,
    status: "Received",
  },
  {
    id: "GRN-2024-002",
    vendor: "Golden Grains Co.",
    amount: "₹6,200",
    date: "Nov 15, 2024",
    items: 8,
    status: "Received",
  },
];

// Mock pending payments
const pendingPayments = [
  {
    id: "PAY-001",
    vendor: "Fresh Valley Vegetables",
    amount: "₹12,800",
    dueDate: "Nov 20, 2024",
    daysOverdue: 0,
    status: "Pending",
  },
  {
    id: "PAY-002",
    vendor: "Golden Grains Co.",
    amount: "₹8,400",
    dueDate: "Nov 18, 2024",
    daysOverdue: 2,
    status: "Overdue",
  },
  {
    id: "PAY-003",
    vendor: "Spice Master Trading",
    amount: "₹5,600",
    dueDate: "Nov 22, 2024",
    daysOverdue: 0,
    status: "Pending",
  },
];

const getCategoryColor = (category) => {
  const colors = {
    Vegetables: "bg-green-100 text-green-800",
    Grains: "bg-amber-100 text-amber-800",
    Spices: "bg-red-100 text-red-800",
    Dairy: "bg-blue-100 text-blue-800",
    Oils: "bg-yellow-100 text-yellow-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Delivered":
      return "success";
    case "Processing":
      return "warning";
    case "Pending":
      return "secondary";
    case "Received":
      return "success";
    case "Overdue":
      return "destructive";
    default:
      return "secondary";
  }
};

const PurchaseVendors = () => {
  const [activeTab, setActiveTab] = useState("vendors");

  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === "Active").length;
  const totalPurchaseAmount = "₹170,480";
  const pendingPaymentAmount = "₹26,800";

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-foreground">
          {rating}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Purchase & Vendor Management
          </h1>
          <p className="text-muted-foreground">
            Manage vendors, purchases, and track vendor performance
          </p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Vendors"
          value={totalVendors}
          icon={<Users className="h-6 w-6 text-primary" />}
          iconBg="bg-primary/10"
        />
        <StatCard
          title="Active Vendors"
          value={activeVendors}
          icon={<Store className="h-6 w-6 text-success" />}
          iconBg="bg-success/10"
        />
        <StatCard
          title="Total Purchases"
          value={totalPurchaseAmount}
          change={8.5}
          icon={<DollarSign className="h-6 w-6 text-accent" />}
          iconBg="bg-accent/10"
        />
        <StatCard
          title="Pending Payments"
          value={pendingPaymentAmount}
          icon={<CreditCard className="h-6 w-6 text-warning" />}
          iconBg="bg-warning/10"
        />
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vendors" className="gap-2">
            <Store className="h-4 w-4" />
            Vendors
          </TabsTrigger>
          <TabsTrigger value="purchases" className="gap-2">
            <Package className="h-4 w-4" />
            Purchases
          </TabsTrigger>
          <TabsTrigger value="grn" className="gap-2">
            <FileText className="h-4 w-4" />
            GRN Entries
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Pending Payments
          </TabsTrigger>
        </TabsList>

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="shadow-card overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {vendor.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className={`${getCategoryColor(vendor.category)}`}
                        >
                          {vendor.category}
                        </Badge>
                        <Badge
                          variant={
                            vendor.status === "Active"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {vendor.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2 pb-3 border-b border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {vendor.contactNumber}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {vendor.email}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="py-2">{renderStars(vendor.rating)}</div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Total Purchase
                      </p>
                      <p className="text-sm font-bold text-foreground mt-1">
                        {vendor.totalPurchase}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Delivery Days
                      </p>
                      <p className="text-sm font-bold text-foreground mt-1">
                        {vendor.avgDeliveryDays}d
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Reliability
                      </p>
                      <p className="text-sm font-bold text-success mt-1">
                        {vendor.reliability}%
                      </p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Items Supplied:</span>{" "}
                      {vendor.itemsSupplied}
                    </div>
                    <div>
                      <span className="font-medium">Last Order:</span>{" "}
                      {vendor.lastOrderDate}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Purchases Tab */}
        <TabsContent value="purchases" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Purchase Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        PO ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Vendor
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Items
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="font-medium">{order.id}</span>
                        </td>
                        <td className="py-3 px-4">{order.vendor}</td>
                        <td className="py-3 px-4 font-semibold">
                          {order.amount}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {order.date}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{order.items} items</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-primary"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GRN Entries Tab */}
        <TabsContent value="grn" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Goods Received Notes (GRN)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        GRN ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Vendor
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Items
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {grnEntries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="font-medium">{entry.id}</span>
                        </td>
                        <td className="py-3 px-4">{entry.vendor}</td>
                        <td className="py-3 px-4 font-semibold">
                          {entry.amount}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {entry.date}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">
                            {entry.items} items
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusColor(entry.status)}>
                            {entry.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-primary"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-warning" />
                Pending Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Payment ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Vendor
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Due Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="font-medium">{payment.id}</span>
                        </td>
                        <td className="py-3 px-4">{payment.vendor}</td>
                        <td className="py-3 px-4 font-semibold">
                          {payment.amount}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {payment.dueDate}
                          {payment.daysOverdue > 0 && (
                            <div className="flex items-center gap-1 text-destructive text-xs mt-1">
                              <AlertTriangle className="h-3 w-3" />
                              {payment.daysOverdue}d overdue
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            className="gap-1 bg-success hover:bg-success/90"
                          >
                            <CreditCard className="h-4 w-4" />
                            Pay Now
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Rate Comparison Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Rate Comparison & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <p className="text-sm text-muted-foreground font-medium mb-2">
                Best Rated Vendor
              </p>
              <p className="text-lg font-bold text-success">
                Spice Master Trading
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Rating: 4.7/5 | Reliability: 98%
              </p>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground font-medium mb-2">
                Fastest Delivery
              </p>
              <p className="text-lg font-bold text-primary">
                Fresh Valley & Dairy Delights
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Average: 1 day delivery
              </p>
            </div>

            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <p className="text-sm text-muted-foreground font-medium mb-2">
                Total Payable This Month
              </p>
              <p className="text-lg font-bold text-warning">₹26,800</p>
              <p className="text-xs text-muted-foreground mt-1">
                2 payments overdue
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseVendors;
