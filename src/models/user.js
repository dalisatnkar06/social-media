const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})


const ProfileSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    MNO: {
        type: Number,
        required: true
    },
    Bio: {
        type: String,
        required: true
    },
    follower: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }

})

const PostSchema = mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
    Discription: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    like: {
        type: Array,
        default: []
    },
    comment: {
        type: Array,
        default: []
    }


});

const UserModel = mongoose.model("User", UserSchema);
const ProfileModel = mongoose.model("Profile", ProfileSchema);
const PostModel = mongoose.model("Post", PostSchema);

module.exports = { UserModel, ProfileModel, PostModel };