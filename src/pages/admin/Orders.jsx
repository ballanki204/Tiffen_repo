import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for orders
const orders = [
  {
    id: "#ORD001",
    customer: "John Doe",
    customerEmail: "john@example.com",
    store: "KFC HSR Layout",
    items: ["Chicken Bucket", "Fries"],
    total: 450,
    status: "pending",
    date: "2024-01-15",
    time: "14:30",
  },
  {
    id: "#ORD002",
    customer: "Jane Smith",
    customerEmail: "jane@example.com",
    store: "McDonald's Koramangala",
    items: ["Big Mac", "Coke"],
    total: 320,
    status: "preparing",
    date: "2024-01-15",
    time: "15:00",
  },
  {
    id: "#ORD003",
    customer: "Mike Johnson",
    customerEmail: "mike@example.com",
    store: "Burger King Whitefield",
    items: ["Whopper", "Fries", "Onion Rings"],
    total: 580,
    status: "ready",
    date: "2024-01-15",
    time: "13:45",
  },
  {
    id: "#ORD004",
    customer: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    store: "Domino's Indiranagar",
    items: ["Margherita Pizza", "Garlic Bread"],
    total: 720,
    status: "delivered",
    date: "2024-01-14",
    time: "19:20",
  },
  {
    id: "#ORD005",
    customer: "Tom Brown",
    customerEmail: "tom@example.com",
    store: "Subway MG Road",
    items: ["Italian BMT", "Cookie"],
    total: 280,
    status: "cancelled",
    date: "2024-01-14",
    time: "18:00",
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500", icon: Clock },
  preparing: { label: "Preparing", color: "bg-blue-500", icon: Package },
  ready: { label: "Ready", color: "bg-green-500", icon: CheckCircle },
  delivered: { label: "Delivered", color: "bg-emerald-500", icon: Truck },
  cancelled: { label: "Cancelled", color: "bg-red-500", icon: XCircle },
};

const Orders = () => {
  const [orderFilter, setOrderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesOrder =
      orderFilter === "All" || order.id.includes(orderFilter);
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesOrder && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Orders Management
        </h1>
        <p className="text-muted-foreground">
          Manage all orders across different stores
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">All Orders</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-10" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("preparing")}>
                  Preparing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("ready")}>
                  Ready
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>
                  Delivered
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = statusConfig[order.status];
              const StatusIcon = statusInfo.icon;
              return (
                <Card
                  key={order.id}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {order.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm truncate">
                            {order.customer}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {order.customerEmail}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {order.store}
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-semibold">₹{order.total}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.date} {order.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <Badge
                          className={`${statusInfo.color} text-white w-fit`}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground truncate">
                          {order.items.join(", ")}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 mt-6">
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="flex-1 sm:flex-none"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-primary-foreground flex-1 sm:flex-none"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
