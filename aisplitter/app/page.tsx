"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "@/components/Landing/HeroSection";
import FeatureSection from "@/components/Landing/FeatureSection";
import WorkSection from "@/components/Landing/WorkSection";
import TestimonialSection from "@/components/Landing/Testinomial";
import { useUser } from "@clerk/nextjs";
import { saveUser } from "@/action/saveUser";

const Page = () => {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      saveUser().then((res) => {
        if (res) console.log("✅ User saved in DB ", res);
      });
    }
  }, [isSignedIn]);

  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <WorkSection />
      <TestimonialSection />
    </div>
  );
};

export default Page;
