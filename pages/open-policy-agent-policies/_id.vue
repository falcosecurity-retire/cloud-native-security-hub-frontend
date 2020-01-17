<template>
  <div>
    <Header />
    <b-container class="content">
      <b-row>
        <b-col lg="8" sm="12">
          <markdown :content="component.description" />

          <h2>Policies</h2>
          <prism language="go" :plugins="['show-language', 'copy-to-clipboard']" :code="componentCustomPoliciesContent" />
        </b-col>
        <b-col tag="aside" lg="4" sm="12">
          <div class="box">
            <div v-if="component.website" class="website">
              <h4 class="title">
                Website
              </h4>
              <b-link :href="component.website">
                {{ component.website }}
              </b-link>
            </div>
            <div v-if="component.keywords.length > 0" class="keywords">
              <h4 class="title">
                Available Versions
              </h4>
              <ul class="versions">
                <li v-for="version in component.availableVersions" :key="version" :class="{current: version == component.version}">
                  <b-link :to="`/open-policy-agent-policies/${component.id}/version/${version}`" class="link">
                    {{ version }}
                  </b-link>
                </li>
              </ul>
              <h4 class="title">
                Keywords
              </h4>
              <ul class="keywords">
                <li v-for="keyword in component.keywords" :key="keyword" class="keyword">
                  {{ keyword }}
                </li>
              </ul>
            </div>
            <div v-if="component.maintainers.length > 0" class="maintainers">
              <h4 class="title">
                Maintainers
              </h4>
              <div v-for="maintainer in component.maintainers" :key="maintainer.link" class="maintainer">
                <b-link :href="`${maintainer.link}`">
                  {{ maintainer.name }}
                </b-link>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Prism from 'vue-prismjs'
import Markdown from '@/components/Markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getCanonicalForComponent } from '@/infrastructure/Canonical'
import 'prismjs/themes/prism-tomorrow.css'

export default {
  components: {
    Markdown,
    Header,
    Prism,
    Footer
  },
  head () {
    return {
      title: `${this.component.name} Open Policy Agent Policies`,
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
    componentCustomPoliciesContent () {
      if (!this.component.policies) { return '' }

      return this.component.policies
        .filter(x => x.raw != null)
        .map(x => x.raw)
        .join('\n')
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('getComponent', { kind: 'open-policy-agent-policies', id: params.id })
  }
}
</script>

<style scoped lang="scss">
.content {
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: calc(100vh - 140px - 56px - 32px); // 100 - footer - header - headerMargin
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
    margin-bottom: 0.2rem;
  }
  .install-instructions {
    width: 100%;
  }
  .keywords {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .versions {
    list-style: none;
    margin: 0;
    padding: 0;
    .current {
      font-weight: 700;
    }
  }
}
</style>
