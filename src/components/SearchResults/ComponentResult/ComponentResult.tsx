import { Component } from "@/types/Types";
import React, { useEffect, useMemo, useState } from "react";
import { SessionResult } from "../SessionResult/SessionResult";
import { useCourses } from "@/contexts/CourseContext";

interface ComponentResultProps {
  component: Component;
  courseCode: string;
  courseTitle: string;
  term: string;
  section: string;
  subSection: string;
}
export const ComponentResult: React.FC<ComponentResultProps> = ({
  component,
  courseCode,
  courseTitle,
  term,
  section,
  subSection,
}) => {
  const { addSelectedComponent, removeSelectedComponent } = useCourses();
  const [isSelected, setIsSelected] = useState(false);

  function handleToggle() {
    setIsSelected((is) => !is);
  }

  useEffect(() => {
    if (isSelected) {
      addSelectedComponent({
        ...component,
        courseCode,
        courseTitle,
        term,
        subSection,
      });
    } else {
      removeSelectedComponent(courseCode, term, subSection);
    }
  }, [
    isSelected,
    component,
    courseCode,
    subSection,
    term,
    addSelectedComponent,
    removeSelectedComponent,
  ]);

  return (
    <div className="flex items-center justify-between h-full w-full">
      <div className="px-2 h-full flex items-stretch">
        <input onChange={handleToggle} checked={isSelected} type="checkbox" />
      </div>

      <div className="w-full ml-4">
        {component.sessions.map((session) => (
          <SessionResult
            key={`${courseCode}${term}${section}${subSection}${session.dayOfWeek}${session.startTime}`}
            session={session}
          />
        ))}
      </div>

      <div className="flex flex-col items-center uppercase border-l-slate-400 border-l p-6">
        <span
          className={`font-bold text-base ${!component.isOpen ? "text-lime-600" : "text-red-800"}`}
        >
          {component.subSection}
        </span>
        <span>{component.type}</span>
      </div>
    </div>
  );
};
