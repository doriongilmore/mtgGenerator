<template>
  <b-container id="deckStats" class="pre-scrollable">
    <b-row>
      <b-col cols="6" lg="3"><BarChart :chart-data="stats.byCmc" :options="yBeginAtZero"/></b-col>
      <b-col cols="6" lg="3"><PieChart :chart-data="stats.byColor"/></b-col>
      <b-col cols="6" lg="3"><PieChart :chart-data="stats.byType"/></b-col>
      <b-col cols="6" lg="3"><PieChart :chart-data="stats.byFunctionality"/></b-col>
    </b-row>
  </b-container>
</template>
<script>
import CONST from '../../utils/CONST';
import BarChart from '../chartjs/BarChart.vue';
import PieChart from '../chartjs/PieChart.vue';
import { getStats, getEmptyStats } from 'src/utils/DeckStats';

export default {
  name: 'Stats',
  props: ['deck'],
  components: { BarChart, PieChart },
  data() {
    return {
      yBeginAtZero: CONST.stats.defaultOptions.yBeginAtZero,
    };
  },
  computed: {
    stats() {
      return getStats(this.deck);
    },
  },
};
</script>
<style>
#deckStats {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
