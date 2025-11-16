import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Percent,
  TrendingUp,
  Calculator,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock data for commission rates
const commissionRates = [
  {
    id: 1,
    storeName: "KFC Restaurants",
    category: "Fast Food",
    commissionType: "percentage",
    rate: 15,
    minOrder: 100,
    maxCommission: 200,
    status: "active",
    totalOrders: 1250,
    totalCommission: 45000,
    effectiveDate: "2024-01-01",
  },
  {
    id: 2,
    storeName: "McDonald's India",
    category: "Fast Food",
    commissionType: "percentage",
    rate: 12,
    minOrder: 150,
    maxCommission: 250,
    status: "active",
    totalOrders: 980,
    totalCommission: 32000,
    effectiveDate: "2024-01-01",
  },
  {
    id: 3,
    storeName: "Burger King",
    category: "Fast Food",
    commissionType: "percentage",
    rate: 18,
    minOrder: 120,
    maxCommission: 180,
    status: "active",
    totalOrders: 756,
    totalCommission: 28000,
    effectiveDate: "2024-01-15",
  },
  {
    id: 4,
    storeName: "Domino's Pizza",
    category: "Pizza",
    commissionType: "percentage",
    rate: 10,
    minOrder: 200,
    maxCommission: 300,
    status: "active",
    totalOrders: 543,
    totalCommission: 19500,
    effectiveDate: "2024-01-01",
  },
  {
    id: 5,
    storeName: "Subway",
    category: "Sandwiches",
    commissionType: "fixed",
    rate: 25,
    minOrder: 80,
    maxCommission: null,
    status: "inactive",
    totalOrders: 321,
    totalCommission: 8025,
    effectiveDate: "2024-01-10",
  },
];

const CommissionRates = () => {
  const [commissionFilter, setCommissionFilter] = useState("All");
  const [isAddCommissionDialogOpen, setIsAddCommissionDialogOpen] =
    useState(false);
  const [newCommission, setNewCommission] = useState({
    storeName: "",
    category: "",
    commissionType: "percentage",
    rate: "",
    minOrder: "",
    maxCommission: "",
    effectiveDate: "",
  });

  const handleAddCommission = () => {
    console.log("Adding new commission rate:", newCommission);
    // In a real app, this would make an API call to add the commission rate
    setIsAddCommissionDialogOpen(false);
    setNewCommission({
      storeName: "",
      category: "",
      commissionType: "percentage",
      rate: "",
      minOrder: "",
      maxCommission: "",
      effectiveDate: "",
    });
  };

  const totalCommissionEarned = commissionRates.reduce(
    (sum, rate) => sum + rate.totalCommission,
    0
  );
  const totalOrders = commissionRates.reduce(
    (sum, rate) => sum + rate.totalOrders,
    0
  );
  const averageCommission =
    totalOrders > 0 ? totalCommissionEarned / totalOrders : 0;

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Commission Rate Management
        </h1>
        <p className="text-muted-foreground">
          Set and manage commission rates for different stores and categories
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Commission Earned
                </p>
                <p className="text-2xl font-bold">
                  ₹{totalCommissionEarned.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">
                  {totalOrders.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Percent className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Commission/Order
                </p>
                <p className="text-2xl font-bold">
                  ₹{averageCommission.toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Commission Rates</CardTitle>
            <Dialog
              open={isAddCommissionDialogOpen}
              onOpenChange={setIsAddCommissionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Commission Rate
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Commission Rate</DialogTitle>
                  <DialogDescription>
                    Set commission rates for stores or categories
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="store-name">Store Name</Label>
                      <Input
                        id="store-name"
                        placeholder="e.g., KFC Restaurants"
                        value={newCommission.storeName}
                        onChange={(e) =>
                          setNewCommission({
                            ...newCommission,
                            storeName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        placeholder="e.g., Fast Food, Pizza"
                        value={newCommission.category}
                        onChange={(e) =>
                          setNewCommission({
                            ...newCommission,
                            category: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="commission-type">Type</Label>
                      <select
                        id="commission-type"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={newCommission.commissionType}
                        onChange={(e) =>
                          setNewCommission({
                            ...newCommission,
                            commissionType: e.target.value,
                          })
                        }
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate">
                        {newCommission.commissionType === "percentage"
                          ? "Rate (%)"
                          : "Rate (₹)"}
                      </Label>
                      <Input
                        id="rate"
                        type="number"
                        placeholder="15"
                        value={newCommission.rate}
                        onChange={(e) =>
                          setNewCommission({
                            ...newCommission,
                            rate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-order">Min Order (₹)</Label>
                      <Input
                        id="min-order"
                        type="number"
                        placeholder="100"
                        value={newCommission.minOrder}
                        onChange={(e) =>
                          setNewCommission({
                            ...newCommission,
                            minOrder: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-commission">Max Commission (₹)</Label>
                      <Input
                        id="max-commission"
                        type="number"
                        placeholder="200"
                        value={newCommission.maxCommission}
                        onChange={(e) =>
                          setNewCommission({
                            ...newCommission,
                            maxCommission: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="effective-date">Effective Date</Label>
                      <Input
                        id="effective-date"
                        type="date"
                        value={newCommission.effectiveDate}
                        onChange={(e) =>
                          setNewCommission({
                            ...newCommission,
                            effectiveDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddCommissionDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCommission}>
                    Add Commission Rate
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search commission rates..."
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {commissionFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCommissionFilter("All")}>
                  All Rates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCommissionFilter("Active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setCommissionFilter("Inactive")}
                >
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commissionRates.map((rate) => (
              <Card
                key={rate.id}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Percent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">
                          {rate.storeName}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {rate.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          rate.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      >
                        {rate.status}
                      </Badge>
                      <p className="text-lg font-bold mt-1">
                        {rate.commissionType === "percentage"
                          ? `${rate.rate}%`
                          : `₹${rate.rate}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Min Order:
                        </span>
                        <span className="font-medium ml-1">
                          ₹{rate.minOrder}
                        </span>
                      </div>
                      {rate.maxCommission && (
                        <div>
                          <span className="text-muted-foreground">
                            Max Commission:
                          </span>
                          <span className="font-medium ml-1">
                            ₹{rate.maxCommission}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Orders:</span>
                        <span className="font-medium ml-1">
                          {rate.totalOrders}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Earned:</span>
                        <span className="font-medium ml-1">
                          ₹{rate.totalCommission.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Effective: {rate.effectiveDate}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Rate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
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

export default CommissionRates;
