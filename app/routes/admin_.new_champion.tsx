import ChampionForm from "~/components/ChampionForm";
export default function NewChampionRoute() {
  return (
    <main>
      <h1>New Champion Form</h1>
      <ChampionForm champion={null} />
    </main>
  );
};