import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapPin, Mail, Phone, Plus, X } from "lucide-react";

// Mock stores data by vendor
const mockStoresByVendor = {
  1: [
    {
      id: 1,
      name: "KFC - HSR Layout",
      brand: "KFC",
      logo: "🍗",
      email: "hsr@kfcindia.com",
      phone: "+91-9876543210",
      address: "HSR Layout, Bangalore",
      branch: "Branch #1",
      status: true,
    },
    {
      id: 2,
      name: "KFC - Koramangala",
      brand: "KFC",
      logo: "🍗",
      email: "kora@kfcindia.com",
      phone: "+91-9876543211",
      address: "Koramangala, Bangalore",
      branch: "Branch #2",
      status: true,
    },
    {
      id: 3,
      name: "KFC - Indiranagar",
      brand: "KFC",
      logo: "🍗",
      email: "indira@kfcindia.com",
      phone: "+91-9876543212",
      address: "Indiranagar, Bangalore",
      branch: "Branch #3",
      status: false,
    },
    {
      id: 4,
      name: "KFC - Whitefield",
      brand: "KFC",
      logo: "🍗",
      email: "white@kfcindia.com",
      phone: "+91-9876543213",
      address: "Whitefield, Bangalore",
      branch: "Branch #4",
      status: true,
    },
    {
      id: 5,
      name: "KFC - MG Road",
      brand: "KFC",
      logo: "🍗",
      email: "mgroad@kfcindia.com",
      phone: "+91-9876543214",
      address: "MG Road, Bangalore",
      branch: "Branch #5",
      status: true,
    },
  ],
  2: [
    {
      id: 6,
      name: "McDonald's - HSR",
      brand: "McDonald's",
      logo: "🍔",
      email: "hsr@mcdonalds.in",
      phone: "+91-9876543215",
      address: "HSR Layout, Bangalore",
      branch: "Branch #1",
      status: true,
    },
    {
      id: 7,
      name: "McDonald's - Forum",
      brand: "McDonald's",
      logo: "🍔",
      email: "forum@mcdonalds.in",
      phone: "+91-9876543216",
      address: "Forum Mall, Bangalore",
      branch: "Branch #2",
      status: true,
    },
    {
      id: 8,
      name: "McDonald's - Indiranagar",
      brand: "McDonald's",
      logo: "🍔",
      email: "indira@mcdonalds.in",
      phone: "+91-9876543217",
      address: "Indiranagar, Bangalore",
      branch: "Branch #3",
      status: true,
    },
    {
      id: 9,
      name: "McDonald's - Whitefield",
      brand: "McDonald's",
      logo: "🍔",
      email: "white@mcdonalds.in",
      phone: "+91-9876543218",
      address: "Whitefield, Bangalore",
      branch: "Branch #4",
      status: false,
    },
  ],
  3: [
    {
      id: 10,
      name: "Burger King - Koramangala",
      brand: "Burger King",
      logo: "🍟",
      email: "kora@bk.in",
      phone: "+91-9876543219",
      address: "Koramangala, Bangalore",
      branch: "Branch #1",
      status: true,
    },
    {
      id: 11,
      name: "Burger King - Whitefield",
      brand: "Burger King",
      logo: "🍟",
      email: "white@bk.in",
      phone: "+91-9876543220",
      address: "Whitefield, Bangalore",
      branch: "Branch #2",
      status: true,
    },
    {
      id: 12,
      name: "Burger King - Airport",
      brand: "Burger King",
      logo: "🍟",
      email: "airport@bk.in",
      phone: "+91-9876543221",
      address: "Airport Road, Bangalore",
      branch: "Branch #3",
      status: false,
    },
  ],
};

export const StoresGrid = ({ selectedVendor, onBack }) => {
  const [stores, setStores] = useState(
    mockStoresByVendor[selectedVendor.id] || []
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    branch: "",
  });

  const handleToggleStatus = (storeId) => {
    setStores(
      stores.map((store) =>
        store.id === storeId ? { ...store, status: !store.status } : store
      )
    );
  };

  const handleAddStore = () => {
    if (newStore.name && newStore.email && newStore.phone && newStore.address) {
      const store = {
        id: stores.length + 1,
        ...newStore,
        brand: selectedVendor.name,
        logo: selectedVendor.logo,
        status: true,
      };
      setStores([...stores, store]);
      setNewStore({
        name: "",
        email: "",
        phone: "",
        address: "",
        branch: "",
      });
      setOpenDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <X className="h-4 w-4" />
            Back to Vendors
          </button>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-4xl">{selectedVendor.logo}</span>
            {selectedVendor.name} - Stores
          </h2>
          <p className="text-muted-foreground mt-1">
            Total Stores: {stores.length}
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Store
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Store</DialogTitle>
              <DialogDescription>
                Create a new store location for {selectedVendor.name}
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
                  placeholder="Store location/address"
                  value={newStore.address}
                  onChange={(e) =>
                    setNewStore({ ...newStore, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Branch (Optional)</label>
                <Input
                  placeholder="e.g., Branch #1"
                  value={newStore.branch}
                  onChange={(e) =>
                    setNewStore({ ...newStore, branch: e.target.value })
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

      {/* Stores Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
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
                    <CardTitle className="text-base">{store.name}</CardTitle>
                    {store.branch && (
                      <p className="text-xs text-muted-foreground mt-1">
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
              {/* Email */}
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm break-words">
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{store.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{store.phone}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{store.address}</p>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm font-medium">Store Status</span>
                <Switch
                  checked={store.status}
                  onCheckedChange={() => handleToggleStatus(store.id)}
                />
              </div>

              {/* Action Buttons */}
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
        ))}
      </div>

      {stores.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No stores found for this vendor
            </p>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create First Store
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
