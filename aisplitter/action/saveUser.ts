// app/actions/saveUser.ts
"use server";

import { auth } from "@clerk/nextjs/server";   
import { fetchClerkUserData } from "@/lib/fetchclerk";
import { prisma } from "@/lib/prisma";


export const saveUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized"); // Ensure user is authenticated
  }
 
  const userData = await fetchClerkUserData(userId);
 
  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userData.id },
  });

  if (!existingUser) { 
    const newUser = await prisma.user.create({
      data: {
        clerkId: userData.id,
        email: userData.email_addresses[0].email_address,  
        firstName: userData.first_name,
        lastName: userData.last_name,
        imageUrl: userData.image_url,
      },
    });
    return newUser;
  }

return {  message: "Welcome Back "+ existingUser.firstName }; 
};
