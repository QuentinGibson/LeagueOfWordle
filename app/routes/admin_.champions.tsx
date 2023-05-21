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
    <main>
      <h1>Champions</h1>
      <ul>
        {champions.map(champion => (
          <li className="flex">
            {champion.name}
            <Link to={`/admin/update_${champion.id}`}>Update Champion</Link>
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