const UserServices = require("../services/UserServices");
const { db } = require("../utility/database");

const UserController = {};

UserController.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) throw ("Username and password is required");

    const row = await UserServices.handleLogin( username, password);

    res.send({ status: (row && row.id && "success") || "failed" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", error: error });
  }
};

UserController.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) throw ("Username and password is required");

    const success = await UserServices.handleRegister( username, password);

    res.send({ status: (success && "success") || "failed" });

  } catch (error) {
    console.log(error);
    res.status(500).json({status: "failed", error: error});
  }
};

module.exports = UserController;
