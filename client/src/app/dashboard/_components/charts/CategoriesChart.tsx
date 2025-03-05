"use client";

import { useMemo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart as RechartsPieChart } from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionTypeEnum } from "@/types";
import { categoryQuery } from "@/queries";

const chartData = [
  {
    category: "groceries",
    visitors: 275,
    type: 1,
    fill: "var(--color-groceries)",
  },
  { category: "loan", visitors: 200, type: 1, fill: "var(--color-loan)" },
  { category: "monthly", visitors: 187, type: 1, fill: "var(--color-monthly)" },
  { category: "travel", visitors: 173, type: 1, fill: "var(--color-travel)" },
  { category: "other", visitors: 90, type: 1, fill: "var(--color-other)" },
  { category: "salary", visitors: 173, type: 0, fill: "var(--color-salary)" },
  { category: "hustle", visitors: 90, type: 0, fill: "var(--color-hustle)" },
  { category: "cny", visitors: 173, type: 0, fill: "var(--color-cny)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  groceries: {
    label: "Groceries",
    color: "hsl(var(--chart-1))",
  },
  loan: {
    label: "Loan",
    color: "hsl(var(--chart-2))",
  },
  monthly: {
    label: "Monthly",
    color: "hsl(var(--chart-3))",
  },
  travel: {
    label: "Travel",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
  salary: {
    label: "Salary",
    color: "hsl(var(--chart-3))",
  },
  hustle: {
    label: "Side Hustle",
    color: "hsl(var(--chart-4))",
  },
  cny: {
    label: "CNY",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export const CategoriesChart = () => {
  const classes = {
    container: "flex bg-background/50 max-h-[600px] h-full px-xl",
    header: "items-center justify-between pb-0",
    chart: {
      wrapper: "aspect-square h-full max-h-[500px]",
      legend:
        "-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center",
    },
  };
  const [type, setType] = useState<string>("Expense");

  const { isLoading: isUserLoading, user } = useUser();

  const userId = user?.sub;
  console.log(userId);

  const { isPending: isCategoriesPending, data: data } = useQuery({
    queryKey: ["categoryData", userId],
    queryFn: async () => categoryQuery(userId),
    enabled: !!userId,
  });

  const dynamicChartConfig = () => {
    if (data) {
      let chartConfig: ChartConfig = {
        total: {
          label: "Total",
        },
      };
      data.map((e, index) => {
        chartConfig[e.name] = {
          label: e.name,
          color: `hsl(var(--chart-${++index}))`,
        };
      });
      return chartConfig;
    }
  };

  const filteredData = useMemo(
    () =>
      chartData.filter(
        (item) =>
          item.type ===
          TransactionTypeEnum[type as keyof typeof TransactionTypeEnum]
      ),
    [type]
  );
  return (
    <Card className={classes.container}>
      <CardHeader className={classes.header}>
        <CardTitle className='capitalize'>{type}</CardTitle>
        {/* We need two types of categories, spending and income */}
        <Select value={type} onValueChange={setType}>
          <SelectTrigger
            className='w-[160px] rounded-lg'
            aria-label='Select a value'
          >
            <SelectValue placeholder='Select type' />
          </SelectTrigger>
          <SelectContent className='rounded-xl bg-background border-none'>
            <SelectItem value='Income' className='rounded-lg'>
              Income
            </SelectItem>
            <SelectItem value='Expense' className='rounded-lg'>
              Expense
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='pb-0'>
        <ChartContainer config={chartConfig} className={classes.chart.wrapper}>
          <RechartsPieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey='category' />}
              className={classes.chart.legend}
            />
            <Pie
              data={filteredData}
              label
              dataKey='visitors'
              nameKey='category'
            />
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
