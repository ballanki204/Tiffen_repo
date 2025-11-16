import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Star, MapPin, Mail } from "lucide-react";

// Mock vendor data
const mockVendors = [
  {
    id: 1,
    name: "KFC India",
    email: "vendor@kfcindia.com",
    status: "active",
    rating: 4.8,
    orders: 1245,
    stores: 5,
    logo: "🍗",
  },
  {
    id: 2,
    name: "McDonald's India",
    email: "vendor@mcdonalds.in",
    status: "active",
    rating: 4.6,
    orders: 982,
    stores: 4,
    logo: "🍔",
  },
  {
    id: 3,
    name: "Burger King",
    email: "vendor@burgerking.in",
    status: "inactive",
    rating: 4.3,
    orders: 654,
    stores: 3,
    logo: "🍟",
  },
  {
    id: 4,
    name: "Domino's Pizza",
    email: "vendor@dominos.in",
    status: "active",
    rating: 4.7,
    orders: 1456,
    stores: 6,
    logo: "🍕",
  },
  {
    id: 5,
    name: "Pizza Hut",
    email: "vendor@pizzahut.in",
    status: "active",
    rating: 4.5,
    orders: 823,
    stores: 4,
    logo: "🍕",
  },
];

export const VendorsList = ({ onSelectVendor }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vendors, setVendors] = useState(mockVendors);
  const [openDialog, setOpenDialog] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
    logo: "",
  });

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVendor = () => {
    if (newVendor.name && newVendor.email) {
      const vendor = {
        id: vendors.length + 1,
        ...newVendor,
        status: "active",
        rating: 0,
        orders: 0,
        stores: 0,
      };
      setVendors([...vendors, vendor]);
      setNewVendor({ name: "", email: "", logo: "" });
      setOpenDialog(false);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🏪</span>
            Vendors Management
          </CardTitle>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Vendor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>
                  Create a new vendor account in the system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Vendor Name</label>
                  <Input
                    placeholder="e.g., KFC India"
                    value={newVendor.name}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    placeholder="vendor@example.com"
                    type="email"
                    value={newVendor.email}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Logo/Icon</label>
                  <Input
                    placeholder="e.g., 🍗"
                    value={newVendor.logo}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, logo: e.target.value })
                    }
                    maxLength="2"
                  />
                </div>
                <Button onClick={handleAddVendor} className="w-full">
                  Create Vendor
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-center">Orders</TableHead>
                <TableHead className="text-center">Stores</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{vendor.logo}</span>
                        {vendor.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {vendor.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{vendor.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {vendor.orders}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {vendor.stores}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          vendor.status === "active" ? "default" : "secondary"
                        }
                        className={
                          vendor.status === "active"
                            ? "bg-success/10 text-success hover:bg-success/20"
                            : ""
                        }
                      >
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSelectVendor(vendor)}
                      >
                        View Stores
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan="7"
                    className="text-center text-muted-foreground py-8"
                  >
                    No vendors found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-end text-sm text-muted-foreground">
          Showing {filteredVendors.length} of {vendors.length} vendors
        </div>
      </CardContent>
    </Card>
  );
};
