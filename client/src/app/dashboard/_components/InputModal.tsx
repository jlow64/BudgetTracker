import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  PlusIcon,
} from "@/common/components";
import { CategoriesCard } from "./CategoriesCard";
import { CashflowCard } from "./CashflowCard";

export const InputModal = () => {
  const classes = {
    icon: "stroke-background min-h-lg min-w-lg",
    button: "stroke-background",
    content: "bg-brand-gradient",
    cardWrapper: "flex gap-lg min-w-fit",
    header: "gap-lg",
    description: "text-background font-openSans",
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={classes.button} variant='secondary'>
          Add Details
          <PlusIcon className={classes.icon} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={classes.content}>
        <AlertDialogHeader className={classes.header}>
          <AlertDialogTitle>Add Details</AlertDialogTitle>
          <AlertDialogDescription className={classes.description}>
            Input your transactions and categories here
          </AlertDialogDescription>
          <div id='input-cards' className={classes.cardWrapper}>
            <CashflowCard />
            <CategoriesCard />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
