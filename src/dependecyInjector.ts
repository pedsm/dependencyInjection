import axios from "axios";
import { RequestHandler } from "express";
import { Logger } from "pino";
import { ProductService, UserService } from "./services";
import { v4 as uuid } from 'uuid';

const CORRELATION_ID = 'correlation-id'

const createDependencyInjector: (logger: Logger) => RequestHandler<any> = (logger: Logger) => {
    return (req, _, next) => {
        console.time('DependencyInjector')
        logger.info(req.headers)
        const correlationId = req.headers[CORRELATION_ID] ? req.headers[CORRELATION_ID] : uuid()
        // Create dependencies 
        const http = axios.create()
        const axiosLogger = logger.child({name: 'axios', correlationId})
        http.interceptors.request.use(request => {
            axiosLogger.info({msg: `Making call to ${request.url}`})
            req.headers[CORRELATION_ID] = correlationId
            return request
        })
        http.interceptors.response.use(response => {
            axiosLogger.info({msg: `Received response status: ${response.status}`})
            return response
        })

        const productService = new ProductService(
            http,
            logger.child({ name: 'ProductService', correlationId })
        )

        const userService = new UserService(
            http,
            logger.child({ name: 'UserService', correlationId })
        )

        // Inject dependencies
        req.log = logger
        req.productService = productService
        req.userService = userService
        req.http = http // You may want to not inject this explicitly to force these to be injected into services

        // Complete middleware
        console.timeEnd('DependencyInjector')
        next()
    }
}

export default createDependencyInjector