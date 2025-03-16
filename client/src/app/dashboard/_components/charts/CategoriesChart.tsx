"use client";

import { useEffect, useMemo, useState } from "react";
import { Pie, PieChart as RechartsPieChart } from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui/chart";
import { ICategory, TransactionTypeEnum } from "@/common/types";
import { useCategory, useTransaction } from "@/common/hooks";

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
  amount: {
    label: "Amount",
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

  const { categoriesData } = useCategory();
  const { transactionsData } = useTransaction();

  // We need to convert our transaction data into a format that recharts can parse
  const chartData = useMemo(() => {
    if (categoriesData && transactionsData) {
      const calculateCategoryAmount = (category: string) => {
        return transactionsData
          .filter((transaction) => transaction.category === category)
          .reduce((total, transaction) => total + transaction.amount, 0);
      };
      const convertedData = categoriesData.map((category) => {
        const parsedName = category.name.toLowerCase().replace(/\s/g, "");
        return {
          name: parsedName,
          amount: calculateCategoryAmount(category.name),
          type: category.type,
          fill: `var(--color-${parsedName})`,
        };
      });
      return convertedData;
    }
    return [];
  }, [categoriesData, transactionsData]);

  const dynamicChartConfig = () => {
    let chartConfig: ChartConfig = {
      amount: {
        label: "Amount",
      },
    };
    categoriesData?.map((e, index) => {
      chartConfig[e.name.toLowerCase().replace(/\s/g, "")] = {
        label: e.name,
        color: `hsl(var(--chart-${++index}))`,
      };
    });
    return chartConfig;
  };

  const filteredData = useMemo(
    () =>
      chartData.filter(
        (item) =>
          item.type ===
          TransactionTypeEnum[type as keyof typeof TransactionTypeEnum]
      ),
    [chartData, type]
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
            <SelectItem value='Expense' className='rounded-lg'>
              Expense
            </SelectItem>
            <SelectItem value='Income' className='rounded-lg'>
              Income
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='pb-0'>
        <ChartContainer
          config={dynamicChartConfig()}
          className={classes.chart.wrapper}
        >
          <RechartsPieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey='name' />}
              className={classes.chart.legend}
            />
            <Pie
              data={filteredData}
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill='hsla(var(--foreground))'
                  >
                    {`$${payload.amount}`}
                  </text>
                );
              }}
              dataKey='amount'
              nameKey='name'
            />
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
