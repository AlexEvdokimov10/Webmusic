const Music = require ( "../models/Music" );
const Recommends = require ( "../models/Recommends" );
const musicService = require ( "./musicService" );

class RecommendService {

    async createRecommendMusic( userId , page , limit ) {
        const recommends = await Recommends.findOne ( { user: userId } )
        if (! recommends) {
            const musics = await this.generateRecommendMusic ( userId )
            let recommend = new Recommends ( {
                musics: musics ,
                user: userId
            } )
            await recommend.save ()
            return  recommend.musics.slice ( page * limit , (
                    page + 1) * limit )
        }
        const now = Date.now()
        const hours = (now - recommends.updateDate)/3600000;
        if(hours>2) {
            const musics = await this.generateRecommendMusic(userId)
            await Recommends.findOneAndUpdate({user:userId},{musics:musics,updateDate:now})
        }
        return recommends.musics
    }

    async getRecommendMusic(userId , page , limit, genres,sort){
        const total = await Music.countDocuments ( {} )

        let generatedMusics = await this.createRecommendMusic(userId, page, limit)

        const musics = await Music.find({_id:{$in:generatedMusics}, genre:{$in:genres}}).sort(sort).skip ( page * limit ).limit ( limit )
        return {
            musics:musics,
            total:total
        }
    }

    async generateRecommendMusic( userId ) {
        const allMusics = await musicService.getAllMusic ()
        let pullRecommendations = new Set ()
        const avgListens = await Music.aggregate ( [{
            $group: {
                _id: null , avgLength: { $avg: { $size: "$listens" } }
            }
        }] )
        const total = await Music.countDocuments ( {} )
        while(pullRecommendations.size<total) {
            allMusics.map ( async ( music ) => {
                if (this.checkMusicToAdd ( music.listens.length <= avgListens[0].avgLength , 25 )) {
                    pullRecommendations.add ( music._id )
                }
                if (this.checkMusicToAdd ( music.listens.length >= avgListens[0].avgLength , 15 )) {
                    pullRecommendations.add ( music._id )
                }
                if (music.listens.includes ( userId ) && music.likes.includes ( userId )) {
                    const genres = music.genres
                    const author = music.author
                    const recommendMusics = await Music.find ( { genres: { $in: genres } , author: author } )

                    if (Math.floor ( Math.random () * 100 ) < 50) {
                        recommendMusics.map ( recommendMusic => {
                            pullRecommendations.add ( recommendMusic._id )
                        } )
                    }
                }
            } )
        }
        const newArrayPullRecommendations = Array.from ( pullRecommendations )

        return newArrayPullRecommendations
    }

    checkMusicToAdd( condition , chance ) {
        if (condition) {
            let random = Math.floor ( Math.random () * 100 )
            if (random <= chance) {
                return true
            }
        }
        return false
    }
}

module.exports = new RecommendService ()