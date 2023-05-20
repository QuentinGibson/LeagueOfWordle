import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { FormEvent, useRef, useState, useEffect } from "react";
import { GrTransaction, GrUp, GrDown, GrCheckmark, GrClose } from 'react-icons/gr'
import invariant from "tiny-invariant";
import Result from "~/components/Result";
import Stat from "~/components/Stat";
import Title from "~/components/Title";
import { getChampions } from "~/models/champion.server";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "League Of Wordle" }];

export const loader = async ({ request, params }: LoaderArgs) => {
  const champions = await getChampions()
  const chosenChampionIndex = Math.floor(Math.random() * champions.length)
  const chosenChampion = champions[chosenChampionIndex]

  return { champions, chosenChampion }
};

export default function Index() {
  const { champions, chosenChampion } = useLoaderData<typeof loader>()
  const [guesses, setGuesses] = useState<string[]>([])
  const [selected, setSelected] = useState<string>("")
  const searchRef = useRef<HTMLInputElement>(null)
  const championRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState<string>("")
  const [winner, setWinner] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const lastGuess = guesses[guesses.length - 1]
    if (lastGuess === chosenChampion.id) {
      setWinner(true)
    }
  }, [guesses, chosenChampion, setWinner])

  const user = useOptionalUser();
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    invariant(selected.length > 0, "must be a guess")
    setGuesses(prevValue => [...prevValue, selected])
    setSearch("")
    if (searchRef.current) {
      searchRef.current.value = ""
    }
  }
  function handleChange() {
    setSearch(championRef?.current?.value || "")
  }
  function handleChampionSelect(champion: any) {
    setSearch(champion.name)
    setSelected(champion.id)
    if (searchRef.current) {
      searchRef.current.value = champion.name
    }
  }
  return (
    <main className="">
      <h1 >League Of Wordle</h1>
      {winner && <p>You Win!</p>}
      <p>A League Of Legends Wordle-like game by <Link to={"http://quentdev.com/"}>Quentin Gibson</Link></p>
      <p>I'm thinking of a Champion. Guess Which! You have {8 - guesses.length} guesses left!</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="flex">
            <input className="" type="text" name="search" id="search" ref={searchRef} onChange={handleChange} onFocus={() => setFocused(true)} />
            <button disabled={winner} type="submit">Submit</button>
          </div>
          {focused && (
            <div className="w-[400px] border border-slate-700 rounded-lg overflow-hidden">
              <ul className="">
                {champions.filter(
                  champion => champion.name.toLowerCase().includes(search.toLowerCase() || ""))
                  .map(champion => (
                    <li className="border-b last:border-0 border-slate-800" onClick={() => handleChampionSelect(champion)}>{champion.name}</li>
                  )
                  )}
              </ul>
            </div>
          )}
          <input type="hidden" name="championID" id="championID" ref={championRef} />
        </div>
      </form>

      {guesses.length > 0 && (
        <div className="grid gap-2">
          <div className="grid grid-cols-8 justify-items-center">
            <Title>Role</Title>
            <Title>SubRole</Title>
            <Title>Health</Title>
            <Title>HealthRate</Title>
            <Title>Attack</Title>
            <Title>AttackRate</Title>
            <Title>BaseAttackSpeed</Title>
            <Title>MoveSpeed</Title>
          </div>
          {guesses.map(guess => {
            let champion = champions.find(champion => champion.id === guess)
            if (champion) {
              return (
                <div className="grid grid-cols-8 justify-items-center">
                  <Stat>
                    {chosenChampion.role.name === champion.role.name ? <GrCheckmark /> : <GrClose />}
                    <Result>{champion.role.name}</Result>
                  </Stat>
                  <Stat>
                    {chosenChampion?.subRole?.name === champion?.subRole?.name ? <GrCheckmark /> : <GrClose />}
                    <Result>{champion?.subRole?.name}</Result>
                  </Stat>
                  <Stat>
                    {chosenChampion.health === champion.health ? <GrCheckmark />
                      : chosenChampion.health > champion.health ? <GrUp />
                        : <GrDown />}
                    <Result>{champion.health}</Result>
                  </Stat>
                  <Stat>

                    {chosenChampion.healthRate === champion.healthRate ? <GrCheckmark />
                      : chosenChampion.healthRate > champion.healthRate ? <GrUp />
                        : <GrDown />}
                    <Result>{champion.healthRate}</Result>
                  </Stat>
                  <Stat>
                    {chosenChampion.attack === champion.attack ? <GrCheckmark />
                      : chosenChampion.attack > champion.attack ? <GrUp />
                        : <GrDown />}
                    <Result>{champion.attack}</Result>
                  </Stat>
                  <Stat>
                    {chosenChampion.attackRate === champion.attackRate ? <GrCheckmark />
                      : chosenChampion.attackRate > champion.attackRate ? <GrUp />
                        : <GrDown />}
                    <Result>{champion.attackRate}</Result>
                  </Stat>
                  <Stat>
                    {chosenChampion.attackSpeed === champion.attackSpeed ? <GrCheckmark />
                      : chosenChampion.attackSpeed > champion.attackSpeed ? <GrUp />
                        : <GrDown />}
                    <Result>{champion.attackSpeed}</Result>
                  </Stat>
                  <Stat>
                    {chosenChampion.moveSpeed === champion.moveSpeed ? <GrCheckmark />
                      : chosenChampion.moveSpeed > champion.moveSpeed ? <GrUp />
                        : <GrDown />}
                    <Result>{champion.moveSpeed}</Result>
                  </Stat>
                </div>
              )
            }
          })}
        </div>
      )}

      {/* <Link to={"/"}>New Game</Link> */}
    </main>
  );
}
