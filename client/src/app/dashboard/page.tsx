"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@auth0/nextjs-auth0";
import { Button, PlusIcon, Skeleton } from "@/components";
import {
  DataTable,
  columns,
  TransactionsCard,
  ChartsCard,
} from "./_components";
import { accountGetQuery, transactionQuery } from "@/queries";
import { InputModal } from "./_components/InputModal";

export default function Dashboard() {
  const classes = {
    container:
      "flex flex-col size-full min-h-[calc(100vh-72px)] px-md lg:px-lg justify-between",
    loading: {
      text: "h-8 w-[300px]",
      card: "h-[700px] flex-1",
      table: "h-[400px] w-full",
    },
    top: {
      wrapper: "flex flex-row w-full justify-between mt-[64px] mb-xl",
      welcome: "font-comfortaa text-h3 text-background",
    },
    middle: {
      wrapper: "flex flex-col xl:flex-row w-full gap-lg",
      cards: "w-full flex gap-md flex-wrap md:flex-nowrap",
      transactions: {
        wrapper: "flex-1 gap-lg mt-[76px]",
        banner:
          "flex justify-center items-center font-openSans text-paragraphBase mt-[74px] text-background py-lg bg-foreground/75 rounded-lg",
      },
    },
    bottom: {
      footer: "flex justify-center gap-sm py-lg w-full text-foreground/75",
    },
  };

  const { isLoading: isUserLoading, user } = useUser();

  const userId = user?.sub;

  const { isPending: isAccountPending, data: accountData } = useQuery({
    queryKey: ["accountData", userId],
    queryFn: async () => accountGetQuery(userId),
    enabled: !!userId,
  });

  const accountId = accountData?.id;

  const { isPending: isTransactionsPending, data: transactionData } = useQuery({
    queryKey: ["transactionData", userId, accountId],
    queryFn: async () => transactionQuery(userId, accountId),
    enabled: !!userId && !!accountId,
  });

  // We will need zod for input validation

  if (isUserLoading || isAccountPending || isTransactionsPending)
    return (
      <div className={classes.container}>
        <section className={classes.top.wrapper}>
          <Skeleton className={classes.loading.text} />
        </section>
        <section className={classes.middle.wrapper}>
          <Skeleton className={classes.loading.card} />
          <Skeleton className={classes.loading.card} />
          <Skeleton className={classes.loading.card} />
          <Skeleton className={classes.loading.card} />
        </section>
        <section className={classes.bottom.footer}>
          <Skeleton className={classes.loading.table} />
        </section>
      </div>
    );

  return (
    <div className={classes.container}>
      <section className={classes.top.wrapper}>
        <h5 className={classes.top.welcome}>
          Welcome back {user?.given_name ?? user?.nickname}.
        </h5>
        <InputModal />
      </section>
      <section className={classes.middle.wrapper}>
        <ChartsCard />
        <div className={classes.middle.transactions.wrapper}>
          <TransactionsCard>
            {transactionData && (
              <DataTable columns={columns} data={transactionData} />
            )}
          </TransactionsCard>
        </div>
      </section>
      <footer className={classes.bottom.footer}>
        (c) Copyright jlow64 2025. All rights reserved. Terms of Service Privacy
        Policy Cookies Licenses
      </footer>
    </div>
  );
}
