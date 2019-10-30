<template>
  <b-link :to="`/components/${component.id}`" class="link">
    <b-card class="component my-1" header-bg-variant="transparent">
      <div slot="header" class="header">
        <b-card-img-lazy class="image" :src="component.icon" :alt="component.name" />
        <div class="name">
          {{ component.name }}
        </div>
        <!-- Vendors currently deactivated from the front-end -->
        <b-link v-if="component.vendor && component.vendor.name && false" :to="`/vendors/${component.vendor.id}`" class="link">
          <div class="vendor">
            by <span class="vendorName">{{ component.vendor.name }}</span>
          </div>
        </b-link>
      </div>
      <div class="description">
        {{ component.shortDescription }}
      </div>
      <div slot="footer" class="footer">
        Falco rule <b-img-lazy src="~assets/images/falco.png" height="15" width="15" alt="falco icon" />
      </div>
    </b-card>
  </b-link>
</template>

<script>
export default {
  props: {
    component: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.link {
  color: #415564;
  text-decoration: none;
  &:hover, &:active {
    color: #253746;
  }
}
.component {
  height: 250px;
  margin-bottom: 1rem !important;
  transition: transform .25s;
  &:hover {
    transform: scale(1.05);
  }
  .card-header{
    padding: 1.5rem 1.25rem;
    height: 145px;

    .image {
      max-height: 60px;
      min-height: 60px;
      max-width: 100%;
      width: auto;
      height: auto;
      display:block;
      margin:auto;
    }
    .name {
      color: #415564;
      margin-top: 0.5rem;
      font-size: 1rem;
    }
    .vendor {
      font-size: .75rem;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .card-body {
    padding: 0.5rem 1.25rem;
    height: 100%;
    .description {
      max-height: 100%;
      overflow: hidden;
      font-size: 0.8rem;
    }
  }

  .card-footer {
    font-size: 0.8rem;
    text-align: right;
    padding: 0;
  }
}
</style>
