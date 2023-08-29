const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const credentials = req.cookies.credentials;
        jwt.verify(credentials.token.toString(), process.env.JWTSECRET, (err, credentials) => {
            if(err)
                return res.status(400).json(err);
            
            req.id = credentials.id;
            next();
        });
    
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

module.exports = auth;
