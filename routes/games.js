const  express =  require("express");
const GameController = require("../controllers/GameController");
const router = express.Router();

router.post("/update", GameController.updateScore);
router.get("/leaders", GameController.getLeaderBoard);

module.exports =  router;