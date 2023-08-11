const fs = require ( 'fs' )
const config = require ( "config" )
const Music = require ( "../models/Music" );
const User = require ( "../models/User" );
const ApiError = require ( "../exceptions/api-error" )
const FileService = require ( "./fileService" )
const GenreService = require ( "./genreService" )



class MusicService {
    createMusicDir( musicDir ) {

        const musicPath = `${ config.get ( 'musicPath' ) }\\${ musicDir.author }`

        return new Promise ( ( resolve , reject ) => {
            try {
                if (! fs.existsSync ( musicPath )) {
                    fs.mkdirSync ( musicPath )
                    return resolve ( { message: "MusicList was add" } )
                } else {
                    return reject ( { message: 'MusicList already exist' } )
                }
            } catch ( e ) {
                return reject ( { message: e.message } )
            }
        } )
    }

    async fetchMusics( sort, userId , page , limit ,genres ) {
        console.log("page"+page)
        console.log("limit:"+limit)
        console.log("genres:"+genres)

        let musics
        switch (sort) {
            case 'name':
                musics = await Music.find ( { author: userId,genre:{$in:genres} } ).sort ( { name: 1 } ).skip ( page * limit ).limit ( limit )
                break
            case 'time':
                musics = await Music.find ( { author: userId,genre:{$in:genres}  } ).sort ( { time: 1 } ).skip ( page * limit ).limit ( limit )
                break
            case 'date':
                musics = await Music.find ( { author: userId,genre:{$in:genres}  } ).sort ( { date: 1 } ).skip ( page * limit ).limit ( limit )
                break
            default:
                musics = await Music.find ( { author: userId,genre:{$in:genres}  } ).skip ( page * limit ).limit ( limit )
                break
        }
        const total = await Music.countDocuments ( { author: userId, genre:{$in:genres}} )
        return {
            musics: musics , total: total
        }
    }

    async uploadMusic( files , id , music ) {
        const user = await User.findOne ( { _id: id } )

        let path = await FileService.createMusicFile ( user , files.music );
        const imgName = await FileService.createMusicImage ( files.image )

        const time = await FileService.calculateDuration ( files.music )

        const genresArray = await GenreService.findGenreByValue ( music )


        const dbMusic = new Music ( {
            name: music.name ,
            genre: genresArray ,
            path: path ,
            time: time ,
            image: imgName ,
            description: music.description ,
            author: user._id ,
        } )
        await dbMusic.save ()
        await user.save ()
        return dbMusic
    }

    async download( musicId ) {
        const musicData = await Music.findById ( { _id: musicId } )
        if (! musicData) {
            return ApiError.BadRequest ( 'Music file not found' )
        }
        if (fs.existsSync ( musicData.path )) {
            return musicData
        }
    }

    async play( userId , musicId ) {
        const musicData = await Music.findById ( { _id: musicId } )
        await this.listen ( userId , musicId )
        if (! musicData) {
            return ApiError.BadRequest ( 'Music file not found' )
        }
        if (fs.existsSync ( musicData.path )) {
            return musicData
        }
    }

    async listen( userId , musicId ) {
        const musicData = await Music.findOne ( { _id: musicId } )
        if (musicData.listens.includes ( userId )) {
            console.log ( "user is existed" )
        } else {
            musicData.listens.push ( userId )
            musicData.save ()
        }
    }

    async like( userId , musicId ) {
        const musicData = await Music.findOne ( { _id: musicId } )
        if (musicData.likes.includes ( userId )) {
            musicData.likes.pull ( userId )
            await musicData.save ()
        } else {
            musicData.likes.push ( userId )
            await musicData.save ()
        }
        return musicData
    }

    async deleteMusic( musicId , userId ) {
        const music = await Music.findOne ( { _id: musicId , author: userId } )
        if (! music) {
            return ApiError.BadRequest ( 'Music file not found' )
        }
        await this.deleteMusicFile ( music )
        await music.remove ()
    }

    async deleteMusicFile( music ) {
        const path = music.path
        fs.unlinkSync ( path )
        const image = music.image
        if (image) {
            fs.unlinkSync ( config.get ( 'staticMusicImg' ) + "\\" + image )
        }
    }

    async getMusicOne( musicId ) {
        const music = await Music.findOne ( { _id: musicId } )
        return music
    }

    async searchMusic( searchName , userId , page , limit,genres, sort ) {
        let musics = await Music.find ( { name:{$regex:searchName,$options:"i"},author: userId , genre:{$in:genres} } ).sort(sort).skip(page*limit).limit(limit)
        const total = await Music.countDocuments ( { name:{$regex:searchName,$options:"i"}, author: userId , genre:{$in:genres} } )
        return {
            musics: musics , total: total
        }
    }

    async searchRecommendMusic( searchName , page , limit,genres ) {
        let musics = await Music.find ( { name:{$regex:searchName,$options:"i"}, genre:{$in:genres}} ).skip(page*limit).limit(limit)
        const total = await Music.countDocuments ( { name:{$regex:searchName,$options:"i"}, genre:{$in:genres}} )
        return {
            musics: musics , total: total
        }
    }

    async findAuthorById( authorId ) {
        const author = await User.findOne ( { _id:authorId } )
        if(author) {
            return (
                {
                    _id: author._id, nickname: author.nickname, email: author.email, avatar: author.avatar
                })
        }
        return ApiError.BadRequest ( 'User not found' )
    }

    async getAllMusic() {
        const musics = await Music.find ( {} )
        return musics
    }
    async edit(files,userId, musicId ,music){
        const genresArray = await GenreService.findGenreByValue ( music )
        const imgName = await FileService.createMusicImage ( files.image )
        const updateMusic = await Music.findOneAndUpdate({music:musicId,author:userId},{
            name:music.name,
            image:imgName,
            genre:genresArray,
            description:music.description
        })
        return updateMusic
    }


}

module.exports = new MusicService ()