import { AxiosInstance } from "axios";
import { Logger } from "pino";

type Product = object
type User = object

export class ProductService {
    constructor(private readonly httpClient: AxiosInstance, private readonly logger: Logger) { }

    async getById(id: string): Promise<Product | null> {
        this.logger.info(`Getting item by id: ${id}`)
        try {
            const product = (await this.httpClient.get(`https://dummyjson.com/products/${id}`)).data
            this.logger.info(`Received response`)
            return product
        } catch (e) {
            this.logger.error(e)
            return null
        }

    }
}

export class UserService {
    constructor(private readonly httpClient: AxiosInstance, private readonly logger: Logger) { }

    async getById(id: string): Promise<User | null> {
        this.logger.info(`Getting user by id: ${id}`)
        try {
            const user = (await this.httpClient.get(`https://dummyjson.com/users/${id}`)).data
            this.logger.info(`Received response`)
            return user
        } catch (e) {
            this.logger.error(e)
            return null
        }
    }
}