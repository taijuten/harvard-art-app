import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import NavigationButton from './navigationButton'

Enzyme.configure({ adapter: new Adapter() })

function setup ({ currentPage, isNext }) {
  const enzymeWrapper = shallow(<NavigationButton currentPage={currentPage} isNext={isNext} />)

  return {
    props: {
      currentPage,
      isNext
    },
    enzymeWrapper
  }
}

describe('NavigationButton', () => {
  describe('At the first page', () => {
    it('Should not render a "previous" button', () => {
      const { enzymeWrapper } = setup({ currentPage: 1, isNext: false })
      expect(enzymeWrapper).toEqual({})
    })

    it('Should render a "next" button', () => {
      const { enzymeWrapper } = setup({ currentPage: 1, isNext: true })
      expect(enzymeWrapper.find('Link').length).toEqual(1)
      expect(enzymeWrapper.find('Button').text()).toContain('Next')
      expect(enzymeWrapper.find('Link').prop('href')).toContain('p=2')
    })
  })

  describe('At a page greater than the first', () => {
    it('Should render a "previous" button', () => {
      const { enzymeWrapper } = setup({ currentPage: 2, isNext: false })
      expect(enzymeWrapper.find('Link').length).toEqual(1)
      expect(enzymeWrapper.find('Button').text()).toContain('Previous')
      expect(enzymeWrapper.find('Link').prop('href')).toContain('p=1')
    })

    it('Should render a "next" button', () => {
      const { enzymeWrapper } = setup({ currentPage: 2, isNext: true })
      expect(enzymeWrapper.find('Link').length).toEqual(1)
      expect(enzymeWrapper.find('Button').text()).toContain('Next')
      expect(enzymeWrapper.find('Link').prop('href')).toContain('p=3')
    })
  })
})
