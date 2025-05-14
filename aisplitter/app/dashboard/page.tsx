"use client";

import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { user, isLoaded } = useUser(); 
  if (!isLoaded) return <div>Loading...</div>;

  return <div className="mt-20">👋 Welcome, {user?.fullName}</div>;
};

export default Dashboard;
