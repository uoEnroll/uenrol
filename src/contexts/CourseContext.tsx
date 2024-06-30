import { Course, SelectedCourse, Term } from "@/types/Types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

interface CoursesContextType {
  courses: Course[];
  selectedCourses: SelectedCourse[];
  term: Term | null;
  resetCourses: () => void;
  changeTerm: (term: Term) => void;
  addCourse: (course: Course) => void;
  addSelectedCourse: (course: SelectedCourse) => void;
  removeSelectedCourse: (
    courseCode: string,
    term: string,
    subSection: string,
  ) => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
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

  function resetCourses() {
    setCourses([]);
  }

  const addSelectedCourse = useCallback((course: SelectedCourse) => {
    setSelectedCourses((currSelectedCourses) => {
      if (
        currSelectedCourses.some(
          (elem) =>
            elem.courseCode === course.courseCode &&
            elem.term === course.term &&
            elem.subSection == course.subSection,
        )
      ) {
        return currSelectedCourses;
      }
      return [course, ...currSelectedCourses];
    });
  }, []);

  const removeSelectedCourse = useCallback(
    (courseCode: string, term: string, subSection: string) => {
      setSelectedCourses((currSelectedCourses) => {
        const filtered = currSelectedCourses.filter(
          (course) =>
            !(
              course.courseCode === courseCode &&
              course.term === term &&
              course.subSection === subSection
            ),
        );
        return filtered;
      });
    },
    [],
  );

  function changeTerm(term: Term) {
    setTerm(term);
    setCourses([]);
    setSelectedCourses([]);
  }

  return (
    <CoursesContext.Provider
      value={{
        courses,
        addCourse,
        resetCourses,
        selectedCourses,
        addSelectedCourse,
        removeSelectedCourse,
        term,
        changeTerm,
      }}
    >
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
