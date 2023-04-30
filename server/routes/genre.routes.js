const Router = require("express")
const router = new Router()
const authMiddleware = require ( "../middleware/auth.middleware" );
const genreController = require("../controllers/genreController")


router.get("",authMiddleware,genreController.getAllGenre)

module.exports=router