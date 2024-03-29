const { UserModel, PostModel } = require("../models/user");

const DeletePost = async(req, res) => {
    const { Title,email } = req.body;

    try {
        const user = await UserModel.findOne({ email:email});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userPosts = await PostModel.findOne({
            Title:Title
        });

        if (!userPosts) {
            return res.status(200).json({ message: "No posts found for the user" });
        }

        const deleteResult = await PostModel.deleteMany({ Title: Title });

        res.status(200).json({ message: "Post Deleted successfully", deleteResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { DeletePost };