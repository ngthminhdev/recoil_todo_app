import jwt from 'jsonwebtoken';

const withAuth = (handler) => {
    return (req, res) => {
        const authorizationHeader = req?.headers['authorization'];
        const token = authorizationHeader?.split(' ')[1];

        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({
                        success: false,
                        message: 'Token is not valid'
                    })
                }
                req.user = user;
                return handler(req, res);
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'You need to be logged in to access!'
            })
        }
    }
}

export default withAuth;