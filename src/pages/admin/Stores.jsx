import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Grid3X3,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Mock data for stores
const stores = [
  {
    id: 1,
    name: "KFC HSR Layout",
    vendor: "KFC Restaurants",
    storeId: "#KFC001",
    email: "hsr@kfc.com",
    address: "HSR Layout, Bangalore, Karnataka 560102",
    section: "Food Corner (HSR)",
    image: "/api/placeholder/40/40",
    active: true,
    selected: true,
  },
  {
    id: 2,
    name: "McDonald's Koramangala",
    vendor: "McDonald's India",
    storeId: "#MCD002",
    email: "koramangala@mcdonalds.in",
    address: "Koramangala, Bangalore, Karnataka 560034",
    section: "Food Plaza (Koramangala)",
    image: "/api/placeholder/40/40",
    active: true,
    selected: false,
  },
  {
    id: 3,
    name: "Burger King Whitefield",
    vendor: "Burger King",
    storeId: "#BK003",
    email: "whitefield@burgerking.in",
    address: "Whitefield, Bangalore, Karnataka 560066",
    section: "Mall Food Court (Whitefield)",
    image: "/api/placeholder/40/40",
    active: false,
    selected: false,
  },
  {
    id: 4,
    name: "Domino's Indiranagar",
    vendor: "Domino's Pizza",
    storeId: "#DOM004",
    email: "indiranagar@dominos.in",
    address: "Indiranagar, Bangalore, Karnataka 560038",
    section: "Street Food Zone (Indiranagar)",
    image: "/api/placeholder/40/40",
    active: true,
    selected: false,
  },
  {
    id: 5,
    name: "Subway MG Road",
    vendor: "Subway",
    storeId: "#SUB005",
    email: "mgroad@subway.in",
    address: "MG Road, Bangalore, Karnataka 560001",
    section: "Quick Bites (MG Road)",
    image: "/api/placeholder/40/40",
    active: true,
    selected: false,
  },
  {
    id: 6,
    name: "Pizza Hut Jayanagar",
    vendor: "Pizza Hut",
    storeId: "#PH006",
    email: "jayanagar@pizzahut.in",
    address: "Jayanagar, Bangalore, Karnataka 560011",
    section: "Family Dining (Jayanagar)",
    image: "/api/placeholder/40/40",
    active: false,
    selected: false,
  },
  {
    id: 7,
    name: "Starbucks Residency Road",
    vendor: "Starbucks",
    storeId: "#SB007",
    email: "residency@starbucks.in",
    address: "Residency Road, Bangalore, Karnataka 560025",
    section: "Café Corner (Residency)",
    image: "/api/placeholder/40/40",
    active: true,
    selected: false,
  },
  {
    id: 8,
    name: "Taco Bell Electronic City",
    vendor: "Taco Bell",
    storeId: "#TB008",
    email: "electronic@tacobell.in",
    address: "Electronic City, Bangalore, Karnataka 560100",
    section: "Tech Park Food Court (Electronic City)",
    image: "/api/placeholder/40/40",
    active: true,
    selected: false,
  },
];

const Stores = () => {
  const [selectedStores, setSelectedStores] = useState([1]);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    vendor: "",
    email: "",
    address: "",
    section: "",
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStores(stores.map((store) => store.id));
    } else {
      setSelectedStores([]);
    }
  };

  const handleSelectStore = (storeId, checked) => {
    if (checked) {
      setSelectedStores((prev) => [...prev, storeId]);
    } else {
      setSelectedStores((prev) => prev.filter((id) => id !== storeId));
    }
  };

  const handleStatusToggle = (storeId) => {
    // In a real app, this would update the backend
    console.log(`Toggle status for store ${storeId}`);
  };

  const handleAddStore = () => {
    console.log("Adding new store:", newStore);
    // In a real app, this would make an API call to add the store
    setIsAddDialogOpen(false);
    setNewStore({
      name: "",
      vendor: "",
      email: "",
      address: "",
      section: "",
    });
  };

  const selectedCount = selectedStores.length;
  const totalStores = stores.length;

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Stores</h1>
        <p className="text-muted-foreground">
          Manage all store locations and their details
        </p>
      </div>

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
          <div className="relative max-w-sm w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter stores..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Grid3X3 className="h-4 w-4" />
            Sections
          </Button>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="h-4 w-4" />
              Add Stores
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
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  placeholder="Enter vendor name"
                  value={newStore.vendor}
                  onChange={(e) =>
                    setNewStore({ ...newStore, vendor: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={newStore.email}
                  onChange={(e) =>
                    setNewStore({ ...newStore, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter full address"
                  value={newStore.address}
                  onChange={(e) =>
                    setNewStore({ ...newStore, address: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  placeholder="Enter section name"
                  value={newStore.section}
                  onChange={(e) =>
                    setNewStore({ ...newStore, section: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddStore}>Add Store</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedCount === totalStores
                      ? true
                      : selectedCount > 0
                      ? "indeterminate"
                      : false
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Section</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => (
              <TableRow
                key={store.id}
                className={`hover:bg-muted/50 transition-colors ${
                  selectedStores.includes(store.id) ? "bg-primary/5" : ""
                }`}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedStores.includes(store.id)}
                    onCheckedChange={(checked) =>
                      handleSelectStore(store.id, checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={store.image} alt={store.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {store.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="font-semibold">{store.name}</div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {store.vendor}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {store.storeId}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {store.email}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate text-muted-foreground">
                    {store.address}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {store.section}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Switch
                      checked={store.active}
                      onCheckedChange={() => handleStatusToggle(store.id)}
                      className="data-[state=checked]:bg-green-500"
                    />
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
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          {selectedCount} of {totalStores} row(s) selected.
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Rows per page</span>
            <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Page {currentPage} of 10</span>
            <div className="flex flex-wrap gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                className="flex-1 sm:flex-none"
              >
                ≪
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                className="flex-1 sm:flex-none"
              >
                ‹
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 10}
                className="flex-1 sm:flex-none"
              >
                ›
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 10}
                className="flex-1 sm:flex-none"
              >
                ≫
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;
