import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Image,
  Upload,
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

// Mock data for banners
const banners = [
  {
    id: 1,
    title: "Welcome to Tiffen!",
    description: "Get 20% off on your first order",
    image: "/api/placeholder/400/200",
    type: "welcome",
    status: "active",
    position: "homepage",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    clicks: 1250,
    impressions: 5000,
  },
  {
    id: 2,
    title: "Weekend Special",
    description: "Special weekend deals on all items",
    image: "/api/placeholder/400/200",
    type: "promotion",
    status: "active",
    position: "sidebar",
    startDate: "2024-01-15",
    endDate: "2024-01-21",
    clicks: 890,
    impressions: 3200,
  },
  {
    id: 3,
    title: "New Store Opening",
    description: "Exciting new store opening in Koramangala",
    image: "/api/placeholder/400/200",
    type: "announcement",
    status: "inactive",
    position: "homepage",
    startDate: "2024-01-10",
    endDate: "2024-01-14",
    clicks: 456,
    impressions: 1800,
  },
  {
    id: 4,
    title: "Seasonal Menu",
    description: "Try our new seasonal menu items",
    image: "/api/placeholder/400/200",
    type: "menu",
    status: "active",
    position: "footer",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    clicks: 678,
    impressions: 2400,
  },
];

const Banners = () => {
  const [bannerFilter, setBannerFilter] = useState("All");
  const [isAddBannerDialogOpen, setIsAddBannerDialogOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({
    title: "",
    description: "",
    image: "",
    type: "promotion",
    position: "homepage",
    startDate: "",
    endDate: "",
  });

  const handleAddBanner = () => {
    console.log("Adding new banner:", newBanner);
    // In a real app, this would make an API call to add the banner
    setIsAddBannerDialogOpen(false);
    setNewBanner({
      title: "",
      description: "",
      image: "",
      type: "promotion",
      position: "homepage",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Banner Management
        </h1>
        <p className="text-muted-foreground">
          Create and manage promotional banners across your platform
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">All Banners</CardTitle>
            <Dialog
              open={isAddBannerDialogOpen}
              onOpenChange={setIsAddBannerDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Banner
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Banner</DialogTitle>
                  <DialogDescription>
                    Create a new promotional banner for your platform
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="banner-title">Banner Title</Label>
                    <Input
                      id="banner-title"
                      placeholder="Enter banner title"
                      value={newBanner.title}
                      onChange={(e) =>
                        setNewBanner({ ...newBanner, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Banner description"
                      value={newBanner.description}
                      onChange={(e) =>
                        setNewBanner({
                          ...newBanner,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="banner-type">Banner Type</Label>
                      <select
                        id="banner-type"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={newBanner.type}
                        onChange={(e) =>
                          setNewBanner({ ...newBanner, type: e.target.value })
                        }
                      >
                        <option value="welcome">Welcome</option>
                        <option value="promotion">Promotion</option>
                        <option value="announcement">Announcement</option>
                        <option value="menu">Menu</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <select
                        id="position"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={newBanner.position}
                        onChange={(e) =>
                          setNewBanner({
                            ...newBanner,
                            position: e.target.value,
                          })
                        }
                      >
                        <option value="homepage">Homepage</option>
                        <option value="sidebar">Sidebar</option>
                        <option value="footer">Footer</option>
                        <option value="popup">Popup</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Banner Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        placeholder="https://example.com/banner.jpg"
                        value={newBanner.image}
                        onChange={(e) =>
                          setNewBanner({ ...newBanner, image: e.target.value })
                        }
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={newBanner.startDate}
                        onChange={(e) =>
                          setNewBanner({
                            ...newBanner,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={newBanner.endDate}
                        onChange={(e) =>
                          setNewBanner({
                            ...newBanner,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddBannerDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddBanner}>Add Banner</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search banners..." className="pl-10" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {bannerFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setBannerFilter("All")}>
                  All Banners
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setBannerFilter("Active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setBannerFilter("Inactive")}>
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {banners.map((banner) => (
              <Card
                key={banner.id}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="h-16 w-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">
                          {banner.title}
                        </h3>
                        <Badge
                          className={
                            banner.status === "active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }
                        >
                          {banner.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {banner.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Type: {banner.type}</span>
                        <span>Position: {banner.position}</span>
                        <span>
                          {banner.startDate} - {banner.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Clicks:</span>
                        <span className="font-medium ml-1">
                          {banner.clicks}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Impressions:
                        </span>
                        <span className="font-medium ml-1">
                          {banner.impressions}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">CTR:</span>
                        <span className="font-medium ml-1">
                          {((banner.clicks / banner.impressions) * 100).toFixed(
                            1
                          )}
                          %
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
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
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
  );
};

export default Banners;
