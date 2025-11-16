import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Store, Plus, Search, MapPin, Mail, Phone, Filter } from "lucide-react";

// Mock all stores data
const mockAllStores = [
  {
    id: 1,
    name: "KFC - HSR Layout",
    vendor: "KFC India",
    email: "hsr@kfcindia.com",
    phone: "+91-9876543210",
    address: "HSR Layout, Bangalore",
    branch: "Branch #1",
    status: true,
    logo: "🍗",
  },
  {
    id: 2,
    name: "KFC - Koramangala",
    vendor: "KFC India",
    email: "kora@kfcindia.com",
    phone: "+91-9876543211",
    address: "Koramangala, Bangalore",
    branch: "Branch #2",
    status: true,
    logo: "🍗",
  },
  {
    id: 3,
    name: "KFC - Indiranagar",
    vendor: "KFC India",
    email: "indira@kfcindia.com",
    phone: "+91-9876543212",
    address: "Indiranagar, Bangalore",
    branch: "Branch #3",
    status: false,
    logo: "🍗",
  },
  {
    id: 4,
    name: "KFC - Whitefield",
    vendor: "KFC India",
    email: "white@kfcindia.com",
    phone: "+91-9876543213",
    address: "Whitefield, Bangalore",
    branch: "Branch #4",
    status: true,
    logo: "🍗",
  },
  {
    id: 6,
    name: "McDonald's - HSR",
    vendor: "McDonald's India",
    email: "hsr@mcdonalds.in",
    phone: "+91-9876543215",
    address: "HSR Layout, Bangalore",
    branch: "Branch #1",
    status: true,
    logo: "🍔",
  },
  {
    id: 7,
    name: "McDonald's - Forum",
    vendor: "McDonald's India",
    email: "forum@mcdonalds.in",
    phone: "+91-9876543216",
    address: "Forum Mall, Bangalore",
    branch: "Branch #2",
    status: true,
    logo: "🍔",
  },
  {
    id: 10,
    name: "Burger King - Koramangala",
    vendor: "Burger King",
    email: "kora@bk.in",
    phone: "+91-9876543219",
    address: "Koramangala, Bangalore",
    branch: "Branch #1",
    status: true,
    logo: "🍟",
  },
  {
    id: 11,
    name: "Burger King - Whitefield",
    vendor: "Burger King",
    email: "white@bk.in",
    phone: "+91-9876543220",
    address: "Whitefield, Bangalore",
    branch: "Branch #2",
    status: true,
    logo: "🍟",
  },
];

const StoresPage = () => {
  const [stores, setStores] = useState(mockAllStores);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVendor, setFilterVendor] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    vendor: "",
    email: "",
    phone: "",
    address: "",
    branch: "",
  });

  const vendors = ["all", "KFC India", "McDonald's India", "Burger King"];

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVendor =
      filterVendor === "all" || store.vendor === filterVendor;

    return matchesSearch && matchesVendor;
  });

  const handleToggleStatus = (storeId) => {
    setStores(
      stores.map((store) =>
        store.id === storeId ? { ...store, status: !store.status } : store
      )
    );
  };

  const handleAddStore = () => {
    if (newStore.name && newStore.vendor && newStore.email && newStore.phone) {
      const store = {
        id: stores.length + 1,
        ...newStore,
        status: true,
        logo: "🏪",
      };
      setStores([...stores, store]);
      setNewStore({
        name: "",
        vendor: "",
        email: "",
        phone: "",
        address: "",
        branch: "",
      });
      setOpenDialog(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Store className="h-8 w-8 text-primary" />
          All Stores
        </h1>
        <p className="text-muted-foreground">
          View and manage all stores across vendors
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Stores</p>
                <p className="text-3xl font-bold mt-2">{stores.length}</p>
              </div>
              <Store className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Stores</p>
                <p className="text-3xl font-bold mt-2 text-success">
                  {stores.filter((s) => s.status).length}
                </p>
              </div>
              <Badge className="bg-success/10 text-success">Active</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inactive Stores</p>
                <p className="text-3xl font-bold mt-2 text-destructive">
                  {stores.filter((s) => !s.status).length}
                </p>
              </div>
              <Badge variant="secondary">Inactive</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="shadow-card">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Store Directory</CardTitle>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Store
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Store</DialogTitle>
                  <DialogDescription>
                    Create a new store location
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Store Name</label>
                    <Input
                      placeholder="e.g., KFC - HSR Layout"
                      value={newStore.name}
                      onChange={(e) =>
                        setNewStore({ ...newStore, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Vendor</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-md text-sm"
                      value={newStore.vendor}
                      onChange={(e) =>
                        setNewStore({ ...newStore, vendor: e.target.value })
                      }
                    >
                      <option value="">Select Vendor</option>
                      {vendors
                        .filter((v) => v !== "all")
                        .map((vendor) => (
                          <option key={vendor} value={vendor}>
                            {vendor}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      placeholder="store@example.com"
                      type="email"
                      value={newStore.email}
                      onChange={(e) =>
                        setNewStore({ ...newStore, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      placeholder="+91-9876543210"
                      value={newStore.phone}
                      onChange={(e) =>
                        setNewStore({ ...newStore, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      placeholder="Store location"
                      value={newStore.address}
                      onChange={(e) =>
                        setNewStore({ ...newStore, address: e.target.value })
                      }
                    />
                  </div>
                  <Button onClick={handleAddStore} className="w-full">
                    Create Store
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stores by name, email, or location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="px-3 py-2 border border-border rounded-md text-sm"
                value={filterVendor}
                onChange={(e) => setFilterVendor(e.target.value)}
              >
                {vendors.map((vendor) => (
                  <option key={vendor} value={vendor}>
                    {vendor === "all" ? "All Vendors" : vendor}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stores Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <Card
                  key={store.id}
                  className={`shadow-card transition-all hover:shadow-lg ${
                    !store.status ? "opacity-75" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-4xl">{store.logo}</span>
                        <div className="flex-1">
                          <CardTitle className="text-base">
                            {store.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">
                            {store.vendor}
                          </p>
                          {store.branch && (
                            <p className="text-xs text-muted-foreground">
                              {store.branch}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={store.status ? "default" : "secondary"}
                        className={
                          store.status
                            ? "bg-success/10 text-success hover:bg-success/20"
                            : ""
                        }
                      >
                        {store.status ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="text-sm break-all">
                        <p className="text-muted-foreground text-xs">Email</p>
                        <p className="font-medium">{store.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-muted-foreground text-xs">Phone</p>
                        <p className="font-medium">{store.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-muted-foreground text-xs">
                          Location
                        </p>
                        <p className="font-medium">{store.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-sm font-medium">Status</span>
                      <Switch
                        checked={store.status}
                        onCheckedChange={() => handleToggleStatus(store.id)}
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          (window.location.href = `/admin/store-dashboard/${store.id}`)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No stores found</p>
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground text-center">
            Showing {filteredStores.length} of {stores.length} stores
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoresPage;
