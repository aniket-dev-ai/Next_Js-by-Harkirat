"use client";

import { useState } from "react"; // Import useState hook

import { Button } from "@/components/ui/button"; // Shadcn UI Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Shadcn UI Card components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Shadcn UI Avatar components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Shadcn UI Tabs components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Shadcn UI Dialog components
import { Input } from "@/components/ui/input"; // Shadcn UI Input
import { Textarea } from "@/components/ui/textarea"; // Shadcn UI Textarea
import { Badge } from "@/components/ui/badge"; // Shadcn UI Badge for members
import {
  ArrowLeft,
  Users,
  User,
  DollarSign,
  PlusCircle,
  CircleDollarSign,
  X,
} from "lucide-react"; // Icons from lucide-react

// Define interfaces for dummy data
interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: string; // e.g., "Admin"
}

interface Group {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  members: Member[];
}

interface GroupBalance {
  userId: string; // Identifier for the user (e.g., "you", "jack")
  amount: number; // Positive if owed to you, negative if you owe
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

// Dummy data
const group: Group = {
  id: "weekend-trip",
  name: "Weekend Trip",
  description: "Expenses for our weekend getaway",
  membersCount: 3,
  members: [
    {
      id: "you",
      name: "You",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=You",
      role: "Admin",
    },
    {
      id: "roadside-coder",
      name: "Roadside Coder",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=RC",
    },
    {
      id: "jack",
      name: "Jack",
      avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Jack",
    },
  ],
};

const dummyGroupBalances: GroupBalance[] = [
  { userId: "you", amount: 486.46 }, // You are owed
  { userId: "jack", amount: -1038.38 }, // Jack owes you
  { userId: "roadside-coder", amount: 551.92 }, // You owe Roadside Coder
];

const dummyExpenses: Expense[] = [
  {
    id: "exp1",
    description: "Accommodation",
    amount: 600.0,
    date: "Apr 20, 2025",
    paidBy: "You",
    split: [
      { userId: "you", amount: 200.0 },
      { userId: "roadside-coder", amount: 200.0 },
      { userId: "jack", amount: 200.0 },
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
      { userId: "roadside-coder", amount: 50.0 },
      { userId: "jack", amount: 50.0 },
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

// Helper function to find member name by ID
const getMemberName = (userId: string, members: Member[]) => {
  const member = members.find((m) => m.id === userId);
  return member ? member.name : userId;
};

// React component for the Group Detail View page
export default function GroupDetailPage() {
  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false); // State for dialog visibility

  // Dummy state for the new group form (for demonstration)
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    members: [
      {
        id: "you",
        name: "Piyush Agarwal (You)",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=You",
      }, // Current user is automatically a member
      {
        id: "roadside-coder",
        name: "Roadside Coder",
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=RC",
      }, // Dummy initial member
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewGroupData({ ...newGroupData, [name]: value });
  };

  const handleAddMember = () => {
    // In a real application, this would open a dialog/search for members
    // For dummy data, we'll just add a placeholder member
    const newMemberId = `dummy-member-${newGroupData.members.length + 1}`;
    const newMember = {
      id: newMemberId,
      name: `Dummy Member ${newGroupData.members.length + 1}`,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=DM${
        newGroupData.members.length + 1
      }`,
    };
    setNewGroupData({
      ...newGroupData,
      members: [...newGroupData.members, newMember],
    });
  };

  const handleRemoveMember = (memberId: string) => {
    // Prevent removing the current user ('you')
    if (memberId === "you") {
      return;
    }
    setNewGroupData({
      ...newGroupData,
      members: newGroupData.members.filter((member) => member.id !== memberId),
    });
  };

  const handleCreateGroup = () => {
    // In a real application, you would send newGroupData to your backend
    console.log("Creating group with data:", newGroupData);
    // Reset form and close dialog
    setNewGroupData({
      name: "",
      description: "",
      members: [
        {
          id: "you",
          name: "Piyush Agarwal (You)",
          avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=You",
        },
      ],
    }); // Reset with only current user
    setIsCreateGroupDialogOpen(false);
  };

  const yourBalance =
    dummyGroupBalances.find((b) => b.userId === "you")?.amount || 0;
  const owedToYou = dummyGroupBalances.filter((b) => b.amount < 0); // Negative amount means they owe you
  const youOwe = dummyGroupBalances.filter(
    (b) => b.amount > 0 && b.userId !== "you"
  ); // Positive amount (excluding your own) means you owe them

  return (
    <div className="container mx-auto py-8">
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="mr-4 text-gray-500">
          <Users size={40} /> {/* Group icon */}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{group.name}</h1>
          <p className="text-sm text-gray-500">{group.description}</p>
          <p className="text-sm text-gray-500">{group.membersCount} members</p>
        </div>
        <div className="ml-auto flex space-x-2">
          <Button variant="outline">
            <DollarSign className="mr-2 h-4 w-4" /> Settle up
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add expense
          </Button>
          {/* Button to open the Create New Group Dialog */}
          
        </div>
      </div>

      {/* Balances and Members Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Group Balances Card */}
        <Card>
          <CardHeader>
            <CardTitle>Group Balances</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {/* Your Balance */}
            <div>
              <p className="text-lg font-semibold">Your balance</p>
              <p
                className={`text-xl font-bold ${
                  yourBalance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {yourBalance >= 0 ? "+" : ""}
                {formatCurrency(yourBalance)}
              </p>
              <p className="text-sm text-gray-500">
                {yourBalance >= 0 ? "You are owed money" : "You owe money"}
              </p>
            </div>

            {/* Owed to you */}
            {owedToYou.length > 0 && (
              <div>
                <p className="font-medium flex items-center">
                  <CircleDollarSign className="mr-1 h-4 w-4 text-green-600" />{" "}
                  Owed to you
                </p>
                {owedToYou.map((balance) => (
                  <div
                    key={balance.userId}
                    className="flex justify-between items-center text-sm text-gray-700 pl-2"
                  >
                    <p>{getMemberName(balance.userId, group.members)}</p>
                    <p className="text-green-600">
                      {formatCurrency(Math.abs(balance.amount))}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* You owe */}
            {youOwe.length > 0 && (
              <div>
                <p className="font-medium flex items-center">
                  <CircleDollarSign className="mr-1 h-4 w-4 text-red-600" /> You
                  owe
                </p>
                {youOwe.map((balance) => (
                  <div
                    key={balance.userId}
                    className="flex justify-between items-center text-sm text-gray-700 pl-2"
                  >
                    <p>{getMemberName(balance.userId, group.members)}</p>
                    <p className="text-red-600">
                      {formatCurrency(Math.abs(balance.amount))}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Members Card */}
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {group.members.map((member) => (
              <div key={member.id} className="flex items-center">
                <Avatar className="mr-3 h-8 w-8">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  {member.role && (
                    <p className="text-xs text-gray-500">{member.role}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

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
                  <div className="flex flex-wrap space-x-4 text-sm text-gray-600 mt-2">
                    {expense.split.map((splitItem, index) => (
                      <span key={index} className="min-w-[120px]">
                        {" "}
                        {/* Added min-width for better wrapping */}
                        {getMemberName(splitItem.userId, group.members)}:{" "}
                        {formatCurrency(splitItem.amount)}
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

      {/* Create New Group Dialog */}
      <Dialog
        open={isCreateGroupDialogOpen}
        onOpenChange={setIsCreateGroupDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsCreateGroupDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Group Name Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Group Name
              </label>
              <Input
                id="name"
                name="name"
                value={newGroupData.name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Test Group"
              />
            </div>
            {/* Description Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description (Optional)
              </label>
              <Textarea
                id="description"
                name="description"
                value={newGroupData.description}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Expenses for our weekend getaway"
              />
            </div>
            {/* Members Section */}
            <div className="grid grid-cols-4 items-start gap-4">
              <label className="text-right">Members</label>
              <div className="col-span-3 space-y-2">
                {/* Display selected members */}
                <div className="flex flex-wrap gap-2">
                  {newGroupData.members.map((member) => (
                    <Badge
                      key={member.id}
                      variant="secondary"
                      className="flex items-center"
                    >
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {member.name}
                      {member.id !== "you" && ( // Prevent removing the current user
                        <X
                          className="ml-1 h-3 w-3 cursor-pointer"
                          onClick={() => handleRemoveMember(member.id)}
                        />
                      )}
                    </Badge>
                  ))}
                </div>
                {/* Button to add member */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddMember}
                >
                  <User className="mr-2 h-4 w-4" /> Add member
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateGroupDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateGroup}>Create Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
