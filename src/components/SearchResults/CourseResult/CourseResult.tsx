import { Course } from "@/types/Types";
import Image from "next/image";
import { useState } from "react";
import { SectionResult } from "../SectionResult/SectionResult";

interface CourseResultProps {
  course: Course;
}

const CourseResult: React.FC<CourseResultProps> = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4 pb-4 overflow-y-scroll">
      <div className="p-2 rounded-sm bg-red-500">
        <div className="flex items-center justify-between">
          <div className="truncate">
            <span>{`${course.courseCode}: ${course.courseTitle}`}</span>
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
      {course.sections.map((section) => {
        return (
          <SectionResult
            partialKey={`${course.courseCode}${course.term}`}
            key={`${course.courseCode}${course.term}${section.section}`}
            section={section}
          />
        );
      })}
    </div>
  );
};

export default CourseResult;
