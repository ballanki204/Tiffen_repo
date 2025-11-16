import { useState } from "react";
import {
  UserCheck,
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock staff data
const mockStaff = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    phone: "+91-9876543210",
    department: "Operations",
    position: "Manager",
    status: "active",
    joinDate: "2023-03-15",
  },
  {
    id: 2,
    name: "Meera Iyer",
    email: "meera.iyer@example.com",
    phone: "+91-9876543211",
    department: "Customer Service",
    position: "Supervisor",
    status: "active",
    joinDate: "2023-05-20",
  },
  {
    id: 3,
    name: "Suresh Reddy",
    email: "suresh.reddy@example.com",
    phone: "+91-9876543212",
    department: "IT",
    position: "Developer",
    status: "inactive",
    joinDate: "2023-01-10",
  },
  {
    id: 4,
    name: "Kavita Singh",
    email: "kavita.singh@example.com",
    phone: "+91-9876543213",
    department: "HR",
    position: "HR Specialist",
    status: "active",
    joinDate: "2023-07-08",
  },
  {
    id: 5,
    name: "Ravi Patel",
    email: "ravi.patel@example.com",
    phone: "+91-9876543214",
    department: "Finance",
    position: "Accountant",
    status: "active",
    joinDate: "2023-04-12",
  },
];

const StaffPage = () => {
  const [staff, setStaff] = useState(mockStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Operations",
    position: "",
  });

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = () => {
    if (
      newStaff.name &&
      newStaff.email &&
      newStaff.phone &&
      newStaff.position
    ) {
      const member = {
        id: staff.length + 1,
        ...newStaff,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
      };
      setStaff([...staff, member]);
      setNewStaff({
        name: "",
        email: "",
        phone: "",
        department: "Operations",
        position: "",
      });
      setOpenDialog(false);
    }
  };

  const handleEditStaff = () => {
    if (
      editingStaff &&
      editingStaff.name &&
      editingStaff.email &&
      editingStaff.phone &&
      editingStaff.position
    ) {
      setStaff(
        staff.map((member) =>
          member.id === editingStaff.id ? editingStaff : member
        )
      );
      setEditingStaff(null);
      setOpenDialog(false);
    }
  };

  const handleDeleteStaff = (staffId) => {
    setStaff(staff.filter((member) => member.id !== staffId));
  };

  const handleToggleStatus = (staffId) => {
    setStaff(
      staff.map((member) =>
        member.id === staffId
          ? {
              ...member,
              status: member.status === "active" ? "inactive" : "active",
            }
          : member
      )
    );
  };

  const openEditDialog = (member) => {
    setEditingStaff({ ...member });
    setOpenDialog(true);
  };

  const getDepartmentColor = (department) => {
    switch (department) {
      case "Operations":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Customer Service":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "IT":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "HR":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200";
      case "Finance":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <UserCheck className="h-8 w-8 text-primary" />
            Staff Management
          </h1>
          <p className="text-muted-foreground">
            Manage staff members and their roles.
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
              </DialogTitle>
              <DialogDescription>
                {editingStaff
                  ? "Update staff member information"
                  : "Create a new staff member account"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  placeholder="e.g., Arun Kumar"
                  value={editingStaff ? editingStaff.name : newStaff.name}
                  onChange={(e) =>
                    editingStaff
                      ? setEditingStaff({
                          ...editingStaff,
                          name: e.target.value,
                        })
                      : setNewStaff({ ...newStaff, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  placeholder="staff@example.com"
                  type="email"
                  value={editingStaff ? editingStaff.email : newStaff.email}
                  onChange={(e) =>
                    editingStaff
                      ? setEditingStaff({
                          ...editingStaff,
                          email: e.target.value,
                        })
                      : setNewStaff({ ...newStaff, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  placeholder="+91-9876543210"
                  value={editingStaff ? editingStaff.phone : newStaff.phone}
                  onChange={(e) =>
                    editingStaff
                      ? setEditingStaff({
                          ...editingStaff,
                          phone: e.target.value,
                        })
                      : setNewStaff({ ...newStaff, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Department</label>
                <Select
                  value={
                    editingStaff ? editingStaff.department : newStaff.department
                  }
                  onValueChange={(value) =>
                    editingStaff
                      ? setEditingStaff({ ...editingStaff, department: value })
                      : setNewStaff({ ...newStaff, department: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Customer Service">
                      Customer Service
                    </SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Position</label>
                <Input
                  placeholder="e.g., Manager"
                  value={
                    editingStaff ? editingStaff.position : newStaff.position
                  }
                  onChange={(e) =>
                    editingStaff
                      ? setEditingStaff({
                          ...editingStaff,
                          position: e.target.value,
                        })
                      : setNewStaff({ ...newStaff, position: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={editingStaff ? handleEditStaff : handleAddStaff}
                className="w-full"
              >
                {editingStaff ? "Update Staff Member" : "Create Staff Member"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle>Staff Members</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <TableRow key={member.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {member.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {member.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {member.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getDepartmentColor(member.department)}
                        >
                          <Building className="h-3 w-3 mr-1" />
                          {member.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {member.position}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.joinDate}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.status === "active" ? "default" : "secondary"
                          }
                          className={
                            member.status === "active"
                              ? "bg-success/10 text-success hover:bg-success/20"
                              : ""
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(member)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(member.id)}
                          >
                            {member.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteStaff(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="8"
                      className="text-center text-muted-foreground py-8"
                    >
                      No staff members found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end text-sm text-muted-foreground">
            Showing {filteredStaff.length} of {staff.length} staff members
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPage;
