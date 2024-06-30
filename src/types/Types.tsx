export interface Course {
  courseCode: string;
  courseTitle: string;
  term: string;
  sections: Section[];
}

export interface Section {
  section: string;
  components: Component[];
}

export interface Component {
  type: string;
  isOpen: boolean;
  subSection: string;
  sessions: Session[];
}

export interface Session {
  endDate: string;
  endTime: string;
  dayOfWeek: string;
  startDate: string;
  startTime: string;
  instructor: string;
}

export interface Term {
  term: string;
  value: string;
}

export interface SelectedCourse extends Component {
  courseCode: string;
  term: string;
  subSection: string;
}

export interface SelectedSession {
  startTime: string;
  endTime: string;
  startRecur: string;
  endRecur: string;
  daysOfWeek: number[];
  extendedProps: {
    courseCode: string;
    term: string;
    subSection: string;
    instructor: string;
    type: string;
    isOpen: boolean;
  };
}
