import {
  Button,
  CashflowIcon,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Combobox,
  DatePicker,
  Input,
  Label,
  PlusIcon,
  Switch,
  Textarea,
} from "@/components";
import React from "react";
import { toast } from "sonner";

export const CashflowCard = () => {
  const classes = {
    wrapper: "flex-1",
    switch: "flex items-center w-fit gap-sm md:w-full justify-between",
    submit: "justify-end",
  };
  return (
    <Card className={classes.wrapper}>
      <CardHeader>
        <CardTitle>Cashflow</CardTitle>
        <CashflowIcon />
      </CardHeader>
      <CardContent>
        <span className={classes.switch}>
          Income
          <Switch />
          Expense
        </span>
        <Label>Date</Label>
        <DatePicker />
        <Label>Category</Label>
        <Combobox data={[{ label: "First", value: "hahayes" }]} />
        <Label htmlFor='transaction-name'>Name</Label>
        <Input id='cashflow-name-input' placeholder='Enter transaction here' />
        <Label>Description</Label>
        <Textarea placeholder='Enter transaction description here' />
        <Label htmlFor='cashflow-input'>Amount</Label>
        <Input id='cashflow-input' placeholder='$0.00' />
      </CardContent>
      <CardFooter className={classes.submit}>
        <Button
          variant='outline'
          onClick={() =>
            toast.success("Transaction has been added successfuly")
          }
        >
          <PlusIcon />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};
