"use client";

import React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components";
import { useTransaction } from "@/common/hooks";
import { ITransaction, TransactionTypeEnum } from "@/common/types";

const chartConfig = {
  views: {
    label: "Page Views",
  },
  cashflow: {
    label: "Weekly",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const CashflowChart = () => {
  const classes = {
    wrapper: "flex flex-1 md:basis-full bg-background/50 max-h-[600px] px-xl",
    header: {
      wrapper: "justify-between",
      title: "text-h4 md:text-h1",
    },
    select: {
      trigger: "w-[180px] rounded-lg",
      content: "rounded-md",
      item: "rounded-lg",
    },
    chart: "aspect-square h-full max-h-[500px] py-lg",
  };
  const [timeRange, setTimeRange] = React.useState("7d");

  const { transactionsData } = useTransaction();

  // We need to convert our transaction data into a format that recharts can parse
  const convertChartData = (data?: ITransaction[]) => {
    if (data) {
      const convertedData = data.map((transaction) => {
        return {
          date: transaction.date,
          amount:
            transaction.type === TransactionTypeEnum.Expense
              ? -transaction.amount
              : transaction.amount,
        };
      });
      return convertedData;
    }
    return [];
  };

  // Filters data by a range of selected dates
  const filteredData = convertChartData(transactionsData).filter((item) => {
    const date = new Date(item.date);
    const referenceDate = Date.now();
    let daysToSubtract = 90;
    switch (timeRange) {
      case "365d":
        daysToSubtract = 365;
        break;
      case "180d":
        daysToSubtract = 180;
        break;
      case "90d":
        daysToSubtract = 90;
        break;
      case "30d":
        daysToSubtract = 30;
        break;
      case "7d":
        daysToSubtract = 7;
        break;
      default:
        break;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const total = React.useMemo(
    () => ({
      amount: filteredData.reduce((acc, curr) => acc + curr.amount, 0),
    }),
    [filteredData]
  );

  // TODO: Will have to rethink the way we might want to display the data.
  return (
    <Card className={classes.wrapper}>
      <CardHeader className={classes.header.wrapper}>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className={classes.select.trigger}
            aria-label='Select a value'
          >
            <SelectValue placeholder='Select period' />
          </SelectTrigger>
          <SelectContent className={classes.select.content}>
            <SelectItem value='7d' className={classes.select.item}>
              Last 7 days
            </SelectItem>
            <SelectItem value='30d' className={classes.select.item}>
              Last 30 days
            </SelectItem>
            <SelectItem value='90d' className={classes.select.item}>
              Last 3 months
            </SelectItem>
            <SelectItem value='180d' className={classes.select.item}>
              Last 6 months
            </SelectItem>
            <SelectItem value='365d' className={classes.select.item}>
              Last year
            </SelectItem>
          </SelectContent>
        </Select>
        <h1 className={classes.header.title}>{`$${total.amount}`}</h1>
      </CardHeader>
      <CardContent>
        <ChartContainer className={classes.chart} config={chartConfig}>
          <RechartsBarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='amount' maxBarSize={50} radius={8}>
              {filteredData.map((item) => (
                <Cell
                  key={item.date}
                  fill={
                    item.amount > 0
                      ? "hsl(var(--chart-1))"
                      : "hsl(var(--chart-2))"
                  }
                />
              ))}
              {filteredData.length === 0 && <div>N/A</div>}
            </Bar>
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
