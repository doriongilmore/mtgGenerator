<template>
  <div id="search" class="h-100">
    <div class="container">
      <div class="row">
        <div class="col col-2 col-lg-1"><div v-if="isSearching" class="spinner-border"></div></div>
        <div class="col col-10 col-lg-5 d-inline-flex">
          <form v-on:submit="handleSearch" id="form" class="w-100">
            <input type="submit" class="d-none" />
            <b-input type="text" v-model="search.name" placeholder="Enter a name"></b-input>
          </form>
          <div @click="handleSearch()" class="btn btn-light"><b-icon-search></b-icon-search></div>
          <div @click="openSearch()" class="btn btn-light d-inline-flex">
            <b-icon-tools></b-icon-tools><span class="d-none d-xl-inline"> Filters</span>
          </div>
          <div class="btn btn-light d-inline-flex disabled" v-if="!isAdvancedSearchUnderstood">
            click on <b-icon-tools></b-icon-tools>
          </div>
          <div
            class="btn btn-sm btn-light small"
            @click="advancedSearchUnderstood()"
            v-if="!isAdvancedSearchUnderstood"
          >
            Understood
          </div>
        </div>
        <div class="col col-6 col-lg-3">
          <div class="btn btn-light" @click="toggleDisplay">
            <b-icon-eye-fill></b-icon-eye-fill><span class="d-inline btn-light"> Toggle Display</span>
          </div>
        </div>
        <div class="col col-6 col-lg-3 d-inline-flex">
          <div class="btn-sm btn-light" @click="previousPage()"><b-icon-arrow-left></b-icon-arrow-left></div>
          <div class="btn-sm btn-light" @click="nextPage()"><b-icon-arrow-right></b-icon-arrow-right></div>
          <span class="badge-light badge-pill pt-1"> {{ pageIndex + 1 }} / {{ pageCount }} </span>
        </div>
      </div>
    </div>
    <basic
      v-if="cardDisplay === settingsFavoriteDisplay.basic.key"
      :results="results"
      :add-list="addList"
      :open-card="openCard"
    />
    <detailed
      v-if="cardDisplay === settingsFavoriteDisplay.detailed.key"
      :results="results"
      :add-list="addList"
      :open-card="openCard"
    />
    <complete
      v-if="cardDisplay === settingsFavoriteDisplay.complete.key"
      :results="results"
      :add-list="addList"
      :open-card="openCard"
    />
  </div>
</template>

<script>
import modalHandler from '../../mixins/modalHandler';
import { mapState, mapGetters, mapMutations } from 'vuex';
import basic from './resultsDisplay/basic.vue';
import detailed from './resultsDisplay/detailed.vue';
import complete from './resultsDisplay/complete.vue';
import cardDisplay from '../../mixins/cardDisplay';

export default {
  name: 'Search',
  components: { basic, detailed, complete },
  props: ['deck'],
  mixins: [modalHandler, cardDisplay],
  data() {
    return {
      isSearching: false,
      results: [],
    };
  },
  watch: {
    resultIds(newIds, oldIds) {
      Promise.all(newIds.map(async cardId => await this.$store.dispatch('mtg/getCardById', { cardId })))
        .then(res => {
          this.results = res;
        })
        .catch(e => {
          console.error('fetching results', e);
          this.results = [];
        });
    },
  },
  computed: {
    ...mapState({
      search: state => state.search,
      pageIndex: state => state.search.pageIndex,
      decks: state => Object.values(state.decks.decksByIds),
      isAdvancedSearchUnderstood: state => state.tutorial.advancedSearch,
    }),
    ...mapGetters({
      pageCount: 'search/pageCount',
      searchParams: 'search/searchParams',
      resultIds: 'search/resultPage',
    }),
    addList() {
      const list = this.decks.sort((deckA, deckB) => {
        if (this.deck && deckA.id === this.deck.id) {
          return -1;
        } else if (this.deck && deckB.id === this.deck.id) {
          return 1;
        }
        return 0;
      });
      if (this.deck && !list.find(e => e.id === this.deck.id)) {
        list.unshift(this.deck);
      }
      return list;
    },
  },
  methods: {
    ...mapMutations({
      advancedSearchUnderstood: 'tutorial/advancedSearchUnderstood',
      _previousPage: 'search/previousPage',
      _nextPage: 'search/nextPage',
      _setResults: 'search/setResults',
    }),
    previousPage() {
      this.pageIndex && this._previousPage();
    },
    nextPage() {
      this.pageIndex < this.pageCount - 1 && this._nextPage();
    },
    openSearch() {
      this.searchModal().then(this.handleSearch);
    },
    openCard(cardId) {
      this.cardModal(cardId);
    },
    /**
     * Fires when user click on Enter key or search button
     */
    async handleSearch(event) {
      event && event.preventDefault();
      this.isSearching = true;
      try {
        await this.$store.dispatch('mtg/search', this.searchParams);
        this._setResults({ results: [], searchParams: this.searchParams });
      } catch (error) {
        console.error('error during search', { args: this.searchParams, error });
      }
      this.isSearching = false;
    },
  },
  mounted() {
    this.$root.$on('bv::dropdown::show', bvEvent => {
      console.info('still useful');
      bvEvent.target.style['max-height'] = '100px';
      bvEvent.target.style['overflow-y'] = 'auto';
    });
  },
};
</script>

<style lang="less" scoped></style>
