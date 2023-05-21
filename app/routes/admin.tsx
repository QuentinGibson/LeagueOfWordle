import { LoaderArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { requireUser } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request)
  if (user.role !== "ADMIN") {
    redirect("/")
  }
  return "sucess"
};
export default function Admin() {
  return (
    <main className="py-16 px-4">
      <h1 className="font-bold text-5xl mb-8">Admin</h1>
      <ul className="text-lg">
        <li>
          <Link className="hover:underline" to="/admin/new_champion">New Champion</Link>
        </li>
        <li>
          <Link className="hover:underline" to="/admin/champions">List Champions</Link>
        </li>
        <li>
          <Link className="hover:underline" to="/admin/new_role">New Role</Link>
        </li>
        <li>
          <Link className="hover:underline" to="/admin/roles">List Roles</Link>
        </li>
      </ul>
    </main>
  );
};