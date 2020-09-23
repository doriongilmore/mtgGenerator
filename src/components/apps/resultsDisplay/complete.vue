<template>
  <div class="container h-75">
    <div class="list-group h-100" id="resultsBody">
      <div class="row row-cols-2 row-cols-md-3">
        <div
          v-for="(result, index) in cardsToPrint"
          :key="result.vueKey"
          :class="
            `cardContainer col row ${[7, 8, 0].includes((index + 1) % 9) ? 'break' : ''} ${
              printConfig[result.printConfig].class
            }`
          "
        >
          <img :src="result.uri" :alt="result.name" class="col-12 mw-100 mh-100 pointer" @click="openCard(result.id)" />
          <div class="col col-12 m-0 row cardOption" v-if="increment">
            <div class="col col-3 btn btn-sm btn-outline-light" @click="increment(result.originalCard, false)">
              <b-icon-dash-circle-fill class="mt-1"></b-icon-dash-circle-fill>
            </div>
            <b-input
              type="text"
              class="col col-6 form-control input-number input text-center"
              min="1"
              max="99"
              v-model="result.originalCard.deckQte"
            />
            <div class="col col-3 btn btn-sm btn-outline-light" @click="increment(result.originalCard, true)">
              <b-icon-plus-circle-fill class="mt-1"></b-icon-plus-circle-fill>
            </div>
          </div>
          <div class="col col-12 m-0 row cardOption" v-if="increment">
            <!-- v-if="increment" to be sure we're on cards page :) -->
            <select v-model="result.printConfig" @change="changePrintConfig(result)">
              <option v-for="conf in printConfig.list" :key="conf.key" :value="conf.key">
                {{ conf.text }}
              </option>
            </select>
          </div>
          <AddToListButton class="col col-12 cardOption" :add-list="addList" :card="result.originalCard" />
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
        const id = _card.id;
        const deckQte = !!_card.deckQte ? +_card.deckQte : 1;
        const printConfig = !!_card.printConfig ? _card.printConfig : CONST.printConfig.BORDER_3.key;
        const faceCount = this.cardsInfo[id] ? this.cardsInfo[id].card_faces.length : 0;
        for (let k = 0; k < deckQte; k++) {
          for (let j = 0; j < faceCount; j++) {
            const face = this.cardsInfo[id].card_faces[j];
            const name = face.name;
            const card = {
              id,
              vueKey: `${id}-${name}-${k}`,
              printConfig,
              uri: face.image_uri,
              name,
              originalFace: face,
              originalCard: _card,
            };
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
  methods: {
    changePrintConfig(card) {
      card.originalCard.printConfig = card.printConfig;
      this.onChange();
    },
  },
};
</script>

<style lang="less">
@media only print {
  @page {
    size: A4 portrait;
    margin: 0;
  }
  div {
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    height: inherit !important;
  }
  body {
    visibility: hidden;
    #menu,
    #deckMenu,
    #deckHeader,
    #displayButtons,
    #background,
    #addListButton,
    .cardOption,
    .listHeader {
      display: none;
    }
  }
  #resultsBody {
    margin-left: 8mm !important;
    visibility: visible;
    .mtg_none {
      display: none;
    }
    .cardContainer {
      margin: 6mm 1mm !important;
      min-width: min-content;
      max-width: min-content;
    }
    .cardContainer.break {
      margin-bottom: 14mm !important;
    }
    img {
      padding: 0;
    }
    // todo fix these values and improve dynamism (actually limited to ~150 cards)
    .mtg_0 img {
      //margin: 13mm 5mm !important;
      margin: 3mm !important;
      min-width: 75mm !important;
      max-width: 75mm !important;
    }
    .mtg_1 img {
      //margin: 11mm 4mm !important;
      margin: 2mm !important;
      min-width: 76mm !important;
      max-width: 76mm !important;
    }
    .mtg_2 img {
      margin: 1mm !important;
      min-width: 77mm !important;
      max-width: 77mm !important;
    }
    .mtg_3 img {
      //margin: 2mm !important;
      min-width: 78mm !important;
      max-width: 78mm !important;
    }
  }
}
@media only screen {
  #resultsBody {
    overflow-x: hidden;
    overflow-y: auto;
    .cardOption {
      input,
      select {
        background-color: transparent;
        width: 100%;
      }
    }
    .cardContainer {
      margin-bottom: 10px;
    }
  }
}
</style>
