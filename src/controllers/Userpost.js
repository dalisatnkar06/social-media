const { UserModel, PostModel } = require("../models/user");
const Userpost = async(req, res) => {
    const { username, Title, Content, Discription } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username: username });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newpost = {
            Title: Title,
            Content: Content,
            Discription: Discription,
            username: username
        };

        const createdPost = await PostModel.create(newpost);

        res.status(201).json({ message: "Post is created", createdPost });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { Userpost }