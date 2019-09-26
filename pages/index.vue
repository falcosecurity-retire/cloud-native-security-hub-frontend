<template>
  <div>
    <Header hero />
    <b-container class="content">
      <b-row tag="section" class="vendors" :no-gutters="true">
        <h2 class="title">
          Latest Vendors
        </h2>
        <transition-group name="zoom" tag="b-row" appear>
          <b-col
            v-for="vendor in vendors"
            :key="vendor.id"
            :vendor="vendor"
            xs="12"
            sm="6"
            md="4"
            lg="3"
          >
            <VendorCard :vendor="vendor" />
          </b-col>
        </transition-group>
      </b-row>
      <hr>
      <b-row>
        <h2 class="title">
          Latest Components
        </h2>
        <b-col sm="12" md="3" class="filter-panel">
          <section class="filter-group categories bg-light">
            <h3 class="title">
              Categories
            </h3>
            <b-btn-group vertical tag="ul" class="filters w-100">
              <b-btn
                v-for="category in categories"
                :key="category"
                tag="li"
                variant="light"
                class="text-left text-capitalize filter"
                :pressed="isSelectedCategory(category)"
                @click="toggleCategory(category)"
              >
                {{ category }}
              </b-btn>
            </b-btn-group>
          </section>
        </b-col>
        <b-col sm="12" md="9" tag="section" class="components">
          <transition-group name="zoom" tag="b-row" appear>
            <b-col
              v-for="component in components"
              :key="component.id"
              xs="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
            >
              <ComponentCard :component="component" />
            </b-col>
          </transition-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Header from '@/components/Header'
import ComponentCard from '@/components/ComponentCard'
import VendorCard from '@/components/VendorCard'

export default {
  components: {
    Header,
    ComponentCard,
    VendorCard
  },
  computed: {
    ...mapState({
      vendors: state => state.vendors
    }),
    ...mapGetters(['categories', 'components', 'isSelectedCategory'])
  },
  methods: {
    ...mapActions(['toggleCategory'])
  }
}
</script>

<style scoped lang="scss">
  .title {
    text-align: center;
    width: 100%;
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
  .filter-panel {
    .filter-group {
      .filters {
        list-style-type: none;
        margin: 0;
        padding: 0;

      }
      .title {
        margin: 1rem 0 0.3rem 0;
        font-family: Roboto;
        font-size: 1rem;
      }
    }
  }
</style>
