var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var gameRouter = require("./routes/games");
const { errorHandler } = require("./middleware/errorHandler");
const { authCheck } = require("./middleware/authCheck");
const { db, createAllTable } = require("./utility/database");
const { createRedisInstance } = require("./utility/redis");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// default Routes
app.use("/", authCheck, usersRouter);
app.use("/", authCheck, gameRouter);

// default error handler
app.use(errorHandler);

createAllTable(db);

const client = createRedisInstance();

client.on("error", function(err) {
  console.log("Redis Error: " + err)
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app listening at port 3000");
});
