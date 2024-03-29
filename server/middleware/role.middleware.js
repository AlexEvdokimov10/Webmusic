const jwt = require('jsonwebtoken')
const config = require ( "config" );


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User isn't authorized"})
            }
            const decode = jwt.verify(token, config.get("secretKey"))
            console.log(decode)
            let hasRole = false
            decode.roles?.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "You don't have access"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "User isn't authorized"})
        }
    }
};