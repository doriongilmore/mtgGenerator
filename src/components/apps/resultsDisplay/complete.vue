<template>
  <div class="container h-75">
    <div class="list-group h-100" id="resultsBody">
      <div class="row row-cols-2 row-cols-md-3">
        <div v-for="result in cardsToPrint" :key="result.id" class="col row">
          <img
            :src="result.uri"
            :alt="result.name"
            class="col-12 mw-100 mh-100 mt-2 pointer"
            @click="openCard(result.id)"
          />
          <div class="col col-12 m-0 row deckQte" v-if="increment">
            <div class="col col-3 btn btn-sm btn-outline-light" @click="increment(result.original, false)">
              <b-icon-dash-circle-fill class="mt-1"></b-icon-dash-circle-fill>
            </div>
            <b-input
              type="text"
              class="col col-6 form-control input-number input text-center"
              min="1"
              max="99"
              v-model="result.original.deckQte"
            />
            <div class="col col-3 btn btn-sm btn-outline-light" @click="increment(result.original, true)">
              <b-icon-plus-circle-fill class="mt-1"></b-icon-plus-circle-fill>
            </div>
          </div>
          <div class="col col-12 m-0 row printConfig" v-if="result.printConfig">
            <select v-model="result.printConfig" @change="onChange">
              <option v-for="conf in printConfig.list" :key="conf.key" :value="conf.key">
                {{ conf.text }}
              </option>
            </select>
          </div>
          <AddToListButton class="col col-12" :add-list="addList" :card="result.original" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mana from '../../uiElements/Mana.vue';
import AddToListButton from '../../uiElements/AddToListButton.vue';
import MtgText from '../MtgText.vue';
import cardsInfo from '../../../mixins/cardsInfo';
import CONST from '../../../utils/CONST';

export default {
  name: 'complete',
  props: ['results', 'addList', 'openCard', 'increment', 'onChange'],
  components: { Mana, AddToListButton, MtgText },
  mixins: [cardsInfo],
  computed: {
    allCards() {
      return this.results.map(c => c);
    },
    cardsToPrint() {
      const cards = [];

      for (let i = 0; i < this.results.length; i++) {
        const _card = this.results[i];
        const deckQte = !!_card.deckQte ? +_card.deckQte : 1;
        const printConfig = !!_card.printConfig ? _card.printConfig : CONST.printConfig.BORDER_3.key;
        const image_uris = this.cardsInfo[_card.id] ? this.cardsInfo[_card.id].image_uris : [];
        const name = this.cardsInfo[_card.id] ? this.cardsInfo[_card.id].name : '';
        for (let j = 0; j < image_uris.length; j++) {
          const uri = image_uris[j];
          const card = {
            id: _card.id,
            printConfig,
            uri,
            name,
            original: _card,
          };
          for (let k = 0; k < deckQte; k++) {
            cards.push(card);
          }
        }
      }

      return cards;
    },
  },
  data() {
    return {
      printConfig: CONST.printConfig,
    };
  },
};
</script>

<style lang="less" scoped>
#resultsBody {
  overflow-x: hidden;
  overflow-y: auto;
}
.printConfig {
  select {
    background-color: transparent;
    width: 100%;
  }
}
.deckQte {
  .input {
    background-color: transparent;
    width: 100%;
  }
}
</style>
