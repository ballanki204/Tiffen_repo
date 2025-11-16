import { useState } from "react";
import {
  Bike,
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock riders data
const mockRiders = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91-9876543210",
    vehicle: "Bike",
    status: "active",
    rating: 4.8,
    deliveries: 245,
    location: "HSR Layout",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91-9876543211",
    vehicle: "Scooter",
    status: "active",
    rating: 4.6,
    deliveries: 198,
    location: "Koramangala",
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit.singh@example.com",
    phone: "+91-9876543212",
    vehicle: "Bike",
    status: "inactive",
    rating: 4.2,
    deliveries: 156,
    location: "Indiranagar",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha.patel@example.com",
    phone: "+91-9876543213",
    vehicle: "Scooter",
    status: "active",
    rating: 4.9,
    deliveries: 312,
    location: "Whitefield",
  },
  {
    id: 5,
    name: "Vikram Rao",
    email: "vikram.rao@example.com",
    phone: "+91-9876543214",
    vehicle: "Bike",
    status: "active",
    rating: 4.7,
    deliveries: 278,
    location: "MG Road",
  },
];

const RidersPage = () => {
  const [riders, setRiders] = useState(mockRiders);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRider, setEditingRider] = useState(null);
  const [newRider, setNewRider] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "Bike",
    location: "",
  });

  const filteredRiders = riders.filter(
    (rider) =>
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRider = () => {
    if (
      newRider.name &&
      newRider.email &&
      newRider.phone &&
      newRider.location
    ) {
      const rider = {
        id: riders.length + 1,
        ...newRider,
        status: "active",
        rating: 0,
        deliveries: 0,
      };
      setRiders([...riders, rider]);
      setNewRider({
        name: "",
        email: "",
        phone: "",
        vehicle: "Bike",
        location: "",
      });
      setOpenDialog(false);
    }
  };

  const handleEditRider = () => {
    if (
      editingRider &&
      editingRider.name &&
      editingRider.email &&
      editingRider.phone &&
      editingRider.location
    ) {
      setRiders(
        riders.map((rider) =>
          rider.id === editingRider.id ? editingRider : rider
        )
      );
      setEditingRider(null);
      setOpenDialog(false);
    }
  };

  const handleDeleteRider = (riderId) => {
    setRiders(riders.filter((rider) => rider.id !== riderId));
  };

  const handleToggleStatus = (riderId) => {
    setRiders(
      riders.map((rider) =>
        rider.id === riderId
          ? {
              ...rider,
              status: rider.status === "active" ? "inactive" : "active",
            }
          : rider
      )
    );
  };

  const openEditDialog = (rider) => {
    setEditingRider({ ...rider });
    setOpenDialog(true);
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-success/10 text-success hover:bg-success/20"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Bike className="h-8 w-8 text-primary" />
            Riders Management
          </h1>
          <p className="text-muted-foreground">
            Manage delivery riders and their assignments.
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Rider
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRider ? "Edit Rider" : "Add New Rider"}
              </DialogTitle>
              <DialogDescription>
                {editingRider
                  ? "Update rider information"
                  : "Create a new rider account"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  placeholder="e.g., Rajesh Kumar"
                  value={editingRider ? editingRider.name : newRider.name}
                  onChange={(e) =>
                    editingRider
                      ? setEditingRider({
                          ...editingRider,
                          name: e.target.value,
                        })
                      : setNewRider({ ...newRider, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  placeholder="rider@example.com"
                  type="email"
                  value={editingRider ? editingRider.email : newRider.email}
                  onChange={(e) =>
                    editingRider
                      ? setEditingRider({
                          ...editingRider,
                          email: e.target.value,
                        })
                      : setNewRider({ ...newRider, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  placeholder="+91-9876543210"
                  value={editingRider ? editingRider.phone : newRider.phone}
                  onChange={(e) =>
                    editingRider
                      ? setEditingRider({
                          ...editingRider,
                          phone: e.target.value,
                        })
                      : setNewRider({ ...newRider, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Vehicle Type</label>
                <Select
                  value={editingRider ? editingRider.vehicle : newRider.vehicle}
                  onValueChange={(value) =>
                    editingRider
                      ? setEditingRider({ ...editingRider, vehicle: value })
                      : setNewRider({ ...newRider, vehicle: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bike">Bike</SelectItem>
                    <SelectItem value="Scooter">Scooter</SelectItem>
                    <SelectItem value="Car">Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="e.g., HSR Layout"
                  value={
                    editingRider ? editingRider.location : newRider.location
                  }
                  onChange={(e) =>
                    editingRider
                      ? setEditingRider({
                          ...editingRider,
                          location: e.target.value,
                        })
                      : setNewRider({ ...newRider, location: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={editingRider ? handleEditRider : handleAddRider}
                className="w-full"
              >
                {editingRider ? "Update Rider" : "Create Rider"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle>Riders</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search riders..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Deliveries</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRiders.length > 0 ? (
                  filteredRiders.map((rider) => (
                    <TableRow key={rider.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {rider.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {rider.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {rider.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          <Bike className="h-3 w-3 mr-1" />
                          {rider.vehicle}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {rider.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{rider.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {rider.deliveries}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(rider.status)}>
                          {rider.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(rider)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(rider.id)}
                          >
                            {rider.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteRider(rider.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="9"
                      className="text-center text-muted-foreground py-8"
                    >
                      No riders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end text-sm text-muted-foreground">
            Showing {filteredRiders.length} of {riders.length} riders
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RidersPage;
