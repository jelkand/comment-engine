import { objectType } from 'nexus'

export const Tenant = objectType({
  name: 'Tenant',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.list.nonNull.field('commentables', {
      type: 'Commentable',
      resolve: ({ id }, _, { prisma }) =>
        prisma.tenant.findUnique({ where: { id } }).commentables(),
    })
    t.field('createdAt', {
      type: 'DateTime',
    })
    t.field('updatedAt', {
      type: 'DateTime',
    })
  },
})
