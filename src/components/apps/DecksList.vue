<template>
  <div id="decksList">
    <div class="container">
      <div class="row row-cols-2">
        <div class="col">
          <div class="mb-3 ml-2 btn btn-primary" @click="editDeck()">
            <b-icon-plus-circle-fill></b-icon-plus-circle-fill><span> Create a deck</span>
          </div>
        </div>
        <div class="col">
          <div @click="resetAll()" class="mb-3 ml-2 btn btn-danger">
            <b-icon-trash></b-icon-trash><span> Reset to default list</span>
          </div>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        <div class="col" v-for="deck in decks" :key="deck.id">
          <b-card img-top :img-src="deck.background ? String(deck.background.art_crop) : ''">
            <div class="row badge badge-secondary badge-pill float-right" v-if="deck.background">
              <b-icon-pencil></b-icon-pencil> {{ deck.background.artist }}
            </div>
            <b-card-title>{{ deck.name }}</b-card-title>
            <b-card-text>
              <div class="badge badge-light" v-if="deck.colors"><Mana :mana-cost="deck.colors"></Mana></div>
              <div class="badge badge-secondary">{{ deck.cardCount }}</div>
              <div class="">created: {{ readableDate(deck.dateCreation) }}</div>
              <div class="">visited: {{ readableDate(deck.dateEdition) }}</div>
            </b-card-text>
            <div class="btn btn-primary" @click="editDeck(deck)"><b-icon-pen></b-icon-pen><span> Edit</span></div>
            <div class="btn btn-danger" @click="deleteDeck(deck)">
              <b-icon-trash></b-icon-trash><span> Delete</span>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mana from '../uiElements/Mana.vue';
import moment from 'moment';
import DeckFactory from 'src/utils/DeckFactory';
import CONST from '../../utils/CONST';
import modalHandler from '../../mixins/modalHandler';
import { mapGetters } from 'vuex';

export default {
  name: 'DecksList',
  components: { Mana },
  mixins: [modalHandler],
  computed: {
    ...mapGetters({
      decks: 'decks/lastModified',
    }),
  },
  methods: {
    readableDate(date) {
      return moment(date).format('YY-MM-DD HH:mm');
    },
    editDeck(deck = DeckFactory.getDeckToCreate()) {
      this.$router.push({ name: 'edition', params: { deck: deck } });
    },
    async deleteDeck(deck) {
      try {
        await this.confirmModal(CONST.modals.confirmationMessage.deckLost);
        this.$store.commit('decks/deleteDeck', deck);
        // todo toast message
      } catch (e) {
        // todo toast message
      }
    },
    async resetAll() {
      try {
        await this.confirmModal(CONST.modals.confirmationMessage.allDecksLost);
        this.$store.commit('decks/reset');
        // todo toast message
      } catch (e) {
        // todo toast message
      }
    },
  },
};
</script>

<style lang="less" scoped>
#decksList {
  display: block;
  width: 100%;
  height: 90%;
  overflow-y: auto;
  padding-bottom: 2%;
  padding-top: 2%;

  .card {
    display: inline-flex;
  }
}
</style>
