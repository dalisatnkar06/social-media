//Read All Post

// const { UserModel, PostModel } = require("../models/user");

// const ReadPost = async(req, res) => {
//     try {
//         // Assuming you have a PostModel and you want to retrieve all posts
//         const allPosts = await PostModel.find({});

//         console.log('All Posts:', allPosts);

//         res.status(200).json({ message: "All posts retrieved successfully", allPosts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// module.exports = { ReadPost };




const { UserModel, PostModel } = require("../models/user");

const ReadPost = async(req, res) => {
    const { username } = req.body;

    try {
        const user = await UserModel.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userPosts = await PostModel.find({
            username: username
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