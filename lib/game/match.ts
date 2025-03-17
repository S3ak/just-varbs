import createClient from "@/lib/supabase/server";

export async function createMatch(id = crypto.randomUUID()) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("matches")
      .insert({ uuid: id, _judge_name: "test judge" })
      .select();

    console.warn(error);

    if (error)
      throw new Error("Somethiung went wrong with Supabase", error?.message);

    return data;
  } catch (error) {
    console.error(error);
  }
}
