import { LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getRoles } from "~/models/role.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const roles = await getRoles();
  return { roles }
};
export default function RolesRoute() {
  const { roles } = useLoaderData<typeof loader>()
  return (
    <main className="px-4 py-8">
      <h1 className="font-bold text-5xl mb-8">Roles</h1>
      <ul className="grid gap-4">
        {roles.map(role => (
          <li className="flex grid-cols-3 gap-2 items-center">
            <div className="flex basis-36">
              <p className="font-bold">{role.name}</p>
            </div>
            <div className="flex">
              <Link className="px-4 py-2 bg-indigo-700" to={`/admin/role/${role.id}`}>Update Role</Link>
            </div>
            <Form method="POST" action="/api/deleteRole">
              <button type="submit" className="px-4 py-2 bg-red-500">Delete Role</button>
              <input type="hidden" name="championID" value={role.id} />
            </Form>
          </li>
        ))}
      </ul>
    </main>
  );
};