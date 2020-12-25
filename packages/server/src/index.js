const { ApolloServer } = require('apollo-server')
const LaunchAPI = require('./datasources/launch')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const server = new ApolloServer({
  dataSources: () => ({
    launchAPI: new LaunchAPI()
  }),
  resolvers,
  typeDefs
})

const PORT = 4000

server.listen(PORT).then(() => {
  console.log(`🚀 Server is listening on port ${PORT}!`)
})
