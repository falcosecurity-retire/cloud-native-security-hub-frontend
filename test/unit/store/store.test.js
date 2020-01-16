import { actions } from '@/store'
import components, { component } from '~/test/fixtures/Component'
import vendors, { vendor } from '~/test/fixtures/Vendor'

describe('store', () => {
  describe('action', () => {
    let commit
    const context = {
      $services: {
        contentService: {
          getComponents: jest.fn(() => components),
          getComponent: jest.fn(() => component),
          getVendors: jest.fn(() => vendors),
          getVendor: jest.fn(() => ({ vendor, vendorComponents: components }))
        }
      }
    }

    beforeEach(() => {
      commit = jest.fn()
    })

    it('gets components on init so we have them available for search', async () => {
      await actions.nuxtServerInit.call(context, { commit }, {})

      expect(commit).toHaveBeenCalledWith('components', components)
    })

    it('gets a component by ID', async () => {
      await actions.getComponent.call(context, { commit }, { kind: component.kind, id: component.id })

      expect(context.$services.contentService.getComponent).toHaveBeenCalledWith(component.kind, component.id)
      expect(commit).toHaveBeenCalledWith('component', component)
    })

    it('gets a vendor by ID', async () => {
      await actions.getVendor.call(context, { commit }, vendor.id)

      expect(context.$services.contentService.getVendor).toHaveBeenCalledWith(vendor.id)
      expect(commit).toHaveBeenCalledWith('vendor', vendor)
      expect(commit).toHaveBeenCalledWith('vendorComponents', components)
    })
  })
})
