import React from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const wastageData = [
  { name: "Used", value: 92, color: "#10B981" },
  { name: "Wasted", value: 8, color: "#EF4444" },
];

export default function WastageReport() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Wastage Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={wastageData} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={4}>
                {wastageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex gap-4">
          {wastageData.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <div style={{ width: 12, height: 12, background: d.color }} />
              <span className="text-sm font-medium text-foreground">{d.name}</span>
              <span className="text-sm text-muted-foreground">{d.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
