import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Individual from "./{components}/Individual";

function page() {
  return (
    <div className="flex flex-col items-center w-full">
      <Card className="mt-10 justify-between items-center p-4">
        <Tabs defaultValue="Individual" className="">
          <TabsList className="flex gap-20  w-auto">
            <TabsTrigger value="Individual">Individual Expense</TabsTrigger>
            <TabsTrigger value="Groupexpense">Group Expense</TabsTrigger>
          </TabsList>
          <TabsContent value="Individual">
            <Individual />
          </TabsContent>
          <TabsContent value="Groupexpense">Change your Group expense here.</TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default page;
