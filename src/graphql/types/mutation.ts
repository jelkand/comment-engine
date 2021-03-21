import { arg, idArg, nonNull, objectType } from 'nexus'

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    // requires RBAC
    t.nonNull.field('registerTenant', {
      type: 'Tenant',
      args: {
        data: nonNull(arg({ type: 'TenantCreateInput' })),
      },
      resolve: (_, { data }, { prisma }) => prisma.tenant.create({ data }),
    })
    t.nonNull.field('addCommentToCommentable', {
      type: 'Commentable',
      args: {
        data: nonNull(arg({ type: 'CommentCreateInput' })),
      },
      resolve: (_, { data: { contentId, tenantId, text } }, { prisma }) =>
        prisma.commentable.upsert({
          where: { tenantId_contentId: { tenantId, contentId } },
          update: {
            comments: { create: { text } },
          },
          create: {
            contentId,
            tenantId,
            comments: {
              create: { text },
            },
          },
          include: {
            comments: true,
          },
        }),
    })
    // requires RBAC
    t.field('deleteComment', {
      type: 'Comment',
      args: {
        id: nonNull(idArg()),
      },
      resolve: (_, { id }, { prisma }) =>
        prisma.comment.delete({ where: { id } }),
    })
  },
})
