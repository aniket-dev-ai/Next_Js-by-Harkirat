import { Button } from "@/components/ui/button";
import { ArrowRightFromLine, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import FirstCardsRow from "./{components}/firstCardsRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const cardrow1 = [
    {
      title: "Total Balance",
      amount: 8000,
      desc: "Total amount in your account",
      textColor: "text-green-500",
    },
    {
      title: "You are owed",
      amount: 900,
      desc: "from 3 people",
      textColor: "text-green-500",
    },
    {
      title: "You owe to",
      amount: 50,
      desc: "to 1 person",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="  px-4 md:px-12 lg:px-32 pt-6 md:pt-10 w-full space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Dashboard
        </h1>
        <Link href="/addexpense">
          <Button className="flex gap-2 items-center w-full md:w-auto">
            <PlusCircleIcon />
            <span>Add Expense</span>
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <FirstCardsRow cardrow1={cardrow1} />

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Expenses Section */}
        <div className="flex-1 w-full space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Total This Month",
                amount: "$200",
                sub: "Total amount spent this month",
              },
              {
                title: "Total This Year",
                amount: "$2000",
                sub: "Total amount spent this year",
              },
            ].map((item, idx) => (
              <Card key={idx} className="w-full">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-2xl font-bold text-green-500">
                    {item.amount}
                  </p>
                  <p className="text-muted-foreground">{item.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Expense Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Expenses Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Owed To</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Rohan</TableCell>
                    <TableCell>2023-03-15</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Group Info */}
        <div className="w-full lg:w-1/3">
          <Card className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle>Your Group</CardTitle>
                <Link href={"/contact"}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-sm flex gap-1"
                  >
                    View All <ArrowRightFromLine size={16} />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Group Name</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Zero Knowledge</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
