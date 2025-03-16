"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { Skeleton } from "@/common/components";
import {
  DataTable,
  columns,
  TransactionsCard,
  ChartsCard,
} from "./_components";
import { InputModal } from "./_components/InputModal";
import { useTransaction } from "@/common/hooks";

export default function Dashboard() {
  const classes = {
    container:
      "flex flex-col size-full min-h-[calc(100vh-72px)] px-md lg:px-lg justify-between",
    loading: {
      text: "h-10 w-[400px]",
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
  const { isTransactionsPending, transactionsData } = useTransaction();

  // We will need zod for input validation

  if (isUserLoading || isTransactionsPending)
    return (
      <div className={classes.container}>
        <section className={classes.top.wrapper}>
          <Skeleton className={classes.loading.text} />
        </section>
        <section className={classes.middle.wrapper}>
          <Skeleton className={classes.loading.card} />
          <Skeleton className={classes.loading.card} />
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
            {transactionsData && (
              <DataTable columns={columns} data={transactionsData} />
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
