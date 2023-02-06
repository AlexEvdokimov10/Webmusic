const Music = require('../models/Music')
const User = require('../models/User')
const config = require('config')
const musicService=require('../services/musicService')
const fs = require ( "fs" );
const UUid = require ( "uuid" );

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
            return res.json ( musics )
        } catch ( e ) {
            console.log ( e )
            return res.status ( 500 ).json ( {message: "Can't get musics"} )
        }
    }

    async uploadMusic( req , res ) {
        try {
            const file = req.files.music
            const user = await User.findOne ( {_id: req.user.id} )

            let path;
            path = `${config.get ( 'musicPath' )}\\${user._id}\\${file.name}`

            if (fs.existsSync ( path )) {
                return res.status ( 400 ).json ( {message: "Music already exist"} )
            }

            const type = file.name.split ( '.' ).pop ()

            if (type === "mp3" | type === "wma" | type === "mp2" || type === "amr") {
                file.mv ( path )

                const dbMusic = new Music ( {
                    name: file.name ,
                    type: " " ,
                    time: 0.00 ,
                    size: file.size ,
                    path: path ,
                    author: user._id ,
                } )
                await dbMusic.save ()
                user.musicAmount = await Music.collection.find ( {user: user._id} ).count ()
                await user.save ()
                res.json ( dbMusic )
            } else {
                return res.status ( 415 ).json ( {message: "user has tried upload incorrect format"} )
            }
        } catch ( e ) {
            console.log ( e )
            return res.status ( 500 ).json ( {message: "Upload error"} )
        }
    }

    async downloadMusic( req , res ) {
        try {
            const music = await Music.findOne ( {_id: req.query.id , author: req.user.id} )
            if (fs.existsSync ( music.path )) {
                return res.download ( music.path , music.name )
            }
            console.log ( res.status ( 400 ) )
            return res.status ( 400 ).json ( {message: "Download error"} )
        } catch ( e ) {
            console.log ( e )
            return res.status ( 500 ).json ( {message: "Download error"} )
        }
    }

    async deleteMusic( req , res ) {
        try {
            const music = await Music.findOne ( {_id: req.query.id , author: req.user.id} )
            if (! music) {
                return res.status ( 400 ).json ( {message: 'music file not found'} )
            }
            await musicService.deleteMusic ( music )
            await music.remove ()
            return res.json ( {message: 'Music was deleted'} )
        } catch ( e ) {
            console.log ( e )
            return res.status ( 400 ).json ( {message: "music couldn't be deleted"} )
        }

    }

    async getMusic( req , res ) {
        try {
            const music = await Music.findOne ( {_id: req.query.id , user: req.user.id} )
            let path = music.path
            if (fs.existsSync ( path )) {
                return res.download ( path , music.name )
            }

            console.log ( res.status ( 400 ) )
        } catch ( e ) {
            console.log ( e )
            return res.status ( 500 ).json ( {message: "Can not get musics"} )

        }
    }
}
module.exports=new MusicController()