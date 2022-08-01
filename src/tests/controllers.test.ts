import { AxiosInstance } from "axios"
import { Request, Response } from "express"
import { mock } from "jest-mock-extended"
import Logger from "pino"
import { productController, userController } from "../controllers"
import { v4 as uuid } from 'uuid'
import { ProductService, UserService } from "../services"

const fakeProduct = {
    name: 'EyePhone'
}

describe('#productController', () => {
    describe('#getById()', () => {
        test('works', async () => {
            const mockResponse = mock<Response>()
            const {
                mockRequest,
                mockProductService,
            } = givenAMockRequest({
                id: '123'
            })

            mockProductService.getById.mockResolvedValueOnce(fakeProduct)

            await productController.getById(mockRequest, mockResponse, () => { })

            expect(mockResponse.json).toBeCalledWith(fakeProduct)
        })

        test('throws', async () => {
            const mockResponse = mock<Response>()
            const {
                mockRequest,
                mockProductService,
            } = givenAMockRequest({
                id: null
            })

            mockProductService.getById.mockResolvedValueOnce(fakeProduct)

            await productController.getById(mockRequest, mockResponse, () => { })

            expect(mockResponse.status).toBeCalledWith(400)
        })
    })
})

describe('#userController', () => {
    describe('#getById()', () => {
        test('works', async () => {
            const mockResponse = mock<Response>()
            const {
                mockRequest,
                mockUserService,
            } = givenAMockRequest({
                id: '123'
            })

            mockUserService.getById.mockResolvedValueOnce(fakeProduct)

            await userController.getById(mockRequest, mockResponse, () => { })

            expect(mockResponse.json).toBeCalledWith(fakeProduct)
        })

        test('throws', async () => {
            const mockResponse = mock<Response>()
            const {
                mockRequest,
                mockUserService,
            } = givenAMockRequest({
                id: null
            })

            mockUserService.getById.mockResolvedValueOnce(fakeProduct)

            await userController.getById(mockRequest, mockResponse, () => { })

            expect(mockResponse.status).toBeCalledWith(400)
        })
    })
})

function givenAMockRequest(params: any = {}, cid: string = uuid()) {
    const mockRequest = mock<Request<typeof params>>()
    const logger = Logger().child({ correlationId: cid })
    const mockProductService = mock<ProductService>()
    const mockUserService = mock<UserService>()
    const mockHttp = mock<AxiosInstance>()

    mockRequest.log = logger
    mockRequest.productService = mockProductService
    mockRequest.userService = mockUserService
    // @ts-ignore
    mockRequest.http = mockHttp
    mockRequest.params = params

    return {
        mockRequest,
        mockProductService,
        mockUserService,
        mockHttp,
    }
}