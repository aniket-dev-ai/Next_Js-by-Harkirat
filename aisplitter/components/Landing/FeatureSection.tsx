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
    <div className="md:p-0 p-3 text-center">
      <div className="flex flex-col items-center justify-center mt-20 gap-8">
        <p className="block mx-auto mb-8 w-fit border border-primary bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">
          Features
        </p>
        <h1 className=" text-6xl  text-primary font-extrabold ">
          Everything you need to split Expenses
        </h1>
        <p className="text-center text-sm w-[50vw]">
          Our platform Provides all the tools you need to handle shared expenses
          with ease
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  justify-items-center mt-10 w-full md:w-[70%] md:mx-auto pb-6 px-2">
        {features.map((feature, index) => {
          const Iconn = feature.icon;
          return (
            <Card
              className="w-full max-w-xs h-[320px] hover:scale-105 duration-200 hover:shadow-2xl hover:shadow-green-600 flex flex-col items-center justify-between"
              key={index}
            >
              <CardHeader className="mt-6 flex flex-col items-center">
                <CardTitle className="bg-input rounded-full w-14 text-primary  h-14 flex items-center justify-center ">
                  <Iconn className="text-4xl " />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-inpbg-input dark:text-green-900 text-center">
                  {feature.title}
                </p>
              </CardContent>
              <CardFooter className="mb-10 w-[90%]">
                <p className="text-center dark:brightness-75 font-extralight text-sm">
                  {feature.description}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureSection;
