<template>
  <div>
    <div class="row mt-3 h2" v-if="!deck">Deck Settings</div>
    <div class="row mt-2">
      <div class="col col-6 h4">Card Sorting</div>
      <div class="col col-3" />
      <div class="col col-3">
        <div @click="reset(settingKeys.sorting)" class="btn btn-danger">Reset</div>
      </div>
    </div>

    <div class="row mt-1" v-for="(sort, index) in settingsDeck.sorting">
      <div class="col col-2 col-md-1">
        <div
          :class="`btn  btn-light text-center${!index ? ' disabled' : ''}`"
          @click="update(settingKeys.sorting, index, true)"
        >
          <b-icon-arrow-up scale="1.2"></b-icon-arrow-up>
        </div>
      </div>
      <div class="col col-2 col-md-1">
        <div
          :class="`btn btn-light text-center${index === settingsDeck.sorting.length - 1 ? ' disabled' : ''}`"
          @click="update(settingKeys.sorting, index, false)"
        >
          <b-icon-arrow-down scale="1.2"></b-icon-arrow-down>
        </div>
      </div>
      <div class="col col-8">{{ sort.label }}</div>
    </div>

    <div class="row mt-2">
      <div class="col col-6 h4">Type Grouping</div>
      <div class="col col-3">
        <div
          @click="update(settingKeys.typeGrouping)"
          :class="`btn btn-${settingsDeck.typeGrouping ? 'light' : 'secondary'}`"
        >
          {{ settingsDeck.typeGrouping ? 'Enabled' : 'Disabled' }}
        </div>
      </div>
      <div class="col col-3">
        <div @click="reset(settingKeys.typeGrouping)" class="btn btn-danger">Reset</div>
      </div>
    </div>
    <div class="row mt-1" v-for="(type, index) in settingsDeck.typePriority" v-if="settingsDeck.typeGrouping || !deck">
      <div class="col col-2 col-md-1">
        <div
          :class="`btn  btn-light text-center${!index ? ' disabled' : ''}`"
          @click="update(settingKeys.typePriority, index, true)"
        >
          <b-icon-arrow-up scale="1.2"></b-icon-arrow-up>
        </div>
      </div>
      <div class="col col-2 col-md-1">
        <div
          :class="`btn btn-light text-center${index === settingsDeck.typePriority.length - 1 ? ' disabled' : ''}`"
          @click="update(settingKeys.typePriority, index, false)"
        >
          <b-icon-arrow-down scale="1.2"></b-icon-arrow-down>
        </div>
      </div>
      <div class="col col-8">{{ type.value }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CONST from 'src/utils/CONST';
import { changeListOrder } from 'src/utils/dragDrop';

export default {
  name: 'Deck',
  props: ['deck'],
  data() {
    return {
      typeList: CONST.sorting.typeList,
      settingKeys: CONST.settings.keys,
    };
  },
  computed: {
    ...mapState({
      settings: state => state.settings,
    }),
    settingsDeck() {
      const globalSettings = this.settings.deck;
      const deckSettings = (this.deck && this.settings.byDeck[this.deck.id]) || {};
      return Object.assign({}, globalSettings, deckSettings);
    },
  },
  methods: {
    reset(setting) {
      this.$emit('resetKey', setting);
    },
    update(setting, index = null, up = null, value = null) {
      this.$emit('updateKey', { setting, index, up, value });
    },
  },
};
</script>

<style lang="less" scoped></style>
