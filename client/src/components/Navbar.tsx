"use client";

import React, { ReactNode } from "react";
// import Image from "next/image";
import { PiggyIcon } from "./svg/PiggyIcon";

const Navbar = ({ children }: { children: ReactNode }) => {
  const classes = {
    // Tomorrow lets make this component responsive
    container:
      "flex justify-between w-full h-[5rem] px-lg md:px-xl bg-background/80",
    logo: {
      wrapper:
        "flex justify-center items-center gap-sm md:gap-md cursor-pointer",
      header: "font-comfortaa text-subHeading md:text-h6",
    },
    profile:
      "flex justify-center items-center gap-sm md:gap-md font-openSans text-subHeading cursor-pointer",
  };
  return (
    <nav className={classes.container}>
      <div className={classes.logo.wrapper}>
        <PiggyIcon />
        <h6 className={classes.logo.header}>Budget Tracker</h6>
      </div>
      <div className={classes.profile}>{children}</div>
    </nav>
  );
};

export { Navbar };
