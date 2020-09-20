export default {
  data() {
    return {
      cardsInfo: {},
    };
  },
  computed: {
    allCards() {
      throw 'computed "allCards" should be implemented in the view';
    },
    allCardIds() {
      try {
        return this.allCards.map(c => c.id);
      } catch (e) {
        return [];
      }
    },
  },
  watch: {
    async allCardIds(newIds) {
      this.cardsInfo = await this.getCardsInfo(newIds);
    },
  },
  methods: {
    async getCardsInfo(newIds) {
      const cardsInfo = { ...this.cardsInfo };
      for (let i = 0, l = newIds.length; i < l; i++) {
        const cardId = newIds[i];
        if (!cardsInfo[cardId]) {
          try {
            cardsInfo[cardId] = await this.$store.dispatch('mtg/getCardById', { cardId });
          } catch (e) {
            console.error('fetching card ', cardId, e);
          }
        }
      }
      return cardsInfo;
    },
  },

  async mounted() {
    try {
      this.cardsInfo = await this.getCardsInfo(this.allCardIds);
    } catch (e) {
      console.error('Error when fetching cards info ', e);
    }
  },
};
