const { UserModel, PostModel } = require("../models/user");

const UpdatePost = async(req, res) => {
    const { email } = req.body;
    const { Title, Content, Discription } = req.body;

    try {
        const user = await UserModel.findOne({ email:email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userPosts = await PostModel.findOne({
            email:email
        });

        if (!userPosts) {
            return res.status(200).json({ message: "No posts found for the user" });
        }
        userPosts.Title = Title;
        userPosts.Content = Content;
        userPosts.Discription = Discription;
        await userPosts.save();

        res.status(200).json({ message: "Post updated successfully", userPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { UpdatePost };