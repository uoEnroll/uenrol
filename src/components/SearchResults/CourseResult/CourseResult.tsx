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
      <div className="border rounded-md overflow-hidden">
        <div
          onClick={() => setIsOpen((is) => !is)}
          className="hover:cursor-pointer p-2 bg-red-500"
        >
          <div className="flex items-center justify-between">
            <div className="truncate">
              <span>{`${course.courseCode}: ${course.courseTitle}`}</span>
            </div>

            <FontAwesomeIcon
              className={`transition-all ease-in delay-100 ${isOpen ? "-rotate-90" : "rotate-0"}`}
              icon={faChevronLeft}
            />
          </div>
        </div>
        {course.sections.map((section) => {
          return (
            <div
              className={`overflow-hidden transition-all ease-in delay-100 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
              key={`${course.courseCode}${course.term}${section.section}`}
            >
              <SectionResult
                courseCode={course.courseCode}
                term={course.term}
                section={section}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseResult;
