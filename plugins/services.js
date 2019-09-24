import ContentService from '@/infrastructure/services/ContentService'
import SearchService from '@/infrastructure/services/SearchService'

export default (ctx, inject) => {
  const httpClient = ctx.$axios

  const services = {
    contentService: new ContentService(httpClient),
    searchService: new SearchService()
  }

  inject('services', services)
}
