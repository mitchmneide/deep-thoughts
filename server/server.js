const express = require('express');
// import ApolloServer
const {ApolloServer} = require('apollo-server-express');
// import auth
const {authMiddleware} = require('./utils/auth');
// import our typeDefs and resolvers
const path = require('path')
const {typeDefs, resolvers} = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });
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