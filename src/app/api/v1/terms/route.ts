import supabase from "@/supabase/supabase";

export async function GET() {
  const res = await supabase.from("availableTerms").select("term,value");

  if (res.error) {
    console.log(res.error.message);
    return Response.json({ error: "Something went wrong", data: null });
  }

  return Response.json({ error: null, data: res.data });
}
