import { useState } from "react";
import { VendorsList } from "./VendorsList";
import { Building2 } from "lucide-react";

const VendorsPage = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          Vendors Management
        </h1>
        <p className="text-muted-foreground">
          Manage all your vendor partners and their details
        </p>
      </div>

      <VendorsList onSelectVendor={setSelectedVendor} />
    </div>
  );
};

export default VendorsPage;
