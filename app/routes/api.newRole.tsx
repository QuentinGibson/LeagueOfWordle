import { DataFunctionArgs, redirect } from "@remix-run/node";
import { createRole } from "~/models/role.server";
import { getSession, sessionStorage } from "~/session.server";

export const action = async ({ request, params }: DataFunctionArgs) => {
  const session = await getSession(request)
  const formData = await request.formData();
  const { name } = Object.fromEntries(formData.entries())
  const role = await createRole({ name })
  if (role) {
    session.flash("globalMessage", "New role created!")
  } else {
    session.flash("globalMessage", "Failed to create role!")
  }
  return redirect('/admin', { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};