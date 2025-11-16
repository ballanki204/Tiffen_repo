import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  CreditCard,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  Store,
  Package,
  Star,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock data for the store dashboard
const mockStoreData = {
  1: {
    id: 1,
    name: "KFC - HSR Layout",
    vendor: "KFC India",
    logo: "🍗",
    email: "hsr@kfcindia.com",
    phone: "+91-9876543210",
    address: "HSR Layout, Bangalore",
    coordinates: "12.9081° N, 77.6476° E",
    owner: "Rajesh Kumar",
    openingHours: "6:00 AM - 10:00 PM",
    status: "active",
    rating: 4.8,
    totalReviews: 1247,
    analytics: {
      totalOrders: 7689,
      totalCODOrders: 4521,
      totalCardOrders: 3168,
      totalSales: 245680,
      ordersChange: 12.5,
      salesChange: 8.3,
      codOrdersChange: 15.2,
      cardOrdersChange: 6.8,
    },
    growthData: [
      { month: "Jan", sales: 18500, orders: 580 },
      { month: "Feb", sales: 19200, orders: 620 },
      { month: "Mar", sales: 20800, orders: 680 },
      { month: "Apr", sales: 22100, orders: 720 },
      { month: "May", sales: 23800, orders: 780 },
      { month: "Jun", sales: 25200, orders: 820 },
      { month: "Jul", sales: 26800, orders: 880 },
      { month: "Aug", sales: 28200, orders: 920 },
      { month: "Sep", sales: 29500, orders: 960 },
      { month: "Oct", sales: 31200, orders: 1020 },
      { month: "Nov", sales: 32800, orders: 1080 },
      { month: "Dec", sales: 34500, orders: 1120 },
    ],
    ordersData: {
      all: [],
    },
  },
};

const StoreDashboard = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch store data based on storeId
    const data = mockStoreData[storeId];
    if (data) {
      setStoreData(data);
    } else {
      // Handle case where store is not found
      navigate("/admin/multi-vendor/stores");
    }
  }, [storeId, navigate]);

  if (!storeData) {
    return <div>Loading...</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={storeData.growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Mock order data - replace with actual data */}
                  <TableRow>
                    <TableCell>#12345</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>{formatCurrency(450)}</TableCell>
                    <TableCell>
                      <Badge variant="default">Delivered</Badge>
                    </TableCell>
                    <TableCell>2023-12-01</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#12346</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>{formatCurrency(320)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Processing</Badge>
                    </TableCell>
                    <TableCell>2023-12-01</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={storeData.growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Cash on Delivery
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(
                        (storeData.analytics.totalCODOrders /
                          storeData.analytics.totalOrders) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${Math.round(
                          (storeData.analytics.totalCODOrders /
                            storeData.analytics.totalOrders) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Card Payment</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(
                        (storeData.analytics.totalCardOrders /
                          storeData.analytics.totalOrders) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${Math.round(
                          (storeData.analytics.totalCardOrders /
                            storeData.analytics.totalOrders) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Store Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Store settings will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreDashboard;
