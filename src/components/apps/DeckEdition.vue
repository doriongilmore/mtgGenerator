<template>
  <div ref="container" id="container">
    <ul class="bg-light pl-4 nav nav-tabs" id="deckMenu">
      <li
        @click="sectionToDisplay = 'none'"
        :class="`pointer nav-item nav-link ${sectionToDisplay === 'none' ? 'active' : ''}`"
      >
        Cards
      </li>
      <li
        @click="sectionToDisplay = 'search'"
        :class="`pointer nav-item nav-link ${sectionToDisplay === 'search' ? 'active' : ''}`"
      >
        Search
      </li>
      <li
        @click="sectionToDisplay = 'stats'"
        :class="`pointer nav-item nav-link ${sectionToDisplay === 'stats' ? 'active' : ''}`"
      >
        Stats
      </li>
      <li
        @click="sectionToDisplay = 'settings'"
        :class="`pointer nav-item nav-link ${sectionToDisplay === 'settings' ? 'active' : ''}`"
      >
        Settings
      </li>
    </ul>

    <div id="deckEdition" ref="deckEdition" v-if="deck">
      <div id="deckHeader">
        <b-navbar toggleable="sm" fixed="sm" class="w-100">
          <b-navbar-brand><b-input type="text" v-model="deck.name" trim @change="onChange()"/></b-navbar-brand>
          <b-navbar-toggle class="deckButtons" target="nav-collapse-deck"></b-navbar-toggle>
          <b-collapse id="nav-collapse-deck" is-nav>
            <b-navbar-nav class="deckButtons">
              <b-nav-item :class="`btn rounded-pill ${updateDone ? 'btn-primary' : 'btn-light'}`" @click="saveDeck()">
                <b-icon-clipboard-check :variant="!updateDone ? 'secondary' : 'light'"></b-icon-clipboard-check>
                <span :class="`d-sm-none d-lg-inline ${updateDone ? 'btn-primary' : 'btn-light'}`"> Save</span>
              </b-nav-item>
              <b-nav-item class="btn btn-light rounded-pill" @click="onImport()">
                <b-icon-download></b-icon-download><span class="d-sm-none d-lg-inline btn-light"> Import</span>
              </b-nav-item>
              <b-nav-item class="btn btn-light rounded-pill" @click="onExport(deck)">
                <b-icon-upload></b-icon-upload><span class="d-sm-none d-lg-inline btn-light"> Export</span>
              </b-nav-item>
              <b-nav-item class="btn btn-light rounded-pill" @click="deleteDeck()">
                <b-icon-trash variant="danger"></b-icon-trash>
                <span class="d-sm-none d-lg-inline btn-outline-danger"> Delete</span>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <div class="content" v-if="sectionToDisplay === 'none'">
        <div class="container" id="displayButtons">
          <div class="row">
            <div class="col col-6 btn btn-light center" @click="toggleDisplay">
              <b-icon-eye-fill></b-icon-eye-fill><span class="d-inline btn-light"> Toggle Display</span>
            </div>
            <div class="col col-6 btn btn-light center" @click="onPrint()" v-if="cardDisplay === completeDisplayKey">
              <b-icon-printer></b-icon-printer><span class="d-inline btn-light"> Print</span>
            </div>
          </div>
        </div>
        <div class="container lists mt-3" v-for="(deckList, listIndex) in deck.lists" :key="`deckList-${listIndex}`">
          <div class="row listHeader">
            <div class="col col-6">
              <b-input type="text" v-model="deckList.name" @change="onChange" />
            </div>
            <div class="d-none d-md-inline-flex col col-2">{{ getCardCount(deckList.list, true) }}</div>
            <div class="col col-6 col-md-4 d-inline-flex btn-group">
              <div
                :class="`btn btn-${deckList.ignoreStat ? 'secondary' : 'light'}`"
                :title="`${deckList.ignoreStat ? 'ignored' : 'used'} in stats`"
                @click="toggleIgnoreStat(deckList)"
              >
                <b-icon-graph-down font-scale="1.2" v-if="deckList.ignoreStat"></b-icon-graph-down>
                <b-icon-graph-up font-scale="1.2" v-else></b-icon-graph-up>
              </div>
              <div class="btn btn-sm btn-light" @click="onExport(deckList)">
                <b-icon-upload></b-icon-upload><span class="d-none d-md-inline"> Export</span>
              </div>
              <div
                :class="`btn btn-sm btn-light text-center${!listIndex ? ' disabled' : ''}`"
                @click="changeListOrder(listIndex, true)"
              >
                <b-icon-arrow-up scale="1.2"></b-icon-arrow-up>
              </div>
              <div
                :class="`btn btn-sm btn-light text-center${listIndex === deck.lists.length - 1 ? ' disabled' : ''}`"
                @click="changeListOrder(listIndex, false)"
              >
                <b-icon-arrow-down scale="1.2"></b-icon-arrow-down>
              </div>
            </div>
          </div>
          <div
            v-for="(cardList, groupIndex) in groupedList(deckList.list)"
            :class="`deckList row mt-1 ${cardList.list.length ? '' : 'd-none'}`"
            :key="`deckList-${listIndex}-${cardList.value || groupIndex}`"
          >
            <div class="listHeader h3 col col-12" v-if="cardList.value && cardList.list.length">
              {{ cardList.value }}
            </div>
            <basic
              v-if="cardDisplay === settingsFavoriteDisplay.basic.key"
              :results="cardList.list"
              :open-card="openCard"
              :increment="increment"
              :add-list="addList"
              :without-header="true"
            />
            <detailed
              v-if="cardDisplay === settingsFavoriteDisplay.detailed.key"
              :results="cardList.list"
              :open-card="openCard"
              :increment="increment"
              :add-list="addList"
              :without-header="true"
            />
            <complete
              v-if="cardDisplay === settingsFavoriteDisplay.complete.key"
              :results="cardList.list"
              :open-card="openCard"
              :increment="increment"
              :on-change="onChange"
              :add-list="addList"
            />
          </div>
        </div>
        <div class="container mt-3 mb-2" id="addListButton">
          <div class="row row-cols-1">
            <div class="col-3"></div>
            <div class="col-6">
              <div class="btn btn-light w-100" @click="createNewList()">
                <b-icon-plus-circle-fill></b-icon-plus-circle-fill><span class="d-inline"> Add a new list</span>
              </div>
            </div>
            <div class="col-3"></div>
          </div>
        </div>
      </div>
      <div class="content" v-if="sectionToDisplay === 'search'">
        <Search :deck="deck"></Search>
      </div>
      <div class="content" v-if="sectionToDisplay === 'stats'">
        <Stats :deck="deck" :cardsInfo="cardsInfo"></Stats>
      </div>
      <div class="content" v-if="sectionToDisplay === 'settings'">
        <Settings :deck="deck" :cardsInfo="cardsInfo"></Settings>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { changeListOrder } from 'src/utils/dragDrop';
import CONST from 'src/utils/CONST';
import DeckFactory from 'src/utils/DeckFactory';
import Mana from '../uiElements/Mana.vue';
import AddToListButton from '../uiElements/AddToListButton.vue';
import modalHandler from '../../mixins/modalHandler';
import cardsInfo from '../../mixins/cardsInfo';
import Search from './Search.vue';
import Stats from './Stats.vue';
import Settings from './Settings.vue';
import basic from './resultsDisplay/basic.vue';
import detailed from './resultsDisplay/detailed.vue';
import complete from './resultsDisplay/complete.vue';
import cardDisplay from '../../mixins/cardDisplay';

export default {
  name: 'DeckEdition',
  props: ['deck'],
  components: { basic, detailed, complete, Settings, Mana, Search, Stats, AddToListButton },
  mixins: [modalHandler, cardsInfo, cardDisplay],
  data() {
    return {
      isPrinting: false,
      completeDisplayKey: CONST.settings.favoriteDisplay.complete.key,
      sectionToDisplay: 'none',
      tmpList: [],
      updateDone: false,
      printConfig: CONST.printConfig,
    };
  },
  computed: {
    ...mapState({
      settings: state => state.settings,
      decks: state => Object.values(state.decks.decksByIds),
    }),
    settingsDeck() {
      const globalSettings = this.settings.deck;
      const deckSettings = this.settings.byDeck[this.deck.id] || {};
      return Object.assign({}, globalSettings, deckSettings);
    },
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
    allCards() {
      return DeckFactory.getCardsFromDecks([this.deck]);
    },
  },
  beforeDestroy() {
    this.saveDeck();
  },
  async mounted() {
    try {
      if (!this.deck) {
        await this.$router.push({ name: 'deckList' });
      } else {
        window.onbeforeunload = () => {
          this.saveDeck();
          window.onbeforeunload = () => {};
        };
      }
    } catch (e) {
      console.error('Error when opening DeckEdition ', e);
    }
  },
  methods: {
    increment(card, inc) {
      if ((inc && +card.deckQte < 99) || (!inc && +card.deckQte)) {
        card.deckQte = String(+card.deckQte + (inc ? 1 : -1));
        this.onChange();
      }
    },
    openCard(cardId) {
      this.cardModal(cardId);
    },
    saveDeck() {
      if (!this.deck) {
        return;
      }
      DeckFactory.update(this.deck, this.cardsInfo);
      const newDeck = DeckFactory.getDeckToCreate();
      if (DeckFactory.areSameDeck(this.deck, newDeck)) {
        console.warn('dont save this deck ...', { deck: this.deck, newDeck });
        return;
      }
      this.onChange(true); // sort lists
      this.$store.commit('decks/setDecks', [this.deck]);
      this.updateDone = false;
    },
    /**
     * {Event|Boolean|null} sortLists
     */
    onChange(sortLists = false) {
      this.updateDone = true;
      DeckFactory.update(this.deck, this.cardsInfo, false);
      if (sortLists === true) {
        const priority = this.settingsDeck.sorting;
        for (let i = 0, l = this.deck.lists.length; i < l; i++) {
          const List = this.deck.lists[i];
          List.list = List.list.sort((cardA, cardB) => {
            const infoA = this.cardsInfo[cardA.id];
            const infoB = this.cardsInfo[cardB.id];
            for (let j = 0, k = priority.length; j < k; j++) {
              const key = priority[j].key;
              // fn lost when storing in localStorage
              const res = CONST.sorting[key].fn(infoA, infoB);
              if (res) {
                return res;
              }
            }
            return 0;
          });
        }
      }
    },
    async onImport() {
      let listOrDeck, notFound, cardIds;
      try {
        const res = await this.importModal();
        listOrDeck = res.listOrDeck;
        cardIds = res.cardIds;
        notFound = res.notFound;
      } catch (e) {
        return;
      }

      const len = notFound.length;
      if (!!len) {
        const message = 'Some cards have not been imported';
        for (let i = 0; i < len; i++) {
          const row = notFound[i];
        }
        // todo toast message
        return;
      }
      // todo param replace/append to do = or push
      if (listOrDeck.lists) {
        this.deck.lists = listOrDeck.lists;
        this.deck.name = listOrDeck.name;
      } else {
        this.deck.lists = listOrDeck;
      }
      this.cardsInfo = await this.getCardsInfo(cardIds);
      this.onChange(true);
    },
    /**
     * Fires when user click on export button
     * @param {Deck|DeckList} listOrDeck
     */
    onExport(listOrDeck) {
      if (listOrDeck.lists) {
        // update deck state for json export
        DeckFactory.update(listOrDeck, this.cardsInfo);
      }
      this.exportModal(listOrDeck);
    },
    /**
     * Fires when user click on print button
     */
    onPrint() {
      window.print();
    },
    /**
     * Fires when user click on delete button
     */
    async deleteDeck() {
      try {
        await this.confirmModal(CONST.modals.confirmationMessage.deckLost);
        // return to list before deleting because deck will be saved when leaving this page.
        await this.$router.push({ name: 'deckList' });
        this.$store.commit('decks/deleteDeck', this.deck);
        // todo toast message
      } catch (e) {
        // todo toast message
      }
    },
    /**
     * Fires automatically when a dragdrop succeeds in new list area
     * creates a new list with default name and reset tmp list
     */
    createNewList() {
      this.deck.lists.push(DeckFactory.createNewList(this.tmpList));
      this.tmpList = [];
    },
    toggleIgnoreStat(deckList) {
      deckList.ignoreStat = !deckList.ignoreStat;
      this.onChange();
    },
    getCardCount(list, getString = false) {
      const count = list.reduce(DeckFactory.countCardByList, 0);
      if (!getString) {
        return count;
      }
      const lib = `card${count > 1 ? 's' : ''}`;
      return `${count} ${lib}`;
    },
    /**
     *
     * @param {Array<Card>} list
     */
    groupedList(list) {
      if (!this.settingsDeck.typeGrouping) {
        return [{ list, value: '' }];
      }
      const typePriority = this.settingsDeck.typePriority.map(type => ({ value: type.value, list: [] }));
      const unknown = [];
      for (let i = 0, l = list.length; i < l; i++) {
        const card = list[i];
        const cardInfo = this.cardsInfo[card.id];
        if (cardInfo) {
          const key = getTypeKey(typePriority, cardInfo.type_line);
          typePriority.find(t => t.value === key).list.push(card);
        } else {
          unknown.push(card);
        }
      }
      if (unknown.length) {
        typePriority.push({ value: '', list: unknown });
      }
      return typePriority;
    },
    changeListOrder(index, up) {
      try {
        this.deck.lists = changeListOrder(this.deck.lists, index, up);
      } catch (e) {
        console.warn('card list order change blocked', e);
      }
    },
  },
};
function getTypeKey(priority, typeLine) {
  const cardType = typeLine
    .split('—')[0] // remove subtype
    .split('//')[0] // remove second face card (in case no subtype)
    .replace(/Snow/g, '')
    .replace(/Basic/g, '')
    .replace(/Legendary/g, '')
    .replace(/Legend/g, '')
    .replace(/Tribal/g, '')
    .replace(/Token/g, '')
    .trim();
  for (let i = 0, l = priority.length; i < l; i++) {
    const type = priority[i].value;
    if (cardType === type) {
      return type;
    }
  }
}
</script>

<style lang="less" scoped>
#container {
  height: 95%;
  padding-top: 0;

  #deckEdition {
    height: 85%;
    max-height: inherit;
    .content {
      overflow-x: hidden;
      overflow-y: auto;
      height: 100%;
      .deckQte {
        .input {
          background-color: transparent;
          width: 45px;
        }
        .plus {
          margin-left: -10px !important;
        }
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
}
</style>
