import { ArrowRightSquareIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="mt-20 gap-12 md:p-0 p-2 px-3 flex flex-col items-center justify-center  ">
      <p className="block mx-auto mb-8 w-fit border border-primary bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">
        Split Expenses. Simple life
      </p>
      <h1 className="md:text-8xl text-6xl text-primary font-extrabold text-center">
        The Smartest Way to Split Expenses with Friends
      </h1>
      <p className="text-center text-sm font-light mt-4">
        Track Shared expenses , split bills effortlessely and settle up quickly.
        Never worry about who owes who again
      </p>
      <div className="flex  gap-4 mt-8">
        <Button className="rounded-xl">
          Get Started <ArrowRightSquareIcon />
        </Button>
        <Button
          className="rounded-xl border border-accent"
          variant={"secondary"}
        >
          See How It Works
        </Button>
      </div>
      <div>
        <Image
          src={"/futuristic-robot-interacting-with-money.jpg"}
          alt="hero"
          width={1500}
          height={500}
          className="object-contain mt-10  rounded-3xl dark:brightness-50"
        ></Image>
      </div>
    </div>
  );
};

export default HeroSection;
