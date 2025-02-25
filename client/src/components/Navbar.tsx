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
      "flex justify-center items-center gap-sm md:gap-md font-openSans text-subHeading cursor-pointer focus:outline-none",
    name: "font-comfortaa",
    loading: {
      text: "h-4 w-[100px]",
      profile: "h-10 w-10 rounded-full font-comfortaa",
    },
  };

  const { user, isLoading, error } = useUser();

  console.log(user?.picture);

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
      <DropdownMenuContent>
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
      box: "flex justify-between w-full h-[5rem] px-lg md:px-xl ",
      style: "bg-background/80",
    },
    logo: {
      wrapper:
        "flex justify-center items-center gap-sm md:gap-md cursor-pointer",
      header: "font-comfortaa text-subHeading md:text-h6",
    },
    profile:
      "flex justify-center items-center gap-sm md:gap-md font-comfortaa text-subHeading cursor-pointer focus:outline-none",
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
          Login/Signup
        </a>
      )}
    </nav>
  );
};
