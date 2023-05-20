import {prisma} from '~/db.server'

export async function createChampion(championData: any) {}

export async function updateChampion(championID: string, championData: any) {}

export async function getChampionByID(championID: string) { }

export async function getChampions() {
  return await prisma.champion.findMany({
    include: {
      role: true,
      subRole: true
    }
  });
 }

export async function deleteChampionByID(championID: string) { }
