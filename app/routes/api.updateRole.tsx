import { DataFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { updateRole } from "~/models/role.server";
import { getSession, sessionStorage } from "~/session.server";
export const action = async ({ request, params }: DataFunctionArgs) => {
  const session = await getSession(request)
  const formData = await request.formData()
  const { roleId, name } = Object.fromEntries(formData.entries())
  invariant(typeof roleId === "string", "Invalid ID")
  invariant(typeof name === "string", "Invalid Name for role")
  const role = await updateRole(roleId, name)
  await updateRole(roleId, { name })
  if (role) session.flash("globalMessage", "Role successfully updated!")

  return redirect("/admin", { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};