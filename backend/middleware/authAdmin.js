import jwt from 'jsonwebtoken';

export default function authAdmin(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
        const admin = decodedToken.isModerator;
        if (admin != 1){
            throw 'Invalid user admin';
        } else {
            req.admin = admin;
            next();
        }
    } catch {
        res.status(401).json({
        error: new Error('Invalid request!')
        });
    }
    return res;
};