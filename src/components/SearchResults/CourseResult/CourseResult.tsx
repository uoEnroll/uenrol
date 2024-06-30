import { Course } from "@/types/Types";
import Image from "next/image";
import { useState } from "react";
import { SectionResult } from "../SectionResult/SectionResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface CourseResultProps {
  course: Course;
}

const CourseResult: React.FC<CourseResultProps> = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4 pb-4">
      <div className="p-2 rounded-sm bg-red-500">
        <div className="flex items-center justify-between">
          <div className="truncate">
            <span>{`${course.courseCode}: ${course.courseTitle}`}</span>
          </div>

          <button onClick={() => setIsOpen((is) => !is)}>
            <FontAwesomeIcon
              className={`transition-all ease-in delay-100 ${isOpen ? "-rotate-90" : "rotate-0"}`}
              icon={faChevronLeft}
            />
          </button>
        </div>
      </div>
      {course.sections.map((section) => {
        return (
          <div
            className={`transition-all ease-in delay-100 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
            key={`${course.courseCode}${course.term}${section.section}`}
          >
            <SectionResult
              partialKey={`${course.courseCode}${course.term}`}
              section={section}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CourseResult;
