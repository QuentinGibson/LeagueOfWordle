import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { FormEvent, useRef, useState, useEffect } from "react";
import { BsXCircleFill, BsCheckCircleFill, BsArrowUpCircleFill, BsArrowDownCircleFill, BsArrowUp, BsCheckSquareFill, BsFillCheckCircleFill, BsCheck, BsTwitter } from 'react-icons/bs'
import invariant from "tiny-invariant";
import Result from "~/components/Result";
import Stat from "~/components/Stat";
import Title from "~/components/Title";
import Select from "react-select";
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
  const [winner, setWinner] = useState(false)
  const [lost, setLost] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [tweetText, setTweetText] = useState("")
  const championOptions = champions.map(champion => { return { value: champion.id, label: champion.name } })

  useEffect(() => {
    const lastGuess = guesses[guesses.length - 1]
    if (lastGuess === chosenChampion.id) {
      setWinner(true)
      setTweetText(`I won League Of Wordle by guessing ${chosenChampion.name} in ${guesses.length} guesses`)
    }
  }, [guesses, chosenChampion, setWinner])

  useEffect(() => {
    if (guesses.length >= 8 && !winner) {
      setLost(true)
      setTweetText(`I lost League Of Wordle I forgot about ${chosenChampion.name}`)
    }
  })

  const user = useOptionalUser();
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (selectedOption) {
      setGuesses(prevValue => [...prevValue, selectedOption])
    }
  }
  function handleChange(selectedOption: any) {
    setSelectedOption(selectedOption.value)
    console.log(selectedOption)
  }
  return (
    <main className="pt-8 px-4 bg-indigo-950">
      <h1 className="text-4xl md:text-7xl font-bold mb-4">League Of Wordle</h1>
      <p className="mb-16 text-xl md:text-2xl">A League Of Legends Wordle-like game by <Link className="text-yellow-400" to={"http://quentdev.com/"}>Quentin Gibson</Link></p>
      <p className="text-xl mb-8 text-center">I'm thinking of a Champion. Guess Which! You have {8 - guesses.length} guesses left!</p>
      <form onSubmit={handleSubmit} className="mx-auto max-w-screen-md flex flex-col items-center">
        <div className="flex flex-col relative">
          <div className="flex box-border">
            <Select
              name="champion"
              isSearchable={true}
              options={championOptions}
              onChange={handleChange}
              className="text-black"
            />
            <button className="bg-slate-950 px-4 py-2" disabled={winner || lost} type="submit">Submit</button>
          </div>
        </div>
      </form>


      {guesses.length > 0 && (
        <div className="overflow-scroll lg:overflow-auto mt-4">
          <div className="grid gap-2 min-w-max">
            <div className="grid grid-cols-9 justify-items-center">
              <Title>Role</Title>
              <Title>SubRole</Title>
              <Title>Health</Title>
              <Title>HealthRate</Title>
              <Title>Attack</Title>
              <Title>AttackRate</Title>
              <Title>AttackSpeed</Title>
              <Title>MoveSpeed</Title>
            </div>
            {guesses.map(guess => {
              let champion = champions.find(champion => champion.id === guess)
              if (champion) {
                return (
                  <div className="grid grid-cols-9 justify-items-center gap-1">
                    <Stat>
                      {chosenChampion.role.name === champion.role.name ? <BsCheckCircleFill className="text-green-400" /> : <BsXCircleFill className="text-red-400" />}
                      <Result>{champion.role.name}</Result>
                    </Stat>
                    <Stat>
                      {chosenChampion?.subRole?.name === champion?.subRole?.name ? <BsCheckCircleFill className="text-green-400" /> : <BsXCircleFill className="text-red-400" />}
                      <Result>{champion?.subRole?.name || "None"}</Result>
                    </Stat>
                    <Stat>
                      {chosenChampion.health === champion.health ? <BsCheckCircleFill className="text-green-400" />
                        : chosenChampion.health > champion.health ? <BsArrowUpCircleFill className="text-yellow-400" />
                          : <BsArrowDownCircleFill className="text-yellow-400" />}
                      <Result>{champion.health}</Result>
                    </Stat>
                    <Stat>

                      {chosenChampion.healthRate === champion.healthRate ? <BsCheckCircleFill className="text-green-400" />
                        : chosenChampion.healthRate > champion.healthRate ? <BsArrowUpCircleFill className="text-yellow-400" />
                          : <BsArrowDownCircleFill className="text-yellow-400" />}
                      <Result>{champion.healthRate}</Result>
                    </Stat>
                    <Stat>
                      {chosenChampion.attack === champion.attack ? <BsCheckCircleFill className="text-green-400" />
                        : chosenChampion.attack > champion.attack ? <BsArrowUpCircleFill className="text-yellow-400" />
                          : <BsArrowDownCircleFill className="text-yellow-400" />}
                      <Result>{champion.attack}</Result>
                    </Stat>
                    <Stat>
                      {chosenChampion.attackRate === champion.attackRate ? <BsCheckCircleFill className="text-green-400" />
                        : chosenChampion.attackRate > champion.attackRate ? <BsArrowUpCircleFill className="text-yellow-400" />
                          : <BsArrowDownCircleFill className="text-yellow-400" />}
                      <Result>{champion.attackRate}</Result>
                    </Stat>
                    <Stat>
                      {chosenChampion.attackSpeed === champion.attackSpeed ? <BsFillCheckCircleFill className="text-green-400" />
                        : chosenChampion.attackSpeed > champion.attackSpeed ? <BsArrowUpCircleFill className="text-yellow-400" />
                          : <BsArrowDownCircleFill className="text-yellow-400" />}
                      <Result>{champion.attackSpeed}</Result>
                    </Stat>
                    <Stat>
                      {chosenChampion.moveSpeed === champion.moveSpeed ? <BsCheckCircleFill className="text-green-400" />
                        : chosenChampion.moveSpeed > champion.moveSpeed ? <BsArrowUpCircleFill className="text-yellow-400" />
                          : <BsArrowDownCircleFill className="text-yellow-400" />}
                      <Result>{champion.moveSpeed}</Result>
                    </Stat>
                    <div className="flex items-center gap-1">
                      <img src={champion.avatar} alt="" className="w-[40px]" />
                      <p className="font-bold">{champion.name}</p>
                    </div>
                  </div>
                )
              }
            })}
          </div>
          <div className="my-16 flex flex-col items-center justify-center">
            {lost && (
              <div className="flex flex-col">
                <p className="text-xl font-bold text-red-400">You Lose!</p>
                <p className="text-xl">The correct champion was <span className="font-bold">{chosenChampion.name}</span></p>
              </div>
            )}

            {winner && (
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold text-green-400">You Win!</p>
                <p>It was <span className="font-bold">{chosenChampion.name}</span></p>
                <div className="flex">
                  <Link target="_blank" to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`} className="px-4 py-2 bg-blue-700 flex items-center gap-1">Share on Twitter <BsTwitter /></Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* <Link to={"/"}>New Game</Link> */}
    </main>
  );
}
