<template>
  <div class="container h-75">
    <div class="row flex-nowrap mt-2" v-if="!withoutHeader">
      <div class="col col-1"></div>
      <div class="col col-3">Name</div>
      <div class="col col-2 text-left">Cost</div>
      <div class="col col-3">Type</div>
      <div class="col col-3">Set</div>
    </div>
    <div class="list-group h-75" id="resultsBody">
      <div class="row mt-1" v-for="result in results" :key="result.id">
        <AddToListButton class="d-none d-md-inline col col-1" :add-list="addList" :card="result"></AddToListButton>
        <div class="d-none d-md-inline-flex col col-2 deckQte" v-if="increment">
          <div class="btn btn-sm btn-outline-light" @click="increment(result, false)">
            <b-icon-dash-circle-fill class="mt-1"></b-icon-dash-circle-fill>
          </div>
          <b-input
            type="text"
            class="form-control input-number input text-center"
            min="1"
            max="99"
            v-model="result.deckQte"
          />
          <div class="btn btn-sm btn-outline-light" @click="increment(result, true)">
            <b-icon-plus-circle-fill class="mt-1"></b-icon-plus-circle-fill>
          </div>
        </div>

        <div class="col col-3 col-md-3 pointer" @click="cardsInfo[result.id] && openCard(cardsInfo[result.id].id)">
          {{ cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].name }}
        </div>
        <div class="col col-3 col-md-2">
          <Mana :mana-cost="cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].mana_cost" />
        </div>
        <div class="col col-3 col-md-2" v-if="increment">
          {{
            cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].isCreature
              ? `${cardsInfo[result.id].card_faces[0].power}/${cardsInfo[result.id].card_faces[0].toughness}`
              : ''
          }}
          {{
            cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].isPlaneswalker
              ? `${cardsInfo[result.id].card_faces[0].loyalty}`
              : ''
          }}
        </div>
        <div class="col col-3 col-md-2" v-else>
          {{ cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].type_line }}
        </div>
        <div class="col col-3 col-md-2" v-if="increment">
          <div class="badge badge-secondary" v-if="cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].isLegend">
            Legend
          </div>
          <div class="badge badge-secondary" v-if="cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].isToken">
            Token
          </div>
          <div class="badge badge-secondary" v-if="cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].isSnow">
            Snow
          </div>
          <div class="badge badge-secondary" v-if="cardsInfo[result.id] && cardsInfo[result.id].isDoubleFace">
            Double Face
          </div>
        </div>
        <div class="col col-3 col-md-2" v-else>{{ cardsInfo[result.id] && cardsInfo[result.id].set_name }}</div>

        <div class="d-inline-flex d-md-none col col-6 deckQte" v-if="increment">
          <div class="btn btn-sm btn-outline-light" @click="increment(result, false)">
            <b-icon-dash-circle-fill class="mt-1"></b-icon-dash-circle-fill>
          </div>
          <b-input
            type="text"
            class="form-control input-number input text-center"
            min="1"
            max="99"
            v-model="result.deckQte"
          />
          <div class="btn btn-sm btn-outline-light" @click="increment(result, true)">
            <b-icon-plus-circle-fill class="mt-1"></b-icon-plus-circle-fill>
          </div>
        </div>
        <AddToListButton class="d-inline-flex d-md-none col col-6" :add-list="addList" :card="result"></AddToListButton>
      </div>
    </div>
  </div>
</template>

<script>
import Mana from '../../uiElements/Mana.vue';
import AddToListButton from '../../uiElements/AddToListButton.vue';
import cardsInfo from '../../../mixins/cardsInfo';

export default {
  name: 'basic',
  props: ['results', 'addList', 'openCard', 'increment', 'withoutHeader'],
  components: { Mana, AddToListButton },
  mixins: [cardsInfo],
  computed: {
    allCards() {
      return this.results.map(c => c);
    },
  },
};
</script>

<style lang="less" scoped>
#resultsBody {
  overflow-x: hidden;
  overflow-y: auto;
}

.deckQte {
  .input {
    background-color: transparent;
    width: 45px;
  }
}
</style>
