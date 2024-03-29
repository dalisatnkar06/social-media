const { UserModel, ProfileModel } = require("../models/user");
const Updateprofile = async(req, res) => {
    const { email, Bio,username,MNO,gender } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email:email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingProfile = await ProfileModel.findOne({email:email });

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        existingProfile.Bio = Bio;
        existingProfile.username = username;
        existingProfile.gender = gender;
        existingProfile.MNO = MNO;
        await existingProfile.save();

        res.status(200).json({ message: "Update profile", existingProfile });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


module.exports = { Updateprofile }