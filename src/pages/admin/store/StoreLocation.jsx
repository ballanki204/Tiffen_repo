import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  Save,
  X,
  Edit,
  Search,
  Map,
  Globe,
  Phone,
} from "lucide-react";

const StoreLocation = () => {
  const { storeId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [locationData, setLocationData] = useState({
    address: "HSR Layout, Bangalore, Karnataka 560102",
    landmark: "Near HSR BDA Complex",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560102",
    country: "India",
    latitude: "12.9081",
    longitude: "77.6476",
    coordinates: "12.9081° N, 77.6476° E",
    phone: "+91-9876543210",
    alternatePhone: "+91-9876543211",
    deliveryRadius: 5,
    serviceableAreas: [
      "HSR Layout",
      "Koramangala",
      "BTM Layout",
      "Jayanagar",
      "JP Nagar",
    ],
    deliveryZones: [
      { name: "Zone A", radius: 2, fee: 20 },
      { name: "Zone B", radius: 5, fee: 40 },
      { name: "Zone C", radius: 8, fee: 60 },
    ],
  });

  const handleSave = () => {
    console.log("Saving location data:", locationData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setLocationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceableAreaChange = (index, value) => {
    const updatedAreas = [...locationData.serviceableAreas];
    updatedAreas[index] = value;
    setLocationData((prev) => ({
      ...prev,
      serviceableAreas: updatedAreas,
    }));
  };

  const addServiceableArea = () => {
    setLocationData((prev) => ({
      ...prev,
      serviceableAreas: [...prev.serviceableAreas, ""],
    }));
  };

  const removeServiceableArea = (index) => {
    const updatedAreas = locationData.serviceableAreas.filter(
      (_, i) => i !== index
    );
    setLocationData((prev) => ({
      ...prev,
      serviceableAreas: updatedAreas,
    }));
  };

  const handleDeliveryZoneChange = (index, field, value) => {
    const updatedZones = [...locationData.deliveryZones];
    updatedZones[index] = { ...updatedZones[index], [field]: value };
    setLocationData((prev) => ({
      ...prev,
      deliveryZones: updatedZones,
    }));
  };

  const addDeliveryZone = () => {
    setLocationData((prev) => ({
      ...prev,
      deliveryZones: [...prev.deliveryZones, { name: "", radius: 0, fee: 0 }],
    }));
  };

  const removeDeliveryZone = (index) => {
    const updatedZones = locationData.deliveryZones.filter(
      (_, i) => i !== index
    );
    setLocationData((prev) => ({
      ...prev,
      deliveryZones: updatedZones,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Store Location</h1>
          <p className="text-muted-foreground">
            Manage your store location and delivery areas
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Location
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  value={locationData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    value={locationData.landmark}
                    onChange={(e) =>
                      handleInputChange("landmark", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={locationData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={locationData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={locationData.pincode}
                    onChange={(e) =>
                      handleInputChange("pincode", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={locationData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coordinates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Geographic Coordinates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    value={locationData.latitude}
                    onChange={(e) =>
                      handleInputChange("latitude", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    value={locationData.longitude}
                    onChange={(e) =>
                      handleInputChange("longitude", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Coordinates Display</Label>
                <Input
                  value={locationData.coordinates}
                  disabled
                  className="bg-muted"
                />
              </div>
              {isEditing && (
                <Button variant="outline" className="w-full">
                  <Map className="h-4 w-4 mr-2" />
                  Update from Map
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Primary Phone</Label>
                  <Input
                    id="phone"
                    value={locationData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    value={locationData.alternatePhone}
                    onChange={(e) =>
                      handleInputChange("alternatePhone", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Serviceable Areas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Serviceable Areas</CardTitle>
                {isEditing && (
                  <Button onClick={addServiceableArea} size="sm">
                    Add Area
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {locationData.serviceableAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={area}
                    onChange={(e) =>
                      handleServiceableAreaChange(index, e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Enter area name"
                  />
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeServiceableArea(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Delivery Zones */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Delivery Zones</CardTitle>
                {isEditing && (
                  <Button onClick={addDeliveryZone} size="sm">
                    Add Zone
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {locationData.deliveryZones.map((zone, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{zone.name}</Badge>
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDeliveryZone(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Zone Name</Label>
                      <Input
                        value={zone.name}
                        onChange={(e) =>
                          handleDeliveryZoneChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Radius (km)</Label>
                      <Input
                        type="number"
                        value={zone.radius}
                        onChange={(e) =>
                          handleDeliveryZoneChange(
                            index,
                            "radius",
                            parseInt(e.target.value)
                          )
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Delivery Fee (₹)</Label>
                      <Input
                        type="number"
                        value={zone.fee}
                        onChange={(e) =>
                          handleDeliveryZoneChange(
                            index,
                            "fee",
                            parseInt(e.target.value)
                          )
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Map Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Location Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Map Preview</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {locationData.coordinates}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Delivery Radius</span>
                <span className="text-sm font-medium">
                  {locationData.deliveryRadius} km
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Serviceable Areas</span>
                <span className="text-sm font-medium">
                  {locationData.serviceableAreas.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Delivery Zones</span>
                <span className="text-sm font-medium">
                  {locationData.deliveryZones.length}
                </span>
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
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                Search Nearby
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Globe className="h-4 w-4 mr-2" />
                View on Maps
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreLocation;
