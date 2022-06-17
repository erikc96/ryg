const { ApolloServer } = require('apollo-server');
const { createStore } = require('./utils');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const CheckInApi = require('./datasources/checkIn');

const store = createStore();

const dataSources = () => ({
    checkInApi: new CheckInApi({ store }),
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    csrfPrevention: true,
    cache: 'bounded',
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});