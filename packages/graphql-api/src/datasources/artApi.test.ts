import { RESTDataSource } from 'apollo-datasource-rest'
import { ArtAPI } from './artApi'

jest.mock('apollo-datasource-rest')
const mockedRESTDataSource = <jest.Mock<RESTDataSource>>RESTDataSource

const getSpy:any = jest.spyOn(mockedRESTDataSource.prototype, 'get').mockImplementation(() => ({ records: ['foo'] }))

describe('ArtAPI class', () => {
  describe('getObjects', () => {
    beforeEach(() => {
      getSpy.mockClear()
    })
    it('Returns the result of the RESTDataSource GET', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(1)
      const res = await ArtApiInstance.getObjects('bar', 1, 2, 3)
      expect(res).toEqual(['foo'])
    })

    it('Passes the "object" uri to the parent "get" method', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      await ArtApiInstance.getObjects('baz', 1, 2, 3)
      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][0]).toEqual('object')
    })

    it('Hits the cache when performing the same args a second time, thus not hitting the get method', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      const res = await ArtApiInstance.getObjects('baz', 1, 2, 3)
      expect(getSpy.mock.calls.length).toEqual(0)
      expect(res).toEqual(['foo'])
    })

    it('Passes a custom classification to the parent get method when specified', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      await ArtApiInstance.getObjects('bing', 1, 2, 3)
      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][1].classification).toEqual('bing')
    })

    it('Passes a default classification to the parent get method when no classification specified', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      await ArtApiInstance.getObjects(undefined, 1, 2, 3)
      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][1].classification).toEqual('Prints')
    })

    it('Passes a custom verificationLevel to the parent get method when specified', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      await ArtApiInstance.getObjects('boom', 1, 2, 3)
      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][1].q).toEqual('verificationlevel:1')
    })

    it('Passes a default verificationLevel to the parent get method when no verificationLevel specified', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      await ArtApiInstance.getObjects('boom', undefined, 2, 3)
      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][1].q).toEqual('verificationlevel:4')
    })

    it('Passes a custom size to the parent get method when specified', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      await ArtApiInstance.getObjects('bang', 1, 2, 3)
      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][1].size).toEqual(2)
    })

    it('Passes a default size to the parent get method when no size specified', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      await ArtApiInstance.getObjects('bang', 1, undefined, 3)
      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][1].size).toEqual(10)
    })

    it('Passes a custom page to the parent get method when specified', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      await ArtApiInstance.getObjects('bling', 1, 2, 3)
      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][1].page).toEqual(3)
    })

    it('Passes a default page to the parent get method when no page specified', async () => {
      const ArtApiInstance = new ArtAPI()
      expect.assertions(2)
      await ArtApiInstance.getObjects('bling', 1, 2, undefined)
      expect(getSpy.mock.calls.length).toEqual(1)
      expect(getSpy.mock.calls[0][1].page).toEqual(1)
    })
  })
})
