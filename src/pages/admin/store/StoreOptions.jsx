import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Edit, Trash2, Settings, List } from "lucide-react";

const StoreOptions = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingOption, setEditingOption] = useState(null);

  // Dummy options data
  const options = [
    {
      id: 1,
      name: "Size",
      type: "single",
      required: true,
      values: ["Small", "Medium", "Large"],
      productCount: 15,
      status: "active",
    },
    {
      id: 2,
      name: "Spice Level",
      type: "single",
      required: false,
      values: ["Mild", "Medium", "Hot", "Extra Hot"],
      productCount: 8,
      status: "active",
    },
    {
      id: 3,
      name: "Toppings",
      type: "multiple",
      required: false,
      values: ["Cheese", "Onions", "Tomatoes", "Olives", "Mushrooms"],
      productCount: 12,
      status: "active",
    },
    {
      id: 4,
      name: "Drink Type",
      type: "single",
      required: true,
      values: ["Regular", "Diet", "Zero Sugar"],
      productCount: 6,
      status: "active",
    },
    {
      id: 5,
      name: "Extra Cheese",
      type: "single",
      required: false,
      values: ["None", "Light", "Regular", "Extra"],
      productCount: 4,
      status: "inactive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Options</h1>
          <p className="text-muted-foreground">
            Configure product options and variations.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Option</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="optionName">Option Name</Label>
                <Input id="optionName" placeholder="Enter option name" />
              </div>
              <div>
                <Label htmlFor="optionType">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Selection</SelectItem>
                    <SelectItem value="multiple">Multiple Selection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="optionValues">Values (comma separated)</Label>
                <Input id="optionValues" placeholder="Small, Medium, Large" />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Option
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Options Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Option List ({options.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Option Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Values</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {options.map((option) => (
                <TableRow key={option.id}>
                  <TableCell className="font-medium">{option.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {option.type === "single" ? "Single" : "Multiple"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {option.values.slice(0, 3).map((value, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {value}
                        </Badge>
                      ))}
                      {option.values.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{option.values.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={option.required ? "default" : "secondary"}>
                      {option.required ? "Required" : "Optional"}
                    </Badge>
                  </TableCell>
                  <TableCell>{option.productCount} products</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        option.status === "active" ? "default" : "secondary"
                      }
                    >
                      {option.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={
                          isEditDialogOpen && editingOption?.id === option.id
                        }
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setEditingOption(option);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Option</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="editOptionName">
                                Option Name
                              </Label>
                              <Input
                                id="editOptionName"
                                defaultValue={option.name}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editOptionType">Type</Label>
                              <Select defaultValue={option.type}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="single">
                                    Single Selection
                                  </SelectItem>
                                  <SelectItem value="multiple">
                                    Multiple Selection
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="editOptionValues">
                                Values (comma separated)
                              </Label>
                              <Input
                                id="editOptionValues"
                                defaultValue={option.values.join(", ")}
                              />
                            </div>
                            <div>
                              <Label htmlFor="editOptionRequired">
                                Required
                              </Label>
                              <Select defaultValue={option.required.toString()}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="true">Required</SelectItem>
                                  <SelectItem value="false">
                                    Optional
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="editOptionStatus">Status</Label>
                              <Select defaultValue={option.status}>
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
              <Settings className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{options.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Options</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <List className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {options.filter((o) => o.type === "single").length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Single Select</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {options.filter((o) => o.required).length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Required Options</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {options.filter((o) => o.status === "active").length}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Active Options</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreOptions;
