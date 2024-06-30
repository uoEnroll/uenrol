import { Session } from "@/types/Types";
import moment from "moment";
import React from "react";

interface SessionResultProps {
  session: Session;
}
export const SessionResult: React.FC<SessionResultProps> = ({ session }) => {
  const startTime = moment(`${session.startDate}T${session.startTime}`).format(
    "LT",
  );
  const endTime = moment(`${session.endDate}T${session.endTime}`).format("LT");
  const startDate = moment(session.startDate).format("ll");
  const endDate = moment(session.endDate).format("ll");
  return (
    <ul>
      <li>
        <div className="flex gap-2">
          <span className="font-bold">{session.dayOfWeek}</span>
          <span>{session.instructor}</span>
          <span className="text-slate-600">{`${startTime} - ${endTime}`}</span>
        </div>
        <span className="truncate text-gray-400">{`${startDate} to ${endDate}`}</span>
      </li>
    </ul>
  );
};
