import { inputObjectType } from 'nexus'

export const CommentCreateInput = inputObjectType({
  name: 'CommentCreateInput',
  definition(t) {
    t.nonNull.id('tenantId') // contemplating making this come in on JWT
    t.nonNull.id('contentId')
    t.nonNull.string('text')
  },
})
