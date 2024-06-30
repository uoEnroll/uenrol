import { Section } from "@/types/Types";
import React, { useState } from "react";
import Image from "next/image";
import { ComponentResult } from "../ComponentResult/ComponentResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface SectionResultProps {
  section: Section;
  courseCode: string;
  term: string;
}
export const SectionResult: React.FC<SectionResultProps> = ({
  section,
  courseCode,
  term,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen((is) => !is)}
        className="flex hover:cursor-pointer justify-between z-20 items-center w-full p-2 bg-slate-200"
      >
        <span>Section {section.section}</span>
        <FontAwesomeIcon
          className={`transition-all ease-in delay-100 ${isOpen ? "-rotate-90" : "rotate-0"}`}
          icon={faChevronLeft}
        />
      </div>

      {section.components.map((component) => {
        return (
          <div
            className={`transition-all ease-in delay-100 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
            key={`${courseCode}${term}${section.section}${component.subSection}`}
          >
            <ComponentResult
              component={component}
              courseCode={courseCode}
              term={term}
              section={section.section}
              subSection={component.subSection}
            />
          </div>
        );
      })}
    </div>
  );
};
