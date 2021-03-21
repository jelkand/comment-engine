import { idArg, nonNull, objectType } from 'nexus'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    // requires RBAC
    t.nonNull.list.field('tenants', {
      type: 'Tenant',
      resolve: (_, __, { prisma }) => prisma.tenant.findMany(),
    })
    // requires RBAC
    t.field('tenantById', {
      type: 'Tenant',
      args: {
        id: nonNull(idArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.tenant.findUnique({ where: { id } }),
    })
    // requires RBAC
    t.field('commentableById', {
      type: 'Commentable',
      args: {
        id: nonNull(idArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.commentable.findUnique({ where: { id } }),
    })
    // requires RBAC
    t.nonNull.list.field('allComments', {
      type: 'Comment',
      resolve: (_, __, { prisma }) => prisma.comment.findMany(),
    })
  },
})
