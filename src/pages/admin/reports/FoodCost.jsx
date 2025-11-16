import React from "react";
import { LineChart as LucideLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const foodCostBreakdown = [
  { category: "Vegetables", cost: 195000 },
  { category: "Grains", cost: 85000 },
  { category: "Spices", cost: 65000 },
  { category: "Dairy", cost: 110000 },
  { category: "Oils", cost: 40000 },
];

const formatCurrency = (v) => `₹${v.toLocaleString("en-IN")}`;

export default function FoodCost() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LucideLine className="h-5 w-5 text-primary" />
          Food Cost Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={foodCostBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {foodCostBreakdown.map((f) => (
            <div key={f.category} className="p-2 bg-slate-50 rounded">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{f.category}</span>
                <span className="font-semibold">{formatCurrency(f.cost)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
