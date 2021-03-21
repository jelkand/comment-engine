import { inputObjectType } from 'nexus'

export const TenantCreateInput = inputObjectType({
  name: 'TenantCreateInput',
  definition(t) {
    t.nonNull.string('name')
  },
})
