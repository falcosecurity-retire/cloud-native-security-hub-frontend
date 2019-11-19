<template>
  <footer class="footer">
    <b-container>
      <b-row align-h="end">
        <b-col sm="12" md="2">
          <section>
            <h4>About SecurityHub</h4>
            <ul>
              <li><a class="link" target="_blank" href="https://sysdig.com/blog/cloud-native-security-hub/">What is SecurityHub.dev?</a></li>
              <li><a class="link" target="_blank" href="https://github.com/falcosecurity/cloud-native-security-hub/blob/master/CONTRIBUTING.md">How to contribute?</a></li>
            </ul>
          </section>
        </b-col>
        <b-col sm="12" md="2">
          <section>
            <h4>Find us!</h4>
            <ul>
              <li><a target="_blank" href="https://github.com/falcosecurity/cloud-native-security-hub">GitHub</a></li>
              <li><a target="_blank" href="https://slack.sysdig.com/">Join us on Slack</a></li>
              <li><a target="_blank" href="https://github.com/falcosecurity/cloud-native-security-hub/issues">File an issue</a></li>
            </ul>
          </section>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<style scoped lang="scss">
  .footer {
    padding-top: 15px;
    height: 140px;
    width: 100%;
    background-color: #253746;
    color: #eef3f3;
    text-align: right;
    ul {
      list-style: none;
      padding-left: 0px;
      a {
        color: #eef3f3;
      }
    }
  }
</style>
