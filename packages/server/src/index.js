require('dotenv').config()

const { ApolloServer } = require('apollo-server')
const isEmail = require('isemail')
const { createStore } = require('./database')
const LaunchAPI = require('./datasources/launch')
const UserAPI = require('./datasources/user')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const store = createStore()

const server = new ApolloServer({
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || ''
    const email = Buffer.from(auth, 'base64').toString('ascii')
    if (!isEmail.validate(email)) return { user: null }
    const users = await store.users.findOrCreate({ where: { email } })
    const user = (users && users[0]) || null
    return { user: { ...user.dataValues } }
  },
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  }),
  resolvers,
  typeDefs
})

const PORT = process.env.PORT || 4000

server.listen(PORT).then(() => {
  console.log(`🚀 Server is listening on port ${PORT}!`)
})
