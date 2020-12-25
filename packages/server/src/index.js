const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')

const server = new ApolloServer({ typeDefs })

const PORT = 4000

server.listen(PORT).then(() => {
  console.log(`🚀 Server is listening on port ${PORT}!`)
})
