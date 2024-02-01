const { PostModel } = require("../models/user");

const commentPost = async(req, res) => {
    if (req.body.userId != req.params._id) {
        try {
            const post = await PostModel.findById(req.params._id);

            if (!post.comment.includes(req.body.userId)) {
                await post.updateOne({ $push: { comment: req.body.userId } });
                return res.status(201).json({ message: "User has comment on your post" });
            }
            return res.status(404).json({ message: "You already comment on this post" });
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: "Something went wrong" });
        }
    }
};

module.exports = { commentPost };