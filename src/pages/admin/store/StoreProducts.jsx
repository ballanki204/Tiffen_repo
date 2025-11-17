import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";

const StoreProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Chicken Burger",
      category: "Burgers",
      price: 150,
      status: "active",
      stock: 25,
      image: "/api/placeholder/50/50",
      description: "Juicy chicken patty with fresh vegetables",
    },
    {
      id: 2,
      name: "Veggie Pizza",
      category: "Pizza",
      price: 220,
      status: "active",
      stock: 15,
      image: "/api/placeholder/50/50",
      description: "Fresh vegetables on thin crust",
    },
    {
      id: 3,
      name: "French Fries",
      category: "Sides",
      price: 80,
      status: "active",
      stock: 50,
      image: "/api/placeholder/50/50",
      description: "Crispy golden fries",
    },
    {
      id: 4,
      name: "Chocolate Shake",
      category: "Beverages",
      price: 120,
      status: "inactive",
      stock: 0,
      image: "/api/placeholder/50/50",
      description: "Rich chocolate milkshake",
    },
    {
      id: 5,
      name: "Paneer Tikka",
      category: "Starters",
      price: 180,
      status: "active",
      stock: 20,
      image: "/api/placeholder/50/50",
      description: "Spicy paneer tikka with spices",
    },
  ];

  const categories = [
    "all",
    "Burgers",
    "Pizza",
    "Sides",
    "Beverages",
    "Starters",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your store's products and inventory.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="search">Search Products</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Label htmlFor="category">Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product List ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "active" ? "default" : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={
                          isEditDialogOpen && editingProduct?.id === product.id
                        }
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setEditingProduct(product);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="editName">Product Name</Label>
                              <Input
                                id="editName"
                                defaultValue={product.name}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editDescription">
                                Description
                              </Label>
                              <Textarea
                                id="editDescription"
                                defaultValue={product.description}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editPrice">Price (₹)</Label>
                              <Input
                                id="editPrice"
                                type="number"
                                defaultValue={product.price}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editStock">Stock</Label>
                              <Input
                                id="editStock"
                                type="number"
                                defaultValue={product.stock}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editCategory">Category</Label>
                              <Select defaultValue={product.category}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories
                                    .filter((cat) => cat !== "all")
                                    .map((category) => (
                                      <SelectItem
                                        key={category}
                                        value={category}
                                      >
                                        {category}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="editStatus">Status</Label>
                              <Select defaultValue={product.status}>
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
    </div>
  );
};

export default StoreProducts;
