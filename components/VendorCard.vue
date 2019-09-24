<template>
  <b-link :to="`/vendors/${vendor.id}`" class="link">
    <b-card
      class="vendor my-1"
      overlay
      :img-src="vendor.icon"
      :img-alt="vendor.name"
      text-variant="dark"
      img-height="80"
      img-width="80"
      lazy
    />
  </b-link>
</template>

<script>
export default {
  props: {
    vendor: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .vendor {
    padding: 1rem;
    transition: transform .25s;
    &:hover {
      transform: scale(1.05);
    }
  }
</style>
