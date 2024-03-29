const musicService=require('../services/musicService')
const recommendService=require('../services/recommendService')
const commentService = require("../services/commentService")
const ApiError = require("../exceptions/api-error")

class MusicController {
    async createMusicDir( req , res ,next) {
        try {
            const musicDir = {author: req.user.id}
            await musicService.createMusicDir ( musicDir )
            return res.json ( musicDir )
        } catch ( e ) {
            next(e)
        }
    }

    async fetchMusics( req , res ,next) {
        try {
            const sort=req.query.sort
            const limit = req.query.limit
            const page = req.query.page
            const genres = req.query.genres
            let musics = await musicService.fetchMusics(sort,req.user.id,page,limit,genres)
            return res.json ( musics )
        } catch ( e ) {
            next(e)
        }
    }

    async getMusicsProfile( req , res ,next) {
        try {
            const userId = req.params.id
            console.log("UserId:"+userId)
            const sort=req.query.sort
            const limit = req.query.limit
            const page = req.query.page
            const genres = req.query.genres
            let musics = await musicService.fetchMusics(sort,userId,page,limit,genres)
            return res.json ( musics )
        } catch ( e ) {
            next(e)
        }
    }

    async uploadMusic( req , res ,next) {
        try {
            const music = req.body
            const dbMusic = await musicService.uploadMusic(req.files,req.user.id,music)
            return res.json ( dbMusic )
        } catch ( e ) {
            next(e)
        }
    }

    async editMusic(req, res, next) {
        try {
            const music = req.body
            const updateMusic = await musicService.edit(req.files,req.user.id,req.params.id,music)
            return res.json(updateMusic)
        } catch ( e ) {
            next(e)
        }
    }

    async downloadMusic( req , res , next) {
        try {
            const musicData = await musicService.download(req.query.id)
            if(musicData){
                return res.download ( musicData.path , musicData.name )
            }
            return res.status ( 400 ).json ( {message: "Download error"} )
        } catch ( e ) {
            next(e)
        }
    }

    async deleteMusic( req , res , next) {
        try {
            await musicService.deleteMusic(req.query.id,req.user.id)
            return res.json ( {message: 'music was deleted'} )
        } catch ( e ) {
            next(e)
        }

    }

    async playMusic( req , res, next ) {
        try {
            const music = await musicService.play(req.user.id,req.query.id)
            if(music){
                return res.sendFile ( music.path , music.name )
            }
            return next(ApiError.BadRequest("Download exception"))
        } catch ( e ) {
            next(e)
        }
    }

    async getMusic(req,res,next){
        try {
            const music = await musicService.getMusicOne(req.params.id)
            return res.json ( music )
        } catch ( e ) {
           next(e)
        }
    }

    async searchMusic(req,res,next) {
        try {
            const searchName = req.query.search
            const page =req.query.page
            const limit = req.query.limit
            const genres = req.query.genres
            const sort=req.query.sort
            let musics = await musicService.searchMusic(searchName,req.user.id,page,limit,genres,sort)
            return res.json(musics)
        } catch ( e ) {
           next(e)
        }
    }

    async searchProfileMusic(req,res,next) {
        try {
            const searchName = req.query.search
            const page =req.query.page
            const limit = req.query.limit
            const userId =req.query.id
            const genres = req.query.genres
            const sort=req.query.sort
            let musics = await musicService.searchMusic(searchName,userId,page,limit,genres,sort)
            return res.json(musics)
        } catch ( e ) {
            next(e)
        }
    }
    async searchRecommendMusic(req,res,next) {
        try {
            const searchName = req.query.search
            const page =req.query.page
            const limit = req.query.limit
            const genres = req.query.genres
            let musics = await musicService.searchRecommendMusic(searchName,page,limit,genres)
            return res.json(musics)
        } catch ( e ) {
            next(e)
        }
    }

    async findAuthorById(req,res,next){
        try {
            const author = await musicService.findAuthorById (req.query.author)
            return res.json(author)
        } catch ( e ) {
            next(e)
        }
    }

    async addCommentMusic(req,res,next){
        try {
            console.log(req.body.text)
            const dbComment = await commentService.addComment ( req.body.text , req.query.id , req.user.id )
            return res.json ( dbComment )
        }
        catch ( e ) {
            next(e)
        }
    }

    async getComments(req,res,next){
        try {
            const comments = await commentService.getComments(req.query.id)
            return res.json(comments)
        } catch ( e ) {
            next(e)
        }
    }

    async likeMusic(req,res,next){
        try {
            const likedMusic = await musicService.like(req.user.id,req.query.id)
            return res.json(likedMusic)
        } catch ( e ) {
            next(e)
        }
    }

    async getRecommendMusic(req,res,next){
        try {
            const sort = req.query.sort
            const userId =req.user.id;
            const page =req.query.page
            const limit = req.query.limit
            const genres = req.query.genres
            const musics = await recommendService.getRecommendMusic(userId, page, limit, genres,sort )
            return res.json(musics)
        } catch ( e ) {
            next(e)
        }
    }


}
module.exports=new MusicController()