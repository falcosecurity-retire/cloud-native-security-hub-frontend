import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ContentService from '@/infrastructure/services/ContentService'
import componentsResponse from '@/test/fixtures/responses/components'
import components, { component } from '@/test/fixtures/Component'
import vendorsResponse from '@/test/fixtures/responses/vendors'
import vendors, { vendor } from '@/test/fixtures/Vendor'

const httpClient = new MockAdapter(axios)
const contentService = new ContentService(axios)

describe('Content Service', () => {
  it('gets components', async () => {
    httpClient.onGet('/resources').reply(200, componentsResponse)

    const result = await contentService.getComponents()

    expect(result).toEqual(components)
  })

  it('gets a component by ID', async () => {
    httpClient.onGet(`/resources/${component.id}`).reply(200, componentsResponse[0])

    const result = await contentService.getComponent(component.id)

    expect(result).toEqual(component)
  })

  it('gets vendors', async () => {
    httpClient.onGet('/vendors').reply(200, vendorsResponse)

    const result = await contentService.getVendors()

    expect(result).toEqual(vendors)
  })

  it('gets a vendor by ID', async () => {
    httpClient.onGet(`/vendors/${vendor.id}`).reply(200, vendorsResponse[0])
    httpClient.onGet(`/vendors/${vendor.id}/resources`).reply(200, componentsResponse)

    const result = await contentService.getVendor(vendor.id)

    expect(result).toEqual({ vendor, vendorComponents: componentsResponse })
  })

  it('gets a component by ID and version', async () => {
    httpClient.onGet(`/resources/${component.id}/version/${component.version}`).reply(200, componentsResponse[0])

    const result = await contentService.getComponentByVersion(component.id, component.version)

    expect(result).toEqual(component)
  })
})
