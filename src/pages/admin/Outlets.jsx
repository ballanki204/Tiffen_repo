import {
  Store,
  DollarSign,
  ShoppingBag,
  RefreshCw,
  Users,
  Package,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Eye,
  Settings,
  Shield,
  UserCheck,
  Edit,
  Trash2,
  Lock,
  Unlock,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for outlets
const outletStats = {
  totalOutlets: 2,
  combinedSales: "₹126,480",
  totalOrders: 1150,
  pendingRefills: 8,
};

const outlets = [
  {
    id: 1,
    name: "MVPColony",
    location: "MVP Colony, Visakhapatnam",
    phone: "+91-9876543210",
    openingHours: "6:00 AM - 10:00 PM",
    todaySales: "₹64,240",
    orderCount: 580,
    staffCount: 8,
    stockStatus: "Critical",
    refillRequests: 5,
    traffic: "High",
    contactPerson: "Rajesh Kumar",
    coordinates: "17.8505° N, 83.3063° E",
    metrics: {
      salesTrend: 15.2,
      orderTrend: 12.5,
      staffEfficiency: 94,
    },
  },
  {
    id: 2,
    name: "Maddilapalem",
    location: "Maddilapalem, Visakhapatnam",
    phone: "+91-9876543211",
    openingHours: "6:00 AM - 10:00 PM",
    todaySales: "₹62,240",
    orderCount: 570,
    staffCount: 7,
    stockStatus: "Low",
    refillRequests: 3,
    traffic: "Medium",
    contactPerson: "Priya Sharma",
    coordinates: "17.7700° N, 83.2833° E",
    metrics: {
      salesTrend: 10.8,
      orderTrend: 9.3,
      staffEfficiency: 91,
    },
  },
];

const getStockStatusColor = (status) => {
  switch (status) {
    case "Critical":
      return "destructive";
    case "Low":
      return "warning";
    case "Adequate":
      return "success";
    default:
      return "secondary";
  }
};

const getTrafficColor = (traffic) => {
  switch (traffic) {
    case "High":
      return "text-destructive";
    case "Medium":
      return "text-warning";
    case "Low":
      return "text-success";
    default:
      return "text-muted-foreground";
  }
};

const Outlets = () => {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Outlet Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage all your TiffinOS outlets across different
            locations
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          Manage Permissions
        </Button>
      </div>

      {/* Permissions Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Outlet Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roles" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="roles">Role Permissions</TabsTrigger>
              <TabsTrigger value="users">User Permissions</TabsTrigger>
              <TabsTrigger value="outlet-access">Outlet Access</TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Admin Role */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-primary" />
                      Admin
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">View Outlet</span>
                        <Switch defaultChecked disabled />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Manage Outlet
                        </span>
                        <Switch defaultChecked disabled />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Edit Outlet</span>
                        <Switch defaultChecked disabled />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Delete Outlet
                        </span>
                        <Switch defaultChecked disabled />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Manage Staff
                        </span>
                        <Switch defaultChecked disabled />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          View Reports
                        </span>
                        <Switch defaultChecked disabled />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Manager Role */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5 text-accent" />
                      Manager
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">View Outlet</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Manage Outlet
                        </span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Edit Outlet</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Delete Outlet
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Manage Staff
                        </span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          View Reports
                        </span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Staff Role */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      Staff
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">View Outlet</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Manage Outlet
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Edit Outlet</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Delete Outlet
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Manage Staff
                        </span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          View Reports
                        </span>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Rajesh Kumar</p>
                      <p className="text-sm text-muted-foreground">
                        Manager - MVP Colony
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Manager</Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Permissions
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Priya Sharma</p>
                      <p className="text-sm text-muted-foreground">
                        Staff - Maddilapalem
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Staff</Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Permissions
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="outlet-access" className="space-y-4">
              <div className="space-y-4">
                {outlets.map((outlet) => (
                  <Card key={outlet.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{outlet.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Restricted Access
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Manager Access
                          </span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Staff Access
                          </span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Read Only</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Full Control
                          </span>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Outlets"
          value={outletStats.totalOutlets}
          icon={<Store className="h-6 w-6 text-primary" />}
          iconBg="bg-primary/10"
        />
        <StatCard
          title="Combined Sales"
          value={outletStats.combinedSales}
          change={13.0}
          icon={<DollarSign className="h-6 w-6 text-success" />}
          iconBg="bg-success/10"
        />
        <StatCard
          title="Total Orders"
          value={outletStats.totalOrders}
          change={10.5}
          icon={<ShoppingBag className="h-6 w-6 text-accent" />}
          iconBg="bg-accent/10"
        />
        <StatCard
          title="Pending Refills"
          value={outletStats.pendingRefills}
          icon={<RefreshCw className="h-6 w-6 text-warning" />}
          iconBg="bg-warning/10"
        />
      </div>

      {/* Outlets Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {outlets.map((outlet) => (
          <Card key={outlet.id} className="shadow-card overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">{outlet.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {outlet.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {outlet.phone}
                  </div>
                </div>
                <Badge variant={getStockStatusColor(outlet.stockStatus)}>
                  {outlet.stockStatus}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Contact and Hours Info */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Contact Person
                  </p>
                  <p className="text-sm font-medium mt-1">
                    {outlet.contactPerson}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Clock className="h-3 w-3" />
                    Hours
                  </div>
                  <p className="text-sm font-medium mt-1">
                    {outlet.openingHours}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-xs text-muted-foreground font-medium">
                    Today's Sales
                  </p>
                  <p className="text-lg font-bold text-primary mt-1">
                    {outlet.todaySales}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-xs text-success font-medium">
                      +{outlet.metrics.salesTrend}%
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-success/5 rounded-lg">
                  <p className="text-xs text-muted-foreground font-medium">
                    Orders
                  </p>
                  <p className="text-lg font-bold text-success mt-1">
                    {outlet.orderCount}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-xs text-success font-medium">
                      +{outlet.metrics.orderTrend}%
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-accent/5 rounded-lg">
                  <p className="text-xs text-muted-foreground font-medium">
                    Staff
                  </p>
                  <p className="text-lg font-bold text-accent mt-1">
                    {outlet.staffCount}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="h-3 w-3 text-accent" />
                    <span className="text-xs text-accent font-medium">
                      {outlet.metrics.staffEfficiency}% active
                    </span>
                  </div>
                </div>
              </div>

              {/* Operational Status */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Stock Status
                  </p>
                  <Badge variant={getStockStatusColor(outlet.stockStatus)}>
                    {outlet.stockStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Traffic
                  </p>
                  <div
                    className={`text-sm font-medium ${getTrafficColor(
                      outlet.traffic
                    )}`}
                  >
                    {outlet.traffic} Traffic
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Refill Requests
                  </p>
                  <div className="flex items-center gap-1">
                    <RefreshCw className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium text-warning">
                      {outlet.refillRequests} pending
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Coordinates
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {outlet.coordinates}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Manage Outlet
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Insights */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Operational Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Best Performing Outlet
              </p>
              <p className="text-lg font-bold text-success">MVPColony</p>
              <p className="text-xs text-muted-foreground mt-1">
                ₹64,240 sales today (+15.2%)
              </p>
            </div>

            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Critical Attention Needed
              </p>
              <p className="text-lg font-bold text-warning">Stock Levels</p>
              <p className="text-xs text-muted-foreground mt-1">
                8 refill requests across outlets
              </p>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Average Staff Efficiency
              </p>
              <p className="text-lg font-bold text-primary">92.5%</p>
              <p className="text-xs text-muted-foreground mt-1">
                15 staff members active
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Outlets;
