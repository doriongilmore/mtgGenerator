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
          <!--        todo get card covers   -->
          <!--           img-src="https://picsum.photos/600/300/?image=25"-->
          <b-card :title="deck.name" img-top class="mb-3">
            <b-card-text>
              <div class="badge badge-light" v-if="deck.colors"><Mana :mana-cost="deck.colors"></Mana></div>
              <div class="badge badge-secondary">{{ deck.cardCount }}</div>
              <div class="">created: {{ moment(deck.dateCreation).format('YY-MM-DD HH:mm') }}</div>
              <div class="">updated: {{ moment(deck.dateEdition).format('YY-MM-DD HH:mm') }}</div>
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

export default {
  name: 'DecksList',
  components: { Mana },
  mixins: [modalHandler],
  data() {
    return {
      isLoading: false,
      decks: [],
      moment,
    };
  },
  computed: {},
  async created() {
    try {
      this.decks = await this.$store.dispatch('decks/getDecks');
    } catch (e) {
      console.error('error when loading from storage', e);
    }
  },
  methods: {
    async onPrint(deck) {
      this.isLoading = true;
      await DeckFactory.print(deck);
      this.isLoading = false;
    },
    editDeck(deck = DeckFactory.getDeckToCreate()) {
      this.$router.push({ name: 'edition', params: { deckToEdit: deck } });
    },
    async deleteDeck(deck) {
      try {
        await this.confirmModal(CONST.modals.confirmationMessage.deckLost);
        this.$store.commit('decks/deleteDeck', deck);
        this.decks = await this.$store.dispatch('decks/getDecks');
        // todo toast message
      } catch (e) {
        // todo toast message
        console.info('delete canceled');
      }
    },
    async resetAll() {
      try {
        await this.confirmModal(CONST.modals.confirmationMessage.allDecksLost);
        this.$store.commit('decks/reset');
        this.decks = await this.$store.dispatch('decks/getDecks');
        // todo toast message
      } catch (e) {
        // todo toast message
        console.info('delete canceled');
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
