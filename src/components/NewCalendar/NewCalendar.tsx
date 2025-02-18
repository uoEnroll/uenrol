"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewDay, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-shadcn/dist/index.css";
import { useEffect, useState } from "react";
import { useSearchResults } from "@/contexts/SearchResultsContext";
import dayjs from "dayjs";
import { createEventRecurrencePlugin } from "@schedule-x/event-recurrence";
import { datetime, RRule } from "rrule";
import CalendarEvent from "../CalendarEvent/CalendarEvent";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import EventModal from "../EventModal/EventModal";

const DATE_FORMAT = "YYYY-MM-DD";
function NewCalendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const eventRecurrence = useState(() => createEventRecurrencePlugin())[0];
  const eventModal = useState(() => createEventModalPlugin())[0];
  const plugins = [eventsService, eventRecurrence, eventModal];

  const { selectedSessions } = useSearchResults();

  const calendar = useNextCalendarApp(
    {
      views: [createViewDay(), createViewWeek()],
      theme: "shadcn",
      dayBoundaries: {
        start: "06:00",
        end: "23:00",
      },
      weekOptions: {
        gridHeight: 1000,
      },
    },
    plugins,
  );

  useEffect(() => {
    if (!calendar) {
      return;
    }

    if (selectedSessions.length === 0) {
      eventsService.set([]);
      return;
    }

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
        id: `${session.courseDetails.courseCode}${session.courseDetails.subSection}`,
        title: `${session.courseDetails.courseCode}`,
        start: `${startDate.format(DATE_FORMAT)} ${session.startTime}`,
        end: `${startDate.format(DATE_FORMAT)} ${session.endTime}`,
        rrule: rrule.toString(),
        ...session.courseDetails,
      };
    });

    // Doesnt refresh calendar
    eventsService.set(events);
  }, [calendar, eventsService, selectedSessions]);

  return (
    <div className="h-full overflow-scroll">
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={{
          timeGridEvent: CalendarEvent,
          eventModal: EventModal,
        }}
      />
    </div>
  );
}

export default NewCalendar;
