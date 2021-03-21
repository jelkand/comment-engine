import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.tenant.create({
    data: {
      name: 'My Blog',
      commentables: {
        create: [
          {
            contentId: 'my-blog-post-slug',
            comments: {
              create: [
                { text: 'I love this post' },
                { text: 'I hate this post' },
              ],
            },
          },
          {
            contentId: 'my-second-blog-slug',
            comments: {
              create: [
                { text: 'This is ok' },
                { text: 'I liked your first post more' },
              ],
            },
          },
        ],
      },
    },
  })

  await prisma.tenant.create({
    data: {
      name: 'CMS managed site',
      commentables: {
        create: {
          contentId: '1234',
          comments: {
            create: { text: 'this is a comment' },
          },
        },
      },
    },
  })
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
