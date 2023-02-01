const Music = require('../models/Music')
const User = require('../models/User')
const config = require('config')
const musicService=require('../services/musicService')
const fs = require ( "fs" );

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
    async uploadMusic(req,res){
        try{
            const file=req.files.music
            const user=await User.findOne({_id:req.user.id})

            let path;
            path=`${config.get('musicPath')}\\${user._id}\\${file.name}`

            if(fs.existsSync(path)){
                return res.status(400).json({message:"Music already exist"})
            }

            const type = file.name.split('.').pop()

            if(type==="mp3" | type==="wma" | type==="mp2" || type==="amr") {
                file.mv(path)

                const dbMusic = new Music({
                    name: file.name,
                    type:" ",
                    time: 0.00,
                    size: file.size,
                    path: path,
                    author: user._id,
                })
                await dbMusic.save()
                user.musicAmount=await Music.collection.find({user:user._id}).count()
                await user.save()
                res.json(dbMusic)
            }
            else {
                return res.status(415).json({message: "user has tried upload incorrect format"})
            }
        }
        catch (e){
            console.log(e)
            return res.status(500).json({message:"Upload error"})
        }
    }
}
module.exports=new MusicController()