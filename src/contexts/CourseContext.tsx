import { Course, SelectedCourse, SelectedSession, Term } from "@/types/Types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface CoursesContextType {
  courses: Course[];
  selectedSessions: SelectedSession[];
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
const dayOfWeekToNumberMap: { [key: string]: number } = {
  Mo: 1,
  Tu: 2,
  We: 3,
  Th: 4,
  Fr: 5,
  Sa: 6,
  Su: 0,
};

const availableColours = [
  "bg-red-300",
  "bg-sky-300",
  "bg-lime-200",
  "bg-orange-500",
  "bg-amber-400",
  "bg-blue-500",
  "bg-indigo-400",
  "bg-pink-400",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-yellow-200",
];

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<SelectedSession[]>(
    [],
  );
  const [term, setTerm] = useState<Term | null>(null);
  const [chosenColours, setChosenColours] = useState<Set<string>>(
    new Set<string>(),
  );

  const selectRandomColour = useCallback(() => {
    const filteredColours = availableColours.filter(
      (colour) => !chosenColours.has(colour),
    );
    const randomIndex = Math.floor(Math.random() * filteredColours.length);
    const chosenColour = filteredColours[randomIndex];
    setChosenColours((prevSet) => new Set<string>(prevSet).add(chosenColour));
    return chosenColour;
  }, [chosenColours]);

  const addCourse = useCallback(
    (course: Course) => {
      setCourses((currCourses) => {
        if (
          currCourses.some(
            (elem) =>
              elem.courseCode === course.courseCode &&
              elem.term === course.term,
          )
        ) {
          return currCourses;
        }
        const colour = selectRandomColour();
        course.colour = colour;
        return [course, ...currCourses];
      });
    },
    [selectRandomColour],
  );

  const resetCourses = useCallback(() => {
    setCourses([]);
    setSelectedSessions([]);
    setChosenColours(new Set());
  }, []);

  const addSelectedComponent = useCallback((course: SelectedCourse) => {
    setSelectedSessions((currSelectedComponents) => {
      if (
        currSelectedComponents.some(
          (elem) =>
            elem.extendedProps.courseCode === course.courseCode &&
            elem.extendedProps.term === course.term &&
            elem.extendedProps.subSection == course.subSection,
        )
      ) {
        return currSelectedComponents;
      }
      const sessions = course.sessions.map((session) => {
        return {
          startTime: session.startTime,
          endTime: session.endTime,
          startRecur: session.startDate,
          endRecur: session.endDate,
          daysOfWeek: [dayOfWeekToNumberMap[session.dayOfWeek] as number],
          extendedProps: {
            backgroundColour: course.colour,
            courseCode: course.courseCode,
            courseTitle: course.courseTitle,
            term: course.term,
            subSection: course.subSection,
            instructor: session.instructor,
            type: course.type,
            isOpen: course.isOpen,
          },
        };
      }) as SelectedSession[];
      return [...sessions, ...currSelectedComponents];
    });
  }, []);

  const removeSelectedComponent = useCallback(
    (courseCode: string, term: string, subSection: string) => {
      setSelectedSessions((currSelectedCourses) => {
        const filtered = currSelectedCourses.filter(
          (course) =>
            !(
              course.extendedProps.courseCode === courseCode &&
              course.extendedProps.term === term &&
              course.extendedProps.subSection === subSection
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
    setSelectedSessions([]);
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        addCourse,
        resetCourses,
        selectedSessions,
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
