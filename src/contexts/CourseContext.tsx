import { Course, Term } from "@/types/Course";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CoursesContextType {
  courses: Course[];
  term: Term | null;
  setTerm: React.Dispatch<React.SetStateAction<Term | null>>;
  addCourse: (course: Course) => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [term, setTerm] = useState<Term | null>(null);

  function addCourse(course: Course) {
    setCourses((currCourses) => {
      if (
        currCourses.some(
          (elem) =>
            elem.courseCode === course.courseCode && elem.term === course.term,
        )
      ) {
        return currCourses;
      }
      return [course, ...currCourses];
    });
  }

  return (
    <CoursesContext.Provider value={{ courses, addCourse, term, setTerm }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = (): CoursesContextType => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }
  return context;
};
