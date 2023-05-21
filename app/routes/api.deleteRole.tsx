import { DataFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createRole, deleteRoleByID } from "~/models/role.server";
import { getSession } from "~/session.server";

export const action = async ({ request, params }: DataFunctionArgs) => {
  const session = await getSession(request)
  const formData = await request.formData();
  const { roleId } = Object.fromEntries(formData.entries())
  invariant(typeof roleId === "string", "Invalid ID for role")
  await deleteRoleByID(roleId)
  session.flash("globalMessage", "Role Deleted!")
  return redirect('/admin', { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};