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
            // Find user and remove it
            const user = await User.findByIdAndRemove(id);

            // Check if user was actually found and removed
            if (!user) {
              return {
                success: false,
                message: "No user found with this id",
                id,
              };
            }

            return {
              success: true,
              message: "User successfully deleted",
              id, // The id of the deleted user
            };
          },
    },
};

console.log('User Model loaded');
module.exports = userResolver;
