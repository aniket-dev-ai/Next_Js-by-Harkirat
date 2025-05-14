// lib/clerkApi.ts
export const fetchClerkUserData = async (userId: string) => {
    const res = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`, // Clerk Secret Key from .env
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch user data from Clerk");
    }
  
    return await res.json(); // Returning Clerk user data
  };
  