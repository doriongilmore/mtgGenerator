<template>
  <div ref="container" id="container">
    <GridLoader ref="spinner" id="spinner" :loading="isLoading" size="40px"></GridLoader>
    <div id="deckEdition" ref="deckEdition">
      <div id="deckHeader">
        <b-navbar toggleable="sm" fixed="sm">
          <b-navbar-brand class="deckName"><input type="text" v-model="deck.name"/></b-navbar-brand>
          <b-navbar-toggle class="deckButtons" target="nav-collapse-deck"></b-navbar-toggle>
          <b-collapse id="nav-collapse-deck" is-nav>
            <b-navbar-nav class="deckButtons">
              <b-nav-item :class="'btn rounded-pill ' + (updateDone ? 'btn-primary' : 'btn-light')" @click="saveDeck()">
                <b-icon-printer></b-icon-printer><span class="d-sm-none d-lg-inline"> Save</span>
              </b-nav-item>
              <b-nav-item class="btn btn-light rounded-pill" @click="onPrint()">
                <b-icon-printer></b-icon-printer><span class="d-sm-none d-lg-inline"> Print</span>
              </b-nav-item>
              <b-nav-item class="btn btn-light rounded-pill" @click="onImport()">
                <b-icon-download></b-icon-download><span class="d-sm-none d-lg-inline"> Import</span>
              </b-nav-item>
              <b-nav-item class="btn btn-light rounded-pill" @click="onExport(deck)">
                <b-icon-upload></b-icon-upload><span class="d-sm-none d-lg-inline"> Export</span>
              </b-nav-item>
              <b-nav-item class="btn btn-danger rounded-pill" @click="deleteDeck(deck)">
                <b-icon-trash></b-icon-trash><span class="d-sm-none d-lg-inline"> Delete</span>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <!--    TOP    -->
      <div id="deckLists">
        <div class="lists">
          <div class="deckList" v-for="(deckList, listIndex) in deck.lists">
            <div class="listHeader">
              <div class="listName">
                <input type="text" v-model="deckList.name" @change="onChange" />
              </div>
              <div class="listStatIgnore" :title="`${deckList.ignoreStat ? 'ignored' : 'used'} in stats`">
                <label :for="'ignoreStat' + listIndex">
                  <b-icon-graph-down font-scale="1.2" v-if="deckList.ignoreStat"></b-icon-graph-down>
                  <b-icon-graph-up font-scale="1.2" v-else></b-icon-graph-up>
                </label>
                <input
                  :id="'ignoreStat' + listIndex"
                  type="checkbox"
                  v-model="deckList.ignoreStat"
                  @change="onChange"
                />
              </div>
              <div class="cardCount">{{ getCardCount(deckList.list, true) }}</div>
              <b-button class="listExport" variant="light" @click="onExport(deckList)">
                <b-icon-upload></b-icon-upload><span class="d-none d-lg-inline"> Export</span>
              </b-button>
            </div>
            <draggable class="dragArea list-group" :list="deckList.list" group="deck" :move="onMove" @change="onChange">
              <div class="cardRow" v-for="card in deckList.list" :key="card.id">
                <div class="deckQte">
                  <input type="number" min="0" max="99" v-model="card.deckQte" @change="onChange" />
                </div>
                <Mana class="manaCost" :mana-cost="card.mana_cost"></Mana>
                <div class="name" v-on:click="openCard(card)">{{ card.name }}</div>
                <div class="printConfig">
                  <select v-model="card.printConfig" @change="onChange">
                    <option v-for="conf in printConfig.list" :key="conf.key" :value="conf.key">{{ conf.text }}</option>
                  </select>
                </div>
              </div>
            </draggable>
          </div>
          <div class="deckList">
            <h4>New list</h4>
            <draggable class="dragArea list-group" :list="tmpList" group="deck" @change="createNewList">
              <div class="cardRow" v-for="element in tmpList" :key="element.id"></div>
            </draggable>
          </div>
        </div>
      </div>
    </div>

    <!--    BOTTOM    -->
    <b-card title="Card Title" no-body id="footer">
      <b-card-body class="text-center" v-if="sectionToDisplay === 'search'">
        <div id="search">
          <form v-on:submit="handleSearch" id="form">
            <div class="d-inline-block w-50">
              <input class="w-100" type="text" v-model="searchParams.name" placeholder="Enter a name" />
            </div>
            <b-button variant="light" @click="handleSearch()">
              <b-icon-search></b-icon-search><span class="d-none d-lg-inline"> Search</span>
            </b-button>
            <b-button variant="light" @click="openSearch()">
              <b-icon-tools></b-icon-tools><span class="d-none d-lg-inline"> Advanced Search</span>
            </b-button>
            <input type="submit" style="display: none" />
          </form>
          <div id="results">
            <div class="header">
              <div class="name">Name</div>
              <div class="manaCost">Cost</div>
              <div class="type">Type</div>
              <div class="setName">Set</div>
            </div>
            <draggable
              class="dragArea list-group"
              :list="results"
              :group="{ name: 'deck', pull: 'clone', put: false }"
              :clone="addCardToDeck"
              :move="onMove"
              id="resultsBody"
            >
              <div v-for="result in results" :key="result.id" class="resultRow" v-on:click="openCard(result)">
                <div class="name">{{ result.name }}</div>
                <Mana class="manaCost" :mana-cost="result.mana_cost"></Mana>
                <div class="type">{{ result.type_line }}</div>
                <div class="setName">{{ result.set_name }}</div>
              </div>
            </draggable>
          </div>
        </div>
      </b-card-body>
      <b-card-body class="text-center" v-if="sectionToDisplay === 'stats'">
        <div id="deckStats" ref="stats">
          <PieChart id="byType" :chart-data="stats.byType" class="graph"></PieChart>
          <PieChart id="byColor" :chart-data="stats.byColor" class="graph"></PieChart>
          <BarChart id="byCmc" :chart-data="stats.byCmc" :options="yBeginAtZero" class="graph"></BarChart>
          <PieChart id="byFunctionality" :chart-data="stats.byFunctionality" class="graph"></PieChart>
        </div>
      </b-card-body>
      <b-card-footer footer-tag="nav">
        <b-nav card-footer tabs>
          <b-nav-item :active="sectionToDisplay === 'none'" @click="sectionToDisplay = 'none'">Hide</b-nav-item>
          <b-nav-item :active="sectionToDisplay === 'search'" @click="sectionToDisplay = 'search'">Search</b-nav-item>
          <b-nav-item :active="sectionToDisplay === 'stats'" @click="sectionToDisplay = 'stats'">Stats</b-nav-item>
        </b-nav>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import CONST from 'src/utils/CONST';
import DeckFactory from 'src/utils/DeckFactory';
import { getStats, getEmptyStats } from 'src/utils/DeckStats';
import Button from '../uiElements/Button.vue';
import Mana from '../uiElements/Mana.vue';
import BarChart from '../chartjs/BarChart.vue';
import PieChart from '../chartjs/PieChart.vue';
import { mapState } from 'vuex';
import GridLoader from 'vue-spinner/src/GridLoader.vue';

export default {
  name: 'DeckEdition',
  props: ['deckToEdit'],
  components: { draggable, Button, Mana, BarChart, PieChart, GridLoader },
  data() {
    return {
      isLoading: false,
      sectionToDisplay: 'none',
      cardToDisplay: null,
      tmpList: [],
      tmpDeck: null,
      _deck: null,
      updateDone: false,
      printConfig: CONST.printConfig,
      stats: getEmptyStats(),
      yBeginAtZero: CONST.stats.defaultOptions.yBeginAtZero,
    };
  },
  computed: {
    ...mapState({
      searchParams: state => state.search,
      results: state => state.search.results,
    }),
    deck() {
      return this._deck || this.deckToEdit || this.tmpDeck || {};
    },
  },
  beforeDestroy() {
    if (!this.updateDone) {
      return;
    }
    this.saveDeck();
  },
  async mounted() {
    this.resize();

    try {
      this.tmpDeck = await this.$store.dispatch('decks/getTmpDeck');
      this._deck = this.deckToEdit || this.tmpDeck;
      this.stats = getStats(this.deck);
      window.onbeforeunload = () => {
        if (!this.updateDone) {
          return;
        }
        this.saveDeck();
      };
      window.onresize = this.resize;
    } catch (e) {
      console.error('error when loading from storage', e);
    }
  },
  methods: {
    resize() {
      // const MIN_EDITION = 200;
      // const parentHeight = this.$refs.container.parentElement.clientHeight;
      // const statsHeight = Math.max(MIN_EDITION, Math.min(this.$refs.stats.clientHeight, parentHeight - MIN_EDITION));
      // const editionHeight = parentHeight - statsHeight;
      // this.$refs.deckEdition.style['grid-template-rows'] = `${editionHeight}px`;
      // this.$refs.stats.style.height = 'auto';
      // this.$refs.stats.style.bottom = 0;
    },
    displaySpinner() {
      this.isLoading = true;
    },
    hideSpinner() {
      this.isLoading = false;
    },
    openSearch() {
      this.$store.dispatch('modals/openSearch', this.searchParams).then(this.handleSearch);
    },
    openCard(card) {
      this.$store.dispatch('modals/openCard', card);
    },
    saveDeck() {
      DeckFactory.update(this.deck);
      const newDeck = DeckFactory.getDeckToCreate();
      if (DeckFactory.areSameDeck(this.deck, newDeck)) {
        console.warn('dont save this deck ...', { deck: this.deck, newDeck });
        this.$store.commit('decks/setTmpDeck', newDeck); // update creation time
        return false;
      }
      this.$store.commit('decks/setDecks', [this.deck]);
      this._deck = this.deck;
      this.$store.commit('decks/setTmpDeck', newDeck);
      this.tmpDeck = newDeck;
      this.updateDone = false;
    },
    onChange() {
      this.updateDone = true;
      this.stats = getStats(this.deck);
      this.resize();
    },
    onImport() {
      this.$store.dispatch('modals/openImport').then(listOrDeck => {
        // todo param replace/append to do = or push
        if (listOrDeck.lists) {
          this.deck.lists = listOrDeck.lists;
          this.deck.name = listOrDeck.name;
        } else {
          this.deck.lists = listOrDeck;
        }
        this.onChange();
      });
    },
    /**
     * Fires when user click on export button
     * @param {Deck|DeckList} listOrDeck
     */
    onExport(listOrDeck) {
      if (listOrDeck.lists) {
        // update deck state for json export
        DeckFactory.update(listOrDeck);
      }
      this.$store.dispatch('modals/openExport', listOrDeck);
    },
    /**
     * Fires when user click on print button
     */
    async onPrint() {
      this.displaySpinner();
      await DeckFactory.print(this.deck);
      this.hideSpinner();
    },
    /**
     * Fires when user click on delete button
     */
    deleteDeck(deck) {
      this.$store
        .dispatch('modals/openConfirmation')
        .then(() => {
          this.$store.commit('decks/deleteDeck', deck);
          this.$router.push({ name: 'deckList' });
        })
        .catch(() => console.info('delete canceled'));
    },
    /**
     * Fires when user click on Enter key or search button
     */
    handleSearch(event) {
      event && event.preventDefault();
      this.displaySpinner();
      this.$store
        .dispatch('mtg/search', this.searchParams)
        .then(results => {
          this.hideSpinner();
          this.$store.commit('search/setResults', results);
        })
        .catch(error => {
          this.hideSpinner();
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
      if (!card.deckQte) {
        card.deckQte = 4;
      }
      if (!card.printConfig) {
        const printConfig = card.type_line.includes('Basic Land')
          ? this.printConfig.DONT_PRINT.key
          : this.printConfig.BORDER_3.key;
        card.printConfig = printConfig;
      }
      return card;
    },
    /**
     * Fires automatically when a dragdrop succeeds in new list area
     * creates a new list with default name and reset tmp list
     */
    createNewList() {
      this.deck.lists.push({
        name: 'Choose a name',
        ignoreStat: false,
        list: [...this.tmpList],
      });
      this.tmpList = [];
    },
    getCardCount(list, getString = false) {
      const count = list.reduce(DeckFactory.countCardByList, 0);
      if (!getString) {
        return count;
      }
      const lib = `card${count > 1 ? 's' : ''}`;
      return `${count} ${lib}`;
    },
  },
};
</script>

<style lang="less" scoped>
//Extra small (xs) <576px
//Small (sm) ≥576px
//Medium (md) ≥768px
//Large (lg) ≥992px
//Extra large (xl) ≥1200px
@media screen and (max-width: 576px) {
  #deckLists .lists {
    height: 80%;
  }
}
@media screen and (min-width: 576px) {
  #deckLists .lists {
    height: 87%;
  }
}
@media screen and (min-width: 1000px) {
  #deckLists .lists {
    height: 93%;
  }
}
@media screen and (min-width: 1400px) {
  #deckLists .lists {
    height: 100%;
  }
}

#container {
  height: 100%;
  padding-top: 0;

  #spinner {
    position: absolute;
    top: 30%;
    left: 40%;
  }
  #deckEdition {
    height: 100%;
    overflow: hidden;
    #deckHeader {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-areas: 'name deckButtons';
      .deckName {
        grid-area: name;
        input {
          background-color: transparent;
          width: 100%;
        }
      }
      .deckButtons {
        grid-area: deckButtons;
      }
    }
    #deckLists {
      padding-bottom: 10%;
      margin-right: 1%;
      padding-right: 1%;
      grid-area: deckLists;
      height: 100%;
      overflow-x: hidden;
      overflow-y: hidden;

      input {
        background-color: transparent;
      }
      .lists {
        overflow-x: hidden;
        overflow-y: auto;
        padding: 1% 3% 1% 1%;

        .deckList {
          border: rgba(100, 100, 100, 0.3) solid 2px;
          padding: 1%;
          .listHeader {
            display: grid;
            grid-template-columns: 60% 20% 10% 10%;
            grid-template-areas: 'name cardCount statIgnore buttons';
            .listName {
              grid-area: name;
              input {
                width: 90%;
              }
            }
            .cardCount {
              grid-area: cardCount;
            }
            .listStatIgnore {
              grid-area: statIgnore;
            }
            .listExport {
              grid-area: buttons;
            }
          }

          .cardRow,
          .resultRow {
            display: grid;
            grid-template-columns: 10% 20% 50% 20%;
            grid-template-areas: 'deckQte manaCost name printConfig';
            .name {
              grid-area: name;
            }
            .manaCost {
              grid-area: manaCost;
            }
            .deckQte {
              grid-area: deckQte;
              input {
                width: 45px;
              }
            }
            .printConfig {
              grid-area: printConfig;
              select {
                width: 100%;
              }
            }
            .type {
              display: none;
            }
            .setName {
              display: none;
            }
            .image {
              border: 2px black;
              position: relative;
              img {
                max-height: 300px;
              }
            }
          }
        }
      }
    }
  }
  #footer {
    position: absolute;
    width: 100%;
    max-height: 60%;
    left: 0;
    bottom: 0;

    .card-body {
      overflow: hidden;
      height: 100%;

      #search {
        padding-left: 1%;
        padding-right: 1%;
        padding-bottom: 10%;
        height: auto;
        overflow: hidden;
        #results {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          .header,
          .resultRow {
            grid-area: search;
            display: grid;
            grid-template-columns: 40% 10% 20% 20%;
            grid-template-areas: 'name manaCost type setName';
            .name {
              grid-area: name;
            }
            .manaCost {
              grid-area: manaCost;
            }
            .type {
              grid-area: type;
            }
            .setName {
              grid-area: setName;
            }
            .image {
              border: 2px black;
              position: relative;
              img {
                max-height: 300px;
              }
            }
          }
        }
      }

      #deckStats {
        height: 100%;
        padding-right: 1%;
        padding-left: 1%;
        width: 95%;
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        grid-template-areas: 'cmc color type function';

        #byColor {
          grid-area: color;
        }
        #byCmc {
          grid-area: cmc;
        }
        #byType {
          grid-area: type;
        }
        #byFunctionality {
          grid-area: function;
        }
      }
    }
  }
}
</style>
