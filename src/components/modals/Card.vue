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
            <div
              v-if="card.oracle_text || card.flavor_text || card.isCreature"
              class="mt-2 p-1 border border-dark row row-cols-1"
            >
              <div class="col">
                <MtgText v-if="card.oracle_text" :text="card.oracle_text"></MtgText>
                <MtgText class="font-italic" v-if="card.flavor_text" :text="card.flavor_text"></MtgText>
                <div v-if="card.isCreature" class="float-right">{{ card.power }} / {{ card.toughness }}</div>
              </div>
            </div>
            <div id="legalities" class="mt-2 row row-cols-3 row-cols-sm-4 row-cols-xl-6">
              <div v-for="el in card.legalities" :key="el.format" :class="el.legal + ' m-1 col'" :title="el.legal">
                {{ el.format }}
              </div>
            </div>
            <div class="rule mt-2 row row-cols-1" v-for="rule in card.rulings" :key="rule">
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
    this.listenEvents(async cardId => {
      if (!this.cardId || this.cardId !== cardId) {
        try {
          this.card = null;
          this.card = await this.$store.dispatch('mtg/getCardById', { cardId });
        } catch (e) {
          console.error('fetching card', cardId, e);
        }
      }
    });
  },
  data() {
    return {
      eventConfig: CONST.modals.events.card,
      modalId: 'modal-card',
      /** @returns {Card} */
      cardId: null,
      card: null,
    };
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
