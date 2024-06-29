export default function Main({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="p-2 h-[52%] rounded-b-md bg-white">{children}</div>;
}
