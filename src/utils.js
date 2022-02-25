import verifyPkg from 'jsonwebtoken';
const APP_SECRET = 'prismaDb';

const { verify } = verifyPkg;

function getTokenPayload(token) {
    return verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            const { userId } = getTokenPayload(token);
            return userId;
        }
    } else if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
    }

    throw new Error('Not authenticated');
}

export default {
    APP_SECRET,
    getUserId
};