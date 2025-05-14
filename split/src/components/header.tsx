"use client";

import React from "react";
import { ModeToggle } from "./ui/ModeChanger";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useStoreUserEffect } from "@/hook.useStoreuseEffect";
import BarLoader from "react-spinners/BarLoader";

function Header() {
  const {isLoading} = useStoreUserEffect();
  return (
    <header className="flex fixed top-0 w-full backdrop-blur items-center justify-between px-6 py-4  shadow">
      <div className="text-2xl font-bold  ">Header</div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="flex gap-5">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {isLoading && <BarLoader width={100} color="#4A5568" />}
    </header>
  );
}

export default Header;
