import { useCourses } from "@/contexts/CourseContext";
import React, { useState } from "react";
import Image from "next/image";

export default function SearchResults() {
  const [isOpen, setIsOpen] = useState(false);
  const { courses } = useCourses();

  return (
    <>
      {courses.map((elem) => {
        return (
          <div
            key={`${elem.courseCode}${elem.term}`}
            className="p-2 rounded-sm bg-red-500"
          >
            <div className="flex items-center justify-between">
              <div className="truncate">
                <span>{`${elem.courseCode}: ${elem.courseTitle}`}</span>
              </div>

              <button onClick={() => setIsOpen((is) => !is)}>
                <Image
                  className={isOpen ? "-rotate-90" : "rotate-0"}
                  width={24}
                  height={24}
                  src={"/chevron-left.svg"}
                  alt="Expand"
                />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
