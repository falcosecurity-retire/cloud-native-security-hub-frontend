import axios from 'axios'
import { getCanonicalForComponent, getCanonicalForVendor } from './Canonical'

export async function getSitemapRoutes () {
  const components = await axios.get(process.env.API_URL + '/resources')
  const vendors = await axios.get(process.env.API_URL + '/vendors')

  return [
    ...components.data.map(getCanonicalForComponent),
    ...vendors.data.map(getCanonicalForVendor)
  ]
}
