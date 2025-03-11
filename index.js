import express from 'express';
import env from 'dotenv';
import todoRoutes from './routes/todoRoute.js'
env.config();

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.json())
app.use(express.static('public'))

app.use('/', todoRoutes)

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})