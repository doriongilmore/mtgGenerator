<template>
  <div id="search" class="h-100">
    <div class="container">
      <div class="flex-row">
        <div class="col col-1"><div v-if="isSearching" class="spinner-border"></div></div>
        <div class="col col-5 d-inline-flex">
          <form v-on:submit="handleSearch" id="form" class="w-100">
            <input type="submit" class="d-none" />
            <b-input type="text" v-model="search.name" placeholder="Enter a name"></b-input>
          </form>
        </div>
        <div class="col col-3 d-inline-flex">
          <div @click="handleSearch()" class="btn btn-light"><b-icon-search></b-icon-search></div>
          <div @click="openSearch()" class="btn btn-light">
            <b-icon-tools></b-icon-tools><span class="d-none d-md-inline"> Filters</span>
          </div>
        </div>
        <div class="col col-3 d-inline-flex">
          <div class="btn-sm btn-light" @click="previousPage()"><b-icon-arrow-left></b-icon-arrow-left></div>
          <div class="btn-sm btn-light" @click="nextPage()"><b-icon-arrow-right></b-icon-arrow-right></div>
          <span class="badge-light badge-pill pt-1">{{ pageIndex + 1 }} / {{ pageCount }}</span>
        </div>
      </div>
    </div>
    <div class="container h-75">
      <div class="row flex-nowrap mt-2">
        <div class="col col-4">Name</div>
        <div class="col col-2 text-left">Cost</div>
        <div class="col col-3">Type</div>
        <div class="col col-3">Set</div>
      </div>
      <div class="list-group h-100" id="resultsBody">
        <div class="row flex-nowrap mt-1 text-center" v-for="result in results" :key="result.id">
          <AddToListButton class="col col-1" :add-list="addList" :card="result" variant="secondary"></AddToListButton>
          <div class="col col-3 pointer" @click="openCard(result.id)">{{ result.name }}</div>
          <div class="col col-2"><Mana :mana-cost="result.mana_cost"></Mana></div>
          <div class="col col-3">{{ result.type_line }}</div>
          <div class="col col-3">{{ result.set_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import modalHandler from '../../mixins/modalHandler';
import { mapState, mapGetters } from 'vuex';
import Mana from '../uiElements/Mana.vue';
import AddToListButton from '../uiElements/AddToListButton.vue';

export default {
  name: 'Search',
  components: { draggable, Mana, AddToListButton },
  props: ['deck'],
  mixins: [modalHandler],
  data() {
    return {
      isSearching: false,
      results: [],
    };
  },
  watch: {
    resultIds(newIds, oldIds) {
      console.info('resultIds', oldIds, newIds);
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
    previousPage() {
      if (this.pageIndex) {
        this.$store.commit('search/previousPage');
      }
    },
    nextPage() {
      if (this.pageIndex < this.pageCount - 1) {
        this.$store.commit('search/nextPage');
      }
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
        this.$store.commit('search/setResults', { results: [], searchParams: this.searchParams });
      } catch (error) {
        console.error('error during search', { args: this.searchParams, error });
      }
      this.isSearching = false;
    },
  },
  mounted() {
    this.$root.$on('bv::dropdown::show', bvEvent => {
      bvEvent.target.style['max-height'] = '100px';
      bvEvent.target.style['overflow-y'] = 'auto';
    });
  },
};
</script>

<style lang="less" scoped>
#resultsBody {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
}
</style>
