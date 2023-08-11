const Router = require("express")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const playlistController = require('../controllers/playlistController')

router.post('/create',authMiddleware,playlistController.createPlaylist)
router.patch("/musics",authMiddleware,playlistController.addMusic)
router.get('',authMiddleware,playlistController.getPlaylists)
router.get('/musics',authMiddleware,playlistController.getMusicsByPlaylist)
router.delete('/musics', authMiddleware, playlistController.deleteMusic)
router.delete("",authMiddleware,playlistController.deletePlaylist)

module.exports=router