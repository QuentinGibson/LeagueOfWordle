import { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getChampionByID } from "~/models/champion.server";
import { getRoles } from "~/models/role.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const championID = params.id
  invariant(championID, "No id found")
  const champion = await getChampionByID(championID)
  const roles = await getRoles()
  return { champion, roles }
};

export default function UpdateChampionRoute() {
  const { champion, roles } = useLoaderData<typeof loader>()
  const {
    name,
    avatar,
    roleId,
    subRoleId,
    health,
    healthRate,
    attack,
    attackRate,
    attackSpeed,
    moveSpeed
  } = champion
  return (
    <main className="px-4 py-16">
      <h1 className="font-bold text-5xl mb-8">Update {champion.name}</h1>
      <Form method="POST" className="flex flex-col gap-4" action="/api/updateChampion" >
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="name">Name</label>
          <input required className="border-2 border-slate-800 rounded-lg text-black px-2" type="text" name="name" id="name" autoComplete="off" defaultValue={name} />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="avatar">Avatar</label>
          <input required className="border-2 border-slate-800 rounded-lg text-black px-2" type="text" name="avatar" id="avatar" defaultValue={avatar} />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="role">Main Role</label>
          <select className="text-black" name="role" id="role" defaultValue={roleId}>
            {roles.map(role => (
              <option value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="subRole">Sub Role</label>
          <select className="text-black" name="subRole" id="subRole" defaultValue={subRoleId || "none"}>
            <option value="none">None</option>
            {roles.map(role => (
              <option value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="health">Health</label>
          <input required className="border-2 border-slate-800 rounded-lg text-black px-2" type="number" name="health" id="health" defaultValue={health} />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="healthRate">Health Rate</label>
          <input required className="border border-slate-800 rounded-lg text-black px-2" type="number" step="0.01" name="healthRate" id="healthRate" defaultValue={healthRate} />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="attack">Attack</label>
          <input required className="border border-slate-800 rounded-lg text-black px-2" type="number" name="attack" id="attack" defaultValue={attack} />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="attackRate">Attack Rate</label>
          <input required className="border boder-slate-800 rounded-lg text-black px-2" type="number" step="0.01" name="attackRate" id="attackRate" defaultValue={attackRate} />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="attackSpeed">Attack Speed</label>
          <input required className="border border-slate-800 rounded-lg text-black px-2" type="number" step="0.001" name="attackSpeed" id="attackSpeed" defaultValue={attackSpeed} />
        </div>
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="moveSpeed">Move Speed</label>
          <input required className="border border-slate-800 rounded-lg text-black px-2" type="number" name="moveSpeed" id="moveSpeed" defaultValue={moveSpeed} />
        </div>
        <div className="flex">
          <button className="px-4 py-2 bg-blue-400 rounded-lg" type="submit">Submit</button>
        </div>
      </Form>
    </main>
  );
};