import React from "react";
import { Download, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const grossProfit = plStatementData.totalRevenue - plStatementData.foodCost;
const totalExpenses = plStatementData.laborCost + plStatementData.rent + plStatementData.marketing + plStatementData.other;
const netProfit = grossProfit - totalExpenses;

const formatCurrency = (value) => `₹${value.toLocaleString("en-IN")}`;

export default function PLStatement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Monthly Profit & Loss Statement</h1>
          <p className="text-muted-foreground">{plStatementData.month}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <Select defaultValue="30">
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

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-200/50 rounded-lg">
              <DollarSign className="h-6 w-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold text-emerald-700 mt-1">{formatCurrency(plStatementData.totalRevenue)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-700">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-semibold">+12.5%</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Cost of Goods Sold (COGS)</h2>
        <div className="mt-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
            <span className="font-medium text-foreground">Food Cost</span>
            <span className="font-semibold text-slate-900">{formatCurrency(plStatementData.foodCost)}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 mt-3 flex items-center justify-between">
            <span className="font-semibold text-foreground">Total COGS</span>
            <span className="text-lg font-bold text-foreground">{formatCurrency(plStatementData.foodCost)}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Gross Profit</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{formatCurrency(grossProfit)}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Operating Expenses</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Labor Cost</span>
            <span className="font-semibold">{formatCurrency(plStatementData.laborCost)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Rent & Utilities</span>
            <span className="font-semibold">{formatCurrency(plStatementData.rent)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Marketing</span>
            <span className="font-semibold">{formatCurrency(plStatementData.marketing)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Other Expenses</span>
            <span className="font-semibold">{formatCurrency(plStatementData.other)}</span>
          </div>
          <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between">
            <span className="font-semibold">Total Expenses</span>
            <span className="text-lg font-bold">{formatCurrency(totalExpenses)}</span>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
            <p className="text-4xl font-bold text-emerald-700 mt-2">{formatCurrency(netProfit)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-emerald-700 font-medium">Profit Margin</p>
            <p className="font-bold text-emerald-900">{plStatementData.profitMargin}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
