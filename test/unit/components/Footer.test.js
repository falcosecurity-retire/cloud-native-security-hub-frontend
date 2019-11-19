import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer'

describe('Footer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Footer)
  })

  it('shows about section', () => {
    expect(wrapper.find('h4').text()).toEqual('About SecurityHub')
  })
})
