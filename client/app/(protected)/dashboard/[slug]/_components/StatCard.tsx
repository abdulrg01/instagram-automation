import Loader from "@/components/global/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function StatCard({
  label,
  value,
  change,
  color,
  icon,
  bgColor,
  titleColor,
  isLoadingHomeStats,
}: {
  label: string;
  value: number | undefined;
  change: number | null | undefined;
  color: string;
  icon?: React.ReactNode;
  bgColor?: string;
  titleColor?: string;
  isLoadingHomeStats: boolean;
}) {
  const isPositive = change !== null && change && change >= 0;
  const changeLabel =
    change === null
      ? "N/A"
      : `${isPositive ? "+" : ""}${change}% from last month`;
  const changeColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Card
      className={`border-0 shadow-lg bg-gradient-to-br ${bgColor} hover:shadow-xl transition-all duration-300`}
    >
      {isLoadingHomeStats ? (
        <Loader state={isLoadingHomeStats}>Loading...</Loader>
      ) : (
        <>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${titleColor}`}>
              {label}
            </CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <p className={`text-xs ${changeColor} flex items-center mt-1`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {changeLabel}
            </p>
          </CardContent>
        </>
      )}
    </Card>
  );
}
