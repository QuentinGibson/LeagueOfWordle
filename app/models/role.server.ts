import { prisma } from '~/db.server'

export async function createRole(roleData: any) {
  const role = await prisma.role.create({ data:  roleData  })
  return {role}
}


export async function updateRole(typeID: string, typeData: any) {}

export async function getRoleByID(roleId: string) {
  const role = await prisma.role.findUnique({where: {id: roleId}})
  return role
 }

export async function getRoles() { 
  const types = await prisma.role.findMany()
  return types
}

export async function deleteRoleByID(roleId: string) { 
  return await prisma.role.delete({where: {id: roleId}})
}