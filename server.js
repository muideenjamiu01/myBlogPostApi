
const express = require('express');
require('./app/db/mongoose')
const BlogPost = require('./app/router/blogspot')
const userRouter = require('./app/router/user')






const app = express()
const port = process.env.PORT 




app.use(express.json())
app.use(BlogPost)
app.use(userRouter)

app.listen(port,() =>{
    console.log('the server is up on port ' + port)
})

