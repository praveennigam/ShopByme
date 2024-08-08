import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async(req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const token = authorization.split(' ')[1];

    try {
        const token_decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = { _id: token_decode.id };
        next();
    } catch (error) {
        console.error("Error verifying JWT token:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export default authMiddleware;