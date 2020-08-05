<template>
  <div>
    <Confirmation></Confirmation>
    <Import></Import>
    <Export></Export>
    <Card></Card>
    <AdvancedSearch></AdvancedSearch>
  </div>
</template>

<script>
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
