import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, Save, X, Calendar, Sun, Moon, RefreshCw } from "lucide-react";

const StoreTiming = () => {
  const { storeId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [timings, setTimings] = useState({
    monday: { open: "06:00", close: "22:00", isOpen: true },
    tuesday: { open: "06:00", close: "22:00", isOpen: true },
    wednesday: { open: "06:00", close: "22:00", isOpen: true },
    thursday: { open: "06:00", close: "22:00", isOpen: true },
    friday: { open: "06:00", close: "22:00", isOpen: true },
    saturday: { open: "06:00", close: "22:00", isOpen: true },
    sunday: { open: "08:00", close: "20:00", isOpen: true },
  });

  const [specialHours, setSpecialHours] = useState([
    {
      id: 1,
      date: "2024-01-26",
      reason: "Republic Day",
      isOpen: false,
      openTime: "",
      closeTime: "",
    },
    {
      id: 2,
      date: "2024-03-25",
      reason: "Holi",
      isOpen: true,
      openTime: "10:00",
      closeTime: "18:00",
    },
  ]);

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  const handleTimingChange = (day, field, value) => {
    setTimings((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSpecialHoursChange = (id, field, value) => {
    setSpecialHours((prev) =>
      prev.map((hour) => (hour.id === id ? { ...hour, [field]: value } : hour))
    );
  };

  const addSpecialHour = () => {
    const newHour = {
      id: Date.now(),
      date: "",
      reason: "",
      isOpen: true,
      openTime: "06:00",
      closeTime: "22:00",
    };
    setSpecialHours((prev) => [...prev, newHour]);
  };

  const removeSpecialHour = (id) => {
    setSpecialHours((prev) => prev.filter((hour) => hour.id !== id));
  };

  const handleSave = () => {
    console.log("Saving timings:", { timings, specialHours });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const copyToAllDays = (sourceDay) => {
    const sourceTiming = timings[sourceDay];
    const updatedTimings = { ...timings };
    days.forEach((day) => {
      if (day.key !== sourceDay) {
        updatedTimings[day.key] = { ...sourceTiming };
      }
    });
    setTimings(updatedTimings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Store Timing</h1>
          <p className="text-muted-foreground">
            Manage your store operating hours
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Clock className="h-4 w-4 mr-2" />
            Edit Timing
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
        {/* Regular Hours */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Regular Operating Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {days.map((day) => (
                <div
                  key={day.key}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="w-24 font-medium">{day.label}</div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={timings[day.key].isOpen}
                      onCheckedChange={(checked) =>
                        handleTimingChange(day.key, "isOpen", checked)
                      }
                      disabled={!isEditing}
                    />
                    <span className="text-sm text-muted-foreground">
                      {timings[day.key].isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                  {timings[day.key].isOpen && (
                    <>
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <Input
                          type="time"
                          value={timings[day.key].open}
                          onChange={(e) =>
                            handleTimingChange(day.key, "open", e.target.value)
                          }
                          disabled={!isEditing}
                          className="w-32"
                        />
                      </div>
                      <span className="text-muted-foreground">to</span>
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-blue-500" />
                        <Input
                          type="time"
                          value={timings[day.key].close}
                          onChange={(e) =>
                            handleTimingChange(day.key, "close", e.target.value)
                          }
                          disabled={!isEditing}
                          className="w-32"
                        />
                      </div>
                    </>
                  )}
                  {isEditing && day.key === "monday" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToAllDays(day.key)}
                      className="ml-auto"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Copy to All
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Special Hours */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Special Hours
                </CardTitle>
                {isEditing && (
                  <Button onClick={addSpecialHour} size="sm">
                    Add Special Hour
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {specialHours.map((hour) => (
                <div key={hour.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={hour.isOpen ? "default" : "secondary"}>
                        {hour.isOpen ? "Open" : "Closed"}
                      </Badge>
                      <span className="font-medium">{hour.reason}</span>
                    </div>
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSpecialHour(hour.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={hour.date}
                        onChange={(e) =>
                          handleSpecialHoursChange(
                            hour.id,
                            "date",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Reason</Label>
                      <Input
                        value={hour.reason}
                        onChange={(e) =>
                          handleSpecialHoursChange(
                            hour.id,
                            "reason",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                        placeholder="e.g., Holiday, Event"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={hour.isOpen}
                        onCheckedChange={(checked) =>
                          handleSpecialHoursChange(hour.id, "isOpen", checked)
                        }
                        disabled={!isEditing}
                      />
                      <span className="text-sm">Store Open</span>
                    </div>
                    {hour.isOpen && (
                      <>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Open:</Label>
                          <Input
                            type="time"
                            value={hour.openTime}
                            onChange={(e) =>
                              handleSpecialHoursChange(
                                hour.id,
                                "openTime",
                                e.target.value
                              )
                            }
                            disabled={!isEditing}
                            className="w-32"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Close:</Label>
                          <Input
                            type="time"
                            value={hour.closeTime}
                            onChange={(e) =>
                              handleSpecialHoursChange(
                                hour.id,
                                "closeTime",
                                e.target.value
                              )
                            }
                            disabled={!isEditing}
                            className="w-32"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  Open
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Closes at 10:00 PM today
                </p>
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800"
                >
                  Operating Normally
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Today's Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Monday</span>
                  <span className="text-sm font-medium">
                    6:00 AM - 10:00 PM
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Next: Tuesday 6:00 AM - 10:00 PM
                </div>
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
                Close Store Now
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Add Holiday
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Copy Week Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreTiming;
