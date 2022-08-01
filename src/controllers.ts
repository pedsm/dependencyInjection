import { RequestHandler } from "express"

// type ControllerMethod = (req: Express.Request, res: Express.Response) => Promise<void>
type ControllerMethod = RequestHandler<{id: string}>

type Controller = {
    [key: string]: ControllerMethod
}

export const productController: Controller = {
    getById: async (req, res) => {
        req.log.info(`Received product request`)
        const id = req.params.id
        if (id == null) {
            req.log.error('No id present')
            res.status(400)
            res.json('Error')
        }
        const product = await req.productService.getById(id)
        res.json(product)
    }
}

export const userController: Controller = {
    getById: async (req, res) => {
        req.log.info(`Received user request`)
        const id = req.params.id
        if (id == null) {
            req.log.error('No id present')
            res.status(400)
            res.json('Error')
        }
        const user = await req.userService.getById(id)
        res.json(user)
    }
}