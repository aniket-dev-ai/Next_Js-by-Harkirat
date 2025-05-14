import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
const WorkSection = () => {
  const data = [
    {
      no: 1,
      title: "Create or join a Group",
      desc: "Create a group with your friends or join an existing one to start splitting expenses.",
    },
    {
      no: 2,
      title: "Add Expenses",
      desc: "Easily add expenses with details like amount, date, and description.",
    },
    {
      no: 3,
      title: "Split Expenses",
      desc: "Choose how to split the expenses - equally, by percentage, or custom amounts.",
    },
    {
      no: 4,
      title: "Settle Up",
      desc: "Get reminders for payments and settle up with friends effortlessly.",
    },
  ];
  return (
    <div className="pb-20 bg-green-50 dark:bg-green-950 flex flex-col pt-14 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3.5 px-4">
        <p className="border-2  border-primary p-1 px-2 rounded-xl ">
          How it Works
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary text-center">
          Splitting Expenses has never been easier
        </h1>
        <p className="text-center">
          Follow these simple steps to start hacking and splitting expenses with
          friends
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center mt-10 w-full px-2">
        {data.map((item) => (
          <Card
            className="w-[85vw] sm:w-[35vw] md:w-[30vw] lg:w-[20vw] h-[28vh] sm:h-[32vh] md:h-[36vh] lg:h-[35vh] hover:scale-105 duration-200 hover:shadow-2xl hover:shadow-green-600 flex flex-col items-center justify-between"
            key={item.no}
          >
            <CardHeader className="mt-[3vh] flex flex-col items-center">
              <CardTitle className="bg-primary rounded-full w-[6vh] h-[6vh] sm:w-[7vh] sm:h-[7vh] dark:text-black flex items-center justify-center text-white text-xl sm:text-2xl">
                {item.no}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg sm:text-xl font-black text-shadow-primary dark:text-ring brightness-75    text-center">
                {item.title}
              </p>
            </CardContent>
            <CardFooter className="mb-[3vh] sm:mb-[4vh] w-[90%]">
              <p className="text-center font-light md:font-extralight text-xs sm:text-sm">
                {item.desc}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
