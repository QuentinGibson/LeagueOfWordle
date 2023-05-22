import { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getRoles } from "~/models/role.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const roles = await getRoles()
  return { roles }
};

export default function NewChampionRoute() {
  const { roles } = useLoaderData<typeof loader>()
  return (
    <main className="px-4 py-16">
      <h1 className="font-bold text-5xl mb-8">New Champion Form</h1>
      <Form method="POST" className="flex flex-col gap-4" action="/api/createChampion" >
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="name">Name</label>
          <input required className="border-2 border-slate-800 rounded-lg text-black px-2" type="text" name="name" id="name" autoComplete="off" />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="avatar">Avatar</label>
          <input required className="border-2 border-slate-800 rounded-lg text-black px-2" type="text" name="avatar" id="avatar" />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="role">Main Role</label>
          <select className="text-black" name="role" id="role">
            {roles.map(role => (
              <option value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="subRole">Sub Role</label>
          <select className="text-black" name="subRole" id="subRole">
            <option value="None">None</option>
            {roles.map(role => (
              <option value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="health">Health</label>
          <input required className="border-2 border-slate-800 rounded-lg text-black px-2" type="number" name="health" id="health" />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="healthRate">Health Rate</label>
          <input required className="border border-slate-800 rounded-lg text-black px-2" type="number" step="0.01" name="healthRate" id="healthRate" />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="attack">Attack</label>
          <input required className="border border-slate-800 rounded-lg text-black px-2" type="number" name="attack" id="attack" />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="attackRate">Attack Rate</label>
          <input required className="border boder-slate-800 rounded-lg text-black px-2" type="number" step="0.01" name="attackRate" id="attackRate" />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="attackSpeed">Attack Speed</label>
          <input required className="border border-slate-800 rounded-lg text-black px-2" type="number" step="0.001" name="attackSpeed" id="attackSpeed" />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="moveSpeed">Move Speed</label>
          <input required className="border border-slate-800 rounded-lg text-black px-2" type="number" name="moveSpeed" id="moveSpeed" />
        </div>
        <div className="flex">
          <button className="px-4 py-2 bg-blue-400 rounded-lg" type="submit">Submit</button>
        </div>
      </Form>
    </main>
  );
};
