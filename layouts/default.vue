<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('initSearchEngine')
  }
}
</script>
