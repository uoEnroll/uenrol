export default function Sidebar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="overflow-auto h-[40%] bg-white w-full rounded-t-md">
      {children}
    </div>
  );
}
