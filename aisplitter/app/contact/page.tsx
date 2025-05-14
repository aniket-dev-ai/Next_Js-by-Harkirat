import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircleIcon, User, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-12 justify-between gap-4">
        <h1 className="text-7xl md:text-5xl text-primary font-black tracking-tight">
          CONTACTS
        </h1>
        <Link href="/addexpense">
          <Button className="flex gap-2 items-center w-full md:w-auto">
            <PlusCircleIcon />
            <span>Add Expense</span>
          </Button>
        </Link>
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
                <Link href={`/contact/person`}>
                  <CardContent className="flex items-center p-4">
                    <Avatar className="mr-4  ">
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
                <Link href={`/contact/group`}>
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
    </div>
  );
}
