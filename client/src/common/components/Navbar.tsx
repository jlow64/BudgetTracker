"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { PiggyIcon } from "./svg/PiggyIcon";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from "./ui";

const Profile = () => {
  const classes = {
    profile:
      "flex justify-center items-center gap-md bg-background rounded-full font-openSans pl-md text-subHeading cursor-pointer focus:outline-none",
    name: "font-comfortaa text-foreground/75",
    loading: {
      text: "h-4 w-[200px]",
      profile: "h-10 w-10 rounded-full font-comfortaa",
    },
  };

  const { user, isLoading, error } = useUser();

  return isLoading ? (
    <div className={classes.profile}>
      <Skeleton className={classes.loading.text} />
      <Skeleton className={classes.loading.profile} />
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger className={classes.profile}>
        <p className={classes.name}>{user?.name}</p>
        <Avatar>
          <AvatarImage src={user?.picture} referrerPolicy='no-referrer' />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <a href='/auth/logout'>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Navbar = () => {
  const classes = {
    container: {
      box: "flex justify-between items-center w-full h-[4.5rem] px-lg ",
      style: "text-background",
    },
    logo: {
      wrapper: "flex justify-center items-center gap-xl cursor-pointer",
      header: "font-comfortaa text-subHeading md:text-h6",
    },
    profile:
      "flex justify-center items-center h-[40px] px-md py-sm bg-background rounded-md font-comfortaa text-subHeading text-secondary cursor-pointer focus:outline-none",
  };

  const pathName = usePathname();
  const isDashboard = pathName === "/dashboard";

  return (
    <nav className={cn(classes.container.box, classes.container.style)}>
      <div className={classes.logo.wrapper}>
        <PiggyIcon />
        <h6 className={classes.logo.header}>Budget Tracker</h6>
      </div>
      {isDashboard ? (
        <Profile />
      ) : (
        <a href='/auth/login' className={classes.profile}>
          Login / Signup
        </a>
      )}
    </nav>
  );
};
