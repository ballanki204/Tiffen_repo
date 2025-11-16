import { useState } from "react";
import { VendorsList } from "./VendorsList";
import { StoresGrid } from "./StoresGrid";
import { Building2, Store, Users, UserCheck, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MultiVendorDashboard = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);

  const stats = [
    {
      icon: Building2,
      label: "Total Vendors",
      value: "5",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Store,
      label: "Active Stores",
      value: "16",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Users,
      label: "Total Orders",
      value: "5,160",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: UserCheck,
      label: "Riders",
      value: "45",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  if (selectedVendor) {
    return (
      <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <StoresGrid
          selectedVendor={selectedVendor}
          onBack={() => setSelectedVendor(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          Multi-Vendor Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage all vendors, their stores, and operations from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="shadow-card hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="shadow-card hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">🏪</div>
              <p className="font-semibold text-sm">Vendors</p>
              <p className="text-xs text-muted-foreground mt-1">
                Manage vendors
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">🏢</div>
              <p className="font-semibold text-sm">Stores</p>
              <p className="text-xs text-muted-foreground mt-1">
                Store locations
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">👥</div>
              <p className="font-semibold text-sm">Users</p>
              <p className="text-xs text-muted-foreground mt-1">Manage users</p>
            </CardContent>
          </Card>
          <Card className="shadow-card hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">🚴</div>
              <p className="font-semibold text-sm">Riders</p>
              <p className="text-xs text-muted-foreground mt-1">
                Delivery staff
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-card hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">👔</div>
              <p className="font-semibold text-sm">Staff</p>
              <p className="text-xs text-muted-foreground mt-1">Manage staff</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vendors Management Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Vendors Management</h2>
        </div>
        <VendorsList onSelectVendor={setSelectedVendor} />
      </div>
    </div>
  );
};

export default MultiVendorDashboard;
