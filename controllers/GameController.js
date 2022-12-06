const GameServices = require("../services/GameServices");
const { db } = require("../utility/database");

const GameController = {};

GameController.updateScore = async (req, res) => {
  try {
    const { username, result } = req.body;

    if (!(username && result)) throw ("username and result is required");
    if ( !(result == 'correct' || result == 'incorrect') ) throw ("Result have to be correct or incorrect");

    await GameServices.handleUpdateScore(username, result);

    res.send({ status: "success" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", error: error });
  }
};

GameController.getLeaderBoard = async (req, res) => {
  try {
    
    const leaders = await GameServices.handleGetLeaderBoard();

    res.send({ status: "success", leaders : leaders });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", error: error });
  }
};


module.exports = GameController;
