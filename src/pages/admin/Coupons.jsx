import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Percent,
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
import { Textarea } from "@/components/ui/textarea";

// Mock data for coupons
const coupons = [
  {
    id: 1,
    code: "WELCOME10",
    description: "10% off on first order",
    discountType: "percentage",
    discountValue: 10,
    minOrder: 200,
    maxDiscount: 50,
    usageLimit: 1000,
    usedCount: 245,
    expiryDate: "2024-12-31",
    status: "active",
    applicableStores: "All Stores",
  },
  {
    id: 2,
    code: "FASTFOOD20",
    description: "20% off on fast food items",
    discountType: "percentage",
    discountValue: 20,
    minOrder: 300,
    maxDiscount: 100,
    usageLimit: 500,
    usedCount: 89,
    expiryDate: "2024-06-30",
    status: "active",
    applicableStores: "KFC, McDonald's, Burger King",
  },
  {
    id: 3,
    code: "FLAT50",
    description: "Flat ₹50 off",
    discountType: "fixed",
    discountValue: 50,
    minOrder: 400,
    maxDiscount: null,
    usageLimit: 200,
    usedCount: 156,
    expiryDate: "2024-03-15",
    status: "expired",
    applicableStores: "All Stores",
  },
  {
    id: 4,
    code: "PIZZA15",
    description: "15% off on pizza orders",
    discountType: "percentage",
    discountValue: 15,
    minOrder: 500,
    maxDiscount: 75,
    usageLimit: 300,
    usedCount: 67,
    expiryDate: "2024-08-31",
    status: "active",
    applicableStores: "Domino's Pizza",
  },
];

const Coupons = () => {
  const [couponFilter, setCouponFilter] = useState("All");
  const [isAddCouponDialogOpen, setIsAddCouponDialogOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrder: "",
    maxDiscount: "",
    usageLimit: "",
    expiryDate: "",
    applicableStores: "",
  });

  const handleAddCoupon = () => {
    console.log("Adding new coupon:", newCoupon);
    // In a real app, this would make an API call to add the coupon
    setIsAddCouponDialogOpen(false);
    setNewCoupon({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      minOrder: "",
      maxDiscount: "",
      usageLimit: "",
      expiryDate: "",
      applicableStores: "",
    });
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Coupons Management
        </h1>
        <p className="text-muted-foreground">
          Create and manage discount coupons for your stores
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">All Coupons</CardTitle>
            <Dialog
              open={isAddCouponDialogOpen}
              onOpenChange={setIsAddCouponDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Coupon
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Coupon</DialogTitle>
                  <DialogDescription>
                    Create a new discount coupon for your customers
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="coupon-code">Coupon Code</Label>
                      <Input
                        id="coupon-code"
                        placeholder="e.g., WELCOME10"
                        value={newCoupon.code}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            code: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discount-type">Discount Type</Label>
                      <select
                        id="discount-type"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={newCoupon.discountType}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            discountType: e.target.value,
                          })
                        }
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Coupon description"
                      value={newCoupon.description}
                      onChange={(e) =>
                        setNewCoupon({
                          ...newCoupon,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="discount-value">
                        {newCoupon.discountType === "percentage"
                          ? "Discount %"
                          : "Discount ₹"}
                      </Label>
                      <Input
                        id="discount-value"
                        type="number"
                        placeholder="10"
                        value={newCoupon.discountValue}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            discountValue: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-order">Min Order ₹</Label>
                      <Input
                        id="min-order"
                        type="number"
                        placeholder="200"
                        value={newCoupon.minOrder}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            minOrder: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-discount">Max Discount ₹</Label>
                      <Input
                        id="max-discount"
                        type="number"
                        placeholder="50"
                        value={newCoupon.maxDiscount}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            maxDiscount: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="usage-limit">Usage Limit</Label>
                      <Input
                        id="usage-limit"
                        type="number"
                        placeholder="1000"
                        value={newCoupon.usageLimit}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            usageLimit: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input
                        id="expiry-date"
                        type="date"
                        value={newCoupon.expiryDate}
                        onChange={(e) =>
                          setNewCoupon({
                            ...newCoupon,
                            expiryDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applicable-stores">Applicable Stores</Label>
                    <Textarea
                      id="applicable-stores"
                      placeholder="e.g., All Stores or specific store names"
                      value={newCoupon.applicableStores}
                      onChange={(e) =>
                        setNewCoupon({
                          ...newCoupon,
                          applicableStores: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddCouponDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCoupon}>Add Coupon</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search coupons..." className="pl-10" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {couponFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCouponFilter("All")}>
                  All Coupons
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCouponFilter("Active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCouponFilter("Expired")}>
                  Expired
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <Card
                key={coupon.id}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Percent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">
                            {coupon.code}
                          </h3>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(coupon.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {coupon.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires: {coupon.expiryDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          coupon.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      >
                        {coupon.status}
                      </Badge>
                      <p className="text-sm font-semibold mt-1">
                        {coupon.discountType === "percentage"
                          ? `${coupon.discountValue}%`
                          : `₹${coupon.discountValue}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Min: ₹{coupon.minOrder}</span>
                      {coupon.maxDiscount && (
                        <span>Max: ₹{coupon.maxDiscount}</span>
                      )}
                      <span>
                        Used: {coupon.usedCount}/{coupon.usageLimit}
                      </span>
                      <span className="text-xs">{coupon.applicableStores}</span>
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
                          View Details
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

export default Coupons;
