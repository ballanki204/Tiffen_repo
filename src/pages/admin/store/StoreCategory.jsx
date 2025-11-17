import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Edit, Trash2, Tag, Image } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StoreCategory = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Dummy category data
  const categories = [
    {
      id: 1,
      name: "Burgers",
      description: "All types of burgers and sandwiches",
      image: "/api/placeholder/50/50",
      productCount: 12,
      status: "active",
      displayOrder: 1,
    },
    {
      id: 2,
      name: "Pizza",
      description: "Wood-fired and regular pizzas",
      image: "/api/placeholder/50/50",
      productCount: 8,
      status: "active",
      displayOrder: 2,
    },
    {
      id: 3,
      name: "Sides",
      description: "Fries, nuggets, and other sides",
      image: "/api/placeholder/50/50",
      productCount: 6,
      status: "active",
      displayOrder: 3,
    },
    {
      id: 4,
      name: "Beverages",
      description: "Soft drinks, shakes, and juices",
      image: "/api/placeholder/50/50",
      productCount: 10,
      status: "active",
      displayOrder: 4,
    },
    {
      id: 5,
      name: "Starters",
      description: "Appetizers and finger foods",
      image: "/api/placeholder/50/50",
      productCount: 7,
      status: "inactive",
      displayOrder: 5,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Organize your products into categories for better management.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="categoryName">Category Name</Label>
                <Input id="categoryName" placeholder="Enter category name" />
              </div>
              <div>
                <Label htmlFor="categoryDescription">Description</Label>
                <Textarea
                  id="categoryDescription"
                  placeholder="Enter category description"
                />
              </div>
              <div>
                <Label htmlFor="categoryImage">Image URL</Label>
                <Input id="categoryImage" placeholder="Enter image URL" />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Category List ({categories.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{category.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {category.description}
                  </TableCell>
                  <TableCell>{category.productCount} products</TableCell>
                  <TableCell>{category.displayOrder}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        category.status === "active" ? "default" : "secondary"
                      }
                    >
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={
                          isEditDialogOpen &&
                          editingCategory?.id === category.id
                        }
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setEditingCategory(category);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="editCategoryName">
                                Category Name
                              </Label>
                              <Input
                                id="editCategoryName"
                                defaultValue={category.name}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editCategoryDescription">
                                Description
                              </Label>
                              <Textarea
                                id="editCategoryDescription"
                                defaultValue={category.description}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editCategoryImage">
                                Image URL
                              </Label>
                              <Input
                                id="editCategoryImage"
                                defaultValue={category.image}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editDisplayOrder">
                                Display Order
                              </Label>
                              <Input
                                id="editDisplayOrder"
                                type="number"
                                defaultValue={category.displayOrder}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editCategoryStatus">Status</Label>
                              <Select defaultValue={category.status}>
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
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{categories.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {categories.filter((c) => c.status === "active").length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Active Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Total Products</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreCategory;
