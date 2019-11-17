import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header'
import Search from '@/components/Search'

describe('Header', () => {
  let wrapper

  it('shows small search with brand', () => {
    wrapper = shallowMount(Header)

    expect(wrapper.find('.brand').text()).toEqual('Cloud Native Security Hub')
    expect(wrapper.find('.contribute').attributes().href).toEqual('https://github.com/falcosecurity/cloud-native-security-hub/blob/master/CONTRIBUTING.md')
    expect(wrapper.find('.contribute').text()).toEqual('Contribute')
    expect(wrapper.find(Search).props()).toEqual({ 'autofocus': undefined, 'size': 'sm' })
  })

  it('shows hero title with big search', () => {
    wrapper = shallowMount(Header, {
      propsData: {
        hero: true
      }
    })

    expect(wrapper.find('.brand').text()).toEqual('Cloud Native Security Hub')
    expect(wrapper.find('.contribute').attributes().href).toEqual('https://github.com/falcosecurity/cloud-native-security-hub/blob/master/CONTRIBUTING.md')
    expect(wrapper.find('.contribute').text()).toEqual('Contribute')
    expect(wrapper.find('.title').text()).toContain('Discover and share Kubernetes security best practices and configurations')
    expect(wrapper.find(Search).props()).toEqual({ 'autofocus': true, 'size': undefined })
  })
})
