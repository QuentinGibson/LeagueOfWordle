import { LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getChampions } from "~/models/champion.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const champions = await getChampions()
  return { champions }
};
export default function ComponentName() {
  const { champions } = useLoaderData<typeof loader>()
  return (
    <main className="py-8 px-4">
      <h1 className="font-bold text-5xl mb-8">Champions</h1>
      <ul className="grid gap-4">
        {champions.map(champion => (
          <li className="flex grid-cols-3 gap-2 items-center">
            <div className="flex basis-36">
              <p className="font-bold">{champion.name}</p>
            </div>
            <div className="flex">
              <Link className="px-4 py-2 bg-indigo-700" to={`/admin/champion/${champion.id}`}>Update Champion</Link>
            </div>
            <Form method="POST" action="/api/delete">
              <button type="submit" className="px-4 py-2 bg-red-500">Delete Champion</button>
              <input type="hidden" name="championID" value={champion.id} />
            </Form>
          </li>
        ))}
      </ul>
    </main>

  );
};