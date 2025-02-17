import { faClock, faClockFour } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React from "react";

interface props {
  calendarEvent: {
    id: string | number;
    title: string;
    start: string;
    end: string;
    className: string;
  };
}

const TIME_FORMAT = "hh:mm A";
export default function CalendarEvent({ calendarEvent }: props) {
  const start = dayjs(calendarEvent.start).format(TIME_FORMAT);
  const end = dayjs(calendarEvent.end).format(TIME_FORMAT);
  return (
    <div
      className={`absolute top-0 left-0 right-0 h-full p-2 rounded bg-opacity-60 border-l-4 ${calendarEvent.className}`}
    >
      <p className="font-bold text-xs mb-1">{calendarEvent.title}</p>
      <div className="flex items-center gap-2 font-light">
        <FontAwesomeIcon icon={faClock} />
        <p className="text-nowrap">
          {start} - {end}
        </p>
      </div>
    </div>
  );
}
