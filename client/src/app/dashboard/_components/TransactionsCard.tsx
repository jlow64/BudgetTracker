import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TransactionsIcon,
} from "@/components";
import React from "react";

export const TransactionsCard = ({ children }: React.PropsWithChildren) => {
  const classes = {
    container: "flex-1 overflow-auto",
  };
  return (
    <Card className={classes.container}>
      <CardHeader>
        <CardTitle>Transactions Log</CardTitle>
        <TransactionsIcon />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
