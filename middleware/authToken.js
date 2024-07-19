const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        
        if (!token) {
            console.log("hi")
            return res.status(400).json({
                message: "User not logged in",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.JsonTokenSecretKey, function(err, decoded) {
            if (err) {
                console.log("error auth", err);
                return res.status(400).json({
                    message: "Invalid Token",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded.id;
            next();
        });

    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
