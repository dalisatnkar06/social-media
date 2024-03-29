const { UserModel} = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const secretKey = 'YOUR_SECRET_KEY';



const signup = async(req, res) => {
    const { username, password, email } = req.body;
    try {
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address format" });
        }

        // Validate password complexity
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character." });
        }
        const existingUser = await UserModel.findOne({
            email: email
        });

        if (existingUser) {
            return res.status(400).json({ message: "User alresdy exists" })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const result = await UserModel.create({
            email,
            password: hashedPassword,
            username
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.secretKey);
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

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id },process.env.secretKey);
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};



module.exports = { signup, signin };