"use client";

import { Button, Card, CardHeader, CardTitle, ForwardIcon } from "@/components";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import useMeasure from "react-use-measure";

export default function Home() {
  const classes = {
    container:
      "flex flex-col size-full h-[calc(100vh-72px)] gap-2xl overflow-hidden",
    middle: {
      wrapper: "flex gap-xl mt-2xl py-sm w-full",
      card: "relative h-full min-w-[33%] shadow-xl",
      header: "flex flex-col h-full p-lg justify-between items-start",
      title: "text-h2 w-[200px]",
      description: "text-paragraphLg",
    },
    bottom: {
      wrapper:
        "flex flex-col size-full justify-between items-center font-comfortaa px-lg",
      callToAction:
        "flex w-full items-center justify-center gap-xl py-3xl px-[400px] bg-background text-foreground/75 rounded-md shadow-sm",
      textArea: "flex flex-col gap-md",
      title: "text-h2",
      description: "text-paragraphLg max-w-[650px]",
      footer: "flex justify-center gap-sm py-lg w-full text-foreground/75",
      button: "text-h4 text-background w-fit min-h-[80px] shadow-2xl",
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
    let finalPosition = -width - 72;

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
              <CardTitle className={classes.middle.title}>
                {info.title}
              </CardTitle>
              <h3 className={classes.middle.description}>{info.description}</h3>
            </CardHeader>
          </Card>
        ))}
      </motion.section>
      <section className={classes.bottom.wrapper}>
        <div className={classes.bottom.callToAction}>
          <div className={classes.bottom.textArea}>
            <h1 className={classes.bottom.title}>Ready to get started?</h1>
            <h2 className={classes.bottom.description}>
              If you're ready to conquer your financial goals, set yourself free
              today.
            </h2>
          </div>
          <a href='/auth/login'>
            <Button className={classes.bottom.button}>
              Start Now
              <ForwardIcon />
            </Button>
          </a>
        </div>
        <footer className={classes.bottom.footer}>
          (c) Copyright jlow64 2025. All rights reserved. Terms of Service
          Privacy Policy Cookies Licenses
        </footer>
      </section>
    </div>
  );
}
