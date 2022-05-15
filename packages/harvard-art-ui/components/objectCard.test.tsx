import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import ObjectCard from './objectCard'

Enzyme.configure({ adapter: new Adapter() })

const defaultProps = {
  credit: 'foo',
  image: null,
  rank: 12,
  title: 'barTitle',
  url: 'bazUrl'
}

function setup (passedProps = {}) {
  const props = Object.assign({}, defaultProps, passedProps)
  const enzymeWrapper = shallow(<ObjectCard {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('ObjectCard', () => {
  describe('Without image', () => {
    it('Should render a card', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('Card').length).toEqual(1)
    })

    it('Should render a title', () => {
      const { enzymeWrapper, props } = setup()
      const CardTitle = enzymeWrapper.find('CardTitle')
      expect(CardTitle.length).toEqual(1)
      expect(CardTitle.text()).toContain(props.title)
    })

    it('Should render a credit', () => {
      const { enzymeWrapper, props } = setup()
      const credit = enzymeWrapper.find('cite')
      expect(credit.length).toEqual(1)
      expect(credit.text()).toContain(props.credit)
    })

    it('Should render a rank', () => {
      const { enzymeWrapper, props } = setup()
      const badge = enzymeWrapper.find('Badge')
      expect(badge.length).toEqual(1)
      expect(badge.text()).toContain(props.rank.toString())
    })

    it('Should render a Link the source URL', () => {
      const { enzymeWrapper, props } = setup()
      const link = enzymeWrapper.find('a')
      expect(link.length).toEqual(1)
      expect(link.text()).toContain('Source')
      expect(link.prop('href')).toEqual(props.url)
    })

    it('Should not render an image', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('CardImg').length).toEqual(0)
    })
  })

  describe('With image', () => {
    it('Should render an image', () => {
      const { enzymeWrapper, props } = setup({
        image: 'foo.jpg'
      })
      const image = enzymeWrapper.find('CardImg')
      expect(image.length).toEqual(1)
      expect(image.prop('src')).toEqual(props.image)
    })
  })
})
