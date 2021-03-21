import { objectType } from 'nexus'

export const comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('text')
    t.nonNull.string('commentableId')
    t.field('commentable', {
      type: 'Commentable',
      resolve: ({ commentableId }, _, { prisma }) =>
        prisma.commentable.findUnique({ where: { id: commentableId } }),
    })
    t.field('createdAt', {
      type: 'DateTime',
    })
    t.field('updatedAt', {
      type: 'DateTime',
    })
  },
})
