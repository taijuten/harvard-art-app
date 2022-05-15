import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { MockedProvider } from '@apollo/client/testing'
import ObjectList, { GET_OBJECTS } from './objectList'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  }
}))

Enzyme.configure({ adapter: new Adapter() })

function setup(mocks = []) {
  const enzymeWrapper = mount(<MockedProvider mocks={mocks} addTypename={false}>
    <ObjectList />
  </MockedProvider>)

  return {
    enzymeWrapper
  }
}

describe('ObjectList', () => {
  describe('When Loading', () => {
    it('Should render a loader', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('svg').length).toEqual(1)
    })
  })

  describe('When Errored', () => {
    const artObjectMock = {
      request: {
        query: GET_OBJECTS,
        variables: {
          page: 1
        }
      },
      error: new Error('Oh noes!')
    }
    it('Should render an Alert', async () => {
      const { enzymeWrapper } = setup([artObjectMock])
      await new Promise(resolve => setTimeout(resolve, 100))
      enzymeWrapper.update()
      const Alert = enzymeWrapper.find('Alert')
      expect(Alert.length).toEqual(1)
      expect(Alert.text()).toContain('Oh noes!')
    })
  })

  describe('When Successful', () => {
    const artObjectMock = {
      request: {
        query: GET_OBJECTS,
        variables: {
          page: 1
        }
      },
      result: {
        data: {
          artObjects: [
            {
              id: 1,
              creditline: 'fooCredit',
              title: 'fooTitle',
              primaryimageurl: 'fooImageUrl',
              rank: 19,
              url: 'fooUrl'
            },
            {
              id: 2,
              creditline: 'barCredit',
              title: 'barTitle',
              primaryimageurl: 'barImageUrl',
              rank: 20,
              url: 'barUrl'
            },
          ]
        }
      }
    }
    it('Should render Pagination', async () => {
      const { enzymeWrapper } = setup([artObjectMock])
      await new Promise(resolve => setTimeout(resolve, 100))
      enzymeWrapper.update()
      const NavigationButton = enzymeWrapper.find('Button.pagination')
      expect(NavigationButton.length).toEqual(1)
    })

    it('Should render an ObjectCard per Result', async () => {
      const { enzymeWrapper } = setup([artObjectMock])
      await new Promise(resolve => setTimeout(resolve, 100))
      enzymeWrapper.update()
      const ObjectCard = enzymeWrapper.find('Card')
      expect(ObjectCard.length).toEqual(artObjectMock.result.data.artObjects.length)
    })
  })
})
