import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Utensils,
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

// Mock data for cuisines
const cuisines = [
  {
    id: 1,
    name: "Italian",
    description:
      "Traditional Italian cuisine with pasta, pizza, and authentic flavors",
    image: "/api/placeholder/100/100",
    itemCount: 45,
    status: "active",
    stores: ["Domino's Pizza", "Italian Corner"],
  },
  {
    id: 2,
    name: "American",
    description: "Classic American fast food and comfort dishes",
    image: "/api/placeholder/100/100",
    itemCount: 32,
    status: "active",
    stores: ["KFC", "McDonald's", "Burger King"],
  },
  {
    id: 3,
    name: "Indian",
    description: "Rich Indian cuisine with diverse regional flavors",
    image: "/api/placeholder/100/100",
    itemCount: 28,
    status: "active",
    stores: ["Spice Garden", "Tandoori House"],
  },
  {
    id: 4,
    name: "Chinese",
    description: "Authentic Chinese dishes with regional specialties",
    image: "/api/placeholder/100/100",
    itemCount: 22,
    status: "inactive",
    stores: ["Wok Express"],
  },
  {
    id: 5,
    name: "Mexican",
    description: "Vibrant Mexican cuisine with tacos, burritos, and more",
    image: "/api/placeholder/100/100",
    itemCount: 18,
    status: "active",
    stores: ["Taco Bell"],
  },
];

const Cuisine = () => {
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [isAddCuisineDialogOpen, setIsAddCuisineDialogOpen] = useState(false);
  const [newCuisine, setNewCuisine] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleAddCuisine = () => {
    console.log("Adding new cuisine:", newCuisine);
    // In a real app, this would make an API call to add the cuisine
    setIsAddCuisineDialogOpen(false);
    setNewCuisine({
      name: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Cuisine Management
        </h1>
        <p className="text-muted-foreground">
          Manage different cuisine types and their associated items
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">All Cuisines</CardTitle>
            <Dialog
              open={isAddCuisineDialogOpen}
              onOpenChange={setIsAddCuisineDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Cuisine
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Cuisine</DialogTitle>
                  <DialogDescription>
                    Create a new cuisine category for your menu
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cuisine-name">Cuisine Name</Label>
                    <Input
                      id="cuisine-name"
                      placeholder="e.g., Italian, Chinese, Indian"
                      value={newCuisine.name}
                      onChange={(e) =>
                        setNewCuisine({ ...newCuisine, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the cuisine type"
                      value={newCuisine.description}
                      onChange={(e) =>
                        setNewCuisine({
                          ...newCuisine,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      value={newCuisine.image}
                      onChange={(e) =>
                        setNewCuisine({ ...newCuisine, image: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddCuisineDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCuisine}>Add Cuisine</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search cuisines..." className="pl-10" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {cuisineFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCuisineFilter("All")}>
                  All Cuisines
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCuisineFilter("Active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCuisineFilter("Inactive")}>
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cuisines.map((cuisine) => (
              <Card
                key={cuisine.id}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Utensils className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm truncate">
                          {cuisine.name}
                        </h3>
                        <Badge
                          className={
                            cuisine.status === "active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }
                        >
                          {cuisine.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {cuisine.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Items:</span>
                      <span className="font-medium">{cuisine.itemCount}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Stores:</span>{" "}
                      {cuisine.stores.join(", ")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button size="sm" variant="outline" className="flex-1 mr-2">
                      <Eye className="h-3 w-3 mr-1" />
                      View Items
                    </Button>
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
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cuisine;
