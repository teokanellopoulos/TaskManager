require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//initialize routes
app.use("/auth", require("./routes/usersRouter.js"));

app.listen(4000, () => {
    console.log("Server started on port 4000");
});
