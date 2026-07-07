import type { RevenueDataPoint, StatusCount, TopProduct } from "./types";

export interface RevenueChartProps {
    revenue: number;
    range: string;
    data: RevenueDataPoint[];
};

export interface OrderByStatusChartProps {
    statusCounts: StatusCount[];
};

export interface TopProductsChartProps { 
    data: TopProduct[];
};