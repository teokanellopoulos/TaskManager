const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const usersController = {
    register: async (req, res) => {
        try {
            const { userName, password } = req.body;
            const user = await db.query("SELECT * FROM users WHERE userName = $1", [userName]);

            if (user.rows.length !== 0) {
                return res.status(400).json({ msg: "User already exists" });
            }

            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be longer than 6 characters" });
            }

            const newUser = await db.query("INSERT INTO users" +
                "(userName, password) VALUES ($1, $2)", [userName, password]);

            return res.status(200).json({ msg: "Registration complete" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { userName, password } = req.body;
            const user = await db.query("SELECT * FROM users WHERE userName = $1 and password = $2", [userName, password]);

            if (userName === "" || password === "") {
                return res.status(400).json({ msg: "Fill all missing fields" });
            }

            if (user.rows.length === 0) {
                return res.status(400).json({ msg: "Incorrect credentials" });
            }

            const token = createToken({ id: user.rows[0].userid });

            res.cookie("credentials", {
                    userName: userName,
                    token: token
                }, {
                    httpOnly: false,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                }
            );

            return res.status(200).json({ msg: "Logged in successfully" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    logout: (req, res) => {
        try {
            res.clearCookie("credentials", {path: "/"});
            
            return res.status(200).json({msg: "Logged out"});
        } catch (error) {
            return res.status(500).json({msg: err.message});
        }
    },
};

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "7d" });
}

module.exports = usersController;
