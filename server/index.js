const express = require("express")
const mongoose=require("mongoose")
const config=require("config")
const fileUpload = require("express-fileupload")
const authRouter=require("./routes/auth.routes")
const musicRouter = require("./routes/music.routes")
const genreRouter = require("./routes/genre.routes")
const playlistRouter = require("./routes/playlist.routes")
const roleRouter = require("./routes/role.routes")
const albumRouter = require("./routes/album.routes")
const messageRouter = require("./routes/message.routes")
const corsMiddleware = require("./middleware/cors.middlware")
const errorMiddleware = require("./middleware/error-middleware")

const app=express()
const PORT =config.get("serverPort")

app.use(fileUpload({}))

app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static/avatars'))
app.use(express.static('static/musicImg'))
app.use(express.static('static/albumsImg'))
app.use("/api/auth/edit-user",authRouter)
app.use("/api/auth/avatar",authRouter)
app.use("/api/auth",authRouter)
app.use("/api/musics",musicRouter)
app.use("/api/genres",genreRouter)
app.use("/api/playlists",playlistRouter)
app.use("/api/albums",albumRouter)
app.use("/api/roles",roleRouter)
app.use("/api/messages",messageRouter)
app.use(errorMiddleware)


const start = async () => {
  try{
    await mongoose.connect(config.get("dbUrl"))

    app.listen(PORT,()=>{
      console.log("Server started on PORT", PORT)
    })
  }
  catch (e){
    console.log(e)
  }
}
start()