import { useCourses } from "@/contexts/CourseContext";
import { Course, Term } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import TermSelector from "../TermSelector/TermSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";

async function fetchCourses(courseCode: string, term: Term | null) {
  if (!term) {
    throw new Error("No Term Selected");
  }
  const selectedTerm = term.term.replace("/", "%2F");

  const res = await fetch(
    `/api/v1/terms/${selectedTerm}/courses/${courseCode}`,
  );

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
  const { term } = useCourses();
  const { courses, addCourse } = useCourses();
  const { data, error, isLoading, isSuccess, refetch } = useQuery<Course>({
    queryKey: ["courses", query, term],
    queryFn: () => fetchCourses(query, term),
    enabled: false,
  });

  React.useEffect(() => {
    if (isSuccess) {
      addCourse(data);
      setQuery("");
    }
  }, [addCourse, data, isSuccess]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  function handleSearchClick() {
    refetch();
  }

  return (
    <div className="sticky p-4 top-0 bg-white z-10 flex flex-col gap-2">
      <TermSelector />
      <div className="flex items-center justify-between gap-2">
        <input
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value.toUpperCase())
          }
          className="border-slate-400 bg-slate-100 border text-xs w-full px-4 py-2 rounded-sm"
          type="text"
          placeholder="Course Code Eg. CSI 2101"
        />

        <button className="w-min border-slate-400 border p-2 h-full rounded-sm text-black">
          <FontAwesomeIcon className="h-4 aspect-square" icon={faTrash} />
        </button>

        <button
          onClick={handleSearchClick}
          className="w-min bg-red-700 p-2 h-full rounded-sm text-white"
        >
          <FontAwesomeIcon
            className="h-4 aspect-square"
            icon={faMagnifyingGlass}
          />
        </button>
      </div>
    </div>
  );
}
