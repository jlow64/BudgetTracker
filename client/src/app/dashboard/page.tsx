"use client";

import { Skeleton } from "@/components";
import { useQuery } from "@tanstack/react-query";
import {
  DataTable,
  columns,
  CashflowChart,
  CashflowCard,
  CategoriesChart,
  CategoriesCard,
  TransactionsCard,
} from "./_components";
import { transactionQuery } from "@/queries";

export default function Dashboard() {
  const classes = {
    container: "flex flex-col w-full px-md lg:px-xl gap-md",
    loading: {
      wrapper: "grid grid-cols-4 w-full gap-sm p-md",
      card: "bg-foreground/50 h-[700px] flex-1",
      table: "bg-foreground/50 h-[400px] col-span-4",
    },
    top: {
      wrapper: "flex flex-row w-full justify-between py-lg",
      welcome: "font-comfortaa text-h6 text-foreground/90",
      select: {
        trigger: "w-[180px] rounded-lg placeholder:text-muted",
        content: "rounded-xl",
        item: "rounded-lg",
      },
    },
    middle: {
      wrapper: "flex flex-row flex-wrap 2xl:flex-nowrap w-full gap-md",
      cards: "w-full flex gap-md flex-wrap md:flex-nowrap",
    },
    bottom: {
      wrapper: "flex flex-row w-full gap-md",
    },
  };

  const { isPending, data } = useQuery({
    queryKey: ["transactionData"],
    queryFn: async () => transactionQuery(),
  });

  // We will need zod for input validation

  if (isPending)
    return (
      <div className={classes.loading.wrapper}>
        <Skeleton className={classes.loading.card} />
        <Skeleton className={classes.loading.card} />
        <Skeleton className={classes.loading.card} />
        <Skeleton className={classes.loading.card} />
        <Skeleton className={classes.loading.table} />
      </div>
    );

  return (
    <div className={classes.container}>
      <section className={classes.top.wrapper}>
        <h5 className={classes.top.welcome}>
          Welcome Koto, lets get back on track!
        </h5>
      </section>
      <section className={classes.middle.wrapper}>
        <div className={classes.middle.cards}>
          <CashflowChart />
          <CashflowCard />
        </div>
        <div className={classes.middle.cards}>
          <CategoriesChart />
          <CategoriesCard />
        </div>
      </section>
      <section className={classes.bottom.wrapper}>
        <TransactionsCard>
          <DataTable columns={columns} data={data} />
        </TransactionsCard>
      </section>
    </div>
  );
}
