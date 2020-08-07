<template>
  <div id="search">
    <b-form v-on:submit="handleSearch" id="form">
      <b-container>
        <b-row>
          <b-col sm="1"><b-spinner v-if="isSearching"></b-spinner></b-col>
          <b-col sm="5"><b-input type="text" v-model="searchParams.name" placeholder="Enter a name"></b-input></b-col>
          <b-col sm="3">
            <b-button variant="light" @click="handleSearch()">
              <b-icon-search></b-icon-search><span class="d-lg-inline"> Search</span>
            </b-button>
          </b-col>
          <b-col sm="3">
            <b-button variant="light" @click="openSearch()">
              <b-icon-tools></b-icon-tools><span class="d-lg-inline"> Filters</span>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
      <input type="submit" style="display: none" />
    </b-form>
    <b-container>
      <b-row class="mt-2">
        <b-col sm="4">Name</b-col>
        <b-col sm="2" class="text-left">Cost</b-col>
        <b-col sm="3">Type</b-col>
        <b-col sm="3">Set</b-col>
      </b-row>
      <draggable
        class="dragArea list-group pre-scrollable"
        :list="results"
        :group="{ name: 'deck', pull: 'clone', put: false }"
        :clone="addCardToDeck"
        :move="onMove"
        id="resultsBody"
      >
        <b-row v-for="result in results" :key="result.id" class="mt-1 text-center">
          <b-col sm="4" @click="openCard(result)">{{ result.name }}</b-col>
          <b-col sm="2"><Mana :mana-cost="result.mana_cost"></Mana></b-col>
          <b-col sm="3">{{ result.type_line }}</b-col>
          <b-col sm="3">{{ result.set_name }}</b-col>
        </b-row>
      </draggable>
    </b-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import modalHandler from '../../mixins/modalHandler';
import { mapState } from 'vuex';
import CONST from '../../utils/CONST';
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
      results: state => state.search.results,
    }),
  },
  methods: {
    openSearch() {
      this.searchModal().then(this.handleSearch);
    },
    openCard(card) {
      this.cardModal(card);
    },
    /**
     * Fires when user click on Enter key or search button
     */
    handleSearch(event) {
      event && event.preventDefault();
      this.isSearching = true;
      this.$store
        .dispatch('mtg/search', this.searchParams)
        .then(results => {
          this.isSearching = false;
          this.$store.commit('search/setResults', results);
        })
        .catch(error => {
          this.isSearching = false;
          console.error('error during search', { args: this.searchParams, error });
          this.$store.commit('search/setResults', []);
        });
    },
    /**
     * Fires automatically when dragdrop detected, checks if allowed
     * @param {Object} event (automatic)
     * @return {boolean}
     */
    onMove({ from, to, relatedContext, draggedContext }) {
      const list = relatedContext.list;
      const draggedElement = draggedContext.element;
      const sameList = from === to;
      const isPresent = !!list.find(el => el.id === draggedElement.id);
      const allowMove = sameList || !isPresent;

      if (!allowMove) {
        // todo toast message
        console.warn('object already present in this list.');
      }

      return allowMove;
    },
    /**
     * Fires automatically when a dragdrop succeeds, clones a card
     * add deck properties to a card from search result
     * doesn't change cards from other lists
     * @param {Card} card
     * @return {Object}
     */
    addCardToDeck(card) {
      card.deckQte = 4;
      card.printConfig = card.type_line.includes('Basic Land')
        ? CONST.printConfig.DONT_PRINT.key
        : CONST.printConfig.BORDER_3.key;
      return card;
    },
  },
};
</script>

<style>
#resultsBody {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
