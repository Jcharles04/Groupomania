import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
        const userId = decodedToken.id;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            req.userId = userId;
            next();
        }
    } catch {
        res.status(401).json({
        error: new Error('Invalid request!')
        });
    }
    return res;
};