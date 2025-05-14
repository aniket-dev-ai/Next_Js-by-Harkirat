"use client";

import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 border-b bg-background/80 backdrop-blur-md z-50 fixed top-0 left-0 right-0">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-primary">
        Ai Expense Splitter
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex  gap-6">
        <h1 className="hover:text-green-600 cursor-pointer transition">
          Get Started
        </h1>
        <h1 className="hover:text-green-600 cursor-pointer transition">
          How It Works?
        </h1>
      </div>

      {/* Desktop Auth + Mode */}
      <div className="hidden md:flex gap-4 items-center">
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="default">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Link href="/dashboard">
            <Button className="justify-start rounded-lg hover:bg-green-200 dark:hover:bg-green-900/60 transition ">
              <span>DashBoard</span>
            </Button>
          </Link>
        </SignedIn>
        <ModeToggle />
      </div>

      {/* Mobile - Sidebar */}
      <div className="md:hidden flex items-center gap-2">
        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col items-center gap-8 mt-12">
              <div className="text-2xl font-bold text-primary mb-4">
                Ai Expense Splitter
              </div>
              <div className="flex flex-col gap-2 px-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg rounded-lg hover:bg-green-200 dark:hover:bg-green-900/60 transition font-medium"
                >
                  <span className="ml-2">Get Started</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-lg rounded-lg hover:bg-green-200 dark:hover:bg-green-900/60 transition font-medium"
                >
                  <span className="ml-2">How It Works?</span>
                </Button>
              </div>
              <div className="flex flex-col gap-3 w-full mt-6">
                <SignedOut>
                  <SignInButton>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button variant="default" className="w-full">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex flex-col items-center gap-2 justify-center">
                    <UserButton afterSignOutUrl="/" />
                    <Link href="/dashboard">
                      <Button className="">DashBoard</Button>
                    </Link>
                  </div>
                </SignedIn>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavBar;
