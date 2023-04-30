const User = require("../models/User")
const Music = require("../models/Music")
const Comment = require("../models/Comment")
const ApiError = require ( "../exceptions/api-error" );

class CommentService {
    async addComment(text,musicId,userId){
        const user = await User.findById(userId)
        if(!user){
            return ApiError.BadRequest ( "User isn't found"  )
        }
        const music = await Music.findById(musicId)
        if(!music){
            return ApiError.BadRequest ( "Music isn't found"  )
        }

        const comment = new Comment({
            text:text,
            music:music._id,
            author:user._id,
            authorName:user.nickname,
            authorAvatar:user.avatar,
        })
        await comment.save()
        return comment
    }
    async getComments(musicId){
        const comments = await Comment.find({music: musicId})
        return comments
    }
}
module.exports = new CommentService()