"use client";

import { ITransaction, TransactionTypeEnum } from "@/common/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionDeleteQuery } from "@/common/queries";
import { toast } from "sonner";
import { useUser } from "@auth0/nextjs-auth0";
import { useAccount } from "@/common/hooks";

export const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const typeValue =
        TransactionTypeEnum[
          row.getValue("type") as keyof typeof TransactionTypeEnum
        ];
      return <div>{typeValue}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          className='mx-auto'
          variant='ghost'
          size='sm'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-NZ", {
        style: "currency",
        currency: "NZD",
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          className='mx-auto'
          variant='ghost'
          size='sm'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const timeStamp = row.getValue("date") as string;
      const parsedDate = new Date(timeStamp).toLocaleString("en-NZ", {
        day: "numeric",
        year: "numeric",
        month: "numeric",
      });
      return <div>{parsedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      const classes = {
        delete: "text-destructive",
      };

      const queryClient = useQueryClient();

      const { user } = useUser();
      const { accountData } = useAccount();

      const userId = user?.sub;
      const accountId = accountData?.id;

      const mutation = useMutation({
        mutationFn: (transactionId: string) =>
          transactionDeleteQuery(transactionId),
        onSuccess: (d) => {
          const message = d?.name ? `for ${d?.name}` : "";
          toast.success(`Transaction ${message} has been deleted successfuly`);
          queryClient.invalidateQueries({
            queryKey: ["transactionData", userId, accountId],
          });
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.id)}
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Transaction</DropdownMenuItem>
            <DropdownMenuItem
              className={classes.delete}
              onClick={() => mutation.mutate(transaction.id)}
            >
              Delete Transaction
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
