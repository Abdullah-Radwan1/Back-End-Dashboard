import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const arrayOfPosts: Prisma.PostCreateInput = [
 {
  title: "post 1",
  slug: "post-1",
  content: "content",
  author: {
   connectOrCreatee: {
    where: { email: "beedo.com" },
    create: { email: "beedo.com" },
   },
  },
 },
]

async function main() {}
main()
 .then(async () => {
  await prisma.$disconnect()
 })
 .catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
 })
