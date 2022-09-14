const express = require('express');
// import ApolloServer
const {ApolloServer} = require('apollo-server-express');

// import our typeDefs and resolvers

const {typeDefs, resolvers} = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// create new instance of an APollo server with the GraphyQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our APollo server with the express app as middleware
  server.applyMiddleware({app});
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    })
  })
  
};
// Call the asynce function to start the server
startApolloServer(typeDefs, resolvers);