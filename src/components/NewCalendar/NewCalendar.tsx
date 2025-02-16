"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewDay, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-shadcn/dist/index.css";
import { useEffect } from "react";
import { useSearchResults } from "@/contexts/SearchResultsContext";
import dayjs from "dayjs";
import { createEventRecurrencePlugin } from "@schedule-x/event-recurrence";
import { datetime, RRule } from "rrule";

const DATE_FORMAT = "YYYY-MM-DD";
function NewCalendar() {
  const plugins = [createEventsServicePlugin(), createEventRecurrencePlugin()];
  const { selectedSessions } = useSearchResults();

  const calendar = useNextCalendarApp(
    {
      views: [createViewDay(), createViewWeek()],
      theme: "shadcn",
    },
    plugins,
  );

  useEffect(() => {
    const events = selectedSessions.map((session) => {
      const startDate = dayjs(session.startRecur).add(
        session.dayOfWeek - 1,
        "day",
      );

      const endDate = dayjs(session.endRecur).add(session.dayOfWeek - 1, "day");

      const rrule = new RRule({
        freq: RRule.WEEKLY,
        dtstart: datetime(
          startDate.get("year"),
          startDate.get("month") + 1,
          startDate.get("day"),
        ),
        until: datetime(
          endDate.get("year"),
          endDate.get("month") + 1,
          endDate.get("day"),
        ),
      });

      return {
        id: `${session.extendedProps.courseCode}${session.extendedProps.subSection}`,
        title: `${session.extendedProps.courseCode}`,
        start: `${startDate.format(DATE_FORMAT)} ${session.startTime}`,
        end: `${startDate.format(DATE_FORMAT)} ${session.endTime}`,
        rrule: rrule.toString(),
      };
    });

    calendar?.events.set(events);
  }, [calendar?.events, selectedSessions]);

  return (
    <div className="h-full overflow-scroll">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default NewCalendar;
