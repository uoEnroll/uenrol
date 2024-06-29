"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import React from "react";
import moment from "moment";

const TABELT_BREAKPOINT = 768;
const MOBILE_BREAKPOINT = 640;
export default function Calendar() {
  let initialWidth = 0;
  // NextJS complains that window is undefined even though this is a client component
  if (typeof window != "undefined") {
    initialWidth = window.innerWidth;
  }

  return (
    <FullCalendar
      plugins={[timeGridPlugin, momentPlugin]}
      headerToolbar={{
        left: "today,timeGridDay,timeGridFiveDay,timeGridWeek",
        center: "title",
        right: "prev,next",
      }}
      views={{
        timeGridFiveDay: {
          type: "timeGrid",
          duration: { days: 5 },
          dateAlignment: "week",
        },
      }}
      buttonText={{
        today: "Today",
        timeGridDay: "Day",
        timeGridFiveDay: "5-Day",
        timeGridWeek: "7-Day",
      }}
      initialView={
        initialWidth <= MOBILE_BREAKPOINT
          ? "timeGridDay"
          : initialWidth <= TABELT_BREAKPOINT
            ? "timeGridFiveDay"
            : "timeGridWeek"
      }
      firstDay={1}
      allDaySlot={false}
      height={"100%"}
      slotDuration={"00:15:00"}
      slotMinTime={"07:00:00"}
      slotMaxTime={"23:00:00"}
      slotLabelInterval={"01:00:00"}
      windowResize={(info) => {
        const width = window.innerWidth;
        if (width <= MOBILE_BREAKPOINT) {
          info.view.calendar.changeView("timeGridDay");
        } else if (width <= TABELT_BREAKPOINT) {
          info.view.calendar.changeView("timeGridFiveDay");
        } else {
          info.view.calendar.changeView("timeGridWeek");
        }
      }}
      eventContent={CalendarItem}
    />
  );
}
function CalendarItem({ event }) {
  return (
    <div className="flex flex-col gap-1 p-2 text-sm truncate">
      <p className="text-gray-100 font-light text-xs">
        {`${event.start.getHours()}:${event.start.getMinutes().toString().padStart(2, "0")}`}
        {" - "}
        {`${event.end.getHours()}:${event.end.getMinutes().toString().padStart(2, "0")}`}
      </p>

      <div className="text-base">
        <span className="font-bold">{event.extendedProps.courseCode}</span>
        {" - "}
        <span>{event.extendedProps.type}</span>{" "}
        <span>{event.extendedProps.subSection}</span>
        <p>{event.extendedProps.courseTitle}</p>
      </div>

      <div>
        <p className="italic">{event.extendedProps.instructor}</p>
      </div>
    </div>
  );
}
