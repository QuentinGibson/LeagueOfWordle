import { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getRoleByID } from "~/models/role.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const roleId = params.id
  invariant(roleId, "No id found")
  const role = await getRoleByID(roleId)
  invariant(role, "Role not found")
  return { role }
};

export default function UpdateRoleRoute() {
  const { role } = useLoaderData<typeof loader>()
  const { name } = role
  return (
    <main className="px-4 py-16">
      <h1 className="font-bold text-5xl mb-8">Update {role.name}</h1>
      <Form method="POST" className="flex flex-col gap-4" action="/api/updateRole" >
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="name">Name</label>
          <input required className="border-2 border-slate-800 rounded-lg text-black px-2" type="text" name="name" id="name" autoComplete="off" defaultValue={name} />
          <input type="hidden" name="roleId" value={role.id} />
        </div>
        <div className="flex">
          <button className="px-4 py-2 bg-blue-400 rounded-lg" type="submit">Submit</button>
        </div>
      </Form>
    </main>
  );
};