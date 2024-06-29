"use client";

import Calendar from "@/components/Calendar/Calendar";
import Main from "@/components/Main/Main";
import SearchBar from "@/components/SearchBar/SearchBar";
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
          <SearchBar />
        </Sidebar>
      </div>
    </QueryClientProvider>
  );
}
