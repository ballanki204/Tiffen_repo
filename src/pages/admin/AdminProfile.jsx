import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminProfile() {
  const [name, setName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("admin_name") || "Admin User";
    setName(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_name", name || "Admin User");
    alert("Profile updated");
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground">{initials || "AD"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Account</p>
              <p className="font-medium text-foreground">{name || "Admin User"}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <label className="text-sm font-medium text-muted-foreground">Display Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
