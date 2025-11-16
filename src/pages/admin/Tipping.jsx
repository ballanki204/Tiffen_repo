import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  TrendingUp,
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

// Mock data for tipping options
const tippingOptions = [
  {
    id: 1,
    amount: 10,
    label: "₹10",
    description: "Quick tip for good service",
    status: "active",
    usageCount: 1250,
    totalEarned: 12500,
    stores: "All Stores",
  },
  {
    id: 2,
    amount: 20,
    label: "₹20",
    description: "Standard tip amount",
    status: "active",
    usageCount: 890,
    totalEarned: 17800,
    stores: "All Stores",
  },
  {
    id: 3,
    amount: 50,
    label: "₹50",
    description: "Generous tip for excellent service",
    status: "active",
    usageCount: 456,
    totalEarned: 22800,
    stores: "Premium Stores",
  },
  {
    id: 4,
    amount: 100,
    label: "₹100",
    description: "VIP tip for outstanding service",
    status: "inactive",
    usageCount: 123,
    totalEarned: 12300,
    stores: "All Stores",
  },
  {
    id: 5,
    amount: 0,
    label: "Custom",
    description: "Let customers enter custom tip amount",
    status: "active",
    usageCount: 678,
    totalEarned: 45600,
    stores: "All Stores",
  },
];

const Tipping = () => {
  const [tippingFilter, setTippingFilter] = useState("All");
  const [isAddTippingDialogOpen, setIsAddTippingDialogOpen] = useState(false);
  const [newTipping, setNewTipping] = useState({
    amount: "",
    label: "",
    description: "",
    stores: "All Stores",
  });

  const handleAddTipping = () => {
    console.log("Adding new tipping option:", newTipping);
    // In a real app, this would make an API call to add the tipping option
    setIsAddTippingDialogOpen(false);
    setNewTipping({
      amount: "",
      label: "",
      description: "",
      stores: "All Stores",
    });
  };

  const totalTipsEarned = tippingOptions.reduce(
    (sum, tip) => sum + tip.totalEarned,
    0
  );
  const totalTipUsages = tippingOptions.reduce(
    (sum, tip) => sum + tip.usageCount,
    0
  );

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Tipping Management
        </h1>
        <p className="text-muted-foreground">
          Manage tipping options and track tip earnings across stores
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Tips Earned
                </p>
                <p className="text-2xl font-bold">
                  ₹{totalTipsEarned.toLocaleString()}
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
                <p className="text-sm text-muted-foreground">
                  Total Tip Transactions
                </p>
                <p className="text-2xl font-bold">
                  {totalTipUsages.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Tip</p>
                <p className="text-2xl font-bold">
                  ₹
                  {totalTipUsages > 0
                    ? (totalTipsEarned / totalTipUsages).toFixed(1)
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Tipping Options</CardTitle>
            <Dialog
              open={isAddTippingDialogOpen}
              onOpenChange={setIsAddTippingDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tipping Option
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Tipping Option</DialogTitle>
                  <DialogDescription>
                    Create a new tip amount option for customers
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tip-amount">Tip Amount (₹)</Label>
                      <Input
                        id="tip-amount"
                        type="number"
                        placeholder="0 for custom"
                        value={newTipping.amount}
                        onChange={(e) =>
                          setNewTipping({
                            ...newTipping,
                            amount: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tip-label">Label</Label>
                      <Input
                        id="tip-label"
                        placeholder="e.g., ₹10, Custom"
                        value={newTipping.label}
                        onChange={(e) =>
                          setNewTipping({
                            ...newTipping,
                            label: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Brief description of the tip option"
                      value={newTipping.description}
                      onChange={(e) =>
                        setNewTipping({
                          ...newTipping,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stores">Applicable Stores</Label>
                    <Input
                      id="stores"
                      placeholder="All Stores or specific store names"
                      value={newTipping.stores}
                      onChange={(e) =>
                        setNewTipping({ ...newTipping, stores: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddTippingDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddTipping}>Add Tipping Option</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tipping options..."
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {tippingFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTippingFilter("All")}>
                  All Options
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTippingFilter("Active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTippingFilter("Inactive")}>
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tippingOptions.map((tip) => (
              <Card
                key={tip.id}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{tip.label}</h3>
                          <Badge
                            className={
                              tip.status === "active"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }
                          >
                            {tip.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="text-lg font-bold">
                        {tip.amount === 0 ? "Custom" : `₹${tip.amount}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Used:</span>
                        <span className="font-medium ml-1">
                          {tip.usageCount}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Earned:</span>
                        <span className="font-medium ml-1">
                          ₹{tip.totalEarned.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg:</span>
                        <span className="font-medium ml-1">
                          ₹
                          {tip.usageCount > 0
                            ? (tip.totalEarned / tip.usageCount).toFixed(1)
                            : 0}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {tip.stores}
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
                          Edit
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
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tipping;
