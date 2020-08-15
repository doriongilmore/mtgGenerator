<template>
  <b-modal
    class="cardModal"
    :id="modalId"
    :title="(card && card.name) || ''"
    size="xl"
    ref="modal"
    lazy
    hide-footer
    centered
  >
    <div class="container" v-if="card">
      <div class="row">
        <div class="col-12 col-lg-6">
          <img class="card mh-100 mw-100" v-for="uri in card.image_uris" :alt="card.name" :src="uri" />
        </div>
        <div class="col-12 col-lg-6">
          <div class="container">
            <div class="mt-2 row row-cols-2">
              <div class="col">{{ card.name }}</div>
              <div class="col"><Mana class="manaCost" :mana-cost="card.mana_cost" /></div>
            </div>
            <div class="mt-2 row row-cols-2">
              <div class="col">{{ card.type_line }}</div>
              <div class="col">{{ card.rarity }}</div>
            </div>
            <div v-if="card.oracle_text" class="mt-2 p-1 border border-dark row row-cols-1">
              <div class="col"><MtgText :text="card.oracle_text"></MtgText></div>
            </div>
            <div id="legalities" class="mt-2 row row-cols-3 row-cols-sm-4 row-cols-xl-6">
              <div v-for="el in legalities" :key="el.format" :class="el.legal + ' m-1 col'" :title="el.legal">
                {{ el.format }}
              </div>
            </div>
            <div class="rule mt-2 row row-cols-1" v-for="rule in rulings" :key="rule">
              <div class="col"><MtgText :text="rule"></MtgText></div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    this.listenEvents(card => {
      if (!this.card || this.card.id !== card.id) {
        this.rulings = []; // modal will be opened before we fetch rulings for new card
        this.card = card;
        this.$store
          .dispatch('mtg/fetch', this.card.rulings_uri)
          .then(rulings => {
            this.rulings = rulings.map(r => `[${r.published_at}] ${r.comment}`);
          })
          .catch(e => {
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
  .legal {
    background-color: rgba(0, 255, 0, 0.3);
  }
  .not_legal {
    background-color: rgba(255, 0, 0, 0.3);
  }
  .banned {
    background-color: rgba(255, 0, 0, 0.3);
  }
  .restricted {
    background-color: rgba(255, 160, 0, 0.4);
  }
}
</style>
