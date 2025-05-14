"use client";

import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl z-50">
      {/* Logo */}
      <div className="text-xl font-bold text-primary">Ai Expense Splitter</div>

      {/* Desktop Nav */}
      <div className="hidden md:flex ml-16 gap-6">
        <h1 className="hover:text-green-600 cursor-pointer transition">
          Get Started
        </h1>
        <h1 className="hover:text-green-600 cursor-pointer transition">
          How It Works?
        </h1>
      </div>

      {/* Desktop Auth + Mode */}
      <div className="hidden md:flex gap-4 items-center">
        <Button variant="outline">SignIn</Button>
        <Button variant="outline">SignUp</Button>
        <ModeToggle />
      </div>

      {/* Mobile - Sidebar */}
      <div className="md:hidden flex items-center gap-2">
        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-6 mt-10 text-center">
              <h1 className="hover:text-green-600 cursor-pointer">
                Get Started
              </h1>
              <h1 className="hover:text-green-600 cursor-pointer">
                How It Works?
              </h1>
              <Button variant="outline">SignIn</Button>
              <Button variant="outline">SignUp</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavBar;
