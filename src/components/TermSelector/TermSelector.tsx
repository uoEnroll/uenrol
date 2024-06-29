"use client";

import { useCourses } from "@/contexts/CourseContext";
import { Term } from "@/types/Course";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent } from "react";

export default function TermSelector() {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["availableTerms"],
    queryFn: async () => {
      const res = await fetch("/api/v1/terms");
      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data.data as Term[];
    },
  });
  const { term, setTerm } = useCourses();

  React.useEffect(() => {
    if (data && data.length > 0 && !term) {
      setTerm(data[0]);
    }
  }, [data, setTerm, term]);

  if (isLoading) return <div>Loading Available Terms...</div>;
  if (isError)
    return <div>Something went wrong when getting available terms</div>;

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    const term = JSON.parse(event.target.value) as Term;
    setTerm(term);
  }

  return (
    <select
      value={term ? JSON.stringify(term) : ""}
      onChange={handleSelect}
      className="w-full p-2 rounded-sm"
    >
      {isSuccess &&
        data?.map((elem) => (
          <option key={elem.value} value={JSON.stringify(elem)}>
            {elem.term}
          </option>
        ))}
    </select>
  );
}
