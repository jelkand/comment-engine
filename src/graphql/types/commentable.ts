import { objectType } from 'nexus'

export const commentable = objectType({
  name: 'Commentable',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('contentId')
    t.nonNull.string('tenantId')
    t.list.nonNull.field('comments', {
      type: 'Comment',
      resolve: ({ id }, _, { prisma }) =>
        prisma.commentable.findUnique({ where: { id } }).comments(),
    })
    t.field('createdAt', {
      type: 'DateTime',
    })
    t.field('updatedAt', {
      type: 'DateTime',
    })
  },
})
