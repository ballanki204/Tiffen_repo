import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Store,
  Mail,
  Phone,
  MapPin,
  Clock,
  Star,
  Edit,
  Save,
  X,
  Upload,
} from "lucide-react";

const StoreProfile = () => {
  const { storeId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [storeData, setStoreData] = useState({
    id: storeId,
    name: "KFC - HSR Layout",
    vendor: "KFC India",
    email: "hsr@kfcindia.com",
    phone: "+91-9876543210",
    address: "HSR Layout, Bangalore, Karnataka 560102",
    coordinates: "12.9081° N, 77.6476° E",
    owner: "Rajesh Kumar",
    openingHours: "6:00 AM - 10:00 PM",
    status: "active",
    rating: 4.8,
    totalReviews: 1247,
    logo: "/api/placeholder/100/100",
    description:
      "Premium fast food restaurant serving authentic fried chicken and delicious meals.",
    cuisine: ["American", "Fast Food"],
    deliveryRadius: 5,
    minimumOrder: 200,
    deliveryFee: 40,
    estimatedDeliveryTime: "25-35 mins",
    isOpen: true,
    acceptsOnlinePayment: true,
    acceptsCash: true,
    hasParking: true,
    wifiAvailable: true,
  });

  const handleSave = () => {
    // In a real app, this would make an API call to update the store profile
    console.log("Saving store profile:", storeData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data if needed
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setStoreData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Store Profile</h1>
          <p className="text-muted-foreground">
            Manage your store information and settings
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={storeData.logo} alt={storeData.name} />
                  <AvatarFallback className="text-lg">
                    {storeData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Logo
                  </Button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Store Name</Label>
                  <Input
                    id="name"
                    value={storeData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    value={storeData.vendor}
                    onChange={(e) =>
                      handleInputChange("vendor", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={storeData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={storeData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Owner</Label>
                  <Input
                    id="owner"
                    value={storeData.owner}
                    onChange={(e) => handleInputChange("owner", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={storeData.status === "active"}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "status",
                          checked ? "active" : "inactive"
                        )
                      }
                      disabled={!isEditing}
                    />
                    <Badge
                      variant={
                        storeData.status === "active" ? "default" : "secondary"
                      }
                    >
                      {storeData.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={storeData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={storeData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coordinates">Coordinates</Label>
                <Input
                  id="coordinates"
                  value={storeData.coordinates}
                  onChange={(e) =>
                    handleInputChange("coordinates", e.target.value)
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="openingHours">Opening Hours</Label>
                <Input
                  id="openingHours"
                  value={storeData.openingHours}
                  onChange={(e) =>
                    handleInputChange("openingHours", e.target.value)
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
                  <Input
                    id="deliveryRadius"
                    type="number"
                    value={storeData.deliveryRadius}
                    onChange={(e) =>
                      handleInputChange(
                        "deliveryRadius",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumOrder">Minimum Order (₹)</Label>
                  <Input
                    id="minimumOrder"
                    type="number"
                    value={storeData.minimumOrder}
                    onChange={(e) =>
                      handleInputChange(
                        "minimumOrder",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryFee">Delivery Fee (₹)</Label>
                  <Input
                    id="deliveryFee"
                    type="number"
                    value={storeData.deliveryFee}
                    onChange={(e) =>
                      handleInputChange("deliveryFee", parseInt(e.target.value))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDeliveryTime">
                    Estimated Delivery Time
                  </Label>
                  <Input
                    id="estimatedDeliveryTime"
                    value={storeData.estimatedDeliveryTime}
                    onChange={(e) =>
                      handleInputChange("estimatedDeliveryTime", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isOpen">Store Open</Label>
                  <Switch
                    id="isOpen"
                    checked={storeData.isOpen}
                    onCheckedChange={(checked) =>
                      handleInputChange("isOpen", checked)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="acceptsOnlinePayment">
                    Accepts Online Payment
                  </Label>
                  <Switch
                    id="acceptsOnlinePayment"
                    checked={storeData.acceptsOnlinePayment}
                    onCheckedChange={(checked) =>
                      handleInputChange("acceptsOnlinePayment", checked)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="acceptsCash">Accepts Cash</Label>
                  <Switch
                    id="acceptsCash"
                    checked={storeData.acceptsCash}
                    onCheckedChange={(checked) =>
                      handleInputChange("acceptsCash", checked)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="hasParking">Parking Available</Label>
                  <Switch
                    id="hasParking"
                    checked={storeData.hasParking}
                    onCheckedChange={(checked) =>
                      handleInputChange("hasParking", checked)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="wifiAvailable">WiFi Available</Label>
                  <Switch
                    id="wifiAvailable"
                    checked={storeData.wifiAvailable}
                    onCheckedChange={(checked) =>
                      handleInputChange("wifiAvailable", checked)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rating & Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Rating & Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {storeData.rating}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(storeData.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {storeData.totalReviews.toLocaleString()} reviews
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Update Opening Hours
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Update Location
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Update Contact Info
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;
