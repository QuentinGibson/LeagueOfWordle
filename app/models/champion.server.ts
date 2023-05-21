import { Champion } from '@prisma/client';
import invariant from 'tiny-invariant';
import {prisma} from '~/db.server'


export async function createChampion(championData: any) {
  const champion = await prisma.champion.create({data: championData})
  return {champion}
}

export async function updateChampion(championID: string, championData: any) {}

export async function getChampionByID(championID: string) { 
  const champion = await prisma.champion.findUnique({ where: {id: championID}})
  invariant(champion, "Champion not found!")
  return champion
}

export async function getChampions() {
  return await prisma.champion.findMany({
    include: {
      role: true,
      subRole: true
    }
  });
 }

export async function deleteChampionByID(championID: string) { }
