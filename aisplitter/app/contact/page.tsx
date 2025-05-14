"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Users, X, PlusCircleIcon } from "lucide-react"; // Keep necessary icons
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react"; // Keep useState hook
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Keep Dialog components
import { Input } from "@/components/ui/input"; // Keep Input
import { Textarea } from "@/components/ui/textarea"; // Keep Textarea
import { Badge } from "@/components/ui/badge"; // Keep Badge for members

// Define interfaces for dummy data
interface Person {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface Group {
  id: string;
  name: string;
  membersCount: number;
}

// Interface for members within the new group dialog state
interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
}

// Dummy data for display
const dummyPeople: Person[] = [
  {
    id: "1",
    name: "Jack",
    email: "plyush@gmail.com",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Jack",
  },
  {
    id: "2",
    name: "Roadside Coder",
    email: "eon55dude@gmail.com",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=RC",
  },
  {
    id: "3",
    name: "Alice Wonderland",
    email: "alice@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Alice",
  },
  {
    id: "4",
    name: "Bob The Builder",
    email: "bob@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Bob",
  },
  {
    id: "5",
    name: "Charlie Chaplin",
    email: "charlie@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Charlie",
  },
];

const dummyGroups: Group[] = [
  { id: "1", name: "Project Alpha", membersCount: 3 },
  { id: "2", name: "Team RC", membersCount: 3 },
  { id: "3", name: "Weekend Trip", membersCount: 3 },
  { id: "4", name: "Coding Ninjas", membersCount: 5 },
  { id: "5", name: "Design Squad", membersCount: 4 },
  { id: "6", name: "Marketing Team", membersCount: 6 },
];

export default function ContactsPage() {
  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false); // State for dialog visibility

  // State for the new group form
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    description: "",
    members: [
      {
        id: "you", // Assuming 'you' is the current user's ID
        name: "Piyush Agarwal (You)", // Replace with actual user name if available
        avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=You",  
      },
    ],
  });

  // Handle input changes for the new group form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewGroupData({ ...newGroupData, [name]: value });
  };

  // Handle adding a dummy member (replace with actual member search/selection logic)
  const handleAddMember = () => { 
    const newMemberId = `dummy-member-${Date.now()}`; // Use a more unique ID
    const newMember = {
      id: newMemberId,
      name: `Dummy Member ${newGroupData.members.length}`,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=DM${newGroupData.members.length}`,
    };
    setNewGroupData({
      ...newGroupData,
      members: [...newGroupData.members, newMember],
    });
  };

  // Handle removing a member from the new group form
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

  // Handle creating the group
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
    });
    setIsCreateGroupDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-12 justify-between gap-4">
        <h1 className="text-4xl md:text-5xl text-primary font-black tracking-tight">
          CONTACTS
        </h1>
        {/* Button to open the create group dialog */}
        <Button onClick={() => setIsCreateGroupDialogOpen(true)}>
          <Users className="mr-2 h-4 w-4" /> Add Group
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <User className="mr-2" />
            People
          </h2>
          <div className="space-y-4">
            {dummyPeople.map((person) => (
              <Card key={person.id}>
                {/* Link to individual person's contact page */}
                <Link href={`/contact/person`}>
                  <CardContent className="flex items-center p-4">
                    <Avatar className="mr-4">
                      <AvatarImage src={person.avatarUrl} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-gray-500">{person.email}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" />
            Groups
          </h2>
          <div className="space-y-4">
            {dummyGroups.map((group) => (
              <Card key={group.id}>
                {/* Link to individual group's page */}
                <Link href={`/contact/group/`}>
                  <CardContent className="flex items-center p-4">
                    <div className="mr-4 text-gray-500">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-gray-500">
                        {group.membersCount} members
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Create Group Dialog */}
      <Dialog
        open={isCreateGroupDialogOpen}
        onOpenChange={setIsCreateGroupDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={newGroupData.name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Group name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={newGroupData.description}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Optional description"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label className="text-right">Members</label>
              <div className="col-span-3 space-y-2">
                {newGroupData.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <Badge className="flex items-center">
                      <Avatar className="w-5 h-5 mr-1">
                        <AvatarImage src={member.avatarUrl} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {member.name}
                      {member.id !== "you" && ( // Don't show remove for 'you'
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member.id)}
                          className="ml-1 p-0.5 rounded-full hover:bg-gray-200"
                          aria-label={`Remove ${member.name}`}
                        >
                          <X size={12} />
                        </button>
                      )}
                    </Badge>
                  </div>
                ))}
                {/* Button to add more members */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddMember}
                >
                  <PlusCircleIcon className="mr-1 h-4 w-4" /> Add Member
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
