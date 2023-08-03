require('dotenv').config({ path: './.env' });
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const authService = require('./utils/auth')


const PORT = process.env.PORT || 3001;
const app = express();

// const MOCK_USER = {
//     // Your mock user data here
//     _id: "64cb91d6257a9b0a75532bdb",
//     username: "testuser",
//     // Add any other fields you need for testing
//   };

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization || '';
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
    }
    } catch (err) {
        req.user = undefined;
    }
    next();
};

app.use(authMiddleware);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        //auth logic goes here
        return {
            db,
            // user: MOCK_USER
            user: req.user
        }
     },
     cors: {
        origin: 'http://localhost:3000', // <- allow request from all domains
     },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });

//Create a new instance of ApolloServer with the GraphQL schema

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Now listening on localhost:${PORT}, BANNNNGGGGG!!!!!!!!!!!!!!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    }
    );

}

startApolloServer();
