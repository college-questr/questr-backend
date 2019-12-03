//Conects to remote prisma db and gives us the ability to query with js instead of using playground
const { Prisma } = require('prisma-binding');
const schema = require('./prisma/generated/prisma-client/prisma.graphql')

const db = new Prisma({
    typeDefs: schema,
    endpoint: 'http://localhost:4466/',
    secret: process.env.PRISMA_SECRET,
    debug: false,

})

module.exports = db;