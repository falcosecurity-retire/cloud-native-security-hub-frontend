export default class ContentService {
  constructor (httpClient) {
    this.httpClient = httpClient
  }

  async getComponents () {
    const result = await this.httpClient.get('/resources')
    return result.data.map(component => ({ ...component, vendor: { id: component.vendor.toLowerCase(), name: component.vendor } }))
  }

  async getComponent (id) {
    const result = await this.httpClient.get(`/resources/${id}`)
    return { ...result.data, vendor: { id: result.data.vendor.toLowerCase(), name: result.data.vendor } }
  }

  async getVendors () {
    const result = await this.httpClient.get('/vendors')
    return result.data
  }

  async getVendor (id) {
    const vendorResponse = await this.httpClient.get(`/vendors/${id}`)
    const vendorComponentsResponse = await this.httpClient.get(`/vendors/${id}/resources`)

    return { vendor: vendorResponse.data, vendorComponents: vendorComponentsResponse.data }
  }
}
