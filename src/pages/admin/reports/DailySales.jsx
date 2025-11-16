import React from "react";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const dailySalesData = [
  { date: "01 Nov", revenue: 42000 },
  { date: "05 Nov", revenue: 38000 },
  { date: "10 Nov", revenue: 47000 },
  { date: "15 Nov", revenue: 52000 },
  { date: "20 Nov", revenue: 49000 },
  { date: "25 Nov", revenue: 52000 },
  { date: "30 Nov", revenue: 58500 },
];

const formatCurrency = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function DailySales() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Daily Sales (Revenue)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e9ee" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#0ea5a3" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-muted-foreground">Avg Revenue / Day</p>
            <p className="font-bold text-foreground mt-1">{formatCurrency(Math.round(1425000 / 30))}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs text-muted-foreground">Best Day</p>
            <p className="font-bold text-foreground mt-1">30 Nov</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
