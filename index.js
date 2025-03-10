import express from 'express';
import env from 'dotenv';
import todoRoutes from './routes/todoRoute.js'
env.config();

const app = express();

app.use(express.static('public'))

app.use('/', todoRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`server started at ${process.env.PORT}`)
})