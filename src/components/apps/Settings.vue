<template>
  <div class="container">
    <div class="row mt-2 h2">Global Settings</div>
    <div class="row mt-1"></div>
    <div class="row mt-3 h2">Deck Settings</div>
    <div class="row mt-1">
      <div class="col col-12 h4">Card Sorting</div>
      <div class="w-25 d-inline-flex" v-for="(sort, index) in settings.sorting">
        <div class="col">{{ sort.label }}</div>
        <div class="col" v-if="index !== settings.sorting.length - 1">
          <div class="btn-sm btn-light text-center" @click="changeSortingOrder(index)">
            <b-icon-arrow-left scale="1.4"></b-icon-arrow-left>
            <b-icon-arrow-right scale="1.4"></b-icon-arrow-right>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Settings',
  computed: {
    ...mapState({
      settings: state => state.settings,
    }),
  },
  methods: {
    changeSortingOrder(startIndex) {
      const first = this.settings.sorting[startIndex];
      const second = this.settings.sorting[startIndex + 1];
      this.settings.sorting[startIndex] = second;
      this.settings.sorting[startIndex + 1] = first;
      this.$store.commit('settings/setSorting', this.settings.sorting);
    },
  },
};
</script>

<style></style>
