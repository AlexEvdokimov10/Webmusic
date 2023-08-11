const Router = require("express")
const router = new Router()
const authMiddleware = require ( "../middleware/auth.middleware" );
const genreController = require("../controllers/genreController")
const roleMiddleware = require("../middleware/role.middleware");


router.get("",authMiddleware,genreController.getAllGenre)
router.post("genres/create",roleMiddleware(["ADMIN"]),genreController.createGenre)

module.exports=router