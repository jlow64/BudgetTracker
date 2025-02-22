"use client";

import React from "react";
import { PiggyIcon } from "./svg/PiggyIcon";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui";

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
      "flex justify-center items-center gap-sm md:gap-md font-openSans text-subHeading cursor-pointer focus:outline-none",
  };

  const router = useRouter();

  const pathName = usePathname();
  const isDashboard = pathName === "/dashboard";

  return (
    <nav className={cn(classes.container.box, classes.container.style)}>
      <div className={classes.logo.wrapper}>
        <PiggyIcon />
        <h6 className={classes.logo.header}>Budget Tracker</h6>
      </div>
      {isDashboard ? (
        <DropdownMenu>
          <DropdownMenuTrigger className={classes.profile}>
            Koto Shibata
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>KS</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/")}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className={classes.profile}>Login/Signup</div>
      )}
    </nav>
  );
};
