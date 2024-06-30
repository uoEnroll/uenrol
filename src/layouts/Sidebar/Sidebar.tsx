export default function Sidebar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="overflow-y-scroll h-[40%] bg-white w-full rounded-t-md md:h-full md:w-[25%] md:rounded-md">
      {children}
    </div>
  );
}
