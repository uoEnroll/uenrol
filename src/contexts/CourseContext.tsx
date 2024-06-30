import { Course, SelectedCourse, Term } from "@/types/Types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface CoursesContextType {
  courses: Course[];
  selectedCourses: SelectedCourse[];
  term: Term | null;
  resetCourses: () => void;
  changeTerm: (term: Term) => void;
  addCourse: (course: Course) => void;
  addSelectedComponent: (course: SelectedCourse) => void;
  removeSelectedComponent: (
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

  const addCourse = useCallback((course: Course) => {
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
  }, []);

  const resetCourses = useCallback(() => {
    setCourses([]);
  }, []);

  const addSelectedComponent = useCallback((course: SelectedCourse) => {
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

  const removeSelectedComponent = useCallback(
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

  const changeTerm = useCallback((term: Term) => {
    setTerm(term);
    setCourses([]);
    setSelectedCourses([]);
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        addCourse,
        resetCourses,
        selectedCourses,
        addSelectedComponent,
        removeSelectedComponent,
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
