import invariant from 'tiny-invariant'
import { prisma } from '~/db.server'

export async function createRole(roleData: any) {
  const role = await prisma.role.create({ data:  roleData  })
  return {role}
}


export async function updateRole(roleId: string, roleData: any) {
  const {name} = roleData
  const role = await prisma.role.findUnique({where: {id: roleId}})
  invariant(role, "Could not find role with ID")
  return await prisma.role.update({where: {id: roleId}, data: {name}})
} 

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