const express = require('express');
const cookieParser= require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const app = express();
const postRouter = require('./routes/post.routes')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/post",upload.single("image"),postRouter)



module.exports=app;