<template>
  <div ref="container" id="container">
    <div id="deckEdition" ref="deckEdition">
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
              <b-nav-item class="btn btn-light rounded-pill" @click="onPrint()">
                <b-icon-printer></b-icon-printer><span class="d-sm-none d-lg-inline btn-light"> Print</span>
                <div v-if="isPrinting" class="spinner-border-sm"></div>
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
      <!--    TOP    -->
      <div id="deckContent">
        <div class="container lists mt-3" v-for="(deckList, listIndex) in deck.lists" :key="`deckList-${listIndex}`">
          <div class="row listHeader">
            <div class="col col-6 col-md-3">
              <b-input type="text" v-model="deckList.name" @change="onChange" />
            </div>
            <div class="d-none d-md-block col col-3">{{ getCardCount(deckList.list, true) }}</div>
            <div class="col col-1 d-inline-flex">
              <div
                :class="`btn btn-${deckList.ignoreStat ? 'secondary' : 'light'}`"
                :title="`${deckList.ignoreStat ? 'ignored' : 'used'} in stats`"
                @click="deckList.ignoreStat = !deckList.ignoreStat"
              >
                <b-icon-graph-down font-scale="1.2" v-if="deckList.ignoreStat"></b-icon-graph-down>
                <b-icon-graph-up font-scale="1.2" v-else></b-icon-graph-up>
              </div>
            </div>
            <div class="col col-4 d-inline-flex">
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
            v-for="cardList in groupedList(deckList.list)"
            :class="`row mt-1 ${cardList.list.length ? '' : 'd-none'}`"
            :key="`deckList-${listIndex}-${cardList.value}`"
          >
            <div class="col col-12" v-if="cardList.value && cardList.list.length">{{ cardList.value }}</div>
            <div
              v-for="card in cardList.list"
              class="row col-12 mt-1 flex-nowrap"
              v-if="cardList.list.length"
              :key="`deckList-${listIndex}-${cardList.value}-${card.id}`"
            >
              <!-- list body -->
              <AddToListButton
                class="col col-1"
                :card="card"
                :add-list="addList"
                :ignore-index="listIndex"
              ></AddToListButton>
              <div class="col col-4 col-sm-3 deckQte d-inline-flex">
                <div class="btn btn-sm btn-outline-light" @click="increment(card, false)">
                  <b-icon-dash-circle-fill></b-icon-dash-circle-fill>
                </div>
                <b-input
                  type="text"
                  class="form-control input-number input text-center"
                  min="1"
                  max="99"
                  v-model="card.deckQte"
                  @change="onChange()"
                />
                <div class="btn btn-sm btn-outline-light" @click="increment(card, true)">
                  <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
                </div>
              </div>
              <div class="col col-4 col-sm-3 pointer" v-on:click="openCard(card)">{{ card.name }}</div>
              <div class="d-none d-sm-block col col-3"><Mana :mana-cost="card.mana_cost"></Mana></div>
              <div class="col col-3">
                <select v-model="card.printConfig" @change="onChange">
                  <option v-for="conf in printConfig.list" :key="conf.key" :value="conf.key">{{ conf.text }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-3 mb-2">
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
    </div>

    <!--    BOTTOM    -->
    <b-card title="Card Title" no-body id="footer">
      <b-card-body class="text-center h-100" v-if="sectionToDisplay === 'search'">
        <Search :deck="deck"></Search>
      </b-card-body>
      <b-card-body class="text-center h-100" v-if="sectionToDisplay === 'stats'">
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
import { mapState } from 'vuex';
import { changeListOrder } from 'src/utils/dragDrop';
import CONST from 'src/utils/CONST';
import DeckFactory from 'src/utils/DeckFactory';
import Mana from '../uiElements/Mana.vue';
import AddToListButton from '../uiElements/AddToListButton.vue';
import modalHandler from '../../mixins/modalHandler';
import Search from './Search.vue';
import Stats from './Stats.vue';

export default {
  name: 'DeckEdition',
  props: ['deck'],
  components: { Mana, Search, Stats, AddToListButton },
  mixins: [modalHandler],
  data() {
    return {
      isPrinting: false,
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
  beforeDestroy() {
    this.saveDeck();
  },
  async mounted() {
    try {
      window.onbeforeunload = () => this.saveDeck();
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
        return false;
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
      DeckFactory.update(this.deck);
      if (sortLists === true) {
        const priority = this.settings.deck.sorting;
        for (let i = 0, l = this.deck.lists.length; i < l; i++) {
          const List = this.deck.lists[i];
          List.list = List.list.sort((cardA, cardB) => {
            for (let j = 0, k = priority.length; j < k; j++) {
              const res = priority[j].fn(cardA, cardB);
              if (res) {
                return res;
              }
            }
            return 0;
          });
        }
      }
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
        this.onChange(true);
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
    async deleteDeck() {
      try {
        await this.confirmModal(CONST.modals.confirmationMessage.deckLost);
        // return to list before deleting because deck will be saved when leaving this page.
        await this.$router.push({ name: 'deckList' });
        this.$store.commit('decks/deleteDeck', this.deck);
        // todo toast message
      } catch (e) {
        // todo toast message
        console.info('delete canceled');
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
      if (!this.settings.deck.typeGrouping) {
        return [{ list }];
      }
      const typePriority = this.settings.deck.typePriority.map(type => ({ value: type.value, list: [] }));
      for (let i = 0, l = list.length; i < l; i++) {
        const card = list[i];
        const key = getTypeKey(typePriority, card.type_line);
        typePriority.find(t => t.value === key).list.push(card);
      }
      return typePriority;
    },
    changeListOrder(index, up) {
      try {
        const newList = changeListOrder(this.deck.lists, index, up);
        this.deck.lists = newList;
      } catch (e) {
        console.warn('card list order change blocked', e);
      }
    },
  },
};
function getTypeKey(priority, typeLine) {
  for (let i = 0, l = priority.length; i < l; i++) {
    const type = priority[i].value;
    if (typeLine.includes(type)) {
      return type;
    }
  }
}
</script>

<style lang="less" scoped>
#deckContent {
  max-height: 150px;
}
@media screen and (min-height: 430px) {
  #deckContent {
    max-height: 250px;
  }
}
@media screen and (min-height: 530px) {
  #deckContent {
    max-height: 350px;
  }
}
@media screen and (min-height: 630px) {
  #deckContent {
    max-height: 450px;
  }
}
@media screen and (min-height: 730px) {
  #deckContent {
    max-height: 550px;
  }
}
@media screen and (min-height: 830px) {
  #deckContent {
    max-height: 650px;
  }
}
@media screen and (min-height: 930px) {
  #deckContent {
    max-height: 750px;
  }
}
@media screen and (min-height: 1030px) {
  #deckContent {
    max-height: 850px;
  }
}
@media screen and (min-height: 1130px) {
  #deckContent {
    max-height: 950px;
  }
}
#container {
  height: 100%;
  padding-top: 0;

  #deckEdition {
    height: 85%;
    max-height: inherit;
    #deckContent {
      overflow-y: auto;
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
