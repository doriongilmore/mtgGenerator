<template>
  <div ref="container" id="container">
    <div id="deckEdition" ref="deckEdition">
      <div id="deckHeader">
        <b-navbar toggleable="sm" fixed="sm" class="w-100">
          <b-navbar-brand><b-input type="text" v-model="deck.name" trim @change="onChange()"/></b-navbar-brand>
          <b-nav-item :class="`btn rounded-pill ${updateDone ? 'btn-primary' : 'btn-light'}`" @click="saveDeck()">
            <b-icon-clipboard-check :variant="!updateDone ? 'secondary' : 'light'"></b-icon-clipboard-check>
            <span :class="`d-sm-none d-lg-inline ${updateDone ? 'btn-primary' : 'btn-light'}`"> Save</span>
          </b-nav-item>
          <b-navbar-toggle class="deckButtons" target="nav-collapse-deck"></b-navbar-toggle>
          <b-collapse id="nav-collapse-deck" is-nav>
            <b-navbar-nav class="deckButtons">
              <b-nav-item class="btn btn-light rounded-pill" @click="onPrint()">
                <b-icon-printer></b-icon-printer><span class="d-sm-none d-lg-inline btn-light"> Print</span>
                <b-spinner v-if="isPrinting" small></b-spinner>
              </b-nav-item>
              <b-nav-item class="btn btn-light rounded-pill" @click="onImport()">
                <b-icon-download></b-icon-download><span class="d-sm-none d-lg-inline btn-light"> Import</span>
              </b-nav-item>
              <b-nav-item class="btn btn-light rounded-pill" @click="onExport(deck)">
                <b-icon-upload></b-icon-upload><span class="d-sm-none d-lg-inline btn-light"> Export</span>
              </b-nav-item>
              <b-nav-item class="btn btn-light rounded-pill" @click="deleteDeck(deck)">
                <b-icon-trash variant="danger"></b-icon-trash>
                <span class="d-sm-none d-lg-inline btn-outline-danger"> Delete</span>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <!--    TOP    -->
      <b-container class="lists mt-3" v-for="(deckList, listIndex) in deck.lists" :key="`deckList-${listIndex}`">
        <b-row class="listHeader">
          <b-col cols="5" md="4" lg="6"><b-input type="text" v-model="deckList.name" @change="onChange"/></b-col>
          <b-col cols="3">{{ getCardCount(deckList.list, true) }}</b-col>
          <b-col cols="2" lg="1" :title="`${deckList.ignoreStat ? 'ignored' : 'used'} in stats`" class="d-inline">
            <label :for="'ignoreStat' + listIndex">
              <b-icon-graph-down font-scale="1.2" v-if="deckList.ignoreStat"></b-icon-graph-down>
              <b-icon-graph-up font-scale="1.2" v-else></b-icon-graph-up>
            </label>
            <input
              :id="'ignoreStat' + listIndex"
              class="w-50"
              type="checkbox"
              v-model="deckList.ignoreStat"
              @change="onChange"
            />
          </b-col>
          <b-col cols="2" md="3" lg="2">
            <b-button variant="light" @click="onExport(deckList)">
              <b-icon-upload></b-icon-upload><span class="d-none d-md-inline"> Export</span>
            </b-button>
          </b-col>
        </b-row>
        <draggable
          class="w-100"
          handle=".btn-drag"
          :list="deckList.list"
          group="deck"
          :move="onMove"
          @change="onChange"
        >
          <b-row v-for="card in deckList.list" :key="card.id" class="mt-1">
            <!-- list body -->
            <b-col cols="1" class="btn-drag">
              <b-icon-filter-circle-fill variant="light" scale="1.5" class="mt-2"></b-icon-filter-circle-fill>
            </b-col>
            <b-col cols="3" class="deckQte d-inline-flex">
              <b-icon-dash-circle-fill
                class="mt-2 ml-0 mr-2"
                variant="light"
                scale="1.5"
                @click="increment(card, false)"
              ></b-icon-dash-circle-fill>
              <b-input
                type="text"
                class="form-control input-number"
                min="1"
                max="99"
                v-model="card.deckQte"
                @change="onChange"
              />
              <b-icon-plus-circle-fill
                class="mt-2 ml-2 mr-0"
                variant="light"
                scale="1.5"
                @click="increment(card, true)"
              ></b-icon-plus-circle-fill>
            </b-col>
            <b-col cols="3" v-on:click="openCard(card)">{{ card.name }}</b-col>
            <b-col cols="3"><Mana :mana-cost="card.mana_cost"></Mana></b-col>
            <b-col cols="2">
              <select v-model="card.printConfig" @change="onChange">
                <option v-for="conf in printConfig.list" :key="conf.key" :value="conf.key">{{ conf.text }}</option>
              </select>
            </b-col>
          </b-row>
        </draggable>
      </b-container>
      <b-container class="mt-3 mb-2">
        <b-row class="listHeader">
          <b-col cols="12">
            <b-button variant="light" @click="createNewList()">
              <b-icon-plus-circle-fill></b-icon-plus-circle-fill><span class="d-inline"> Add a new list</span>
            </b-button>
          </b-col>
        </b-row>
        <draggable class="dragArea list-group" :list="tmpList" group="deck" @change="createNewList">
          <b-row v-for="card in tmpList" :key="card.id">
            <b-col cols="2" class="deckQte">
              <b-input type="number" min="0" max="99" v-model="card.deckQte" @change="onChange" />
            </b-col>
            <b-col cols="5" class="name" v-on:click="openCard(card)">{{ card.name }}</b-col>
            <b-col cols="2"><Mana class="manaCost" :mana-cost="card.mana_cost"></Mana></b-col>
            <b-col cols="3" class="printConfig">
              <select v-model="card.printConfig" @change="onChange">
                <option v-for="conf in printConfig.list" :key="conf.key" :value="conf.key">{{ conf.text }}</option>
              </select>
            </b-col>
          </b-row>
        </draggable>
      </b-container>
    </div>

    <!--    BOTTOM    -->
    <b-card title="Card Title" no-body id="footer">
      <b-card-body class="text-center" v-if="sectionToDisplay === 'search'">
        <Search></Search>
      </b-card-body>
      <b-card-body class="text-center" v-if="sectionToDisplay === 'stats'">
        <Stats :deck="deck"></Stats>
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
import Mana from '../uiElements/Mana.vue';
import modalHandler from '../../mixins/modalHandler';
import Search from './Search.vue';
import Stats from './Stats.vue';

export default {
  name: 'DeckEdition',
  props: ['deckToEdit'],
  components: { draggable, Mana, Search, Stats },
  mixins: [modalHandler],
  data() {
    return {
      isPrinting: false,
      sectionToDisplay: 'none',
      tmpList: [],
      tmpDeck: null,
      _deck: null,
      updateDone: false,
      printConfig: CONST.printConfig,
    };
  },
  computed: {
    deck() {
      return this._deck || this.deckToEdit || this.tmpDeck || {};
    },
  },
  beforeDestroy() {
    if (this.updateDone) {
      this.saveDeck();
    }
  },
  async mounted() {
    try {
      this.tmpDeck = await this.$store.dispatch('decks/getTmpDeck');
      this._deck = this.deckToEdit || this.tmpDeck;
      window.onbeforeunload = () => this.beforeDestroy();
    } catch (e) {
      console.error('error when loading from storage', e);
    }
  },
  methods: {
    increment(card, inc) {
      if ((inc && +card.deckQte < 99) || (!inc && +card.deckQte)) {
        card.deckQte = String(+card.deckQte + (inc ? 1 : -1));
        this.onChange();
      }
    },
    openCard(card) {
      this.cardModal(card);
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
    },
    onImport() {
      this.importModal().then(listOrDeck => {
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
      this.exportModal(listOrDeck);
    },
    /**
     * Fires when user click on print button
     */
    async onPrint() {
      this.isPrinting = true;
      try {
        await DeckFactory.print(this.deck);
      } catch (e) {
        alert('only works on Firefox at the moment, will be fixed soon.');
      }
      this.isPrinting = false;
    },
    /**
     * Fires when user click on delete button
     */
    async deleteDeck(deck) {
      try {
        await this.confirmModal(CONST.modals.confirmationMessage.deckLost);
        this.$store.commit('decks/deleteDeck', deck);
        await this.$router.push({ name: 'deckList' });
        // todo toast message
      } catch (e) {
        // todo toast message
        console.info('delete canceled');
      }
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
#container {
  height: 100%;
  padding-top: 0;

  .btn-drag {
    cursor: grab;
  }
  #deckEdition {
    height: 90%;
    max-height: inherit;
    .deckQte {
      .btn-sm {
        padding: 0.4rem;
        background-color: transparent;
      }
      input {
        background-color: transparent;
        width: 45px;
      }
    }
  }
  input {
    background-color: transparent;
    width: 100%;
  }
  select {
    background-color: transparent;
    text-align-last: center;
    width: 100%;
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
    }
  }
}
</style>
