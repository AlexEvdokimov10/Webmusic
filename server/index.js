const express = require("express")
const mongoose=require("mongoose")
const config=require("config")
const fileUpload = require("express-fileupload")
const authRouter=require("./routes/auth.routes")
const musicRouter = require("./routes/music.routes")
const corsMiddleware = require("./middleware/cors.middlware")

const app=express()
const PORT =config.get("serverPort")

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/musics",musicRouter)

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