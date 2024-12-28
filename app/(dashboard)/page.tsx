import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { PlusCircle, MinusCircle } from "lucide-react";
import CreateTransactionDialog from "./_components/createTransactionDialog";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSetting.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card py-6 px-4 sm:px-8">
        <div className="container flex flex-col gap-6 items-start justify-between sm:flex-row sm:items-center sm:gap-3">
          <p className="text-3xl font-bold">
            🌟 Welcome,{" "}
            <span className="text-emerald-600">{user.firstName}!</span>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto">
            <CreateTransactionDialog
              trigger={
                <Button
                  variant="outline"
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white flex items-center gap-2 w-full sm:w-auto"
                >
                  <PlusCircle className="w-5 h-5" />
                  New Income
                </Button>
              }
              type="income"
            />
            <CreateTransactionDialog
              trigger={
                <Button
                  variant="outline"
                  className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white flex items-center gap-2 w-full sm:w-auto"
                >
                  <MinusCircle className="w-5 h-5" />
                  New Expense
                </Button>
              }
              type="expense"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
