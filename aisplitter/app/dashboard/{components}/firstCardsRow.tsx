import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardRowItem = {
  title: string;
  amount: number | string;
  desc: string;
  textColor?: string;
};

interface FirstCardsRowProps {
  cardrow1: CardRowItem[];
}

function FirstCardsRow({ cardrow1 }: FirstCardsRowProps) {
  return (
    <div>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 w-full">
        {cardrow1.map((item: CardRowItem, index: number) => (
          <Card key={index} className="shadow-md flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-between">
              <p className={`text-2xl  font-bold ${item.textColor}`}>
                ${item.amount}
              </p>
              <p className="text-gray-500">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FirstCardsRow;
