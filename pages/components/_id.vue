<template>
  <div>
    <Header />
    <b-container class="content">
      <b-row>
        <b-col lg="8" sm="12">
          <markdown :content="component.description" />
        </b-col>
        <b-col tag="aside" lg="4" sm="12">
          <div class="box">
            <h4 class="title">
              Installing
            </h4>
            <h6 class="title">
              Install using Helm
            </h6>
            <b-form-input
              v-b-tooltip.click.blur.v-primary
              title="Copied to your clipboard!"
              class="install-instructions"
              readonly
              :value="installInstructions"
              @click="copy(installInstructions)"
            />
          </div>
          <div class="box">
            <div v-if="component.website" class="website">
              <h6 class="title">
                Website
              </h6>
              <b-link :href="component.website">
                {{ component.website }}
              </b-link>
            </div>
            <div v-if="component.vendor" class="vendor">
              <h6 class="title">
                Vendor
              </h6>
              <b-link :to="`/vendors/${component.vendor.id}`">
                {{ component.vendor.name }}
              </b-link>
            </div>
            <div v-if="component.keywords.length > 0" class="keywords">
              <h6 class="title">
                Keywords
              </h6>
              <span v-for="keyword in component.keywords" :key="keyword" class="keyword">{{ keyword }}</span>
            </div>
            <div v-if="component.maintainers.length > 0" class="maintainers">
              <h6 class="title">
                Maintainers
              </h6>
              <div v-for="maintainer in component.maintainers" :key="maintainer.email" class="maintainer">
                <b-link :href="`mailto:${maintainer.email}`">
                  {{ maintainer.name }}
                </b-link>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Markdown from '@/components/Markdown'
import Header from '@/components/Header'
import { getCanonicalForComponent } from '@/infrastructure/Canonical'

export default {
  components: {
    Markdown,
    Header
  },
  head () {
    return {
      title: `${this.component.name} in cloud native security hub`,
      meta: [
        { hid: 'description', name: 'description', content: this.component.shortDescription }
      ],
      link: [
        {
          rel: 'canonical',
          href: getCanonicalForComponent(this.component)
        }
      ]
    }
  },
  computed: {
    ...mapState({
      component: state => state.component
    }),
    installInstructions () {
      return `helm upgrade falco -f ${process.env.API_URL}/resources/${this.component.id}/custom-rules.yaml stable/falco`
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('getComponent', params.id)
  },
  methods: {
    copy (text) {
      navigator.clipboard.writeText(text)
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  margin-top: 2rem;
}
.box {
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 1rem;
  box-shadow: 1px 1px 10px rgba(0,0,0,.07);
  background-color: #FAFBFD;
  margin-bottom: 1rem;
  a {
    color: darkblue;
  }
  .title {
    margin: 1rem 0px 0px 0px;
    color: #2F3F50;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #eee;
  }
  .install-instructions {
    width: 100%;
  }
}
</style>
