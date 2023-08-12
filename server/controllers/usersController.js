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

            await db.query("INSERT INTO users (userName, password) VALUES ($1, $2)", [userName, password]);

            return res.status(200).json({ msg: "Registration complete" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { userName, password } = req.body;

            const user = await db.query("SELECT * FROM users WHERE username = $1 and password = $2", [userName, password]);

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
            res.clearCookie("credentials", { path: "/" });

            return res.status(200).json({ msg: "Logged out" });
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createTask: async (req, res) => {
        try {
            const { taskName, dateOfCompletion } = req.body;
            const user = await db.query("SELECT * FROM tasks WHERE userid = $1 AND taskname = $2 AND dateofcompletion = $3",
                [req.id, taskName, dateOfCompletion]);

            if (user.rows.length !== 0) {
                return res.status(400).json({ msg: "Task already exists" });
            }

            const newTask = await db.query("INSERT INTO tasks" +
                "(userid, taskname, dateofcompletion) VALUES ($1, $2, $3)", [req.id, taskName, dateOfCompletion]);

            return res.status(200).json({ msg: "Task creation complete" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getAllTasks: async (req, res) => {
        try {
            const tasks = await db.query("SELECT *, CAST(dateofcompletion AS varchar) as dateofcompletion FROM tasks where userid = $1", [req.id]);

            return res.status(200).json(tasks.rows);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getTask: async (req, res) => {
        try {
            const task = await db.query("SELECT *, CAST(dateofcompletion AS varchar) as dateofcompletion FROM tasks where taskid = $1", [req.query.taskid]);

            return res.status(200).json(task.rows[0]);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateTask: async (req, res) => {
        try {
            const { id, taskname, dateofcompletion } = req.body;

            const task = await db.query("SELECT * FROM tasks WHERE taskname = $1 AND dateofcompletion = $2", [taskname, dateofcompletion]);

            if(task.rows.length !== 0 && task.rows[0].taskid !== parseInt(id)){
                return res.status(400).json({ msg: "Task already exists" });
            }

            await db.query("UPDATE tasks SET taskname = $1, dateofcompletion = $2 WHERE taskid = $3", [taskname, dateofcompletion, id]);
            return res.status(200).json({msg: "Update complete"});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteTask: async (req, res) => {
        try {
            const { taskid } = req.body;

            await db.query("DELETE FROM tasks WHERE taskid = $1", [taskid]);
            
            return res.status(200).json({msg: "Deletion complete"});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }, 
    completeTask: async (req, res) => {
        try {
            const { id } = req.body;

            await db.query("UPDATE tasks SET status = $1 WHERE taskid = $2", [true, id]);
            return res.status(200).json({msg: "Update complete"});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteAccount: async (req, res) => {
        try {
            await db.query("DELETE FROM tasks WHERE userid = $1", [req.id]);
            await db.query("DELETE FROM users WHERE userid = $1", [req.id]);
            return res.status(200).json({msg: "Account deletion complete"});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
};

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "7d" });
}

module.exports = usersController;
