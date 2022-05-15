import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Index from './index'

Enzyme.configure({ adapter: new Adapter() })

function setup (props = {}) {
  const enzymeWrapper = shallow(<Index />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Index', () => {
  it('should render an ApolloProvider', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('ApolloProvider').length).toEqual(1)
  })

  it('should render an Container', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('Container').length).toEqual(1)
  })

  it('should render an ObjectList', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('ObjectList').length).toEqual(1)
  })
})
