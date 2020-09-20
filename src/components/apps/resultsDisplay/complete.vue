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
          <div class="col col-12 m-0 row cardOption" v-if="increment">
            <!-- v-if="increment" to be sure we're on cards page :) -->
            <select v-model="result.printConfig" @change="changePrintConfig(result)">
              <option v-for="conf in printConfig.list" :key="conf.key" :value="conf.key">
                {{ conf.text }}
              </option>
            </select>
          </div>
          <AddToListButton class="col col-12 cardOption" :add-list="addList" :card="result.original" />
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
        const image_uris = this.cardsInfo[id] ? this.cardsInfo[id].image_uris : [];
        const name = this.cardsInfo[id] ? this.cardsInfo[id].name : '';
        for (let j = 0; j < image_uris.length; j++) {
          const uri = image_uris[j];
          for (let k = 0; k < deckQte; k++) {
            const pageBreak = !((1 + cards.length) % 9);
            const card = {
              id,
              vueKey: `${id}-${k}`,
              printConfig,
              printClass: CONST.printConfig[printConfig].class,
              uri,
              name,
              pageBreak,
              original: _card,
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
      card.original.printConfig = card.printConfig;
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
    //width: 210mm;
    //height: 297mm;
    visibility: hidden;
    #mainContainer {
      overflow: visible !important;
      .content {
        overflow: visible !important;
      }
    }
    #background {
      display: none;
    }
    #menu {
      display: none;
    }
    #deckMenu {
      display: none;
    }
    #deckHeader {
      display: none;
    }
    #displayButtons {
      display: none;
    }
    #container {
      height: inherit !important;
      #deckEdition {
        height: inherit !important;
        .content {
          overflow: visible !important;
        }
        .listHeader {
          display: none;
        }
        .content {
          overflow: visible;
        }
        .cardOption {
          display: none;
        }
        #addListButton {
          display: none;
        }
      }
    }
  }
  #resultsBody {
    margin-left: 5mm !important;
    text-align: center;
    vertical-align: middle;
    overflow: visible;
    visibility: visible;
    .cardContainer {
      height: max-content !important;
      padding: 0;
    }
    .mtg_none {
      display: none;
    }
    img {
      margin: 0;
      padding: 0;
      object-fit: contain;
    }
    // todo fix these values and improve dynamism (actually limited to ~100 cards)
    .mtg_0 {
      margin: 13mm 5mm !important;
      max-width: 70mm;
      max-height: 103mm;
    }
    .mtg_1 {
      margin: 11mm 4mm !important;
      max-width: 73mm;
      max-height: 106mm;
    }
    .mtg_2 {
      margin: 9mm 3mm 8.5mm 3mm !important;
      max-width: 76mm;
      max-height: 109mm;
    }
    .mtg_3 {
      margin: 7mm 3mm 6.5mm 2mm !important;
      max-width: 79mm;
      max-height: 112mm;
    }
  }
  .break {
    margin-bottom: 15mm !important;
  }
}
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
</style>
