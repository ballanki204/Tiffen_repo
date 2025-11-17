import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Save,
  X,
  Edit,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Banknote,
  Smartphone,
  Wallet,
} from "lucide-react";

const StorePayment = () => {
  const { storeId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCash: true,
    acceptCard: true,
    acceptUPI: true,
    acceptWallet: false,
    minimumOrderForCard: 100,
    minimumOrderForOnline: 50,
    paymentGateway: "razorpay",
    commissionRate: 2.5,
    settlementCycle: "daily",
    autoSettle: true,
  });

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      accountHolder: "Rajesh Kumar",
      accountNumber: "****1234",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
      isPrimary: true,
      verified: true,
    },
  ]);

  const [upiIds, setUpiIds] = useState([
    {
      id: 1,
      upiId: "rajesh.kumar@oksbi",
      provider: "SBI YONO",
      isPrimary: true,
      verified: true,
    },
  ]);

  const handleSave = () => {
    console.log("Saving payment settings:", {
      paymentSettings,
      bankAccounts,
      upiIds,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSettingChange = (field, value) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addBankAccount = () => {
    const newAccount = {
      id: Date.now(),
      accountHolder: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      isPrimary: false,
      verified: false,
    };
    setBankAccounts((prev) => [...prev, newAccount]);
  };

  const removeBankAccount = (id) => {
    setBankAccounts((prev) => prev.filter((account) => account.id !== id));
  };

  const setPrimaryBankAccount = (id) => {
    setBankAccounts((prev) =>
      prev.map((account) => ({
        ...account,
        isPrimary: account.id === id,
      }))
    );
  };

  const addUpiId = () => {
    const newUpi = {
      id: Date.now(),
      upiId: "",
      provider: "",
      isPrimary: false,
      verified: false,
    };
    setUpiIds((prev) => [...prev, newUpi]);
  };

  const removeUpiId = (id) => {
    setUpiIds((prev) => prev.filter((upi) => upi.id !== id));
  };

  const setPrimaryUpiId = (id) => {
    setUpiIds((prev) =>
      prev.map((upi) => ({
        ...upi,
        isPrimary: upi.id === id,
      }))
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Accept Cash</Label>
              <p className="text-sm text-muted-foreground">
                Allow cash payments
              </p>
            </div>
            <Switch
              checked={paymentSettings.acceptCash}
              onCheckedChange={(checked) =>
                handleSettingChange("acceptCash", checked)
              }
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Accept Card</Label>
              <p className="text-sm text-muted-foreground">
                Allow card payments
              </p>
            </div>
            <Switch
              checked={paymentSettings.acceptCard}
              onCheckedChange={(checked) =>
                handleSettingChange("acceptCard", checked)
              }
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Accept UPI</Label>
              <p className="text-sm text-muted-foreground">
                Allow UPI payments
              </p>
            </div>
            <Switch
              checked={paymentSettings.acceptUPI}
              onCheckedChange={(checked) =>
                handleSettingChange("acceptUPI", checked)
              }
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Accept Wallet</Label>
              <p className="text-sm text-muted-foreground">
                Allow wallet payments
              </p>
            </div>
            <Switch
              checked={paymentSettings.acceptWallet}
              onCheckedChange={(checked) =>
                handleSettingChange("acceptWallet", checked)
              }
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Bank Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bankAccounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{account.accountHolder}</p>
                <p className="text-sm text-muted-foreground">
                  {account.accountNumber} - {account.bankName}
                </p>
                {account.isPrimary && (
                  <Badge variant="secondary">Primary</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {account.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {!account.isPrimary && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPrimaryBankAccount(account.id)}
                    disabled={!isEditing}
                  >
                    Set Primary
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeBankAccount(account.id)}
                  disabled={!isEditing}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {isEditing && (
            <Button
              onClick={addBankAccount}
              variant="outline"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Bank Account
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            UPI IDs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upiIds.map((upi) => (
            <div
              key={upi.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{upi.upiId}</p>
                <p className="text-sm text-muted-foreground">{upi.provider}</p>
                {upi.isPrimary && <Badge variant="secondary">Primary</Badge>}
              </div>
              <div className="flex items-center gap-2">
                {upi.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {!upi.isPrimary && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPrimaryUpiId(upi.id)}
                    disabled={!isEditing}
                  >
                    Set Primary
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeUpiId(upi.id)}
                  disabled={!isEditing}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {isEditing && (
            <Button onClick={addUpiId} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add UPI ID
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Settings
          </Button>
        )}
      </div>
    </div>
  );
};

export default StorePayment;
