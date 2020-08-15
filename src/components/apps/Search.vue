<template>
  <div id="search" class="h-100">
    <div class="container">
      <div class="flex-row">
        <div class="col col-1"><div v-if="isSearching" class="spinner-border"></div></div>
        <div class="col col-5 d-inline-flex">
          <form v-on:submit="handleSearch" id="form" class="w-100">
            <input type="submit" class="d-none" />
            <b-input type="text" v-model="searchParams.name" placeholder="Enter a name"></b-input>
          </form>
        </div>
        <div class="col col-3 d-inline-flex">
          <div @click="handleSearch()" class="btn btn-light"><b-icon-search></b-icon-search></div>
          <div @click="openSearch()" class="btn btn-light">
            <b-icon-tools></b-icon-tools><span class="d-none d-md-inline"> Filters</span>
          </div>
        </div>
        <div class="col col-3 d-inline-flex">
          <button class="btn-sm btn-light" @click="previousPage()"><b-icon-arrow-left></b-icon-arrow-left></button>
          <button class="btn-sm btn-light" @click="nextPage()"><b-icon-arrow-right></b-icon-arrow-right></button>
          <span class="badge-light badge-pill pt-1"
            >{{ searchParams.pageIndex + 1 }} / {{ searchParams.pageCount }}</span
          >
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
      <draggable
        class="dragArea list-group h-100"
        handle=".btn-drag"
        :list="results"
        :group="{ name: 'deck', pull: 'clone', put: false }"
        :clone="addCardToDeck"
        :move="onMove"
        id="resultsBody"
      >
        <div class="row flex-nowrap mt-1 text-center" v-for="result in results" :key="result.id">
          <div class="col col-1 btn-drag">
            <b-icon-filter-circle-fill variant="secondary" scale="1.5"></b-icon-filter-circle-fill>
          </div>
          <div class="col col-3 pointer" @click="openCard(result)">{{ result.name }}</div>
          <div class="col col-2"><Mana :mana-cost="result.mana_cost"></Mana></div>
          <div class="col col-3">{{ result.type_line }}</div>
          <div class="col col-3">{{ result.set_name }}</div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { addCardToDeck, onDragAndMove } from 'src/utils/dragDrop';
import modalHandler from '../../mixins/modalHandler';
import { mapState } from 'vuex';
import Mana from '../uiElements/Mana.vue';

export default {
  name: 'Search',
  components: { draggable, Mana },
  mixins: [modalHandler],
  data() {
    return {
      isSearching: false,
    };
  },
  computed: {
    ...mapState({
      searchParams: state => state.search,
    }),
    results() {
      return this.$store.getters['search/resultPage'];
    },
  },
  methods: {
    previousPage() {
      if (this.searchParams.pageIndex) {
        this.$store.commit('search/previousPage');
      }
    },
    nextPage() {
      if (this.searchParams.pageIndex < this.searchParams.pageCount - 1) {
        this.$store.commit('search/nextPage');
      }
    },
    openSearch() {
      this.searchModal().then(this.handleSearch);
    },
    openCard(card) {
      this.cardModal(card);
    },
    /**
     * Fires when user click on Enter key or search button
     */
    async handleSearch(event) {
      event && event.preventDefault();
      this.isSearching = true;
      let results = [];
      try {
        results = await this.$store.dispatch('mtg/search', this.searchParams);
      } catch (error) {
        console.error('error during search', { args: this.searchParams, error });
      }
      this.isSearching = false;
      this.$store.commit('search/setResults', results);
    },
    /**
     * Fires automatically when dragdrop detected, checks if allowed
     * @param {Object} event (automatic)
     * @return {boolean}
     */
    onMove(event) {
      return onDragAndMove(event);
    },
    /**
     * Fires automatically when a dragdrop succeeds, clones a card
     * add deck properties to a card from search result
     * doesn't change cards from other lists
     * @param {Card} card
     * @return {Object}
     */
    addCardToDeck(card) {
      return addCardToDeck(card);
    },
  },
};
</script>

<style lang="less">
#resultsBody {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
}
</style>
