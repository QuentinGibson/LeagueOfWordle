import { DataFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteChampionByID } from "~/models/champion.server";
import { getSession, sessionStorage } from "~/session.server";

export const action = async ({ request, params }: DataFunctionArgs) => {
  const session = await getSession(request);
  const formData = await request.formData();
  const { championID } = Object.fromEntries(formData.entries());
  invariant(typeof championID === "string", "Invalid champion id")
  await deleteChampionByID(championID)
  session.flash("globalMessage", `Sucessfully deleted!`)
  return redirect('/admin', { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};