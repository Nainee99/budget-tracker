"use server";

import { UpdateUserCurrencySchema } from "@/schema/userSettingsSchema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma"; // Ensure this is properly imported

export async function UpdateUserCurrency(currency: string) {
  const parsedBody = UpdateUserCurrencySchema.safeParse({ currency });

  if (!parsedBody.success) {
    console.error("Currency validation failed:", parsedBody.error.errors);
    throw new Error(parsedBody.error.errors[0].message);
  }

  const user = await currentUser();
  if (!user) {
    console.error("User not authenticated.");
    throw new Error("User not authenticated. Please sign in.");
    redirect("/sign-in");
  }

  try {
    const userSettings = await prisma.userSetting.update({
      where: {
        userId: user.id,
      },
      data: {
        currency: currency,
      },
    });

    return userSettings;
  } catch (error) {
    console.error("Error updating user settings:", error);
    throw new Error("Failed to update user settings.");
  }
}
