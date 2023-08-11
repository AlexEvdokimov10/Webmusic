const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const messageController = require('../controllers/messageController')

router.get("/getMessage",authMiddleware,messageController.getMessage)
router.post("/sendMessage",authMiddleware,messageController.sendQuestion)


module.exports=router