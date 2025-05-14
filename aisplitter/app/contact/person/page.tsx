"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, DollarSign, User } from "lucide-react";
import Link from "next/link";

interface Contact {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  balance: number; // Positive if you owe, negative if they owe you
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  paidBy: string; // e.g., "Jack", "You"
  split: {
    userId: string; // Identifier for the user (e.g., "you", "jack")
    amount: number;
  }[];
}

interface Settlement {
  id: string;
  description: string; // e.g., "You paid Jack"
  amount: number;
  date: string;
}

const dummyContact: Contact = {
  id: "jack",
  name: "Jack",
  email: "jack@example.com",
  avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Jack",
  balance: -1038.38,
};

const dummyExpenses: Expense[] = [
  {
    id: "exp1",
    description: "Accommodation",
    amount: 600.0,
    date: "Apr 20, 2025",
    paidBy: "You",
    split: [
      { userId: "you", amount: 200.0 },
      { userId: "jack", amount: 200.0 },
      { userId: "roadside-coder", amount: 200.0 },
    ],
  },
  {
    id: "exp2",
    description: "Gas",
    amount: 150.0,
    date: "Apr 19, 2025",
    paidBy: "Jack",
    split: [
      { userId: "you", amount: 50.0 },
      { userId: "jack", amount: 50.0 },
      { userId: "roadside-coder", amount: 50.0 },
    ],
  },
  {
    id: "exp3",
    description: "Groceries",
    amount: 200.0,
    date: "Apr 19, 2025",
    paidBy: "Roadside Coder",
    split: [
      { userId: "you", amount: 100.0 },
      { userId: "roadside-coder", amount: 50.0 },
      { userId: "jack", amount: 50.0 },
    ],
  },
];

const dummySettlements: Settlement[] = [
  {
    id: "settle1",
    description: "Jack paid you",
    amount: 500.0,
    date: "May 1, 2025",
  },
  {
    id: "settle2",
    description: "Roadside Coder paid you",
    amount: 200.0,
    date: "May 5, 2025",
  },
  {
    id: "settle3",
    description: "You paid Jack",
    amount: 100.0,
    date: "May 8, 2025",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const getUserNameForSplit = (userId: string, contactName: string) => {
  if (userId === "you") return "You";
  if (dummyContact.id === userId) return contactName;
  if (userId === "roadside-coder") return "Roadside Coder";
  return userId;
};

export default function ContactDetailPage() {
  const contact = dummyContact;
  const expenses = dummyExpenses;
  const settlements = dummySettlements;

  const balanceText =
    contact.balance >= 0
      ? `You owe ${contact.name}`
      : `${contact.name} owes you`;

  const balanceColorClass =
    contact.balance >= 0 ? "text-destructive" : "text-primary";
  const displayBalance = Math.abs(contact.balance);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center mb-6 gap-4 sm:gap-6">
        <Link
          href={"/contacts"}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 sm:mr-4 flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center flex-grow min-w-0">
            <Avatar className="mr-3 sm:mr-4 flex-shrink-0">
              <AvatarImage src={contact.avatarUrl} alt={contact.name} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-grow">
              <h1 className="text-xl font-semibold text-foreground truncate">
                {contact.name}
              </h1>
              <p className="text-sm text-muted-foreground truncate">
                {contact.email}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 ml-0 sm:ml-auto w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <DollarSign className="mr-2 h-4 w-4" /> Settle up
          </Button>
          <Link href={"/addexpense"} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <User className="mr-2 h-4 w-4" /> Add expense
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Balance with {contact.name}
          </h3>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="text-muted-foreground text-center sm:text-left">
              {balanceText}
            </p>
            <p
              className={`text-2xl font-bold ${balanceColorClass} text-center sm:text-right`}
            >
              {formatCurrency(displayBalance)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="expenses">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expenses">
            Expenses ({expenses.length})
          </TabsTrigger>
          <TabsTrigger value="settlements">
            Settlements ({settlements.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="expenses" className="mt-4">
          <div className="space-y-4">
            {expenses.map((expense) => (
              <Card key={expense.id}>
                <CardContent className="p-4 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {expense.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {expense.date}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">{expense.paidBy}</span> paid
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
                    <p className="font-bold text-foreground text-lg sm:text-xl">
                      {formatCurrency(expense.amount)}
                    </p>
                    <div className="flex flex-wrap gap-x-3 text-sm text-muted-foreground mt-1">
                      {expense.split.map((splitItem, index) => (
                        <span key={index} className="whitespace-nowrap">
                          {getUserNameForSplit(splitItem.userId, contact.name)}{" "}
                          {splitItem.amount > 0 && splitItem.userId === "you"
                            ? "share"
                            : ""}{" "}
                          {splitItem.amount > 0 && splitItem.userId !== "you"
                            ? "share"
                            : ""}
                          : {formatCurrency(splitItem.amount)}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {expenses.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">
              No expenses yet with {contact.name}.
            </p>
          )}
        </TabsContent>
        <TabsContent value="settlements" className="mt-4">
          <div className="space-y-4">
            {settlements.map((settlement) => (
              <Card key={settlement.id}>
                <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {settlement.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {settlement.date}
                    </p>
                  </div>
                  <p className="font-bold text-foreground text-lg sm:text-xl flex-shrink-0">
                    {formatCurrency(settlement.amount)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          {settlements.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">
              No settlements yet with {contact.name}.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
