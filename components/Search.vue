<template>
  <div class="search">
    <b-input
      type="search"
      placeholder="Search"
      class="input-search"
      :autofocus="autofocus"
      :size="size"
      @input="searchChange"
      @keydown.down="searchDown"
      @keydown.up="searchUp"
      @keydown.enter="selectSearch"
      @keydown.escape="clearSearch"
      @keydown.right="selectSearch"
    />
    <div class="searchtext">
      <span class="searched">{{ searchText }}</span>
      <span class="suggestion">{{ searchSuggestionsText }}</span>
    </div>
    <b-list-group v-if="searchResults.length > 0" class="resultList">
      <b-list-group-item
        v-for="(result, index) in searchResults"
        :key="result.id + result.type"
        class="result"
        :active="index === selectedResult"
        :to="{ name: `${result.type}-id`, params: { id: result.id } }"
      >
        {{ result.name }}
        <b-badge class="type float-right" variant="secondary" pill>
          {{ result.type }}
        </b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {
  props: {
    size: {
      type: String,
      default: undefined
    },
    autofocus: {
      type: Boolean,
      default: undefined
    }
  },
  data: () => ({
    selectedResult: -1,
    searchText: '',
    searchResults: []
  }),
  computed: {
    searchSuggestions () {
      return this.$services.searchService.autoSuggest(this.searchText).map(result => result.suggestion)
    },
    searchSuggestionsFullText () {
      return this.searchSuggestions.length && this.selectedResult === -1 ? this.searchSuggestions[0] : ''
    },
    searchSuggestionsText () {
      return this.searchSuggestionsFullText.replace(this.searchText, '')
    }
  },
  methods: {
    searchChange (text) {
      this.searchText = text
      this.selectedResult = -1
      this.searchForResults()
    },
    searchDown () {
      this.selectedResult = Math.min(this.selectedResult + 1, this.searchResults.length - 1)
      this.updateSearchTextWithResult(this.selectedResult)
    },
    searchUp () {
      this.selectedResult = Math.max(0, this.selectedResult - 1)
      this.updateSearchTextWithResult(this.selectedResult)
    },
    clearSearch () {
      this.selectedResult = -1
      this.searchResults = []
      // this.searchInputRef.blur()
      this.searchForResults()
    },
    selectSearch () {
      if (this.selectedResult >= 0 && this.searchResults[this.selectedResult]) {
        const result = this.searchResults[this.selectedResult]
        this.$router.push({ name: `${result.type}-id`, params: { id: result.id } })
      } else {
        this.selectAutoCompleteOption()
      }
    },
    selectAutoCompleteOption () {
      this.searchText = this.searchSuggestionsFullText
      this.searchForResults()
    },
    searchForResults () {
      this.searchResults = this.$services.searchService.search(this.searchText)
    },
    updateSearchTextWithResult (i) {
      if (this.searchResults.length) {
        this.searchText = this.searchResults[i].name
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .search {
    position: relative;
    .searchtext {
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      padding: 6px 12px;
      width: 100%;
      font-size: 0;
      .suggestion {
        font-size: 1rem;
        z-index: 2;
        color: rgba(255,255,255,0.5);
      }
      .searched {
        font-size: 1rem;
      }
    }
    .input-search {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 1;
      color: transparent;
      border: 0px solid #e3ebeb;
      border-bottom-width: 1px;
      background-color: transparent;
    }
    .resultList {
      position: absolute;
      top: 2.4rem;
      z-index: 1;
      width: 100%;
      color: #415564;
      .result {
        .type {
        }
        & .active {
        }
      }
    }
  }
</style>
