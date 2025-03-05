import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CashflowChart, CategoriesChart } from "./charts";

export const ChartsCard = () => {
  const classes = {
    wrapper: "flex flex-col flex-1 gap-lg h-full",
  };
  return (
    <Tabs defaultValue='cashflow' className={classes.wrapper}>
      <TabsList className='w-fit'>
        <TabsTrigger value='cashflow'>Cashflow</TabsTrigger>
        <TabsTrigger value='categories'>Categories</TabsTrigger>
      </TabsList>
      <TabsContent value='cashflow'>
        <CashflowChart />
      </TabsContent>
      <TabsContent value='categories'>
        <CategoriesChart />
      </TabsContent>
    </Tabs>
  );
};
