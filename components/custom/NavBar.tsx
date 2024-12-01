"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Logo from "./Logo";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <header className="shadow-lg border-b">
      <DesktopNavbar />
      <MobileNavbar />
    </header>
  );
};

export default Navbar;

// navbarItems
const NavbarItem = ({ link, label }: { link: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative group">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-white text-lg hover:text-gray-600 transition-all duration-200",
          isActive ? "text-blue-600" : "text-foreground"
        )}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1/2 rounded-full bg-blue-600 group-hover:w-full transition-all duration-300" />
      )}
    </div>
  );
};

// DesktopNavbar
const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

const DesktopNavbar = () => {
  return (
    <div className="hidden md:flex justify-between items-center px-4 py-4 container mx-auto">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <Logo />
        <div className="flex gap-6">
          {items.map((item) => (
            <NavbarItem key={item.label} label={item.label} link={item.link} />
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <ThemeSwitcherBtn />
        <UserButton />
      </div>
    </div>
  );
};

// MobileNavbar
const MobileNavbar = () => {
  return (
    <div className="md:hidden">
      <nav className="flex justify-between items-center p-4">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitcherBtn />
          <UserButton />

          {/* Sheet Trigger is now inside the Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
                <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
                <div className="w-6 h-0.5 bg-gray-800"></div>
              </button>
            </SheetTrigger>

            {/* Mobile Sheet for Navbar Items */}
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 p-4 items-center justify-center">
                {items.map((item) => (
                  <NavbarItem
                    key={item.label}
                    label={item.label}
                    link={item.link}
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};
