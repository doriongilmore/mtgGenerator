<template>
  <b-modal class="cardModal" :id="modalId" :title="card && card.name || ''" size="xl" ref="modal" lazy hide-footer centered>

    <b-container class="bv-example-row" v-if="card">
      <b-row cols="1" cols-lg="2">
        <b-col class=""><img class="cardImage mh-100 mw-100" v-for="uri in card.image_uris" :src="uri" /></b-col>
        <b-col class="">
          <b-container class="bv-example-row">
            <b-row cols="2" class="mt-2">
              <b-col>{{ card.name }}</b-col>
              <b-col><Mana class="manaCost" :mana-cost="card.mana_cost" /></b-col>
            </b-row>
            <b-row cols="2" class="mt-2">
              <b-col>{{ card.type_line }}</b-col>
              <b-col>{{ card.rarity }}</b-col>
            </b-row>
            <b-row v-if="card.oracle_text" cols="1" class="mt-2 p-1 border border-dark">
              <b-col><MtgText :text="card.oracle_text"></MtgText></b-col>
            </b-row>
            <b-row id="legalities" cols="3" cols-sm="4" cols-xl="6"  class="mt-2">
              <b-col v-for="el in legalities" :key="el.format" :class="el.legal + ' m-1'" :title="el.legal">{{ el.format }}</b-col>
            </b-row>
            <b-row class="rule mt-2" v-for="rule in rulings" :key="rule">
              <b-col><MtgText :text="rule"></MtgText></b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>

  </b-modal>
</template>

<script>
import Mana from 'src/components/uiElements/Mana.vue';
import MtgText from 'src/components/apps/MtgText.vue';
import modalFactory from '../../mixins/modalFactory';
import CONST from '../../utils/CONST';

export default {
  name: 'Card',
  components: { Mana, MtgText },
  mixins: [modalFactory],
  mounted() {
    this.listenEvents((card) => {
      if (!this.card || this.card.id !== card.id) {
        this.rulings = []; // modal will be opened before we fetch rulings for new card
        this.card = card;
        this.$store.dispatch('mtg/fetch', this.card.rulings_uri).then((rulings) => {
          this.rulings = rulings.map(r => `[${r.published_at}] ${r.comment}`);
        }).catch((e) => {
          console.error('error fetching rules', e);
          this.rulings = [];
        });
      }
    });
  },
  data() {
    return {
      eventConfig: CONST.modals.events.card,
      modalId: 'modal-card',
      /** @returns {Card} */
      card: null,
      rulings: [],
    };
  },
  computed: {
    legalities() {
      return Object.entries(this.card.legalities).map(([format, legal]) => ({ format, legal }));
    },
  },
};
</script>

<style lang="less" scoped>
#legalities {
  .legal { background-color: rgba(0, 255, 0, 0.3); }
  .not_legal { background-color: rgba(255, 0, 0, 0.3); }
  .banned { background-color: rgba(255, 0, 0, 0.3); }
  .restricted { background-color: rgba(255, 160, 0, 0.4); }
}
</style>
