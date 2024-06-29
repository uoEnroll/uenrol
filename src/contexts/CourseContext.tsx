import { Course, Term } from "@/types/Types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CoursesContextType {
  courses: Course[];
  term: Term | null;
  changeTerm: (term: Term) => void;
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

  function changeTerm(term: Term) {
    setTerm(term);
    setCourses([]);
  }

  return (
    <CoursesContext.Provider value={{ courses, addCourse, term, changeTerm }}>
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
