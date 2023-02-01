const fs = require('fs')
const config = require("config")


class MusicService {
    createMusicDir(musicDir) {

        const musicPath=`${config.get('musicPath')}\\${musicDir.author}`

        return new Promise ((resolve,reject)=> {
            try {
                if (!fs.existsSync ( musicPath )) {
                    fs.mkdirSync ( musicPath )
                    return resolve ( {message: "MusicList was add"} )
                }
                else {
                    return reject({message: 'MusicList already exist'})
                }
            }
            catch (e) {
                return reject({message:e.message})
            }
        })
    }
    createMusic(music) {

        const musicPath=`${config.get('musicPath')}\\${music.author}\\${music.path}`
        return new Promise((resolve,reject)=>{
            try{
                if(!fs.existsSync(musicPath)){
                    fs.mkdirSync(musicPath)
                    return  resolve({message:'MusicList was add'})
                } else {
                    return reject({message: 'MusicList already exist'})
                }
            }
            catch (e){
                return reject({message:'MusicList error'})
            }
        })
    }

}
module.exports = new MusicService()