"use client";

import Calendar from "@/components/Calendar/Calendar";
import Main from "@/components/Main/Main";
import Sidebar from "@/components/Sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Page() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-between text-xs h-dvh w-dvw bg-black">
        <Main>
          <Calendar />
        </Main>

        <Sidebar>
          <div className="flex items-center justify-between gap-2">
            <input
              className="border-slate-400 bg-slate-100 border text-xs w-full px-4 py-2 rounded-sm"
              type="text"
              placeholder="Course Code Eg. CSI 2101"
            />
            <button className="w-min bg-red-700 px-4 h-full py-2 rounded-sm text-white">
              Search
            </button>
          </div>
        </Sidebar>
      </div>
    </QueryClientProvider>
  );
}
