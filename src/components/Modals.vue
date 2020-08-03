<template>
  <div>
    <Confirmation></Confirmation>
    <Import></Import>
    <Export></Export>
    <!--    <Card v-if="currentModal === 'card'"></Card>-->
    <!--    <AdvancedSearch v-if="currentModal === 'search'"></AdvancedSearch>-->
  </div>
</template>

<script>
// import CONST from 'src/utils/CONST';
import Import from 'src/components/modals/Import.vue';
import Export from 'src/components/modals/Export.vue';
import Card from 'src/components/modals/Card.vue';
import AdvancedSearch from 'src/components/modals/AdvancedSearch.vue';
import HomeFeature from 'src/components/modals/HomeFeature.vue';
import Confirmation from 'src/components/modals/Confirmation.vue';

export default {
  name: 'Modals',
  components: {
    Import,
    Export,
    Card,
    AdvancedSearch,
    HomeFeature,
    Confirmation,
  },
};
</script>

<style lang="less"></style>
