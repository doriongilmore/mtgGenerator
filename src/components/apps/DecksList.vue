<template>
  <div id="decksList">
    <b-button variant="danger" @click="resetAll()" class="mb-3 ml-2">
      <b-icon-trash></b-icon-trash><span> Reset to default list</span>
    </b-button>
    <b-container class="bv-example-row">
      <b-row cols="1" cols-md="2" cols-lg="3" cols-xl="4">
        <b-col v-for="deck in decks" :key="deck.id">
          <!--        todo get card covers   -->
          <!--           img-src="https://picsum.photos/600/300/?image=25"-->
          <b-card :title="deck.name" img-top class="mb-3">
            <b-card-text>
              <b-badge class="colors" variant="light" v-if="deck.colors">
                <Mana :mana-cost="deck.colors"></Mana>
              </b-badge>
              <b-badge class="cardCount" variant="secondary">{{ deck.cardCount }}</b-badge>
              <div class="dateCreation">created: {{ moment(deck.dateCreation).format('YY-MM-DD HH:mm') }}</div>
              <div class="dateEdition">updated: {{ moment(deck.dateEdition).format('YY-MM-DD HH:mm') }}</div>
            </b-card-text>
            <b-button class="listExport" variant="primary" @click="editDeck(deck)">
              <b-icon-pen></b-icon-pen><span> Edit</span>
            </b-button>
            <b-button class="listExport" variant="danger" @click="deleteDeck(deck)">
              <b-icon-trash></b-icon-trash><span> Delete</span>
            </b-button>
            <!--            <b-button variant="primary" @click="editDeck(deck)">Edit</b-button>-->
            <!--            <b-button variant="danger" @click="deleteDeck(deck)">Delete</b-button>-->
          </b-card>
        </b-col>
      </b-row>
    </b-container>
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
    editDeck(deck) {
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
