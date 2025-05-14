import React from "react";
import {
  MdGroups,
  MdInsights,
  MdAnalytics,
  MdNotificationsActive,
  MdDeviceHub,
  MdUpdate,
} from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const FeatureSection = () => {
  const features = [
    {
      icon: MdGroups,
      title: "Group Expenses",
      description:
        "Easily manage shared expenses within any group — friends, family, or roommates.",
    },
    {
      icon: MdInsights,
      title: "Smart Expenses",
      description:
        "Intelligently split bills and suggest optimized ways to settle up.",
    },
    {
      icon: MdAnalytics,
      title: "Expenses Analytics",
      description:
        "Track spending trends with detailed charts & expense summaries.",
    },
    {
      icon: MdNotificationsActive,
      title: "Payment Reminders",
      description:
        "Never forget to pay or receive – get smart reminders for all due payments.",
    },
    {
      icon: MdDeviceHub,
      title: "Multiple Split Types",
      description:
        "Split by percentage, share, exact amount, or custom logic – you decide.",
    },
    {
      icon: MdUpdate,
      title: "Real-time Updates",
      description:
        "Instantly sync changes with all members — powered by real-time tech.",
    },
  ];
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-20 gap-8">
        <p className="border border-accent p-1 px-2 rounded-xl ">Features</p>
        <h1 className=" text-6xl text-green-800 dark:text-green-400 font-extrabold ">
          Everything you need to split Expenses
        </h1>
        <p className="text-center text-sm w-[50vw]">
          Our platform Provides all the tools you need to handle shared expenses
          with ease
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-10">
        {features.map((feature, index) => {
          const Iconn = feature.icon;
          return (
            <Card
              className="w-[25vw] h-[35vh] hover:scale-105 duration-200 hover:shadow-2xl hover:shadow-green-600 flex flex-col items-center justify-between"
              key={index}
            >
              <CardHeader className="mt-6 flex flex-col items-center">
                <CardTitle className="bg-green-500 rounded-full w-14 dark:text-black h-14 flex items-center justify-center text-white">
                  <Iconn className="text-4xl " />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-black text-green-950 dark:text-green-500">
                  {feature.title}
                </p>
              </CardContent>
              <CardFooter className="mb-10 w-[80%]">
                <p className="text-center font-extralight text-sm">{feature.description}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureSection;
