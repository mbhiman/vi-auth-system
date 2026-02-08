const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

function createToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}

exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Missing fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
        return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    const token = createToken(user._id);

    res
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
        })
        .status(201)
        .json({ email: user.email });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user._id);

    res
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
        })
        .json({ email: user.email });
};

exports.logout = async (req, res) => {
    res.clearCookie("token").json({ message: "Logged out" });
};

exports.me = async (req, res) => {
    res.json({ email: req.user.email });
};
