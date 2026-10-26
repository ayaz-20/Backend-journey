const express = require('express');

const cookieParser= require('cookie-parser')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const cors = require("cors");

const app = express();

const postRouter = require('./routes/post.routes')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/tempuser.routes')

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/api/auth",authRouter)
app.use("/api/post",upload.single("image"),postRouter)
app.use('/api/users',userRouter)



module.exports=app;