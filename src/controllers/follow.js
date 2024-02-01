const { ProfileModel } = require("../models/user");

const follow = async(req, res) => {
    if (req.body.userId != req.params._id) {
        try {
            const user = await ProfileModel.findById(req.params._id);
            const currentUser = await ProfileModel.findById(req.body.userId);

            if (!user.follower.includes(req.body.userId)) {
                await user.updateOne({ $push: { follower: req.body.userId } });
                await currentUser.updateOne({ $push: { following: req.params._id } });
                return res.status(201).json({ message: "you have to followed this user" });
            } else {
                return res.status(404).json({ message: "You already followed " });
            }
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: "Something went wrong" });
        }
    }
};

module.exports = { follow };