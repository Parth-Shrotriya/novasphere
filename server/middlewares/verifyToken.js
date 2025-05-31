const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers && req.headers["authorization"].split(" ")[1];
        // Check if token is provided
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No Token Provided",
                data: null
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token",
                data: null
            });
        }

        req.id = decoded.id;
        req.role = decoded.role;

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed Authenticating user",
            data: null
        });
    }
};

module.exports = verifyToken;