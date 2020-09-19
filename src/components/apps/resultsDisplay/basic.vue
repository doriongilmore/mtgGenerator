<template>
  <div class="container">
    <div class="row flex-nowrap mt-2">
      <div class="col col-1"></div>
      <div class="col col-3">Name</div>
      <div class="col col-2 text-left">Cost</div>
      <div class="col col-3">Type</div>
      <div class="col col-3">Set</div>
    </div>
    <div class="list-group h-100" id="resultsBody">
      <div class="row flex-nowrap mt-1 text-center" v-for="result in results" :key="result.id">
        <AddToListButton class="col col-1" :add-list="addList" :card="result" variant="secondary"></AddToListButton>
        <div class="col col-3 pointer" @click="openCard(result.id)">{{ result.name }}</div>
        <div class="col col-2"><Mana :mana-cost="result.mana_cost"></Mana></div>
        <div class="col col-3">{{ result.type_line }}</div>
        <div class="col col-3">{{ result.set_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Mana from '../../uiElements/Mana.vue';
import AddToListButton from '../../uiElements/AddToListButton.vue';

export default {
  name: 'basic',
  props: ['results', 'addList', 'openCard'],
  components: { Mana, AddToListButton },
};
</script>

<style lang="less" scoped>
#resultsBody {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
}
</style>
