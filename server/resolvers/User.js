const { User } = require("../models");

const userResolver = {
    Query: {
        //get a single user by ID
        getUser: async (parent, { id }, context) => {
            // parent
            return await User.findbyID(id);
        },
        // Get all users
        getUsers: async (parent, args, context) => {
            return await User.find({});
        },
    },

    Mutation: {
        //add a new user
        addUser: async (parent, args, context) => {
            const user = await User.create(args);
            return user;
        },

        editUser: async (parent, { id, ...rest }, context) => { // id is the user's id, rest is the rest of the data
            //find a user by ID and update it with new data.
            //option {new: true} returns updated data
            return await User.findbyIdAndUpdate(id, rest, { new: true });
        },

        deleteUser: async (parent, { id }, context) => {
            // parent is the object that contains the result returned from the resolver on the parent field
            // { id } is the destructured id argument from the deleteUser mutation
            return await User.findByIdAndRemove(id);
        },
    },
};

module.exports = userResolver;
