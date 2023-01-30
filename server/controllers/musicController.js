const Music = require('../models/Music')
const musicService=require('../services/musicService')

class MusicController {
    async createMusicDir( req , res ) {
        try {
            const musicDir = {author: req.user.id}
            await musicService.createMusicDir ( musicDir )
            return res.json ( musicDir )
        } catch ( e ) {
            return res.status ( 400 ).json ( e )
        }
    }

    async fetchMusics( req , res ) {
        try {

            const musics = await Music.find ( {author: req.user.id} )
            return res.json ( {musics} )
        } catch ( e ) {
            console.log ( e )
            return res.status ( 500 ).json ( {message: "Can't get musics"} )
        }
    }
}
module.exports=new MusicController()