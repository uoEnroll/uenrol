export default function Sidebar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-[40%] p-4 bg-white w-full rounded-t-md">{children}</div>
  );
}
