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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Users,
  Target,
  Megaphone,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const StoreMarketing = () => {
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isEditCampaignOpen, setIsEditCampaignOpen] = useState(false);
  const [isEditPromotionOpen, setIsEditPromotionOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editingPromotion, setEditingPromotion] = useState(null);

  // Dummy marketing data
  const campaigns = [
    {
      id: 1,
      name: "Weekend Special Offer",
      type: "discount",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-01-21",
      reach: 1250,
      engagement: 89,
      budget: 500,
      spent: 320,
    },
    {
      id: 2,
      name: "New Customer Welcome",
      type: "loyalty",
      status: "active",
      startDate: "2024-01-10",
      endDate: "2024-01-31",
      reach: 850,
      engagement: 156,
      budget: 300,
      spent: 180,
    },
    {
      id: 3,
      name: "Pizza Day Promotion",
      type: "seasonal",
      status: "scheduled",
      startDate: "2024-01-22",
      endDate: "2024-01-22",
      reach: 0,
      engagement: 0,
      budget: 200,
      spent: 0,
    },
    {
      id: 4,
      name: "Holiday Season Special",
      type: "discount",
      status: "completed",
      startDate: "2023-12-20",
      endDate: "2023-12-31",
      reach: 2100,
      engagement: 234,
      budget: 800,
      spent: 800,
    },
  ];

  const analytics = {
    totalReach: 4200,
    totalEngagement: 479,
    totalOrders: 156,
    conversionRate: 3.7,
    avgOrderValue: 285,
    customerAcquisition: 45,
  };

  const promotions = [
    {
      id: 1,
      title: "20% Off on First Order",
      description: "Welcome new customers with a special discount",
      code: "WELCOME20",
      usage: 23,
      status: "active",
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free Pizza",
      description: "Limited time offer on selected pizzas",
      code: "PIZZADEAL",
      usage: 67,
      status: "active",
    },
    {
      id: 3,
      title: "Free Delivery Above ₹300",
      description: "No delivery charges for orders above ₹300",
      code: "FREEDEL",
      usage: 89,
      status: "active",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
          <p className="text-muted-foreground">
            Promote your store and attract more customers.
          </p>
        </div>
        <Dialog
          open={isCreateCampaignOpen}
          onOpenChange={setIsCreateCampaignOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input id="campaignName" placeholder="Enter campaign name" />
              </div>
              <div>
                <Label htmlFor="campaignType">Campaign Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Discount</SelectItem>
                    <SelectItem value="loyalty">Loyalty</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="campaignBudget">Budget (₹)</Label>
                <Input
                  id="campaignBudget"
                  type="number"
                  placeholder="Enter budget"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateCampaignOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateCampaignOpen(false)}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div className="text-2xl font-bold">
                {analytics.totalReach.toLocaleString()}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Total Reach</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              <div className="text-2xl font-bold">
                {analytics.totalEngagement}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Total Engagement</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <div className="text-2xl font-bold">
                {analytics.conversionRate}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <div className="text-2xl font-bold">
                ₹{analytics.avgOrderValue}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Avg Order Value</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                Marketing Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reach</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        {campaign.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{campaign.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.reach.toLocaleString()}</TableCell>
                      <TableCell>{campaign.engagement}</TableCell>
                      <TableCell>₹{campaign.budget}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Dialog
                            open={
                              isEditCampaignOpen &&
                              editingCampaign?.id === campaign.id
                            }
                            onOpenChange={(open) => {
                              setIsEditCampaignOpen(open);
                              if (open) setEditingCampaign(campaign);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Campaign</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="editCampaignName">
                                    Campaign Name
                                  </Label>
                                  <Input
                                    id="editCampaignName"
                                    defaultValue={campaign.name}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="editCampaignType">Type</Label>
                                  <Select defaultValue={campaign.type}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="discount">
                                        Discount
                                      </SelectItem>
                                      <SelectItem value="loyalty">
                                        Loyalty
                                      </SelectItem>
                                      <SelectItem value="seasonal">
                                        Seasonal
                                      </SelectItem>
                                      <SelectItem value="referral">
                                        Referral
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="editCampaignBudget">
                                    Budget (₹)
                                  </Label>
                                  <Input
                                    id="editCampaignBudget"
                                    type="number"
                                    defaultValue={campaign.budget}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="editCampaignStatus">
                                    Status
                                  </Label>
                                  <Select defaultValue={campaign.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">
                                        Active
                                      </SelectItem>
                                      <SelectItem value="scheduled">
                                        Scheduled
                                      </SelectItem>
                                      <SelectItem value="completed">
                                        Completed
                                      </SelectItem>
                                      <SelectItem value="paused">
                                        Paused
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsEditCampaignOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => setIsEditCampaignOpen(false)}
                                  >
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Active Promotions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Promotion</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{promo.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {promo.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{promo.code}</Badge>
                      </TableCell>
                      <TableCell>{promo.usage} uses</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(promo.status)}>
                          {promo.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog
                            open={
                              isEditPromotionOpen &&
                              editingPromotion?.id === promo.id
                            }
                            onOpenChange={(open) => {
                              setIsEditPromotionOpen(open);
                              if (open) setEditingPromotion(promo);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Promotion</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="editPromoTitle">
                                    Promotion Title
                                  </Label>
                                  <Input
                                    id="editPromoTitle"
                                    defaultValue={promo.title}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="editPromoDescription">
                                    Description
                                  </Label>
                                  <Textarea
                                    id="editPromoDescription"
                                    defaultValue={promo.description}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="editPromoCode">Code</Label>
                                  <Input
                                    id="editPromoCode"
                                    defaultValue={promo.code}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="editPromoStatus">
                                    Status
                                  </Label>
                                  <Select defaultValue={promo.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">
                                        Active
                                      </SelectItem>
                                      <SelectItem value="inactive">
                                        Inactive
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      setIsEditPromotionOpen(false)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      setIsEditPromotionOpen(false)
                                    }
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Total Orders from Campaigns
                  </span>
                  <span className="text-2xl font-bold">
                    {analytics.totalOrders}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    New Customers Acquired
                  </span>
                  <span className="text-2xl font-bold">
                    {analytics.customerAcquisition}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Campaign ROI</span>
                  <span className="text-2xl font-bold text-green-600">
                    +127%
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {campaigns
                  .filter((c) => c.status === "active")
                  .slice(0, 3)
                  .map((campaign) => (
                    <div
                      key={campaign.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{campaign.name}</span>
                      <Badge variant="outline">
                        {campaign.engagement} engagements
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreMarketing;
