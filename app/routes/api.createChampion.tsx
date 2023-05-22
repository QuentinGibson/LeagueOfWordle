import { DataFunctionArgs, redirect } from "@remix-run/node";
import { createChampion } from "~/models/champion.server";
import { getSession, sessionStorage } from "~/session.server";

export const action = async ({ request, params }: DataFunctionArgs) => {
  const session = await getSession(request)
  const formData = await request.formData()
  const formObj = Object.fromEntries(formData.entries())
  const name: string = formObj.name as string
  const avatar: string = formObj.avatar as string
  const health: number = Number(formObj.health)
  const healthRate: number = Number(formObj.healthRate)
  const attack: number = Number(formObj.attack)
  const attackRate: number = Number(formObj.attackRate)
  const attackSpeed: number = Number(formObj.attackSpeed)
  const moveSpeed: number = Number(formObj.moveSpeed)
  const roleID: string = formObj.role as string
  const subRoleID: string = formObj.subRole as string

  const championData = subRoleID === "None"
    ? { name, avatar, health, healthRate, attack, attackRate, attackSpeed, moveSpeed, role: { connect: { id: roleID } }, subRole: { connect: { id: subRoleID } } }
    : { name, avatar, health, healthRate, attack, attackRate, attackSpeed, moveSpeed, role: { connect: { id: roleID } } }
  const champion = await createChampion(championData);
  session.flash("globalMessage", `New Champion, ${name}, created!`)

  return redirect('/admin', { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};