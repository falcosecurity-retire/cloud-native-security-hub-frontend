import { shallowMount } from '@vue/test-utils'
import VendorCard from '@/components/VendorCard'
import { vendor } from '@/test/fixtures/Vendor'

describe('VendorCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VendorCard, {
      propsData: {
        vendor
      }
    })
  })

  it('shows vendor data', () => {
    expect(wrapper.find('.link').attributes().to).toEqual('/vendors/' + vendor.id)
    expect(wrapper.find('.vendor').attributes().imgsrc).toEqual(vendor.icon)
  })
})
