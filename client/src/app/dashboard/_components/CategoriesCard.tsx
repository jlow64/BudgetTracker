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
} from "@/common/components";
import { categoryPostQuery } from "@/common/queries";
import { ICategoryDTO, TransactionTypeEnum } from "@/common/types";
import { useUser } from "@auth0/nextjs-auth0";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useController, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CategoriesSchema = z.object({
  type: z.boolean().optional(),
  name: z.string().min(1, { message: "Required." }),
  description: z.string(),
});

export const CategoriesCard = () => {
  const classes = {
    wrapper: "flex-1 w-full h-fit",
    switch: "flex items-center w-fit gap-sm md:w-full justify-between",
    submit: "self-end",
    content: "justify-start flex-1",
    textArea: "max-h-[160px]",
    error: "text-destructive",
  };

  const { user } = useUser();
  const userId = user?.sub ?? "";
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formBody: ICategoryDTO) => categoryPostQuery(formBody),
    onSuccess: (d) => {
      const message = d?.name ? `for ${d?.name}` : "";
      toast.success(`Category ${message} has been added successfuly`);
      queryClient.invalidateQueries({ queryKey: ["categoryData"] });
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CategoriesSchema>>({
    resolver: zodResolver(CategoriesSchema),
    defaultValues: {
      type: false,
    },
  });

  const { field } = useController({ control, name: "type" });
  const transactionType = !field.value
    ? TransactionTypeEnum.Expense
    : TransactionTypeEnum.Income;

  return (
    <Card className={classes.wrapper}>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <FilterIcon />
      </CardHeader>
      <CardContent className={classes.content}>
        <form
          className='flex flex-col gap-md'
          onSubmit={handleSubmit((category) => {
            const formBody: ICategoryDTO = {
              ...category,
              type: transactionType,
              userId: userId,
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
          <Label htmlFor='category-name'>Name</Label>
          <Input
            id='category-name-input'
            placeholder='Enter category name here'
            {...register("name")}
          />
          {errors.name?.message && (
            <p className={classes.error}>{errors.name.message}</p>
          )}
          <Label>Description</Label>
          <Textarea
            className={classes.textArea}
            placeholder='Enter category description here'
            {...register("description")}
          />
          {errors.description?.message && (
            <p className={classes.error}>{errors.description.message}</p>
          )}
          <Button type='submit' className={classes.submit} variant='outline'>
            <PlusIcon />
            Add
          </Button>
        </form>
      </CardContent>
      <CardFooter className={classes.submit}></CardFooter>
    </Card>
  );
};
