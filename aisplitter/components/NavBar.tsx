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

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex gap-4">
        <Button variant="outline" className="border-accent-foreground">
          SignIn
        </Button>
        <Button variant="outline" className="border-accent-foreground">
          SignUp
        </Button>
        <ModeToggle />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden flex items-center">
        <ModeToggle />

        <Sheet>
          <SheetTrigger>
            <Button variant="ghost">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col items-center gap-4 mt-6">
              <h1 className="hover:text-green-600 cursor-pointer">
                Get Started
              </h1>
              <h1 className="hover:text-green-600 cursor-pointer">
                How It Works?
              </h1>
              <div className="flex  gap-4 mt-6">
                <Button variant="outline" className="border-accent-foreground">
                  SignIn
                </Button>
                <Button variant="outline" className="border-accent-foreground">
                  SignUp
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavBar;
