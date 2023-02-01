const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const musicController = require('../controllers/musicController')

router.post('',authMiddleware,musicController.createMusicDir)
router.get('',authMiddleware,musicController.fetchMusics)
router.post('/upload',authMiddleware,musicController.uploadMusic)

module.exports=router