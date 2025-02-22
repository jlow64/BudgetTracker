"use client";

import { Button, Card, CardHeader, CardTitle } from "@/components";
import { BulbIcon } from "@/components/svg/BulbIcon";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import useMeasure from "react-use-measure";

export default function Home() {
  const classes = {
    container:
      "flex flex-col size-full h-[calc(100vh-80px)] justify-between overflow-hidden",
    middle: {
      wrapper: "flex gap-md mt-xl",
      card: "relative h-full min-w-[33%]",
      header: "flex flex-col h-full p-lg justify-between items-start",
    },
    bottom: {
      wrapper: "flex flex-col justify-between bg-background font-comfortaa",
      callToAction: "flex justify-center gap-xl p-2xl px-3xl",
      footer: "flex justify-center gap-sm py-lg w-full text-foreground/75",
    },
  };

  // We will make a copy of the image list and place it next to it
  // Then when the animation for the second copy is finished,
  // Silently we will reset the animation and loop.
  const cardInfo = [
    {
      title: "Lets budget together!",
      description: "Get your spending habits tracked today.",
    },
    {
      title: "Know your spending!",
      description: "Control your cashflow.",
    },
    {
      title: "Easy to use!",
      description: "Free budget tracker.",
    },
  ];
  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let finalPosition = -width - 32;

    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 25,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

  return (
    <div className={classes.container}>
      <motion.section
        className={classes.middle.wrapper}
        ref={ref}
        style={{ x: xTranslation }}
      >
        {[...cardInfo, ...cardInfo].map((info) => (
          <Card
            className={classes.middle.card}
            key={`${info.title}-${Math.random()}`}
          >
            <CardHeader className={classes.middle.header}>
              <CardTitle className='text-h2 w-[200px]'>{info.title}</CardTitle>
              <h3 className='text-paragraphLg'>{info.description}</h3>
            </CardHeader>
          </Card>
        ))}
      </motion.section>
      <section className={classes.bottom.wrapper}>
        <div className={classes.bottom.callToAction}>
          <div>
            <h1 className='text-h2'>Ready to get started?</h1>
            <h2 className='text-paragraphBase'>
              If you're ready to conquer your financial goals, set yourself free
              today.
            </h2>
          </div>
          <Button className='text-h4 w-fit min-h-[80px]'>
            Start Now
            <BulbIcon />
          </Button>
        </div>
        <footer className={classes.bottom.footer}>
          (c) Copyright jlow64 2025. All rights reserved. | Terms of Service |
          Privacy Policy | Cookies | Licenses
        </footer>
      </section>
    </div>
  );
}
