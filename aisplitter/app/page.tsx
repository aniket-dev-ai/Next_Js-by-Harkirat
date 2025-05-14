import React from 'react'
import HeroSection from '@/components/Landing/HeroSection'
import FeatureSection from '@/components/Landing/FeatureSection'
import WorkSection from '@/components/Landing/WorkSection'
import TestimonialSection from '@/components/Landing/Testinomial'

const page = () => {
  return (
    <div>
      <HeroSection/>
      <FeatureSection/>
      <WorkSection/>
      <TestimonialSection/>
    </div>
  )
}

export default page