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
    container: "size-full p-xl",
    content: "h-full",
  };
  return (
    <Card className={classes.container}>
      <CardHeader>
        <CardTitle>Transactions Log</CardTitle>
        <TransactionsIcon />
      </CardHeader>
      <CardContent className={classes.content}>{children}</CardContent>
    </Card>
  );
};
