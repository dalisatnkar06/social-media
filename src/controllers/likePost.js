const { PostModel } = require("../models/user");

const likePost = async(req, res) => {
    if (req.body.userId != req.params._id) {
        try {
            const post = await PostModel.findById(req.params._id);

            if (!post.like.includes(req.body.userId)) {
                await post.updateOne({ $push: { like: req.body.userId } });
                return res.status(201).json({ message: "User has like on your post" });
            } else {
                await post.updateOne({ $pull: { like: req.body.userId } });
                return res.status(404).json({ message: "You already like on this post" });
            }
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: "Something went wrong" });
        }
    }
};

module.exports = { likePost };