import Calendar from "@/components/Calendar";

export default function Page() {
  return (
    <div className="flex flex-col justify-between h-dvh w-dvw bg-black">
      <div className="p-2 h-[52%] rounded-b-md bg-white">
        <Calendar />
      </div>

      <div className="h-[40%] bg-white rounded-t-md"></div>
    </div>
  );
}
