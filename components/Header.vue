<template>
  <header class="header">
    <b-navbar type="dark" class="transparent">
      <b-container>
        <b-navbar-brand to="/">
          <h1 class="brand">
            Cloud Native Security Hub
          </h1>
        </b-navbar-brand>
        <b-navbar-nav class="d-none d-sm-block">
          <b-nav-item class="contribute" href="https://github.com/falcosecurity/cloud-native-security-hub/CONTRIBUTING.md" target="_blank">
            Contribute
          </b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <b-container v-if="hero" tag="section" class="hero">
      <b-row class="heroContent" align-v="end">
        <b-col sm="12" md="6">
          <h2 class="title">
            Share and find the best resources to secure Cloud Native components
          </h2>
        </b-col>
      </b-row>
    </b-container>
  </header>
</template>

<script>
export default {
  props: {
    hero: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    background-image: linear-gradient(to bottom right, #0a1429, #415564);
    .navbar {
      .container {
        padding-left: 15px;
        padding-right: 15px;
      }
    }
    .brand {
      font-size: 1.5rem;
      font-family: Roboto;
      font-weight: 700;
      margin: 0;
    }
    .hero {
      color: #eef3f3;
      .heroContent {
        padding-top: 3rem;
        padding-bottom: 6rem;
      }
      .title {
        font-family: Roboto;
        margin: 0;
      }
    }
  }
  .transparent {
    background-color: transparent;
  }
  .searchSmallForm {
    width: 220px;
    margin-right: 2rem;
    position: relative;
    color: #eef3f3;
  }
  .searchSmall {
    width: 100%;
    margin-bottom: 22px;
  }
</style>
