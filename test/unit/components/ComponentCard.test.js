import { shallowMount } from '@vue/test-utils'
import ComponentCard from '@/components/ComponentCard'
import { component } from '@/test/fixtures/Component'

describe('ComponentCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ComponentCard, {
      propsData: {
        component
      }
    })
  })

  it('shows component data', () => {
    expect(wrapper.find('.link').attributes().to).toEqual('/falco-rules/' + component.id)
    expect(wrapper.find('.image').attributes().src).toEqual(component.icon)
    expect(wrapper.find('.description').text()).toEqual(component.shortDescription)
  })
})
