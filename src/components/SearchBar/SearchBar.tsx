import { useCourses } from "@/contexts/CourseContext";
import { Course } from "@/types/Course";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import TermSelector from "../TermSelector/TermSelector";

async function fetchCourses(courseCode: string) {
  const res = await fetch(`/api/v1/terms/2024 Fall Term/courses/${courseCode}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.data;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { courses, addCourse } = useCourses();
  const { data, error, isLoading, isSuccess, refetch } = useQuery<Course>({
    queryKey: ["courses", query],
    queryFn: () => fetchCourses(query),
    enabled: false,
  });

  React.useEffect(() => {
    if (isSuccess) {
      addCourse(data);
    }
  }, [addCourse, data, isSuccess]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  function handleSearchClick() {
    refetch();
  }

  return (
    <div className="flex flex-col gap-2">
      <TermSelector />
      <div className="flex items-center justify-between gap-2">
        <input
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value)
          }
          className="border-slate-400 bg-slate-100 border text-xs w-full px-4 py-2 rounded-sm"
          type="text"
          placeholder="Course Code Eg. CSI 2101"
        />
        <button
          onClick={handleSearchClick}
          className="w-min bg-red-700 px-4 h-full py-2 rounded-sm text-white"
        >
          Search
        </button>
      </div>
    </div>
  );
}
