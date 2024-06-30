import { ReactNode } from "react";

export default function App({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-col justify-between text-xs h-dvh w-dvw bg-black md:flex-row-reverse md:p-4 md:gap-4">
      {children}
    </div>
  );
}
