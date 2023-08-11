const events = require('events')
const emitter = new events.EventEmitter()
const messageService = require("../services/messageService")
const musicService = require("../services/musicService")

class MessageController {
    async getMessage(req,res,next){
        try {
            /*emitter.once('newMessage', async (message) => {
                const author = await musicService.findAuthorById(message.author)
                return res.json({message:message,author:author})
            })*/
        } catch (e) {
            next(e)
        }
    }

    async getMessages(req,res,next){
        try {
            emitter.once('getMessages',()=>{
                
            })
        } catch (e) {
            next(e)
        }
    }

    async sendQuestion(req,res,next){
        try {
            const text = req.body.message
            const userId = req.user.id
            const message = await messageService.postMessage(text,userId)
            emitter.emit('newMessage',message)
            return res.status(200).json("ok")
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MessageController()