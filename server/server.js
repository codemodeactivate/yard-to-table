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
console.log("SERVER.JS IS BEING EXECUTED")
console.log("Node environment:", process.env.NODE_ENV)

const PORT = process.env.PORT || 3001;
const app = express();

// const uri = process.env.MONGODB_URI;

// const client = new MongoClient(uri, {
//   tls: true,
// })


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {

    const token = req.headers.authorization;


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
    app.use(express.static(path.join(__dirname, 'client/build')));
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    console.log('Context:', req.user); // Log the user object
    return {
      user: req.user,
      userId: req.user ? req.user.id : null, // Attach the user object to the context
      db: db,
    };
  },
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });

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
