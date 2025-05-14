// This is a React component for displaying contact details,
// including balance, expenses, and settlements, using Shadcn UI.
// It uses dummy data and lucide-react for icons.

import { Button } from "@/components/ui/button"; // Shadcn UI Button
import { Card, CardContent } from "@/components/ui/card"; // Shadcn UI Card components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Shadcn UI Avatar components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Shadcn UI Tabs components
import { ArrowLeft, User, DollarSign } from "lucide-react"; // Icons from lucide-react
import Link from "next/link";

// Define interfaces for dummy data
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

// Dummy data
const contact = {
  id: "jack",
  name: "Jack",
  email: "plyush@gmail.com",
  avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Jack",
  balance: 187.35, // Positive means they owe you, negative means you owe them
};

const dummyExpenses: Expense[] = [
  {
    id: "exp1",
    description: "iphone",
    amount: 1000.0,
    date: "Apr 21, 2025",
    paidBy: "Jack",
    split: [
      { userId: "you", amount: 500.0 },
      { userId: "jack", amount: 500.0 },
    ],
  },
  {
    id: "exp2",
    description: "mars tickets",
    amount: 300.0,
    date: "Apr 14, 2025",
    paidBy: "Jack",
    split: [
      { userId: "you", amount: 150.0 },
      { userId: "jack", amount: 150.0 },
    ],
  },
  // Add more dummy expenses
];

const dummySettlements: Settlement[] = [
  {
    id: "settle1",
    description: "You paid Jack",
    amount: 187.35,
    date: "May 10, 2025",
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

// React component for the Contact Detail View page
export default function ContactDetailPage() {
  // Determine the balance text and color
  const balanceText =
    contact.balance >= 0
      ? `You owe ${contact.name}`
      : `${contact.name} owes you`;
  const balanceColor = contact.balance >= 0 ? "text-red-600" : "text-green-600";
  const displayBalance = Math.abs(contact.balance); // Display absolute value

  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="mr-4">
          <AvatarImage src={contact.avatarUrl} alt={contact.name} />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold">{contact.name}</h1>
          <p className="text-sm text-gray-500">{contact.email}</p>
        </div>
        <div className="ml-auto flex space-x-2">
          <Button variant="outline">
            <DollarSign className="mr-2 h-4 w-4" /> Settle up
          </Button>
          <Link href={"/addexpense"}>
            <Button>
              <User className="mr-2 h-4 w-4" /> Add expense
            </Button>
          </Link>
        </div>
      </div>

      {/* Balance Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Balance</h3>
          <div className="flex justify-between items-center">
            <p>{balanceText}</p>
            <p className={`text-xl font-bold ${balanceColor}`}>
              {formatCurrency(displayBalance)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Expenses and Settlements Tabs */}
      <Tabs defaultValue="expenses">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expenses">
            Expenses ({dummyExpenses.length})
          </TabsTrigger>
          <TabsTrigger value="settlements">
            Settlements ({dummySettlements.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="expenses" className="mt-4">
          <div className="space-y-4">
            {dummyExpenses.map((expense) => (
              <Card key={expense.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-gray-500">{expense.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(expense.amount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {expense.paidBy} paid
                      </p>
                    </div>
                    {/* Optional: Add a delete button */}
                    {/* <Button variant="ghost" size="icon" className="ml-2">
                        <Trash2 className="h-4 w-4" />
                     </Button> */}
                  </div>
                  {/* Split details */}
                  <div className="flex space-x-4 text-sm text-gray-600">
                    {expense.split.map((splitItem, index) => (
                      <span key={index}>
                        {splitItem.userId === "you"
                          ? "Y You"
                          : `J ${contact.name.charAt(0)}`}{" "}
                        : {formatCurrency(splitItem.amount)}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="settlements" className="mt-4">
          <div className="space-y-4">
            {dummySettlements.map((settlement) => (
              <Card key={settlement.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{settlement.description}</p>
                      <p className="text-sm text-gray-500">{settlement.date}</p>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(settlement.amount)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
