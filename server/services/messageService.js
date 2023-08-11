const Message = require ( "../models/Message")

class MessageService {
    async postMessage(question,userId){
        const message = new Message({
            text:question,
            date:Date.now(),
            author:userId
        })
        await message.save()
        return message
    }

    async getMessages(){
        const messages = await Message.find({})
        return messages
    }
}
module.exports = new MessageService()