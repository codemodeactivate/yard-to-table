// require('dotenv')
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const bodyParser = require('body-parser');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth')
const cors = require('cors');


const PORT = process.env.PORT || 3001;
const app = express();

// const MOCK_USER = {
//     // Your mock user data here
//     _id: "64cb91d6257a9b0a75532bdb",
//     username: "testuser",
//     // Add any other fields you need for testing
//   };

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));


  app.use((req, res, next) => {
    // Check if it's a login request and skip authentication if so
    if (
      req.originalUrl === '/graphql' &&
      req.method === 'POST' &&
      req.body &&
      req.body.operationName === 'login'
    ) {
      return next();
    }

    // Otherwise, check for a token and authenticate the user
    const token = req.headers.authorization;
    if (!token) {
      console.log('Token not found');
      return res.status(401).json({ message: 'Not Authenticated' });
    }

    // ... validate the token and authenticate the user ...

    next();
  });





app.use((req, res, next) => {
    console.log('Request Details:');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', JSON.stringify(req.headers));
    console.log('Body:', req.body);
    next();
  });
app.use(authMiddleware);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
    introspection: true,
    playground: true,
    // logger: {
    //   debug: message => console.debug(message),
    //   info: message => console.info(message),
    //   warn: message => console.warn(message),
    //   error: message => console.error(message),
    // },
    context: authMiddleware,
});


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });

//Create a new instance of ApolloServer with the GraphQL schema
const startApolloServer = async () => {
    // Wait for the server to start
    await server.start();

    // Apply the ApolloServer middleware after it has started
    server.applyMiddleware({ app });

    // Start the express server
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Now listening on localhost:${PORT}, BANNNNGGGGG!!!!!!!!!!!!!!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}

startApolloServer();
