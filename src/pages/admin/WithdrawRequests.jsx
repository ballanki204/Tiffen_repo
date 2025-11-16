import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Building2,
  TrendingUp,
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

// Mock data for withdraw requests
const withdrawRequests = [
  {
    id: 1,
    storeName: "KFC HSR Layout",
    vendorName: "KFC Restaurants",
    amount: 25000,
    requestDate: "2024-01-15",
    status: "pending",
    bankDetails: {
      accountNumber: "****1234",
      ifscCode: "HDFC0001234",
      accountHolder: "KFC Restaurants Pvt Ltd",
    },
    reason: "Weekly settlement",
    processedDate: null,
    transactionId: null,
  },
  {
    id: 2,
    storeName: "McDonald's Koramangala",
    vendorName: "McDonald's India",
    amount: 18500,
    requestDate: "2024-01-14",
    status: "approved",
    bankDetails: {
      accountNumber: "****5678",
      ifscCode: "ICIC0005678",
      accountHolder: "McDonald's India Pvt Ltd",
    },
    reason: "Monthly settlement",
    processedDate: "2024-01-15",
    transactionId: "TXN20240115001",
  },
  {
    id: 3,
    storeName: "Burger King Whitefield",
    vendorName: "Burger King",
    amount: 32000,
    requestDate: "2024-01-13",
    status: "rejected",
    bankDetails: {
      accountNumber: "****9012",
      ifscCode: "SBI0009012",
      accountHolder: "Burger King India Pvt Ltd",
    },
    reason: "Bi-weekly settlement",
    processedDate: "2024-01-14",
    transactionId: null,
    rejectionReason: "Insufficient balance in vendor account",
  },
  {
    id: 4,
    storeName: "Domino's Indiranagar",
    vendorName: "Domino's Pizza",
    amount: 28000,
    requestDate: "2024-01-12",
    status: "completed",
    bankDetails: {
      accountNumber: "****3456",
      ifscCode: "AXIS003456",
      accountHolder: "Domino's Pizza India Pvt Ltd",
    },
    reason: "Weekly settlement",
    processedDate: "2024-01-13",
    transactionId: "TXN20240113002",
  },
  {
    id: 5,
    storeName: "Subway MG Road",
    vendorName: "Subway",
    amount: 15200,
    requestDate: "2024-01-11",
    status: "pending",
    bankDetails: {
      accountNumber: "****7890",
      ifscCode: "PNB007890",
      accountHolder: "Subway India Pvt Ltd",
    },
    reason: "Weekly settlement",
    processedDate: null,
    transactionId: null,
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500", icon: Clock },
  approved: { label: "Approved", color: "bg-blue-500", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-500", icon: XCircle },
  completed: { label: "Completed", color: "bg-green-500", icon: CheckCircle },
};

const WithdrawRequests = () => {
  const [withdrawFilter, setWithdrawFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState({
    open: false,
    type: "",
    request: null,
  });
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredRequests = withdrawRequests.filter((request) => {
    if (withdrawFilter === "All") return true;
    return request.status === withdrawFilter.toLowerCase();
  });

  const handleApprove = (request) => {
    console.log("Approving request:", request.id);
    // In a real app, this would make an API call to approve the request
    setActionDialog({ open: false, type: "", request: null });
  };

  const handleReject = () => {
    console.log(
      "Rejecting request:",
      actionDialog.request?.id,
      "Reason:",
      rejectionReason
    );
    // In a real app, this would make an API call to reject the request
    setActionDialog({ open: false, type: "", request: null });
    setRejectionReason("");
  };

  const totalPendingAmount = withdrawRequests
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalApprovedAmount = withdrawRequests
    .filter((r) => r.status === "approved" || r.status === "completed")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Withdraw Requests
        </h1>
        <p className="text-muted-foreground">
          Manage vendor withdrawal requests and settlements
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold">
                  ₹{totalPendingAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved Amount</p>
                <p className="text-2xl font-bold">
                  ₹{totalApprovedAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{withdrawRequests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">All Withdraw Requests</CardTitle>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search requests..." className="pl-10" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {withdrawFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setWithdrawFilter("All")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setWithdrawFilter("Pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setWithdrawFilter("Approved")}>
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setWithdrawFilter("Completed")}
                >
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setWithdrawFilter("Rejected")}>
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const statusInfo = statusConfig[request.status];
              const StatusIcon = statusInfo.icon;
              return (
                <Card
                  key={request.id}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">
                            {request.storeName}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {request.vendorName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Requested: {request.requestDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ₹{request.amount.toLocaleString()}
                        </p>
                        <Badge
                          className={`${statusInfo.color} text-white mt-1`}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Reason: {request.reason}</span>
                        {request.processedDate && (
                          <span>Processed: {request.processedDate}</span>
                        )}
                        {request.transactionId && (
                          <span>TXN: {request.transactionId}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedRequest(request);
                            setIsDetailsDialogOpen(true);
                          }}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        {request.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() =>
                                setActionDialog({
                                  open: true,
                                  type: "approve",
                                  request,
                                })
                              }
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                setActionDialog({
                                  open: true,
                                  type: "reject",
                                  request,
                                })
                              }
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
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

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Withdraw Request Details</DialogTitle>
            <DialogDescription>
              Detailed information about the withdrawal request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Store Name</Label>
                  <p className="text-sm">{selectedRequest.storeName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Vendor</Label>
                  <p className="text-sm">{selectedRequest.vendorName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Amount</Label>
                  <p className="text-lg font-bold">
                    ₹{selectedRequest.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge
                    className={`${
                      statusConfig[selectedRequest.status].color
                    } text-white`}
                  >
                    {statusConfig[selectedRequest.status].label}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Bank Details</Label>
                <div className="mt-1 p-3 bg-muted rounded-lg text-sm">
                  <p>
                    Account Holder: {selectedRequest.bankDetails.accountHolder}
                  </p>
                  <p>
                    Account Number: {selectedRequest.bankDetails.accountNumber}
                  </p>
                  <p>IFSC Code: {selectedRequest.bankDetails.ifscCode}</p>
                </div>
              </div>
              {selectedRequest.rejectionReason && (
                <div>
                  <Label className="text-sm font-medium">
                    Rejection Reason
                  </Label>
                  <p className="text-sm text-red-600 mt-1">
                    {selectedRequest.rejectionReason}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialogs */}
      <Dialog
        open={actionDialog.open}
        onOpenChange={(open) =>
          setActionDialog({
            open,
            type: actionDialog.type,
            request: actionDialog.request,
          })
        }
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {actionDialog.type === "approve"
                ? "Approve Withdraw Request"
                : "Reject Withdraw Request"}
            </DialogTitle>
            <DialogDescription>
              {actionDialog.type === "approve"
                ? "Are you sure you want to approve this withdrawal request?"
                : "Please provide a reason for rejecting this request."}
            </DialogDescription>
          </DialogHeader>
          {actionDialog.type === "reject" && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Enter reason for rejection"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setActionDialog({ open: false, type: "", request: null })
              }
            >
              Cancel
            </Button>
            <Button
              onClick={
                actionDialog.type === "approve"
                  ? () => handleApprove(actionDialog.request)
                  : handleReject
              }
              className={
                actionDialog.type === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
            >
              {actionDialog.type === "approve" ? "Approve" : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WithdrawRequests;
