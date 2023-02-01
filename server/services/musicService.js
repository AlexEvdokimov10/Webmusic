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
    async deleteMusic(music){
        const path= music.path
        fs.unlinkSync(path)
    }

}
module.exports = new MusicService()