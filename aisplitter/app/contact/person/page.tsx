"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, DollarSign, User } from "lucide-react";
import Link from "next/link";

// Define interfaces for dummy data (assuming these are passed as props or fetched)
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

// Dummy data (Replace with actual data fetching/props in a real app)
const dummyContact: Contact = {
  id: "jack",
  name: "Jack",
  email: "jack@example.com",
  avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Jack",
  balance: -1038.38, // Example: Jack owes you $1038.38 (Use text-primary)
  // balance: 486.46, // Example: You owe Jack $486.46 (Use text-destructive)
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
      { userId: "roadside-coder", amount: 200.0 }, // Added another user for realistic split
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
  // Add more dummy expenses
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
  // Add more dummy settlements
];

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Helper function to get user name for split details (simplified for dummy data)
const getUserNameForSplit = (userId: string, contactName: string) => {
  // In a real app, you would fetch member names based on IDs
  if (userId === "you") return "You";
  // Assuming 'jack' is the contact ID, adjust if necessary
  if (dummyContact.id === userId) return contactName;
  // Add other dummy users if needed or handle unknown IDs
  if (userId === "roadside-coder") return "Roadside Coder";
  return userId; // Fallback to ID if name not found
};

export default function ContactDetailPage() {
  // In a real app, contact, dummyExpenses, dummySettlements would likely be fetched or passed as props based on the contact ID from the URL.
  const contact = dummyContact; // Using dummy data for demonstration
  const expenses = dummyExpenses; // Using dummy data for demonstration
  const settlements = dummySettlements; // Using dummy data for demonstration

  // Determine the balance text and color using available Shadcn CSS variables
  // If balance is >= 0, YOU OWE the contact (bad balance, use destructive color)
  // If balance is < 0, the CONTACT OWES YOU (use primary color as a positive indicator)
  const balanceText =
    contact.balance >= 0
      ? `You owe ${contact.name}`
      : `${contact.name} owes you`;

  // Use text-destructive for amounts you owe (>= 0)
  // Use text-primary for amounts they owe you (< 0) as a positive/main color
  const balanceColorClass =
    contact.balance >= 0 ? "text-destructive" : "text-primary";
  const displayBalance = Math.abs(contact.balance); // Display absolute value

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Header Section - Responsiveness and theme colors */}
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
          {/* Contact Info */}
          <div className="flex items-center flex-grow min-w-0">
            <Avatar className="mr-3 sm:mr-4 flex-shrink-0">
              <AvatarImage src={contact.avatarUrl} alt={contact.name} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-grow">
              {/* Use text-foreground for main name */}
              <h1 className="text-xl font-semibold text-foreground truncate">
                {contact.name}
              </h1>
              {/* Use text-muted-foreground for secondary info */}
              <p className="text-sm text-muted-foreground truncate">
                {contact.email}
              </p>
            </div>
          </div>
        </Link>
        {/* Action Buttons - Stack on small, row on medium */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 ml-0 sm:ml-auto w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <DollarSign className="mr-2 h-4 w-4" /> Settle up
          </Button>
          <Link href={"/add-expense"} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <User className="mr-2 h-4 w-4" /> Add expense
            </Button>
          </Link>
        </div>
      </div>

      {/* Balance Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          {/* Use text-foreground for headings */}
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Balance with {contact.name}
          </h3>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            {/* Use text-muted-foreground for descriptive text */}
            <p className="text-muted-foreground text-center sm:text-left">
              {balanceText}
            </p>
            {/* Apply the dynamic color class based on AVAILABLE variables */}
            <p
              className={`text-2xl font-bold ${balanceColorClass} text-center sm:text-right`}
            >
              {formatCurrency(displayBalance)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Expenses and Settlements Tabs */}
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
                  {/* Expense Details */}
                  <div className="flex-grow min-w-0">
                    {/* Use text-foreground for description */}
                    <p className="font-medium text-foreground truncate">
                      {expense.description}
                    </p>
                    {/* Use text-muted-foreground for date and paidBy */}
                    <p className="text-sm text-muted-foreground">
                      {expense.date}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">{expense.paidBy}</span> paid
                    </p>
                  </div>
                  {/* Split and Amount */}
                  <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
                    {/* Use text-foreground for the total amount */}
                    <p className="font-bold text-foreground text-lg sm:text-xl">
                      {formatCurrency(expense.amount)}
                    </p>
                    {/* Split details - Use text-muted-foreground */}
                    <div className="flex flex-wrap gap-x-3 text-sm text-muted-foreground mt-1">
                      {expense.split.map((splitItem, index) => (
                        <span key={index} className="whitespace-nowrap">
                          {getUserNameForSplit(splitItem.userId, contact.name)}{" "}
                          {/* Logic to show 'owes'/'owe' relative to the current user 'You' */}
                          {/* Amount in split is how much that user is responsible for */}
                          {splitItem.amount > 0 && splitItem.userId === "you"
                            ? "share"
                            : ""}{" "}
                          {/* You share the expense */}
                          {splitItem.amount > 0 && splitItem.userId !== "you"
                            ? "share"
                            : ""}{" "}
                          {/* They share the expense */}:{" "}
                          {formatCurrency(splitItem.amount)}
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
                {/* Settlement Card Content */}
                <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                  {/* Settlement Details */}
                  <div className="flex-grow min-w-0">
                    {/* Use text-foreground for description */}
                    <p className="font-medium text-foreground truncate">
                      {settlement.description}
                    </p>
                    {/* Use text-muted-foreground for date */}
                    <p className="text-sm text-muted-foreground">
                      {settlement.date}
                    </p>
                  </div>
                  {/* Settlement Amount - Use text-foreground */}
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
