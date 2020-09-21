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
      <div class="row" v-for="face in card.card_faces">
        <div class="col-12 col-lg-6">
          <img class="card mh-100 mw-100" :alt="face.name" :src="face.image_uri" />
        </div>
        <div class="col-12 col-lg-6">
          <div class="container">
            <div class="mt-2 row row-cols-2">
              <div class="col">{{ face.name }}</div>
              <div class="col"><Mana class="manaCost" :mana-cost="face.mana_cost" /></div>
            </div>
            <div class="mt-2 row row-cols-2">
              <div class="col">{{ face.type_line }}</div>
              <div class="col">{{ card.rarity }}</div>
            </div>
            <div
              v-if="face.oracle_text || face.flavor_text || face.isCreature"
              class="mt-2 p-1 border border-dark row row-cols-1"
            >
              <div class="col">
                <MtgText v-if="face.oracle_text" :text="face.oracle_text"></MtgText>
                <MtgText class="font-italic" v-if="face.flavor_text" :text="face.flavor_text"></MtgText>
                <div v-if="face.isCreature" class="float-right">{{ face.power }} / {{ face.toughness }}</div>
                <div v-if="face.isPlaneswalker" class="float-right">{{ face.loyalty }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row container">
        <div id="legalities" class="mt-2 row w-100">
          <div class="col m-1 h5 d-inline-flex flex-nowrap">Legal in</div>
          <div v-for="el in card.legalities" :key="el.format" :class="el.legal + ' col m-1 '" :title="el.legal">
            {{ el.format }}
          </div>
        </div>
        <div class="rule mt-2 row row-cols-1" v-for="rule in card.rulings" :key="rule">
          <div class="col"><MtgText :text="rule"></MtgText></div>
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
          console.error('fetching card and rulings', cardId, e);
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
