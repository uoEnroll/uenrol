"use client";

import App from "@/layouts/App/App";
import Calendar from "@/components/Calendar/Calendar";
import Main from "@/layouts/Main/Main";
import SearchBar from "@/components/SearchBar/SearchBar";
import Sidebar from "@/layouts/Sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchResultsProvider } from "@/contexts/SearchResultsContext";
import SearchResults from "@/components/SearchResults/SearchResults";

export default function Page() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchResultsProvider>
        <App>
          <Main>
            <Calendar />
          </Main>

          <Sidebar>
            <SearchBar />
            <SearchResults />
          </Sidebar>
        </App>
      </SearchResultsProvider>
    </QueryClientProvider>
  );
}
