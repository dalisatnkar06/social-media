const { UserModel, PostModel } = require("../models/user");
const Userpost = async(req, res) => {
    const { email, Title, Content, Discription } = req.body;

    try {
        const existingUser = await UserModel.findOne({email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newpost = {
            Title: Title,
            Content: Content,
            Discription: Discription,
            email:email
        };

        const createdPost = await PostModel.create(newpost);

        res.status(201).json({ message: "Post is created", createdPost });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { Userpost }