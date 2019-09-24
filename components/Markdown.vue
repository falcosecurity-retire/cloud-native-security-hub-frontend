<template>
  <component :is="tag" v-html="htmlContent" />
</template>

<script>
import showdown from 'showdown'

export default {
  props: {
    content: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    },
    headerLevelStart: {
      type: Number,
      default: 1
    }
  },
  computed: {
    htmlContent () {
      const converter = new showdown.Converter({ noHeaderId: true, headerLevelStart: this.headerLevelStart })
      return converter.makeHtml(this.content)
    }
  }
}
</script>
