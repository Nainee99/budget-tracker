import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation"; 
 import { revalidatePath } from "next/cache"; 
 
export async function GET(request: Request) {
  // Step 1: Authenticate the user
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    // Step 2: Fetch or create user settings
    const userSettings =
      (await prisma.userSetting.findUnique({
        where: { userId: user.id },
      })) ??
      (await prisma.userSetting.create({
        data: {
          userId: user.id,
          currency: "USD",
        },
      }));

    // Step 3: Optionally revalidate ISR cache for the homepage (if needed)
    revalidatePath("/");

    // Step 4: Return user settings
    return new Response(JSON.stringify(userSettings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching or creating user settings:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
