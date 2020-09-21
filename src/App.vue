<template>
  <div class="app">
    <MainContainer></MainContainer>
    <!-- MODALS LAST ! -->
    <Modals></Modals>
  </div>
</template>
<script>
import Modals from 'src/components/Modals.vue';
import MainContainer from 'src/MainContainer.vue';
import CONST from 'src/utils/CONST';
import { mapState } from 'vuex';
import DeckFactory from './utils/DeckFactory';
import moment from 'moment';

export default {
  name: 'App',
  components: {
    Modals,
    MainContainer,
  },
  computed: {
    ...mapState({
      decks: state => {
        const time = date => moment(date).unix();
        const decks = Object.values(state.decks.decksByIds);
        return decks.sort((deckA, deckB) => time(deckB.dateEdition) - time(deckA.dateEdition));
      },
    }),
    idsByPriority() {
      const cardOccurrencesById = {};
      for (let i = 0, l = this.decks.length; i < l; i++) {
        const deck = this.decks[i];
        const isInFirstDeck = i === 0;
        for (let j = 0, m = deck.lists.length; j < m; j++) {
          const cards = deck.lists[j].list;
          for (let k = 0, n = cards.length; k < n; k++) {
            const card = cards[k];
            if (!cardOccurrencesById[card.id]) {
              cardOccurrencesById[card.id] = { id: card.id, cpt: 0, isInFirstDeck };
            }
            cardOccurrencesById[card.id].cpt += 1;
          }
        }
      }
      return Object.values(cardOccurrencesById)
        .sort((cA, cB) => {
          if (cA.isInFirstDeck && !cB.isInFirstDeck) {
            return -1;
          } else if (cB.isInFirstDeck && !cA.isInFirstDeck) {
            return 1;
          }
          return cB.cpt - cA.cpt;
        })
        .map(c => c.id);
    },
  },
  async mounted() {
    this.$store
      .dispatch('mtg/searchIdsInBackground', { cardIds: this.idsByPriority })
      .catch(e => console.error('error in background', e));
  },
};
</script>
<style lang="less">
.app {
  font-family: Georgia, sans-serif;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.modal-content,
.card {
  background-color: #fffa;
}

.buttons {
  margin: auto;
  border: 1px black solid;
  border-radius: 5px;
  display: flex;

  > *:not(:first-child) {
    border-left: 1px solid black;
  }
}
.tuto {
  font-style: italic;
  font-size: smaller;
}
.pointer {
  cursor: pointer;
}
.btn-drag {
  cursor: grab;
}
</style>
