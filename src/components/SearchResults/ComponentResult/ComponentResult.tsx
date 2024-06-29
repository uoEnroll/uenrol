import { Component } from "@/types/Types";
import React from "react";
import { SessionResult } from "../SessionResult/SessionResult";

interface ComponentResultProps {
  component: Component;
  partialKey: string;
}
export const ComponentResult: React.FC<ComponentResultProps> = ({
  component,
  partialKey,
}) => {
  return (
    <div className="flex items-center justify-between h-full w-full">
      <div className="px-2 h-full flex items-stretch">
        <input type="checkbox" />
      </div>

      <div className="w-full ml-4">
        {component.sessions.map((session) => (
          <SessionResult
            key={`${partialKey}${session.startTime}`}
            session={session}
          />
        ))}
      </div>

      <div className="flex flex-col items-center uppercase border-l-slate-400 border-l p-6">
        <span
          className={`font-bold text-base ${!component.isOpen ? "text-lime-600" : "text-red-800"}`}
        >
          {component.subSection}
        </span>
        <span>{component.type}</span>
      </div>
    </div>
  );
};
