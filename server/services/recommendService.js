const Music = require ( "../models/Music" );
const Recommends = require ( "../models/Recommends" );
const musicService = require ( "./musicService" );

class RecommendService {

    async getRecommendMusic( userId , page , limit ) {
        const recommends = await Recommends.findOne ( { user: userId } )
        if (! recommends) {
            const musics = await this.generateRecommendMusic ( userId )
            let recommend = new Recommends ( {
                musics: musics ,
                user: userId
            } )
            await recommend.save ()
            return recommend.musics.slice ( page * limit , (
                page + 1) * limit )
        }
        const total = await Music.countDocuments ( {} )
        return {
            musics: recommends.musics.slice ( page * limit , (
                page + 1) * limit ),
            total :total
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

        while (pullRecommendations.size < total) {
            allMusics.map ( async ( music ) => {
                if (this.checkMusicToAdd ( music.listens.length < avgListens[0].avgLength , 25 )) {
                    pullRecommendations.add ( music )
                }
                if (this.checkMusicToAdd ( music.listens.length > avgListens[0].avgLength , 15 )) {
                    pullRecommendations.add ( music )
                }
                if (music.listens.includes ( userId ) && music.likes.includes ( userId )) {
                    const genres = music.genres
                    const author = music.author
                    const recommendMusics = await Music.find ( { genres: { $in: genres } , author: author } )

                    if (Math.floor ( Math.random () * 100 ) < 50) {
                        recommendMusics.map ( recommendMusic => {
                            pullRecommendations.add ( recommendMusic )
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
            if (Math.floor ( Math.random () * 100 ) < chance) {
                return true
            }
        }
        return false
    }
}

module.exports = new RecommendService ()