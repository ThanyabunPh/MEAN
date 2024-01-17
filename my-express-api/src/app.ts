import express, {Express, Request, Response, NextFunction} from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './environment/swaggerConfig';
import index_router from './routes'
import todo_router from './routes/todos.route'
import dotenv from 'dotenv';
import cors from 'cors';
import connect from "./database/connect";
import {loggerMiddleware, errorHandler} from "./utlis";


dotenv.config();

const app: Express = express()
const PORT = process.env.PORT || 3000
const mongoDBURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/database'

// Connect to MongoDB
connect(mongoDBURL)

// CORS
app.use(cors())

// Middlewares
app.use(loggerMiddleware)
app.use(express.json())

// Routes
app.use('/', index_router)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/todo', todo_router)
app.use((req: Request, res: Response) => {
  res.status(404).send({
    message: '404 Not Found',
  })
})

app.use(errorHandler)


app.listen(PORT, () => console.log(`Application is running on http://localhost:${PORT}`))

