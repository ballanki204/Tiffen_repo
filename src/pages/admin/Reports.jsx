import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Download, Activity, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// P&L Statement Data
const plStatementData = {
  month: "November 2024",
  totalRevenue: 1425000,
  foodCost: 485000,
  laborCost: 210000,
  rent: 85000,
  marketing: 45000,
  other: 10000,
  profitMargin: 41.4,
};

// Calculate values
const grossProfit = plStatementData.totalRevenue - plStatementData.foodCost;
const totalExpenses =
  plStatementData.laborCost +
  plStatementData.rent +
  plStatementData.marketing +
  plStatementData.other;
const netProfit = grossProfit - totalExpenses;

// --- Recharts mock data for other tabs ---
const dailySalesData = [
  { date: "01 Nov", revenue: 42000 },
  { date: "05 Nov", revenue: 38000 },
  { date: "10 Nov", revenue: 47000 },
  { date: "15 Nov", revenue: 52000 },
  { date: "20 Nov", revenue: 49000 },
  { date: "25 Nov", revenue: 52000 },
  { date: "30 Nov", revenue: 58500 },
];

const consumptionVsSales = [
  { item: "Rice", consumption: 120, sales: 140 },
  { item: "Veg", consumption: 90, sales: 110 },
  { item: "Spices", consumption: 60, sales: 55 },
  { item: "Oil", consumption: 40, sales: 48 },
  { item: "Milk", consumption: 80, sales: 76 },
];

const wastageData = [
  { name: "Used", value: 92, color: "#10B981" },
  { name: "Wasted", value: 8, color: "#EF4444" },
];

const foodCostBreakdown = [
  { category: "Vegetables", cost: 195000 },
  { category: "Grains", cost: 85000 },
  { category: "Spices", cost: 65000 },
  { category: "Dairy", cost: 110000 },
  { category: "Oils", cost: 40000 },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState("30");

  const tabs = [
    { id: "daily-sales", label: "Daily Sales", to: "daily-sales" },
    { id: "consumption", label: "Consumption vs Sales", to: "consumption" },
    { id: "wastage", label: "Wastage Report", to: "wastage" },
    { id: "food-cost", label: "Food Cost", to: "food-cost" },
    { id: "pl-statement", label: "P&L Statement", to: "pl-statement" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Reports & Analytics</h1>
          <p className="text-muted-foreground">Select a report to view detailed analytics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="15">Last 15 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Download className="h-4 w-4" />
            Export (CSV/PDF)
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 overflow-x-auto">
        <div className="flex gap-1 md:gap-4 min-w-max md:min-w-0">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.to}
              className={({ isActive }) =>
                `px-4 py-3 md:px-6 md:py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                  isActive ? "border-b-primary text-primary" : "border-b-transparent text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Reports;
