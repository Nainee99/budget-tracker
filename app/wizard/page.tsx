import { CurrencyComboBox } from "@/components/custom/CurrencyComboBox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-8 sm:py-16 lg:px-8">
      {/* Welcome Section */}
      <div className="text-center w-full mb-8">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Welcome, <span className="text-primary">{user.firstName}!</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Let’s get started by setting up your preferred currency. 💸
        </p>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          You can always update this later in your settings. ⚙️
        </p>
      </div>

      {/* Currency Selection Section */}
      <Card className="w-full max-w-2xl shadow-xl rounded-lg p-6 mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold sm:text-3xl">
            Choose Your Currency 💰
          </CardTitle>
          <CardDescription className="mt-2 text-base sm:text-lg">
            We support over 100 currencies. Select the one you use most often.
            🌍
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CurrencyComboBox />
        </CardContent>
      </Card>

      {/* Button Section */}
      <div className="w-full flex justify-center">
        <Button
          className="w-80 py-3 text-lg font-medium sm:text-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          asChild
        >
          <Link href={"/"}>I’m done!</Link>
        </Button>
      </div>
    </div>
  );
}

export default page;
