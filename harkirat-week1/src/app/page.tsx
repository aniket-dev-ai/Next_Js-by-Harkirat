import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Student = {
  username: string;
  age: number;
  class: string;
  gender: string;
  address: string;
  nationality: string;
  collegeName: string;
  degreeName: string;
  passingYear: number;
};

const students: Student[] = [
  {
    username: "john_doe",
    age: 20,
    class: "BSc CS",
    gender: "Male",
    address: "123 Main St, NY",
    nationality: "American",
    collegeName: "NYU",
    degreeName: "Computer Science",
    passingYear: 2025,
  },
  {
    username: "jane_smith",
    age: 22,
    class: "BA Eng",
    gender: "Female",
    address: "456 Park Ave, LA",
    nationality: "American",
    collegeName: "UCLA",
    degreeName: "English Literature",
    passingYear: 2024,
  },
  {
    username: "ali_khan",
    age: 21,
    class: "BBA",
    gender: "Male",
    address: "789 Elm St, TX",
    nationality: "Pakistani",
    collegeName: "UT Austin",
    degreeName: "Business Administration",
    passingYear: 2023,
  },
  {
    username: "maria_garcia",
    age: 23,
    class: "BSc Bio",
    gender: "Female",
    address: "321 Oak St, FL",
    nationality: "Spanish",
    collegeName: "UF",
    degreeName: "Biology",
    passingYear: 2022,
  },
  {
    username: "li_wei",
    age: 20,
    class: "BEng",
    gender: "Male",
    address: "654 Pine St, CA",
    nationality: "Chinese",
    collegeName: "Stanford",
    degreeName: "Engineering",
    passingYear: 2025,
  },
  {
    username: "emma_jones",
    age: 22,
    class: "BSc Math",
    gender: "Female",
    address: "987 Cedar St, WA",
    nationality: "British",
    collegeName: "UW",
    degreeName: "Mathematics",
    passingYear: 2024,
  },
  {
    username: "arjun_patel",
    age: 21,
    class: "BCom",
    gender: "Male",
    address: "159 Maple St, IL",
    nationality: "Indian",
    collegeName: "UIC",
    degreeName: "Commerce",
    passingYear: 2023,
  },
  {
    username: "sofia_rossi",
    age: 23,
    class: "BA His",
    gender: "Female",
    address: "753 Birch St, MA",
    nationality: "Italian",
    collegeName: "MIT",
    degreeName: "History",
    passingYear: 2022,
  },
  {
    username: "lucas_martin",
    age: 20,
    class: "BSc Phys",
    gender: "Male",
    address: "852 Spruce St, CO",
    nationality: "French",
    collegeName: "CU Boulder",
    degreeName: "Physics",
    passingYear: 2025,
  },
  {
    username: "hana_kim",
    age: 22,
    class: "BA Art",
    gender: "Female",
    address: "951 Willow St, NJ",
    nationality: "Korean",
    collegeName: "Princeton",
    degreeName: "Art",
    passingYear: 2024,
  },
];

export default async function Page() {
  await new Promise((res) => setTimeout(res, 5000));
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-pink-200 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center">Student List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, idx) => (
          <Card
            key={idx}
            className="shadow-xl transition-transform hover:scale-105 hover:shadow-2xl border-2 border-white/70 bg-white/80 backdrop-blur-md"
          >
            <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-300 rounded-t-lg p-4">
              <CardTitle className="text-lg font-extrabold text-white tracking-wide">
                <span className="text-yellow-300">{student.username}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-blue-700">Age:</span>
                  <span className="text-green-600">{student.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-purple-700">Class:</span>
                  <span className="text-pink-600">{student.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-red-700">Gender:</span>
                  <span className="text-orange-600">{student.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-teal-700">Address:</span>
                  <span className="text-cyan-600 text-right">
                    {student.address}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-indigo-700">
                    Nationality:
                  </span>
                  <span className="text-lime-600">{student.nationality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-pink-700">College:</span>
                  <span className="text-blue-600">{student.collegeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-yellow-700">Degree:</span>
                  <span className="text-purple-600">{student.degreeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-green-700">
                    Passing Year:
                  </span>
                  <span className="text-red-600">{student.passingYear}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
