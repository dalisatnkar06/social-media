const { UserModel, ProfileModel } = require("../models/user");
const Userprofile = async(req, res) => {
    const { username, email, gender, MNO, Bio } = req.body;

    try {


        const existingUser = await UserModel.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newProfile = await ProfileModel.create({
            username: username,
            email: email,
            gender: gender,
            MNO: MNO,
            Bio: Bio
        });

        res.status(201).json({ message: "profile ", newProfile });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { Userprofile }