import supabase from "@/supabase/supabase";

export async function GET(req: Request, context: any) {
  const { params } = context;

  if (!params.term) {
    return Response.json({
      error: "Specify the term before searching for a course",
      data: null,
    });
  }

  if (!params.courseCode) {
    return Response.json({ error: "Specify a course", data: null });
  }

  const termParam = params.term.trim() as string;
  const courseCodeParam = params.courseCode
    .trim()
    .replaceAll(/ /g, "")
    .toUpperCase() as string;

  const containsNumber = (str: string): boolean => /\d/.test(str);
  const containsLetters = (str: string): boolean => /[a-zA-Z]/.test(str);

  if (!containsNumber(courseCodeParam) || !containsLetters(courseCodeParam)) {
    return Response.json({ error: "Not a valid course code", data: null });
  }

  const res = await supabase.rpc("get_course", {
    termParam,
    courseCodeParam,
  });

  if (!res.data) {
    return Response.json({ error: "No course found", data: null });
  }

  return Response.json({ error: null, data: res.data[0] });
}
