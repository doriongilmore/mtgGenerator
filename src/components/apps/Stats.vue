<template>
  <div id="deckStats" class="container h-100">
    <div class="row  h-100">
      <div class="col-12 col-sm-6"><BarChart :chart-data="stats.byCmc" :options="yBeginAtZero" /></div>
      <div class="col-12 col-sm-6"><PieChart :chart-data="stats.byColor" /></div>
      <div class="col-12 col-sm-6"><PieChart :chart-data="stats.byType" /></div>
      <div class="col-12 col-sm-6"><PieChart :chart-data="stats.byFunctionality" /></div>
    </div>
  </div>
</template>
<script>
import CONST from '../../utils/CONST';
import BarChart from '../chartjs/BarChart.vue';
import PieChart from '../chartjs/PieChart.vue';
import { getStats, getEmptyStats } from 'src/utils/DeckStats';

export default {
  name: 'Stats',
  props: ['deck', 'cardsInfo'],
  components: { BarChart, PieChart },
  data() {
    return {
      yBeginAtZero: CONST.stats.defaultOptions.yBeginAtZero,
    };
  },
  computed: {
    stats() {
      return getStats(this.deck, this.cardsInfo);
    },
  },
};
</script>
<style lang="less">
#deckStats {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
