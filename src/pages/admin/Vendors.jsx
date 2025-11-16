import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  MapPin,
  Eye,
  Store as StoreIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Mock data for vendors
const vendors = [
  {
    id: 1,
    name: "KFC Restaurants",
    email: "contact@kfc.com",
    storeCount: 12,
    selected: true,
  },
  {
    id: 2,
    name: "McDonald's India",
    email: "info@mcdonalds.in",
    storeCount: 8,
  },
  {
    id: 3,
    name: "Burger King",
    email: "support@burgerking.in",
    storeCount: 6,
  },
  {
    id: 4,
    name: "Domino's Pizza",
    email: "hello@dominos.in",
    storeCount: 15,
  },
  {
    id: 5,
    name: "Subway",
    email: "franchise@subway.in",
    storeCount: 4,
  },
];

// Mock data for stores
const stores = [
  {
    id: 1,
    name: "KFC HSR Layout",
    email: "hsr@kfc.com",
    address: "HSR Layout, Bangalore",
    logo: "/api/placeholder/40/40",
    active: true,
  },
  {
    id: 2,
    name: "McDonald's Koramangala",
    email: "koramangala@mcdonalds.in",
    address: "Koramangala, Bangalore",
    logo: "/api/placeholder/40/40",
    active: true,
  },
  {
    id: 3,
    name: "Burger King Whitefield",
    email: "whitefield@burgerking.in",
    address: "Whitefield, Bangalore",
    logo: "/api/placeholder/40/40",
    active: false,
  },
  {
    id: 4,
    name: "Domino's Indiranagar",
    email: "indiranagar@dominos.in",
    address: "Indiranagar, Bangalore",
    logo: "/api/placeholder/40/40",
    active: true,
  },
  {
    id: 5,
    name: "Subway MG Road",
    email: "mgroad@subway.in",
    address: "MG Road, Bangalore",
    logo: "/api/placeholder/40/40",
    active: true,
  },
  {
    id: 6,
    name: "KFC Jayanagar",
    email: "jayanagar@kfc.com",
    address: "Jayanagar, Bangalore",
    logo: "/api/placeholder/40/40",
    active: false,
  },
];

const Vendors = () => {
  const [selectedVendor, setSelectedVendor] = useState(1);
  const [vendorFilter, setVendorFilter] = useState("All");
  const [storeFilter, setStoreFilter] = useState("All");
  const [isAddVendorDialogOpen, setIsAddVendorDialogOpen] = useState(false);
  const [isAddStoreDialogOpen, setIsAddStoreDialogOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: "",
    email: "",
  });
  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleAddVendor = () => {
    console.log("Adding new vendor:", newVendor);
    // In a real app, this would make an API call to add the vendor
    setIsAddVendorDialogOpen(false);
    setNewVendor({
      name: "",
      email: "",
    });
  };

  const handleAddStore = () => {
    console.log("Adding new store:", newStore);
    // In a real app, this would make an API call to add the store
    setIsAddStoreDialogOpen(false);
    setNewStore({
      name: "",
      email: "",
      address: "",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Vendors & Stores Management
        </h1>
        <p className="text-muted-foreground">
          Manage your vendors and their store locations
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Vendors List Panel */}
        <div className="lg:col-span-4">
          <Card className="shadow-card h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Vendors</CardTitle>
                <Dialog
                  open={isAddVendorDialogOpen}
                  onOpenChange={setIsAddVendorDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Vendor
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add New Vendor</DialogTitle>
                      <DialogDescription>
                        Create a new vendor in the system
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="vendor-name">Vendor Name</Label>
                        <Input
                          id="vendor-name"
                          placeholder="Enter vendor name"
                          value={newVendor.name}
                          onChange={(e) =>
                            setNewVendor({ ...newVendor, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendor-email">Email</Label>
                        <Input
                          id="vendor-email"
                          type="email"
                          placeholder="Enter email address"
                          value={newVendor.email}
                          onChange={(e) =>
                            setNewVendor({
                              ...newVendor,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddVendorDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddVendor}>Add Vendor</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Filter vendors..." className="pl-10" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {vendorFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setVendorFilter("All")}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setVendorFilter("Newly Added")}
                    >
                      Newly Added
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className={`p-4 border-b border-border last:border-b-0 cursor-pointer transition-colors hover:bg-muted/50 ${
                      vendor.id === selectedVendor
                        ? "bg-primary/5 border-primary/20"
                        : ""
                    }`}
                    onClick={() => setSelectedVendor(vendor.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{vendor.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {vendor.email}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <StoreIcon className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {vendor.storeCount} stores
                          </span>
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stores Section */}
        <div className="lg:col-span-8">
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Stores</CardTitle>
                <Dialog
                  open={isAddStoreDialogOpen}
                  onOpenChange={setIsAddStoreDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Store
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add New Store</DialogTitle>
                      <DialogDescription>
                        Create a new store location in the system
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="store-name">Store Name</Label>
                        <Input
                          id="store-name"
                          placeholder="Enter store name"
                          value={newStore.name}
                          onChange={(e) =>
                            setNewStore({ ...newStore, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-email">Email</Label>
                        <Input
                          id="store-email"
                          type="email"
                          placeholder="Enter email address"
                          value={newStore.email}
                          onChange={(e) =>
                            setNewStore({ ...newStore, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-address">Address</Label>
                        <Textarea
                          id="store-address"
                          placeholder="Enter full address"
                          value={newStore.address}
                          onChange={(e) =>
                            setNewStore({
                              ...newStore,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddStoreDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddStore}>Add Store</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search stores..." className="pl-10" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {storeFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStoreFilter("All")}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setStoreFilter("Newly Added")}
                    >
                      Newly Added
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stores.map((store) => (
                  <Card
                    key={store.id}
                    className="shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={store.logo} alt={store.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {store.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">
                            {store.name}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {store.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-tight">
                          {store.address}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={store.active}
                            className="data-[state=checked]:bg-green-500"
                          />
                          <span
                            className={`text-xs font-medium ${
                              store.active
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }`}
                          >
                            {store.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <Button size="sm" variant="outline" className="h-8">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
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
      </div>
    </div>
  );
};

export default Vendors;
