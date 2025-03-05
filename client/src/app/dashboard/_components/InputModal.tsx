import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  PlusIcon,
} from "@/components";
import { CategoriesCard } from "./CategoriesCard";
import { CashflowCard } from "./CashflowCard";

export const InputModal = () => {
  const classes = {
    icon: "stroke-background min-h-lg min-w-lg",
    button: "stroke-background",
    content: "bg-brand-gradient",
    cardWrapper: "flex gap-lg min-w-fit",
    header: "gap-lg",
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={classes.button} variant='secondary'>
          Add Transaction
          <PlusIcon className={classes.icon} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={classes.content}>
        <AlertDialogHeader className={classes.header}>
          <AlertDialogTitle>Add Transaction</AlertDialogTitle>
          <div className={classes.cardWrapper}>
            <CashflowCard />
            <CategoriesCard />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
