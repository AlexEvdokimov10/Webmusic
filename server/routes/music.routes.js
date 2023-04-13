const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const musicController = require('../controllers/musicController')

router.post('',authMiddleware,musicController.createMusicDir)
router.get('',authMiddleware,musicController.fetchMusics)
router.post('/upload',authMiddleware,musicController.uploadMusic)
router.get('/get-music',authMiddleware, musicController.getMusic)
router.get('/download',authMiddleware,musicController.downloadMusic)
router.get('/search',authMiddleware,musicController.searchMusic)
router.delete('/',authMiddleware,musicController.deleteMusic)

module.exports=router