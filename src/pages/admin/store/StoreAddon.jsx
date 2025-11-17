import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, PlusCircle, DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StoreAddon = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAddon, setEditingAddon] = useState(null);

  // Dummy addon data
  const addons = [
    {
      id: 1,
      name: "Extra Cheese",
      description: "Mozzarella cheese topping",
      price: 30,
      category: "Toppings",
      image: "/api/placeholder/50/50",
      status: "active",
      usageCount: 45,
    },
    {
      id: 2,
      name: "French Fries",
      description: "Crispy golden fries",
      price: 80,
      category: "Sides",
      image: "/api/placeholder/50/50",
      status: "active",
      usageCount: 67,
    },
    {
      id: 3,
      name: "Cold Drink",
      description: "Refreshing cola drink",
      price: 50,
      category: "Beverages",
      image: "/api/placeholder/50/50",
      status: "active",
      usageCount: 32,
    },
    {
      id: 4,
      name: "Garlic Bread",
      description: "Buttery garlic bread sticks",
      price: 60,
      category: "Sides",
      image: "/api/placeholder/50/50",
      status: "active",
      usageCount: 28,
    },
    {
      id: 5,
      name: "Chocolate Sauce",
      description: "Rich chocolate sauce",
      price: 25,
      category: "Toppings",
      image: "/api/placeholder/50/50",
      status: "inactive",
      usageCount: 0,
    },
  ];

  const categories = ["Toppings", "Sides", "Beverages", "Desserts"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Addons</h1>
          <p className="text-muted-foreground">
            Manage additional items that can be added to products.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Addon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Addon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="addonName">Addon Name</Label>
                <Input id="addonName" placeholder="Enter addon name" />
              </div>
              <div>
                <Label htmlFor="addonDescription">Description</Label>
                <Input
                  id="addonDescription"
                  placeholder="Enter addon description"
                />
              </div>
              <div>
                <Label htmlFor="addonPrice">Price (₹)</Label>
                <Input
                  id="addonPrice"
                  type="number"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label htmlFor="addonCategory">Category</Label>
                <select className="w-full p-2 border rounded-md">
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Addon
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Addons Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Addon List ({addons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Addon</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {addons.map((addon) => (
                <TableRow key={addon.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={addon.image}
                        alt={addon.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{addon.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {addon.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{addon.category}</Badge>
                  </TableCell>
                  <TableCell>₹{addon.price}</TableCell>
                  <TableCell>{addon.usageCount} times</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        addon.status === "active" ? "default" : "secondary"
                      }
                    >
                      {addon.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={isEditDialogOpen && editingAddon?.id === addon.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setEditingAddon(addon);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Addon</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="editAddonName">Addon Name</Label>
                              <Input
                                id="editAddonName"
                                defaultValue={addon.name}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editAddonDescription">
                                Description
                              </Label>
                              <Input
                                id="editAddonDescription"
                                defaultValue={addon.description}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editAddonPrice">Price (₹)</Label>
                              <Input
                                id="editAddonPrice"
                                type="number"
                                defaultValue={addon.price}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editAddonCategory">
                                Category
                              </Label>
                              <Select defaultValue={addon.category}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="editAddonStatus">Status</Label>
                              <Select defaultValue={addon.status}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">
                                    Inactive
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => setIsEditDialogOpen(false)}
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{addons.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Addons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                ₹{addons.reduce((sum, addon) => sum + addon.price, 0)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {addons.reduce((sum, addon) => sum + addon.usageCount, 0)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Total Usage</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {addons.filter((a) => a.status === "active").length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Active Addons</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreAddon;
