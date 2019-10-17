export const state = () => ({
  components: [],
  component: {},
  vendor: {},
  vendorComponents: [],
  selectedCategories: []
})

export const getters = {
  categories: state => [...new Set(state.components.flatMap(component => component.keywords))]
    .sort((a, b) => a.localeCompare(b)),

  isSelectedCategory: state => category => state.selectedCategories.some(c => c === category),

  components: (state, getters) => {
    let components = state.components
    if (state.selectedCategories.length) {
      components = components.filter(component => component.keywords.some(keyword => getters.isSelectedCategory(keyword)))
    }
    return components
  }
}

export const mutations = {
  components (state, components) {
    state.components = components
  },
  component (state, component) {
    state.component = component
  },
  vendor (state, vendor) {
    state.vendor = vendor
  },
  vendorComponents (state, vendorComponents) {
    state.vendorComponents = vendorComponents
  },
  selectCategory (state, category) {
    state.selectedCategories.push(category)
  },
  unSelectCategory (state, category) {
    state.selectedCategories = state.selectedCategories.filter(c => c !== category)
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    // we get them in the init instead of the home to have them indexed for search
    const components = await this.$services.contentService.getComponents()
    commit('components', components)
  },
  initSearchEngine ({ state }) {
    this.$services.searchService.initSearchEngine([
      ...state.components.map(component => ({ ...component, type: 'components' }))
    ])
  },
  async getComponent ({ commit }, id) {
    const component = await this.$services.contentService.getComponent(id)

    commit('component', component)
  },
  async getVendor ({ commit }, id) {
    const { vendor, vendorComponents } = await this.$services.contentService.getVendor(id)

    commit('vendor', vendor)
    commit('vendorComponents', vendorComponents)
  },

  toggleCategory ({ commit, getters }, category) {
    if (getters.isSelectedCategory(category)) {
      commit('unSelectCategory', category)
    } else {
      commit('selectCategory', category)
    }
  }
}
