

"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

const testimonials= [
  {
    name: "Alice Johnson",
    role: "Product Manager",
    message:
      "This platform has transformed the way our team collaborates. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Bob Smith",
    role: "Software Engineer",
    message:
      "The user experience is fantastic. I was able to get started in minutes.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Carol Lee",
    role: "Designer",
    message:
      "Beautiful interface and seamless workflow. It’s a game changer for our projects.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];
  

const TestimonialsSection = () => {
  return (
    <section className="py-16 flex flex-col items-center justify-center ">
        <div className="max-w-5xl w-full mx-auto px-4">
            <span className="block mx-auto mb-8 w-fit border border-primary bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-4 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm">
                Testimonials
            </span>
            <h1 className="md:text-6xl text-4xl text-primary font-extrabold text-center mb-12 leading-tight">
                What Our Users Say
            </h1>
            <div className="grid gap-8 md:grid-cols-3">
                {testimonials.map((t, idx) => (
                    <Card
                        key={idx}
                        className="flex flex-col items-center shadow-lg rounded-2xl p-8 transition-transform hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="relative mb-4">
                            <Image
                                src={t.avatar}
                                alt={t.name}
                                width={72}
                                height={72}
                                className="rounded-full border-4 border-primary shadow-md"
                            />
                        </div>
                        <p className="text-muted-foreground mb-6 text-base italic leading-relaxed">
                            “{t.message}”
                        </p>
                        <div>
                            <span className="font-bold text-lg text-primary">{t.name}</span>
                            <div className="text-sm text-muted-foreground">{t.role}</div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
};

export default TestimonialsSection;
