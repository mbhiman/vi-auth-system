const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

module.exports = async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.sendStatus(401);

        req.user = user;
        next();
    } catch {
        res.sendStatus(401);
    }
};
