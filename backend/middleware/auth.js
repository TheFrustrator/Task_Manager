import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_token_here';

export default async function authMiddleware(req, res, next) {
    // Grab the bearer token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify token
        const payload = jwt.verify(token, JWT_SECRET);

        // ✅ FIXED: Corrected User.findById (not user.findbyId)
        const user = await User.findById(payload.id).select('-password');

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        // Attach user to the request
        req.user = user;
        next();

    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(401).json({ success: false, message: "Token invalid or expired" });
    }
}
