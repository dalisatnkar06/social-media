const { UserModel, ProfileModel, PostModel } = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'YOUR_SECRET_KEY';



const signup = async(req, res) => {
    const { username, password, email, gender, MNO, Bio } = req.body;
    try {
        const existingUser = await UserModel.findOne({
            username: username
        });

        if (existingUser) {
            return res.status(400).json({ message: "User alresdy exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await UserModel.create({
            email,
            password: hashedPassword,
            username
        });

        const token = jwt.sign({ email: result.email, id: result._id }, secretKey);
        res.status(201).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "somthing went wrong" });
    }
}



const signin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({
            email: email
        });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secretKey);
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};



// const Userprofile = async(req, res) => {
//     const { username, email, gender, MNO, Bio } = req.body;

//     try {


//         const existingUser = await UserModel.findOne({ email: email });

//         if (!existingUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const newProfile = await ProfileModel.create({
//             username: username,
//             email: email,
//             gender: gender,
//             MNO: MNO,
//             Bio: Bio
//         });

//         res.status(201).json({ message: "profile ", newProfile });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };


// const Updateprofile = async(req, res) => {
//     const { email, Bio } = req.body;

//     try {
//         const existingUser = await UserModel.findOne({ email: email });

//         if (!existingUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const existingProfile = await ProfileModel.findOne({ email: email });

//         if (!existingProfile) {
//             return res.status(404).json({ message: "Profile not found" });
//         }
//         existingProfile.Bio = Bio;
//         await existingProfile.save();

//         res.status(200).json({ message: "Update profile", existingProfile });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };



// const UserPost = async(req, res) => {
//     const { email, Title, Content, Discription } = req.body;

//     try {
//         const existingUser = await UserModel.findOne({ email: email });

//         if (!existingUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const newpost = {
//             Title: Title,
//             Content: Content,
//             Discription: Discription,
//             user: existingUser._id
//         };

//         const createdPost = await PostModel.create(newpost);

//         res.status(201).json({ message: "Post is created", createdPost });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };


module.exports = { signup, signin };