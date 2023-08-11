const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware=require('../middleware/role.middleware')
const albumController = require('../controllers/albumController')

router.post("/create",roleMiddleware(["COMPOSITOR"]),albumController.createAlbum)
router.get("/musics",authMiddleware,albumController.getMusicsByAlbum)
router.patch("/musics",authMiddleware,albumController.deleteMusic)
router.get("",authMiddleware,albumController.getAlbums)
router.delete("/delete",roleMiddleware(["COMPOSITOR"]),albumController.deleteAlbum)

module.exports=router