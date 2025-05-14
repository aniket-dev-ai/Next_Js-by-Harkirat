import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(); // 👈 this is correct now!

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // match all routes
};
