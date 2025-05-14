import { ArrowRightSquareIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image"; 

const HeroSection = () => {
  return (
    <div className="mt-20 gap-12 flex flex-col items-center justify-center  ">
      <p className="p-1 border m-auto px-3  border-accent-foreground text-xs rounded-3xl">
        Split Expenses. Simple life
      </p>
      <h1 className="text-8xl font-extrabold text-center">
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
        <Button className="rounded-xl border border-accent" variant={"secondary"}>See How It Works</Button>
      </div>
      <div>
        <Image
          src={"/futuristic-robot-interacting-with-money.jpg"}
          alt="hero"
          width={1500}
          height={500}
          className="object-contain mt-10 rounded-3xl dark:brightness-50"
        ></Image>
      </div>
    </div>
  );
};

export default HeroSection;
