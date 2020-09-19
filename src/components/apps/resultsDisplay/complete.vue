<template>
  <div class="container h-75">
    <div class="list-group h-100" id="resultsBody">
      <div class="row row-cols-2 row-cols-md-3">
        <div v-for="result in results" :key="result.id" class="col mt-3">
          <div class="row d-inline-flex flex-nowrap ml-1 mr-1">
            <div class="mr-1" v-for="imgSrc in result.image_uris">
              <img :src="imgSrc" :alt="result.name" class="mw-100 mh-100 pointer" @click="openCard(result.id)" />
            </div>
          </div>
          <div class="row">
            <AddToListButton class="col" :add-list="addList" :card="result" />
          </div>
        </div>
      </div>
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
}
</style>
