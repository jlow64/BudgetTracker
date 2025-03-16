"use client";

import React from "react";
import z from "zod";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Button,
  CashflowIcon,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Combobox,
  DatePicker,
  Input,
  Label,
  PlusIcon,
  Switch,
  Textarea,
} from "@/common/components";
import { useAccount, useCategory } from "@/common/hooks";
import { ITransactionDTO, TransactionTypeEnum } from "@/common/types";
import { transactionPostQuery } from "@/common/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CashflowSchema = z.object({
  type: z.boolean().optional(),
  date: z.date({ required_error: "Please select a transaction date." }),
  category: z.string({ required_error: "Please select a category." }),
  name: z.string().min(1, { message: "Required." }),
  description: z.string(),
  amount: z.coerce
    .number({ required_error: "Please input a valid amount." })
    .positive(),
});

export const CashflowCard = () => {
  const classes = {
    wrapper: "flex-1",
    switch: "flex items-center w-fit gap-sm md:w-full justify-between",
    submit: "self-end",
    error: "text-destructive",
  };

  const { categoriesData } = useCategory();
  const { accountData } = useAccount();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formBody: ITransactionDTO) => transactionPostQuery(formBody),
    onSuccess: (d) => {
      const message = d?.name ? `for ${d?.name}` : "";
      toast.success(`Transaction ${message} has been added successfuly`);
      queryClient.invalidateQueries({ queryKey: ["transactionData"] });
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CashflowSchema>>({
    resolver: zodResolver(CashflowSchema),
    defaultValues: {
      type: false,
    },
  });

  const { field } = useController({ control, name: "type" });
  const transactionType = !field.value
    ? TransactionTypeEnum.Expense
    : TransactionTypeEnum.Income;

  // Category options should be based on Transaction type, either Income or Expense
  const comboboxData =
    categoriesData
      ?.filter((category) => category.type === transactionType)
      .map((category) => {
        return {
          label: category.name,
          value: `${category.id}`,
        };
      }) ?? [];

  return (
    <Card className={classes.wrapper}>
      <CardHeader>
        <CardTitle>Cashflow</CardTitle>
        <CashflowIcon />
      </CardHeader>
      <CardContent>
        <form
          className='flex flex-col gap-md'
          onSubmit={handleSubmit((transaction) => {
            const formBody: ITransactionDTO = {
              ...transaction,
              date: transaction.date,
              type: transactionType,
              accountId: accountData?.id ?? "",
              categoryId: transaction.category,
            };
            mutation.mutate(formBody);
          })}
        >
          <span className={classes.switch}>
            Expense
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            Income
          </span>
          {errors.type?.message && (
            <p className={classes.error}>{errors.type.message}</p>
          )}
          <Label>Date</Label>
          <DatePicker name='date' control={control} />
          {errors.date?.message && (
            <p className={classes.error}>{errors.date.message}</p>
          )}
          <Label>Category</Label>
          <Combobox data={comboboxData} name='category' control={control} />
          {errors.category?.message && (
            <p className={classes.error}>{errors.category.message}</p>
          )}
          <Label htmlFor='transaction-name'>Name</Label>
          <Input
            id='cashflow-name-input'
            placeholder='Enter transaction here'
            {...register("name")}
          />
          {errors.name?.message && (
            <p className={classes.error}>{errors.name?.message}</p>
          )}
          <Label>Description</Label>
          <Textarea
            placeholder='Enter transaction description here'
            {...register("description")}
          />
          {errors.description?.message && (
            <p className={classes.error}>{errors.description.message}</p>
          )}
          <Label htmlFor='cashflow-input'>Amount</Label>
          <Input
            id='cashflow-input'
            placeholder='$0.00'
            {...register("amount")}
          />
          {errors.amount?.message && (
            <p className={classes.error}>{errors.amount.message}</p>
          )}
          <Button className={classes.submit} type='submit' variant='outline'>
            <PlusIcon />
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
