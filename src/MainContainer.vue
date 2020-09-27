<template>
  <div id="mainContainer">
    <b-nav tabs class="bg-light pl-4" id="menu">
      <b-navbar-brand to="/">Mtg - Builder</b-navbar-brand>
      <b-nav-item to="/decks" exact exact-active-class="active">Decks</b-nav-item>
      <b-nav-item to="/settings" exact exact-active-class="active">Settings</b-nav-item>
      <b-nav-item class="spinner-border" v-if="isPreloadingCards"></b-nav-item>
      <b-nav-item exact disabled v-if="isPreloadingCards">Pre-loading most used cards</b-nav-item>
      <b-nav-item class="spinner-border" v-if="isPreloadingRulings"></b-nav-item>
      <b-nav-item exact disabled v-if="isPreloadingRulings">Pre-loading rulings</b-nav-item>
    </b-nav>
    <b-nav tabs class="alert-secondary pl-4 tuto" v-if="!isHomeUnderstood">
      <b-nav-item disabled>Link to home</b-nav-item>
      <b-nav-item disabled>Lists of cards</b-nav-item>
      <b-nav-item disabled>Global settings</b-nav-item>
      <b-nav-item disabled v-if="isPreloadingCards || isPreloadingRulings">
        App is pre-loading, you can navigate but some features wont work
      </b-nav-item>
      <b-nav-item @click="homeUnderstood()">Understood, don't display again.</b-nav-item>
    </b-nav>
    <div class="content"><router-view></router-view></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'MainContainer',
  computed: {
    ...mapState({
      isPreloadingCards: state => state.mtg.preloadingCards,
      isPreloadingRulings: state => state.mtg.preloadingRulings,
      isHomeUnderstood: state => state.tutorial.home,
    }),
    ...mapGetters({
      decks: 'decks/lastModified',
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
  methods: {
    ...mapMutations({
      homeUnderstood: 'tutorial/homeUnderstood',
    }),
  },
  async mounted() {
    this.$store
      .dispatch('mtg/searchIdsInBackground', { cardIds: this.idsByPriority })
      .catch(e => console.error('error in background', e));
  },
};
</script>

<style lang="less" scoped>
#mainContainer {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .card {
    height: 100%;
  }
  .content {
    padding: 0 1%;
    background-color: #fffa;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
