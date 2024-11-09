"use client";

import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect } from "react";

function NewCalendar() {
  const plugins = [createEventsServicePlugin()];

  const calendar = useNextCalendarApp(
    {
      views: [createViewDay(), createViewWeek()],
      events: [
        {
          id: "1",
          title: "Event 1",
          start: "2023-12-16",
          end: "2023-12-16",
        },
      ],
    },
    plugins,
  );

  useEffect(() => {
    // get all events
    calendar?.eventsService.getAll();
  }, [calendar?.eventsService]);

  return (
    <div className="h-full overflow-scroll">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default NewCalendar;
