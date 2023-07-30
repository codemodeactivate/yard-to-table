require('dotenv').config({ path: './.env' });
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');



const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        //auth logic goes here
        return {
            user: req.user
        }
     }
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