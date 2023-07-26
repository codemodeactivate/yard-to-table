const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    isGardener: {
        type: Boolean,
        default: false,
    },
    isHomeowner: {
        type: Boolean,
        default: false,
    },
    gardenerProfile: {
        type: Schema.Types.ObjectId,
        ref: "GardenerProfile",
    },
    homeownerProfile: {
        type: Schema.Types.ObjectId,
        ref: "HomeownerProfile",
    },
});

const User = model("User", userSchema);

module.exports = User;
