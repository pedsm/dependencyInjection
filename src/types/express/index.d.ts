import { AxiosInstance } from "axios"
import { Logger } from "pino"
import { ProductService, UserService } from "../../services"

declare global {
    namespace Express {
        interface Request {
            log: Logger
            productService: ProductService
            userService: UserService
            http: AxiosInstance
        }
    }
}