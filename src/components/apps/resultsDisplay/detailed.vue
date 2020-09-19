<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col col-1"></div>
      <div class="col col-3">Art</div>
      <div class="col col-5 row">
        <div class="col col-6">Name</div>
        <div class="col col-6 text-left">Cost</div>
        <div class="col col-6">Type</div>
        <div class="col col-6">Power / Toughness</div>
        <div class="col col-6">Artist</div>
        <div class="col col-6">Set</div>
      </div>
      <div class="col col-3">Oracle</div>
    </div>
    <div class="list-group h-100" id="resultsBody">
      <div class="row mt-2 mb-2" v-for="result in results" :key="result.id">
        <AddToListButton class="col col-1" :add-list="addList" :card="result" variant="secondary"></AddToListButton>
        <div class="col col-3 align-self-center">
          <img :src="result.art_crop" :alt="result.name" class="mw-100 mh-100 pointer" @click="openCard(result.id)" />
        </div>
        <div class="col col-5 row align-content-center">
          <div class="col col-6 pointer" @click="openCard(result.id)">{{ result.name }}</div>
          <div class="col col-6"><Mana :mana-cost="result.mana_cost"></Mana></div>
          <div class="col col-6">{{ result.type_line }}</div>
          <div class="col col-6">
            <div v-if="result.type_line.includes('Creature')">{{ result.power }} / {{ result.toughness }}</div>
          </div>
          <div class="col col-6"><b-icon-pencil></b-icon-pencil> {{ result.artist }}</div>
          <div class="col col-6">{{ result.set_name }}</div>
        </div>
        <div class="col col-3 align-self-center"><MtgText :text="result.oracle_text"></MtgText></div>
      </div>
      <div class="row mt-1 text-center"></div>
    </div>
  </div>
</template>

<script>
import Mana from '../../uiElements/Mana.vue';
import AddToListButton from '../../uiElements/AddToListButton.vue';
import MtgText from '../MtgText.vue';

export default {
  name: 'detailed',
  props: ['results', 'addList', 'openCard'],
  components: { Mana, AddToListButton, MtgText },
  mounted() {
    console.info('toto one result', this.results && this.results[0]);
  },
};
</script>

<style lang="less" scoped>
#resultsBody {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
}
</style>
