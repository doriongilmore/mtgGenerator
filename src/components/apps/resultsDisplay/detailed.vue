<template>
  <div class="container h-75">
    <div class="row mt-2" v-if="!withoutHeader">
      <div class="col col-1"></div>
      <div class="col col-3">Art</div>
      <div class="col col-5 row">
        <div class="col col-6">Name</div>
        <div class="col col-6 text-left">Cost</div>
        <div class="col col-6">Type</div>
        <div class="col col-6">P/T</div>
        <div class="col col-6">Artist</div>
        <div class="col col-6">Set</div>
      </div>
      <div class="col col-3">Oracle</div>
    </div>
    <div class="list-group h-75" id="resultsBody">
      <div class="row mt-2 mb-2" v-for="result in results" :key="cardsInfo[result.id] && cardsInfo[result.id].id">
        <AddToListButton class="col col-1" :add-list="addList" :card="result"></AddToListButton>
        <div class="col col-1 row deckQte" v-if="increment">
          <div class="col col-12 btn btn-outline-light" @click="increment(result, true)">
            <b-icon-plus-circle-fill class="mt-1"></b-icon-plus-circle-fill>
          </div>
          <b-input
            type="text"
            class="col col-12 form-control input-number input text-center"
            min="1"
            max="99"
            v-model="result.deckQte"
          />
          <div class="minus col col-12 btn btn-outline-light" @click="increment(result, false)">
            <b-icon-dash-circle-fill class="mt-1"></b-icon-dash-circle-fill>
          </div>
        </div>
        <div class="col col-3 align-self-center">
          <img
            :src="cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].art_crop"
            :alt="cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].name"
            class="mw-100 mh-100 pointer"
            @click="openCard(cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].id)"
          />
        </div>
        <div class="col col-4 row align-content-center">
          <div
            class="col col-6 pointer"
            @click="openCard(cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].id)"
          >
            {{ cardsInfo[result.id] && cardsInfo[result.id].name }}
            <div class="badge badge-secondary" v-if="cardsInfo[result.id] && cardsInfo[result.id].isDoubleFace">
              Double Face
            </div>
          </div>
          <div class="col col-6">
            <Mana :mana-cost="cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].mana_cost"></Mana>
          </div>
          <div class="col col-6">{{ cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].type_line }}</div>
          <div class="col col-6">
            <div v-if="cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].type_line.includes('Creature')">
              {{ cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].power }}/{{
                cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].toughness
              }}
            </div>
          </div>
          <div class="col col-6">
            <b-icon-pencil></b-icon-pencil> {{ cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].artist }}
          </div>
          <div class="col col-6">{{ cardsInfo[result.id] && cardsInfo[result.id].set_name }}</div>
        </div>
        <div class="col col-3 align-self-center">
          <MtgText :text="(cardsInfo[result.id] && cardsInfo[result.id].card_faces[0].oracle_text) || ''"></MtgText>
        </div>
      </div>
      <div class="row mt-1 text-center"></div>
    </div>
  </div>
</template>

<script>
import Mana from '../../uiElements/Mana.vue';
import AddToListButton from '../../uiElements/AddToListButton.vue';
import MtgText from '../MtgText.vue';
import cardsInfo from '../../../mixins/cardsInfo';

export default {
  name: 'detailed',
  props: ['results', 'addList', 'openCard', 'increment', 'withoutHeader'],
  components: { Mana, AddToListButton, MtgText },
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
    width: 100%;
  }
  .minus {
    margin-top: -10px !important;
  }
}
</style>
