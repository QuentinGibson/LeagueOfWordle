import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import ChampionForm from "~/components/ChampionForm";
import { getChampionByID } from "~/models/champion.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const championID = params.id
  invariant(championID, "No id found")
  const champion = await getChampionByID(championID)
  return { champion }
};

export default function UpdateChampionRoute() {
  const { champion } = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>Update {champion.name}</h1>
      <ChampionForm champion={champion} />
    </main>
  );
};