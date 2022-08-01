import express from 'express'
import Logger from 'pino'
import createDependencyInjector from './dependecyInjector'
import { userController, productController } from './controllers'

const app = express()
const logger = Logger()


app.use(createDependencyInjector(logger))

app.get('/product/:id', productController.getById)
app.get('/user/:id', userController.getById)

app.listen('3000', () => {
    logger.info(`App listening on port ${3000}`)
})
