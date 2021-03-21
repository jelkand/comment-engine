import { makeSchema } from 'nexus'

import * as types from './types'

export const schema = makeSchema({
  types,
  outputs: {
    schema: `${__dirname}/../schema.graphql`,
    typegen: `${__dirname}/../nexus-typegen.ts`,
  },
  contextType: {
    module: require.resolve('../server/context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
