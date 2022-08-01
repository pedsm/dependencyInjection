import { v4 as uuid } from 'uuid'
import { ProductService } from '../services'
import Logger from 'pino'
import { mock } from 'jest-mock-extended'
import { AxiosInstance } from 'axios'

const fakeResponse = {
    data: {
        name: 'EyePhone'
    }
}

describe('ProductService', () => {
    test('Calls right endpoint', async () => {
        const {
            productService,
            mockHttp
        } = givenProductService()

        mockHttp.get.mockResolvedValue(fakeResponse)

        const product = await productService.getById('123')

        expect(mockHttp.get).toBeCalledWith(`https://dummyjson.com/products/123`)
        expect(product).toEqual(fakeResponse.data)
    })
})

function givenProductService(cid: string = uuid()) {
    const logger = Logger().child({ correlationId: cid })
    const mockHttp = mock<AxiosInstance>()

    return {
        productService: new ProductService(mockHttp, logger),
        mockHttp
    }
}