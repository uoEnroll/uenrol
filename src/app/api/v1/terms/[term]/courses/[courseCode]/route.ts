import supabase from "@/supabase/supabase";

export async function GET(req: Request, context: any) {
  const { params } = context;

  const termParam = params.term.trim();
  const courseCodeParam = params.courseCode
    .trim()
    .replaceAll(/ /g, "")
    .toUpperCase();

  const res = await supabase.rpc("get_course", {
    termParam,
    courseCodeParam,
  });

  if (!res.data) {
    return Response.json({ error: "No course found", data: null });
  }

  return Response.json({ error: null, data: res.data[0] });
}
