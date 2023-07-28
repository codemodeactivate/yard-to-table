const { User } = require("../models").User;
console.log(User);
console.log("User object: ", User);
console.log("Type of User object: ", typeof User);
console.log("User.create method: ", User.create);
console.log("User.save method: ", User.save);

const userResolver = {
    Query: {
        //get a single user by ID
        getUser: async (parent, { id }, context) => {
            // parent
            return await User.findById(id);
        },
        // Get all users
        getUsers: async (parent, args, context) => {
            return await User.find({});
        },
    },

    Mutation: {
        //add a new user
        addUser: async (parent, args, context) => {
            const user = new User(args);
            await user.save();
            return user;
        },

        editUser: async (parent, { id, ...rest }, context) => { // id is the user's id, rest is the rest of the data
            //find a user by ID and update it with new data.
            //option {new: true} returns updated data
            return await User.findByIdAndUpdate(id, rest, { new: true });
        },

        deleteUser: async (parent, { id }, context) => {
            // parent is the object that contains the result returned from the resolver on the parent field
            // { id } is the destructured id argument from the deleteUser mutation
            return await User.findByIdAndRemove(id);
        },
    },
};

console.log('User Model loaded');
module.exports = userResolver;
