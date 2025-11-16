import React from "react";
import { PieChart as LucidePie } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const consumptionVsSales = [
  { item: "Rice", consumption: 120, sales: 140 },
  { item: "Veg", consumption: 90, sales: 110 },
  { item: "Spices", consumption: 60, sales: 55 },
  { item: "Oil", consumption: 40, sales: 48 },
  { item: "Milk", consumption: 80, sales: 76 },
];

export default function ConsumptionVsSales() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LucidePie className="h-5 w-5 text-primary" />
          Consumption vs Sales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={consumptionVsSales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="item" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="consumption" fill="#60a5fa" name="Consumption" />
              <Bar dataKey="sales" fill="#34d399" name="Sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Comparison of raw ingredient consumption vs actual sold units. Useful to spot high variance and potential waste.
        </div>
      </CardContent>
    </Card>
  );
}
