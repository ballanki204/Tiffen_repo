import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Bell,
  Send,
  Users,
  AlertCircle,
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

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: "New Feature: Real-time Order Tracking",
    message:
      "We have launched real-time order tracking for better customer experience. Check it out now!",
    type: "announcement",
    targetAudience: "all_users",
    status: "sent",
    sentDate: "2024-01-15",
    sentTime: "10:30",
    recipients: 2500,
    openRate: 78.5,
    clickRate: 23.4,
  },
  {
    id: 2,
    title: "Weekend Special Offers",
    message: "Enjoy 20% off on all orders this weekend! Limited time offer.",
    type: "promotion",
    targetAudience: "customers",
    status: "scheduled",
    sentDate: "2024-01-20",
    sentTime: "09:00",
    recipients: 0,
    openRate: 0,
    clickRate: 0,
  },
  {
    id: 3,
    title: "Store Maintenance Notice",
    message:
      "KFC HSR Layout will be closed for maintenance from 2 AM to 4 AM tonight.",
    type: "alert",
    targetAudience: "store_specific",
    status: "draft",
    sentDate: null,
    sentTime: null,
    recipients: 0,
    openRate: 0,
    clickRate: 0,
  },
  {
    id: 4,
    title: "Payment System Update",
    message:
      "We have updated our payment system for faster and more secure transactions.",
    type: "update",
    targetAudience: "vendors",
    status: "sent",
    sentDate: "2024-01-10",
    sentTime: "14:00",
    recipients: 45,
    openRate: 92.3,
    clickRate: 45.6,
  },
  {
    id: 5,
    title: "Happy New Year!",
    message:
      "Wishing you a prosperous New Year! Thank you for being part of Tiffen.",
    type: "announcement",
    targetAudience: "all_users",
    status: "sent",
    sentDate: "2024-01-01",
    sentTime: "00:01",
    recipients: 2890,
    openRate: 85.2,
    clickRate: 12.8,
  },
];

const typeConfig = {
  announcement: { label: "Announcement", color: "bg-blue-500", icon: Bell },
  promotion: { label: "Promotion", color: "bg-green-500", icon: Send },
  alert: { label: "Alert", color: "bg-red-500", icon: AlertCircle },
  update: { label: "Update", color: "bg-purple-500", icon: Bell },
};

const Notifications = () => {
  const [notificationFilter, setNotificationFilter] = useState("All");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "announcement",
    targetAudience: "all_users",
    scheduleDate: "",
    scheduleTime: "",
  });

  const handleCreateNotification = () => {
    console.log("Creating new notification:", newNotification);
    // In a real app, this would make an API call to create the notification
    setIsCreateDialogOpen(false);
    setNewNotification({
      title: "",
      message: "",
      type: "announcement",
      targetAudience: "all_users",
      scheduleDate: "",
      scheduleTime: "",
    });
  };

  const handleSendNow = (notification) => {
    console.log("Sending notification now:", notification.id);
    // In a real app, this would make an API call to send the notification
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Notifications Management
        </h1>
        <p className="text-muted-foreground">
          Create and manage notifications for users, vendors, and customers
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold">
                  {notifications.filter((n) => n.status === "sent").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Send className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">
                  {notifications.filter((n) => n.status === "scheduled").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Recipients
                </p>
                <p className="text-2xl font-bold">
                  {notifications
                    .reduce((sum, n) => sum + n.recipients, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Open Rate</p>
                <p className="text-2xl font-bold">
                  {notifications.filter((n) => n.status === "sent").length > 0
                    ? (
                        notifications
                          .filter((n) => n.status === "sent")
                          .reduce((sum, n) => sum + n.openRate, 0) /
                        notifications.filter((n) => n.status === "sent").length
                      ).toFixed(1)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">All Notifications</CardTitle>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Notification
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Notification</DialogTitle>
                  <DialogDescription>
                    Send notifications to users, vendors, or customers
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="notification-title">Title</Label>
                    <Input
                      id="notification-title"
                      placeholder="Notification title"
                      value={newNotification.title}
                      onChange={(e) =>
                        setNewNotification({
                          ...newNotification,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Notification message"
                      rows={4}
                      value={newNotification.message}
                      onChange={(e) =>
                        setNewNotification({
                          ...newNotification,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <select
                        id="type"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={newNotification.type}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            type: e.target.value,
                          })
                        }
                      >
                        <option value="announcement">Announcement</option>
                        <option value="promotion">Promotion</option>
                        <option value="alert">Alert</option>
                        <option value="update">Update</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-audience">Target Audience</Label>
                      <select
                        id="target-audience"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={newNotification.targetAudience}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            targetAudience: e.target.value,
                          })
                        }
                      >
                        <option value="all_users">All Users</option>
                        <option value="customers">Customers</option>
                        <option value="vendors">Vendors</option>
                        <option value="store_specific">Store Specific</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schedule-date">Schedule Date</Label>
                      <Input
                        id="schedule-date"
                        type="date"
                        value={newNotification.scheduleDate}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            scheduleDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule-time">Schedule Time</Label>
                      <Input
                        id="schedule-time"
                        type="time"
                        value={newNotification.scheduleTime}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            scheduleTime: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateNotification}>
                    Create Notification
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search notifications..." className="pl-10" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {notificationFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setNotificationFilter("All")}>
                  All Notifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setNotificationFilter("Sent")}>
                  Sent
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setNotificationFilter("Scheduled")}
                >
                  Scheduled
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setNotificationFilter("Draft")}
                >
                  Draft
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const typeInfo = typeConfig[notification.type];
              const TypeIcon = typeInfo.icon;
              return (
                <Card
                  key={notification.id}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <TypeIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm">
                            {notification.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              className={`${typeInfo.color} text-white text-xs`}
                            >
                              {typeInfo.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {notification.targetAudience.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            notification.status === "sent"
                              ? "bg-green-500"
                              : notification.status === "scheduled"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                          }
                        >
                          {notification.status}
                        </Badge>
                        {notification.sentDate && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.sentDate} {notification.sentTime}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm">
                        {notification.status === "sent" && (
                          <>
                            <div>
                              <span className="text-muted-foreground">
                                Recipients:
                              </span>
                              <span className="font-medium ml-1">
                                {notification.recipients.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Open Rate:
                              </span>
                              <span className="font-medium ml-1">
                                {notification.openRate}%
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Click Rate:
                              </span>
                              <span className="font-medium ml-1">
                                {notification.clickRate}%
                              </span>
                            </div>
                          </>
                        )}
                        {notification.status === "scheduled" && (
                          <div>
                            <span className="text-muted-foreground">
                              Scheduled for:
                            </span>
                            <span className="font-medium ml-1">
                              {notification.sentDate} {notification.sentTime}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {notification.status === "draft" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleSendNow(notification)}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Send Now
                          </Button>
                        )}
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
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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

export default Notifications;
