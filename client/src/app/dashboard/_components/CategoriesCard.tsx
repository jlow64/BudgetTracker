import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  FilterIcon,
  Input,
  Label,
  PlusIcon,
  Switch,
  Textarea,
} from "@/components";
import React from "react";
import { toast } from "sonner";

export const CategoriesCard = () => {
  const classes = {
    wrapper: "flex-1 w-full h-fit",
    switch: "flex items-center w-fit gap-sm md:w-full justify-between",
    submit: "justify-end",
    content: "justify-start flex-1",
    textArea: "max-h-[160px]",
  };
  return (
    <Card className={classes.wrapper}>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <FilterIcon />
      </CardHeader>
      <CardContent className={classes.content}>
        <span className={classes.switch}>
          Income
          <Switch />
          Expense
        </span>
        <Label htmlFor='category-name'>Name</Label>
        <Input
          id='category-name-input'
          placeholder='Enter category name here'
        />
        <Label>Description</Label>
        <Textarea
          className={classes.textArea}
          placeholder='Enter category description here'
        />
      </CardContent>
      <CardFooter className={classes.submit}>
        <Button
          variant='outline'
          onClick={() => toast.success("Category has been added successfuly")}
        >
          <PlusIcon />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};
