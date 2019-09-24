<template>
  <div>
    <Header />
    <b-container class="content">
      <b-row>
        <markdown :content="vendor.description" />
      </b-row>
      <b-row tag="section" class="components">
        <h2 class="title w-100">
          Available security resources
        </h2>
        <transition-group name="zoom" tag="b-row" appear>
          <b-col
            v-for="component in components"
            :key="component.id"
            :component="component"
            xs="12"
            sm="6"
            md="4"
            lg="3"
          >
            <ComponentCard :component="component" />
          </b-col>
        </transition-group>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Markdown from '@/components/Markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ComponentCard from '@/components/ComponentCard'
import { getCanonicalForVendor } from '@/infrastructure/Canonical'

export default {
  components: {
    Markdown,
    Header,
    Footer,
    ComponentCard
  },
  head () {
    return {
      title: `${this.vendor.name} in cloud native security hub`,
      meta: [
        { hid: 'description', name: 'description', content: this.vendor.shortDescription }
      ],
      link: [
        {
          rel: 'canonical',
          href: getCanonicalForVendor(this.vendor)
        }
      ]
    }
  },
  computed: {
    ...mapState({
      vendor: state => state.vendor,
      components: state => state.vendorComponents
    })
  },
  async fetch ({ store, params }) {
    await store.dispatch('getVendor', params.id)
  }
}
</script>

<style scoped lang="scss">
.content {
  min-height: calc(100vh - 60px - 56px - 32px); // 100 - footer - header - headerMargin
  margin-top: 2rem;
}
</style>
