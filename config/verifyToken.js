const jwt = require("jsonbewtoken");
const config = require("./global")
function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"].split;
    if (!token) {
        return res.status(400).json({
            auth: false,
            message: "No hay token"
        })
    }
    const decoded = jwt.verify(token, config.secret)
    req.userId= decoded.userId
    next();

}

module.exports = verifyToken