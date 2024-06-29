"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";

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
      allDaySlot={false}
      plugins={[timeGridPlugin]}
      initialView={
        initialWidth <= MOBILE_BREAKPOINT
          ? "timeGridDay"
          : initialWidth <= TABELT_BREAKPOINT
            ? "timeGridFourDay"
            : "timeGridWeek"
      }
      headerToolbar={{
        left: "today,timeGridDay,timeGridWeek",
        center: "title",
        right: "prev,next",
      }}
      height={"100%"}
      slotDuration={"00:15:00"}
      slotMinTime={"07:00:00"}
      slotMaxTime={"23:00:00"}
      slotLabelInterval={"01:00:00"}
      firstDay={1}
      views={{
        timeGridFourDay: {
          type: "timeGrid",
          duration: { days: 4 },
        },
      }}
      windowResize={(info) => {
        const width = window.innerWidth;
        if (width <= MOBILE_BREAKPOINT) {
          info.view.calendar.changeView("timeGridDay");
        } else if (width <= TABELT_BREAKPOINT) {
          info.view.calendar.changeView("timeGridFourDay");
        } else {
          info.view.calendar.changeView("timeGridWeek");
        }
      }}
    />
  );
}
