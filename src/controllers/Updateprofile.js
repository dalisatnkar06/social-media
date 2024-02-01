const { UserModel, ProfileModel } = require("../models/user");
const Updateprofile = async(req, res) => {
    const { username, Bio } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username: username });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingProfile = await ProfileModel.findOne({ username: username });

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        existingProfile.Bio = Bio;
        await existingProfile.save();

        res.status(200).json({ message: "Update profile", existingProfile });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


module.exports = { Updateprofile }