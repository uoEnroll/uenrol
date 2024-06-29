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
  isOpen: string;
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
