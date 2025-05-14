"use client";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Calendar } from "@/components/ui/calendar";
// DropdownMenu components are no longer needed for these specific fields if fully replaced by Drawer
// import {
// DropdownMenu,
// DropdownMenuContent,
// DropdownMenuItem,
// DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { toast } from "sonner";
// import { toast } from "sonner";

const participants = [
  { id: "1", name: "Piyush Agarwal", avatar: "🧑🏻" },
  { id: "2", name: "Roadside Coder", avatar: "🚀" },
  { id: "3", name: "Jack", avatar: "👤" },
  // Add more participants for testing scroll
  { id: "4", name: "Alice", avatar: "👩🏼" },
  { id: "5", name: "Bob", avatar: "👨🏻‍🦰" },
  { id: "6", name: "Carol", avatar: "👩🏻‍🦳" },
  { id: "7", name: "David", avatar: "👨🏽‍💻" },
];
const categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Health",
  "Education",
  "Travel",
  "Other",
];
const groups = [
  "Weekend Trip (3 members)",
  "Family Vacation",
  "Office Lunch",
  "Project Alpha",
  "Monthly Bills",
  "Apartment Mates",
];

type SplitType = "Equal" | "Percentage" | "Exact";

export default function IndividualExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [selectedPayer, setSelectedPayer] = useState(participants[0].name);
  const [splitType, setSplitType] = useState<SplitType>("Equal");

  const initialPercentages = useMemo(
    () =>
      participants.length > 0
        ? Array(participants.length).fill(100 / participants.length)
        : [],
    [participants.length]
  );
  const [percentages, setPercentages] = useState<number[]>(initialPercentages);

  const initialExactAmounts = useMemo(
    () => Array(participants.length).fill(0),
    [participants.length]
  );
  const [exactAmounts, setExactAmounts] =
    useState<number[]>(initialExactAmounts);

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    resetSplits(newAmount);
  };

  const resetSplits = useCallback(
    (currentAmount: number) => {
      const numParticipants = participants.length;
      if (numParticipants > 0) {
        const equalPercentage = 100 / numParticipants;
        setPercentages(Array(numParticipants).fill(equalPercentage));

        const equalAmount =
          currentAmount > 0 ? currentAmount / numParticipants : 0;
        setExactAmounts(Array(numParticipants).fill(equalAmount));
      } else {
        setPercentages([]);
        setExactAmounts([]);
      }
    },
    [participants.length]
  );

  const handlePercentageChange = (index: number, value: number) => {
    const updatedPercentages = [...percentages];
    updatedPercentages[index] = value;
    setPercentages(updatedPercentages);
  };

  const handleExactAmountChange = (index: number, value: number) => {
    const updatedExactAmounts = [...exactAmounts];
    updatedExactAmounts[index] = value;
    setExactAmounts(updatedExactAmounts);
  };

  const totalPercentage = useMemo(
    () => percentages.reduce((acc, p) => acc + p, 0),
    [percentages]
  );

  const totalExactAmount = useMemo(
    () => exactAmounts.reduce((acc, val) => acc + val, 0),
    [exactAmounts]
  );

  const isPercentageSplitValid = useMemo(
    () => Math.abs(totalPercentage - 100) < 0.01,
    [totalPercentage]
  );

  const isExactSplitValid = useMemo(
    () => Math.abs(totalExactAmount - amount) < 0.01,
    [totalExactAmount, amount]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Expense Created Successfully!");
  };

  // Helper to find participant for avatar display
  const getPayerAvatar = () => {
    return participants.find((p) => p.name === selectedPayer)?.avatar || "👤";
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
          Create New Expense
        </h1>

        {/* Description & Amount (Keep as is) */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description
          </Label>
          <Input
            id="description"
            placeholder="e.g., Dinner with friends"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-5 text-md"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium">
            Amount ($)
          </Label>
          <Input
            id="amount"
            type="number"
            min={0.01}
            step={0.01}
            value={amount === 0 ? "" : amount}
            onChange={(e) => handleAmountChange(Number(e.target.value))}
            placeholder="0.00"
            className="py-5 text-md"
            required
          />
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category with Drawer */}
          <div className="space-y-2">
            <Label htmlFor="category-trigger" className="text-sm font-medium">
              Category
            </Label>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  id="category-trigger"
                  variant="outline"
                  className="w-full justify-between py-6 text-md"
                >
                  {selectedCategory || "Select Category"}
                  <span className="ml-2 text-gray-500 text-xs">▼</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-w-md mx-auto">
                <DrawerHeader className="text-center">
                  <DrawerTitle className="text-primary text-2xl mb-2">
                    Select Category
                  </DrawerTitle>
                </DrawerHeader>
                <ScrollArea className="h-72 p-4">
                  {" "}
                  {/* ScrollArea for long lists */}
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <DrawerClose asChild key={cat}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-md p-3 ${
                            selectedCategory === cat
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }`}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </Button>
                      </DrawerClose>
                    ))}
                  </div>
                </ScrollArea>
                <DrawerFooter className="flex items-center justify-center mt-2">
                  <DrawerClose asChild>
                    <Button variant="outline" className="px-6 py-2 rounded-lg">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Date with Drawer (Existing) */}
          <div className="space-y-2">
            <Label htmlFor="date-trigger" className="text-sm font-medium">
              Date
            </Label>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  id="date-trigger"
                  variant="outline"
                  className="w-full flex items-center justify-between py-6 text-md"
                >
                  <span>
                    {selectedDate
                      ? selectedDate.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Pick a date"}
                  </span>
                  <span className="ml-2 text-xl">📅</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-w-md mx-auto">
                <DrawerHeader className="text-center">
                  <DrawerTitle className="text-primary text-2xl mb-2">
                    Select Expense Date
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerDescription className="flex justify-center p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="rounded-xl shadow-lg border"
                  />
                </DrawerDescription>
                <DrawerFooter className="flex items-center justify-center mt-2">
                  <DrawerClose asChild>
                    <Button className="bg-primary px-6 py-2 rounded-lg text-white">
                      Done
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Group & Paid By */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group with Drawer */}
          <div className="space-y-2">
            <Label htmlFor="group-trigger" className="text-sm font-medium">
              Group
            </Label>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  id="group-trigger"
                  variant="outline"
                  className="w-full justify-between py-6 text-md truncate"
                >
                  {selectedGroup || "Select Group"}
                  <span className="ml-2 text-gray-500 text-xs">▼</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-w-md mx-auto">
                <DrawerHeader className="text-center">
                  <DrawerTitle className="text-primary text-2xl mb-2">
                    Select Group
                  </DrawerTitle>
                </DrawerHeader>
                <ScrollArea className="h-72 p-4">
                  <div className="space-y-2">
                    {groups.map((grp) => (
                      <DrawerClose asChild key={grp}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-md p-3 ${
                            selectedGroup === grp
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }`}
                          onClick={() => setSelectedGroup(grp)}
                        >
                          {grp}
                        </Button>
                      </DrawerClose>
                    ))}
                  </div>
                </ScrollArea>
                <DrawerFooter className="flex items-center justify-center mt-2">
                  <DrawerClose asChild>
                    <Button variant="outline" className="px-6 py-2 rounded-lg">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Paid By with Drawer */}
          <div className="space-y-2">
            <Label htmlFor="payer-trigger" className="text-sm font-medium">
              Paid By
            </Label>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  id="payer-trigger"
                  variant="outline"
                  className="w-full justify-between py-6 text-md flex items-center"
                >
                  <span className="flex items-center">
                    <span className="mr-2 text-xl">{getPayerAvatar()}</span>
                    {selectedPayer || "Select Payer"}
                  </span>
                  <span className="ml-2 text-gray-500 text-xs">▼</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-w-md mx-auto">
                <DrawerHeader className="text-center">
                  <DrawerTitle className="text-primary text-2xl mb-2">
                    Select Payer
                  </DrawerTitle>
                </DrawerHeader>
                <ScrollArea className="h-72 p-4">
                  <div className="space-y-2">
                    {participants.map((p) => (
                      <DrawerClose asChild key={p.id}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-md p-3 flex items-center ${
                            selectedPayer === p.name
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }`}
                          onClick={() => setSelectedPayer(p.name)}
                        >
                          <span className="mr-3 text-xl">{p.avatar}</span>
                          {p.name}
                        </Button>
                      </DrawerClose>
                    ))}
                  </div>
                </ScrollArea>
                <DrawerFooter className="flex items-center justify-center mt-2">
                  <DrawerClose asChild>
                    <Button variant="outline" className="px-6 py-2 rounded-lg">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Split Type Tabs (Keep as is from previous optimization) */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Split Type</Label>
          <Tabs
            value={splitType}
            onValueChange={(val) => setSplitType(val as SplitType)}
            className="w-full mt-1"
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="Equal">Equal</TabsTrigger>
              <TabsTrigger value="Percentage">Percentage</TabsTrigger>
              <TabsTrigger value="Exact">Exact Amounts</TabsTrigger>
            </TabsList>

            {/* Equal Split */}
            <TabsContent value="Equal">
              <div className="space-y-4 pt-2">
                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <span className="flex items-center">
                      <span className="mr-3 text-xl">{p.avatar}</span> {p.name}
                    </span>
                    <span className="font-semibold text-green-600">
                      $
                      {(amount > 0 && participants.length > 0
                        ? amount / participants.length
                        : 0
                      ).toFixed(2)}
                      <span className="text-xs text-gray-400 ml-1">
                        (
                        {(participants.length > 0
                          ? 100 / participants.length
                          : 0
                        ).toFixed(1)}
                        %)
                      </span>
                    </span>
                  </div>
                ))}
                {amount <= 0 && participants.length > 0 && (
                  <Alert variant="default" className="mt-4">
                    <AlertDescription>
                      Enter an amount to see the equal split.
                    </AlertDescription>
                  </Alert>
                )}
                {participants.length === 0 && (
                  <Alert variant="default" className="mt-4">
                    <AlertDescription>
                      No participants available for splitting.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            {/* Percentage Split */}
            <TabsContent value="Percentage">
              <div className="space-y-6 pt-2">
                {participants.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="w-32 truncate flex items-center">
                      <span className="mr-2 text-xl">{p.avatar}</span> {p.name}
                    </span>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[percentages[i] || 0]}
                      onValueChange={(val) => handlePercentageChange(i, val[0])}
                      className="flex-1"
                      disabled={amount <= 0 || participants.length === 0}
                    />
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={percentages[i]?.toFixed(1) || "0.0"}
                      onChange={(e) =>
                        handlePercentageChange(i, parseFloat(e.target.value))
                      }
                      className="w-20 py-2 text-sm text-right"
                      disabled={amount <= 0 || participants.length === 0}
                    />
                    <span className="w-24 text-right text-sm font-semibold text-green-600">
                      ${(amount * ((percentages[i] || 0) / 100)).toFixed(2)}
                    </span>
                  </div>
                ))}
                {participants.length > 0 && (
                  <div
                    className={`text-right text-sm mt-3 ${
                      !isPercentageSplitValid && amount > 0
                        ? "text-red-500 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    Total: {totalPercentage.toFixed(1)}%
                    {!isPercentageSplitValid && amount > 0 && (
                      <span className="ml-2">(must be 100%)</span>
                    )}
                  </div>
                )}
                {amount <= 0 && participants.length > 0 && (
                  <Alert variant="default" className="mt-4">
                    <AlertDescription>
                      Please enter an amount to enable percentage split.
                    </AlertDescription>
                  </Alert>
                )}
                {participants.length === 0 && (
                  <Alert variant="default" className="mt-4">
                    <AlertDescription>
                      No participants available for splitting.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            {/* Exact Split */}
            <TabsContent value="Exact">
              <div className="space-y-2 pt-2">
                {participants.length > 0 ? (
                  <>
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-2/5">Participant</TableHead>
                          <TableHead className="w-2/5 text-right">
                            Amount ($)
                          </TableHead>
                          <TableHead className="w-1/5 text-right">%</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {participants.map((p, i) => (
                          <TableRow key={p.id}>
                            <TableCell className="font-medium flex items-center">
                              <span className="mr-3 text-xl">{p.avatar}</span>{" "}
                              {p.name}
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                min={0}
                                step={0.01}
                                value={
                                  exactAmounts[i] === 0 && amount > 0
                                    ? ""
                                    : exactAmounts[i]
                                }
                                placeholder="0.00"
                                onChange={(e) =>
                                  handleExactAmountChange(
                                    i,
                                    Number(e.target.value)
                                  )
                                }
                                className="w-28 py-2 text-right"
                                disabled={amount <= 0}
                              />
                            </TableCell>
                            <TableCell className="text-right text-sm text-gray-500">
                              {amount > 0 && exactAmounts[i] > 0
                                ? ((exactAmounts[i] / amount) * 100).toFixed(1)
                                : "0.0"}
                              %
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div
                      className={`text-right text-sm mt-3 ${
                        !isExactSplitValid && amount > 0
                          ? "text-red-500 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      Total: ${totalExactAmount.toFixed(2)}
                      {!isExactSplitValid && amount > 0 && (
                        <span className="ml-2">
                          (must equal ${amount.toFixed(2)})
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <Alert variant="default" className="mt-4">
                    <AlertDescription>
                      No participants available for splitting.
                    </AlertDescription>
                  </Alert>
                )}
                {amount <= 0 && participants.length > 0 && (
                  <Alert variant="default" className="mt-4">
                    <AlertDescription>
                      Please enter an amount to enable exact split.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <Button type="submit" className="text-lg px-8 py-6  rounded-lg ">
            Create Expense
          </Button>
        </div>
      </form>
    </div>
  );
}
