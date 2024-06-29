import { Session } from "@/types/Types";
import React from "react";

interface SessionResultProps {
  session: Session;
}
export const SessionResult: React.FC<SessionResultProps> = ({ session }) => {
  return (
    <ul>
      <li className="flex gap-2">
        <span>{session.instructor}</span>
        <span className="text-slate-600">{`${session.startTime} - ${session.endTime}`}</span>
      </li>
    </ul>
  );
};
