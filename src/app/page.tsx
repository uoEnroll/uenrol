import Calendar from "@/components/Calendar/Calendar";

export default function Page() {
  return (
    <div className="flex flex-col justify-between text-xs h-dvh w-dvw bg-black">
      <div className="p-2 h-[52%] rounded-b-md bg-white">
        <Calendar />
      </div>

      <div className="h-[40%] p-4 bg-white w-full rounded-t-md">
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
      </div>
    </div>
  );
}
