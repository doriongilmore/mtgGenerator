<template>
  <div class="container">
    <div class="list-group h-100" id="resultsBody">
      <div class="row row-cols-3">
        <div v-for="result in results" :key="result.id">
          <div class="col row mt-3" v-for="imgSrc in result.image_uris">
            <img
              :src="imgSrc"
              :alt="result.name"
              class="mw-100 mh-100 pointer col col-12"
              @click="openCard(result.id)"
            />
            <AddToListButton class="col col-12" :add-list="addList" :card="result" variant="secondary" />
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
  max-height: 200px;
}
</style>
