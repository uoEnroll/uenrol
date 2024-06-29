"use client";

import { useQuery } from "@tanstack/react-query";

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
      return data.data as any[];
    },
  });

  if (isLoading) return <div>Loading Available Terms...</div>;
  if (isError)
    return <div>Something went wrong when getting available terms</div>;

  return (
    <select className="w-full p-2 rounded-sm">
      {isSuccess &&
        data?.map((elem) => (
          <option key={elem.value} value={elem.value}>
            {elem.term}
          </option>
        ))}
    </select>
  );
}
