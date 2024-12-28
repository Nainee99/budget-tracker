"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Logo from "./Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <header className="shadow-lg border-b bg-background">
      <DesktopNavbar />
      <MobileNavbar />
    </header>
  );
};

export default Navbar;

// NavbarItem Component
const NavbarItem = ({ link, label }: { link: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative group">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-lg hover:text-gray-600 transition-all duration-200",
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

// Navbar Items
const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

// Desktop Navbar
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
        {/* Replace with your ThemeSwitcher and UserButton if needed */}
        <ThemeSwitcherBtn />
        <UserButton />
      </div>
    </div>
  );
};

// Mobile Navbar
const MobileNavbar = () => {
  return (
    <div className="md:hidden">
      <nav className="flex justify-between items-center p-4">
        {/* Logo */}
        <Logo />

        {/* Mobile Menu Trigger */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-end gap-1">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-4 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </button>
            </SheetTrigger>

            {/* Mobile Menu Content */}
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-center">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4 items-center">
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
