import { prisma } from '~/db.server'

export async function createRole(typeData: any) {}


export async function updateRole(typeID: string, typeData: any) {}

export async function getRolesByID(typeID: string) { }

export async function getRoles() { 
  const types = await prisma.role.findMany()
  return types
}

export async function deleteRoleByID(typeID: string) { }
