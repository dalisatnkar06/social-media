
const { UserModel, PostModel } = require("../models/user");

const ReadPost = async(req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email:email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userPosts = await PostModel.find({
            email:email
        });

        if (userPosts.length === 0) {
            return res.status(200).json({ message: "No posts found for the user" });
        }
        res.status(200).json({ message: "Posts retrieved successfully", userPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { ReadPost };