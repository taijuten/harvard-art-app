import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Loading from './loading'

Enzyme.configure({ adapter: new Adapter() })

function setup (props = {}) {
  const enzymeWrapper = shallow(<Loading />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Loading', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('svg').length).toEqual(1)
  })
})
