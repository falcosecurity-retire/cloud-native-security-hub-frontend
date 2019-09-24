import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer'

describe('Footer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Footer)
  })

  it('shows Sysdig', () => {
    expect(wrapper.find('.link').attributes().href).toEqual('https://sysdig.com/')
    expect(wrapper.find('.footer').text()).toContain('Curated with love by')
    expect(wrapper.find('.footer').text()).toContain('Sysdig')
  })
})
