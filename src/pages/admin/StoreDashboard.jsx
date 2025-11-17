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
  2: {
    id: 2,
    name: "McDonald's - Koramangala",
    vendor: "McDonald's India",
    logo: "🍔",
    email: "koramangala@mcdonalds.in",
    phone: "+91-9876543211",
    address: "Koramangala, Bangalore",
    coordinates: "12.9352° N, 77.6245° E",
    owner: "Priya Sharma",
    openingHours: "7:00 AM - 11:00 PM",
    status: "active",
    rating: 4.6,
    totalReviews: 892,
    analytics: {
      totalOrders: 5423,
      totalCODOrders: 3124,
      totalCardOrders: 2299,
      totalSales: 178450,
      ordersChange: 9.8,
      salesChange: 6.1,
      codOrdersChange: 11.3,
      cardOrdersChange: 5.2,
    },
    growthData: [
      { month: "Jan", sales: 14200, orders: 420 },
      { month: "Feb", sales: 14800, orders: 450 },
      { month: "Mar", sales: 15200, orders: 480 },
      { month: "Apr", sales: 15800, orders: 510 },
      { month: "May", sales: 16500, orders: 540 },
      { month: "Jun", sales: 17200, orders: 570 },
      { month: "Jul", sales: 17800, orders: 600 },
      { month: "Aug", sales: 18500, orders: 630 },
      { month: "Sep", sales: 19200, orders: 660 },
      { month: "Oct", sales: 19800, orders: 690 },
      { month: "Nov", sales: 20500, orders: 720 },
      { month: "Dec", sales: 21200, orders: 750 },
    ],
    ordersData: {
      all: [],
    },
  },
  3: {
    id: 3,
    name: "Burger King - Whitefield",
    vendor: "Burger King",
    logo: "🍔",
    email: "whitefield@burgerking.in",
    phone: "+91-9876543212",
    address: "Whitefield, Bangalore",
    coordinates: "12.9698° N, 77.7500° E",
    owner: "Amit Singh",
    openingHours: "8:00 AM - 10:00 PM",
    status: "inactive",
    rating: 4.4,
    totalReviews: 567,
    analytics: {
      totalOrders: 3210,
      totalCODOrders: 1890,
      totalCardOrders: 1320,
      totalSales: 98750,
      ordersChange: -2.1,
      salesChange: -1.5,
      codOrdersChange: -3.2,
      cardOrdersChange: -1.8,
    },
    growthData: [
      { month: "Jan", sales: 8200, orders: 280 },
      { month: "Feb", sales: 8100, orders: 275 },
      { month: "Mar", sales: 8000, orders: 270 },
      { month: "Apr", sales: 7900, orders: 265 },
      { month: "May", sales: 7800, orders: 260 },
      { month: "Jun", sales: 7700, orders: 255 },
      { month: "Jul", sales: 7600, orders: 250 },
      { month: "Aug", sales: 7500, orders: 245 },
      { month: "Sep", sales: 7400, orders: 240 },
      { month: "Oct", sales: 7300, orders: 235 },
      { month: "Nov", sales: 7200, orders: 230 },
      { month: "Dec", sales: 7100, orders: 225 },
    ],
    ordersData: {
      all: [],
    },
  },
  4: {
    id: 4,
    name: "Domino's Pizza - Indiranagar",
    vendor: "Domino's Pizza",
    logo: "🍕",
    email: "indiranagar@dominos.in",
    phone: "+91-9876543213",
    address: "Indiranagar, Bangalore",
    coordinates: "12.9784° N, 77.6408° E",
    owner: "Sneha Patel",
    openingHours: "10:00 AM - 12:00 AM",
    status: "active",
    rating: 4.7,
    totalReviews: 1456,
    analytics: {
      totalOrders: 6789,
      totalCODOrders: 4123,
      totalCardOrders: 2666,
      totalSales: 198760,
      ordersChange: 14.2,
      salesChange: 9.7,
      codOrdersChange: 16.8,
      cardOrdersChange: 8.4,
    },
    growthData: [
      { month: "Jan", sales: 15800, orders: 520 },
      { month: "Feb", sales: 16200, orders: 540 },
      { month: "Mar", sales: 16800, orders: 560 },
      { month: "Apr", sales: 17500, orders: 580 },
      { month: "May", sales: 18200, orders: 600 },
      { month: "Jun", sales: 18900, orders: 620 },
      { month: "Jul", sales: 19600, orders: 640 },
      { month: "Aug", sales: 20300, orders: 660 },
      { month: "Sep", sales: 21000, orders: 680 },
      { month: "Oct", sales: 21700, orders: 700 },
      { month: "Nov", sales: 22400, orders: 720 },
      { month: "Dec", sales: 23100, orders: 740 },
    ],
    ordersData: {
      all: [],
    },
  },
  5: {
    id: 5,
    name: "Subway - MG Road",
    vendor: "Subway",
    logo: "🥪",
    email: "mgroad@subway.in",
    phone: "+91-9876543214",
    address: "MG Road, Bangalore",
    coordinates: "12.9719° N, 77.5946° E",
    owner: "Vikram Rao",
    openingHours: "9:00 AM - 9:00 PM",
    status: "active",
    rating: 4.5,
    totalReviews: 789,
    analytics: {
      totalOrders: 4234,
      totalCODOrders: 2456,
      totalCardOrders: 1778,
      totalSales: 134560,
      ordersChange: 7.3,
      salesChange: 5.4,
      codOrdersChange: 8.9,
      cardOrdersChange: 4.2,
    },
    growthData: [
      { month: "Jan", sales: 11200, orders: 380 },
      { month: "Feb", sales: 11400, orders: 390 },
      { month: "Mar", sales: 11600, orders: 400 },
      { month: "Apr", sales: 11800, orders: 410 },
      { month: "May", sales: 12000, orders: 420 },
      { month: "Jun", sales: 12200, orders: 430 },
      { month: "Jul", sales: 12400, orders: 440 },
      { month: "Aug", sales: 12600, orders: 450 },
      { month: "Sep", sales: 12800, orders: 460 },
      { month: "Oct", sales: 13000, orders: 470 },
      { month: "Nov", sales: 13200, orders: 480 },
      { month: "Dec", sales: 13400, orders: 490 },
    ],
    ordersData: {
      all: [],
    },
  },
  6: {
    id: 6,
    name: "KFC - Jayanagar",
    vendor: "KFC India",
    logo: "🍗",
    email: "jayanagar@kfc.com",
    phone: "+91-9876543215",
    address: "Jayanagar, Bangalore",
    coordinates: "12.9299° N, 77.5833° E",
    owner: "Kavita Jain",
    openingHours: "6:00 AM - 10:00 PM",
    status: "inactive",
    rating: 4.3,
    totalReviews: 634,
    analytics: {
      totalOrders: 2890,
      totalCODOrders: 1654,
      totalCardOrders: 1236,
      totalSales: 89450,
      ordersChange: -4.5,
      salesChange: -3.2,
      codOrdersChange: -5.1,
      cardOrdersChange: -2.8,
    },
    growthData: [
      { month: "Jan", sales: 7400, orders: 250 },
      { month: "Feb", sales: 7300, orders: 245 },
      { month: "Mar", sales: 7200, orders: 240 },
      { month: "Apr", sales: 7100, orders: 235 },
      { month: "May", sales: 7000, orders: 230 },
      { month: "Jun", sales: 6900, orders: 225 },
      { month: "Jul", sales: 6800, orders: 220 },
      { month: "Aug", sales: 6700, orders: 215 },
      { month: "Sep", sales: 6600, orders: 210 },
      { month: "Oct", sales: 6500, orders: 205 },
      { month: "Nov", sales: 6400, orders: 200 },
      { month: "Dec", sales: 6300, orders: 195 },
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
