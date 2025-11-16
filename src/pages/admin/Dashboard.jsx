import {
  DollarSign,
  ShoppingBag,
  Store,
  AlertTriangle,
  TrendingUp,
  Package,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data
const salesData = [
  { date: "Nov 9", value: 50000 },
  { date: "Nov 10", value: 52000 },
  { date: "Nov 11", value: 48000 },
  { date: "Nov 12", value: 55000 },
  { date: "Nov 13", value: 53000 },
  { date: "Nov 14", value: 56000 },
  { date: "Nov 15", value: 58340 },
];

const outletSales = [
  { outlet: "HSR Layout", value: 24000 },
  { outlet: "Koramangala", value: 18500 },
  { outlet: "Indiranagar", value: 9840 },
  { outlet: "Whitefield", value: 6000 },
];

const wastageData = [
  { name: "Used", value: 92, color: "hsl(var(--success))" },
  { name: "Wasted", value: 8, color: "hsl(var(--destructive))" },
];

const fastMovingItems = [
  { name: "Masala Dosa", sold: 324, revenue: 28080 },
  { name: "Idli (3pcs)", sold: 289, revenue: 14450 },
  { name: "Vada (2pcs)", sold: 245, revenue: 12250 },
  { name: "Filter Coffee", sold: 198, revenue: 5940 },
];

const lowStockAlerts = [
  { item: "Rice Batter", current: 12, required: 50, unit: "kg" },
  { item: "Coconut Chutney", current: 8, required: 25, unit: "kg" },
  { item: "Sambar", current: 15, required: 40, unit: "L" },
  { item: "Potato Masala", current: 6, required: 20, unit: "kg" },
];

const pendingIncidents = [
  {
    outlet: "HSR Layout",
    priority: "high",
    message: "Equipment malfunction - Dosa griddle",
    time: "2 hrs ago",
  },
  {
    outlet: "Koramangala",
    priority: "medium",
    message: "Staff shortage - Need delivery person",
    time: "5 hrs ago",
  },
  {
    outlet: "Whitefield",
    priority: "low",
    message: "Customer complaint - Late delivery",
    time: "1 day ago",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Sales"
          value="₹58,340"
          change={12.5}
          icon={<DollarSign className="h-6 w-6 text-primary" />}
          iconBg="bg-primary/10"
        />
        <StatCard
          title="Total Orders"
          value="755"
          change={8.2}
          icon={<ShoppingBag className="h-6 w-6 text-success" />}
          iconBg="bg-success/10"
        />
        <StatCard
          title="Active Outlets"
          value="5 / 5"
          icon={<Store className="h-6 w-6 text-warning" />}
          iconBg="bg-warning/10"
        />
        <StatCard
          title="Low Stock Items"
          value="4"
          icon={<AlertTriangle className="h-6 w-6 text-destructive" />}
          iconBg="bg-destructive/10"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Sales Trend (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Outlet-wise Sales Today</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={outletSales}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="outlet"
                  stroke="hsl(var(--muted-foreground))"
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--success))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Lists Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-warning" />
              Fast Moving Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fastMovingItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.sold} sold
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-success">
                    ₹{item.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="p-3 border border-destructive/20 bg-destructive/5 rounded-lg space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-sm">{alert.item}</p>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Order
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="text-destructive font-medium">
                      {alert.current} {alert.unit}
                    </span>
                    <span>
                      / {alert.required} {alert.unit} required
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Pending Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingIncidents.map((incident, index) => (
                <div
                  key={index}
                  className="p-3 bg-muted/50 rounded-lg space-y-2 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {incident.outlet}
                    </span>
                    <Badge
                      variant={
                        incident.priority === "high"
                          ? "destructive"
                          : incident.priority === "medium"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {incident.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {incident.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {incident.time}
                    </span>
                    <Button size="sm" variant="ghost" className="h-6 text-xs">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wastage Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Food Wastage Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={wastageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wastageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm font-medium">92% Used</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm font-medium">8% Wasted</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
