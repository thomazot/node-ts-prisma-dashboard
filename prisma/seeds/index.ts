import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const data = {
        name: 'admin-create',
        display: 'Administrador',
        description:'Administrador do sistema',
        createdAt: new Date()
    }
    console.log('Start - seed permission')
    await prisma.permission.create({
        data
    })
    console.log('Success - seed permission')
}

main()
    .catch( e => {
        throw e
    })
    .finally(async () => {
        await prisma.disconnect()
    })