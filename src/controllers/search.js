const { ProfileModel } = require("../models/user");

const search = async(req, res) => {
    const { email} = req.body;

    try {
        const userProfile = await ProfileModel.findOne({ email });

        if (userProfile) {
            console.log('User Profile:', userProfile);
            res.status(200).json({ message: "User profile retrieved successfully", userProfile });
        } else {
            res.status(404).json({ message: "User profile not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { search };