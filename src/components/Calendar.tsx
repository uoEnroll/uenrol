"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";

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
      initialView={initialWidth <= 768 ? "timeGridDay" : "timeGridWeek"}
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
      windowResize={(info) => {
        const width = window.innerWidth;
        if (width <= 768) {
          info.view.calendar.changeView("timeGridDay");
        } else {
          info.view.calendar.changeView("timeGridWeek");
        }
      }}
    />
  );
}
