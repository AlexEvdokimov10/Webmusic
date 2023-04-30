const config = require ( "config" );
const metadataMusic = import("music-metadata")
const fs = require ( "fs" );
const ApiError = require ( "../exceptions/api-error" );
const UUid = require ( "uuid" );

class FileService {
    async createMusicFile(user,file){
        const type = file.name.split ( '.' ).pop ()
        if (type === "mp3" | type === "wma" | type === "mp2" || type === "amr") {
            let path
            path = `${ config.get ( 'musicPath' ) }\\${ user._id }\\${ file.name }`

            if (fs.existsSync ( path )) {
                throw new ApiError.BadRequest ( "music already exist" )
            }
            file.mv ( path )
            return path
        } else {
            throw new ApiError.BadRequest ( "User has tried upload incorrect format" )
        }
    }

    async createMusicImage(file){
        if(file) {
            const imgName = UUid.v4 () + ".jpg"
            file.mv ( config.get ( 'staticMusicImg' ) + "\\" + imgName )
            return imgName
        }
        return ""
    }

    async calculateDuration(musicFile){
        const metadata = await (
            await metadataMusic).parseBuffer(musicFile.data, 'audio/mpeg');
        const duration = await metadata.format.duration
        return duration
    }
}
module.exports = new FileService()