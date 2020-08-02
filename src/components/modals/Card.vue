<template>
  <div class="cardModal">
    <div class="cardImage">
      <img v-for="uri in card.image_uris" :src="uri" />
    </div>

    <div class="cardInfo">
      <div class="cardName row">
        <div class="name">{{ card.name }}</div>
        <Mana class="manaCost" :mana-cost="card.mana_cost" />
      </div>
      <div class="cardType row">
        <div class="type">{{ card.type_line }}</div>
        <div class="rarity">{{ card.rarity }}</div>
      </div>
      <div id="oracle" ref="oracle" class="row" v-if="card.oracle_text">
        <MtgText :text="card.oracle_text"></MtgText>
      </div>
      <div id="legalities" class="row">
        <div v-for="el in legalities" :v-key="el.format" :class="el.legal" :title="el.legal">{{ el.format }}</div>
      </div>
      <div id="rulings" ref="rulings" class="row">
        <div class="rule" v-for="rule in rulings">
          <MtgText :text="rule"></MtgText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Mana from 'src/components/uiElements/Mana.vue';
import MtgText from 'src/components/apps/MtgText.vue';

export default {
  name: 'Card',
  components: { Mana, MtgText },
  data() {
    return {
      rulings: [],
    };
  },
  computed: {
    ...mapState({
      /** @returns {Card} */
      card: state => state.modals.modalData,
    }),
    legalities() {
      return Object.entries(this.card.legalities).map(([format, legal]) => ({ format, legal }));
    },
  },
  async mounted() {
    try {
      this.rulings = (await this.$store.dispatch('mtg/fetch', this.card.rulings_uri)).map(
        r => `[${r.published_at}] ${r.comment}`,
      );
    } catch (e) {
      console.error('error fetching rules', e);
      this.rulings = [];
    }
  },
};
</script>

<style lang="less" scoped></style>
