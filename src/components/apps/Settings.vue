<template>
  <div class="container">
    <!--    <div class="row mt-2 h2">Global Settings</div>-->
    <!--    <div class="row mt-1"></div>-->
    <div class="row mt-3 h2">Deck Settings</div>
    <div class="row mt-2 h4">Card Sorting</div>
    <div class="row mt-1" v-for="(sort, index) in settings.deck.sorting">
      <div class="col col-2 col-md-1">
        <div :class="`btn  btn-light text-center${!index ? ' disabled' : ''}`" @click="changeSortingOrder(index, true)">
          <b-icon-arrow-up scale="1.2"></b-icon-arrow-up>
        </div>
      </div>
      <div class="col col-2 col-md-1">
        <div
          :class="`btn btn-light text-center${index === settings.deck.sorting.length - 1 ? ' disabled' : ''}`"
          @click="changeSortingOrder(index, false)"
        >
          <b-icon-arrow-down scale="1.2"></b-icon-arrow-down>
        </div>
      </div>
      <div class="col col-8">{{ sort.label }}</div>
    </div>

    <div class="row mt-2 h4">
      Type Grouping
      <input type="checkbox" v-model="settings.deck.typeGrouping" class="m-2 custom-checkbox" />
    </div>
    <div class="row mt-1" v-for="(type, index) in settings.deck.typePriority">
      <div class="col col-2 col-md-1">
        <div :class="`btn  btn-light text-center${!index ? ' disabled' : ''}`" @click="changeTypeOrder(index, true)">
          <b-icon-arrow-up scale="1.2"></b-icon-arrow-up>
        </div>
      </div>
      <div class="col col-2 col-md-1">
        <div
          :class="`btn btn-light text-center${index === settings.deck.typePriority.length - 1 ? ' disabled' : ''}`"
          @click="changeTypeOrder(index, false)"
        >
          <b-icon-arrow-down scale="1.2"></b-icon-arrow-down>
        </div>
      </div>
      <div class="col col-8">{{ type.value }}</div>
    </div>
    <div class="row mt-3 h2">
      <div class="col col-3" />
      <div class="col col-6">
        <div @click="resetAll()" class="btn btn-danger">
          <b-icon-trash></b-icon-trash><span> Reset to default settings</span>
        </div>
      </div>
      <div class="col col-3" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CONST from '../../utils/CONST';
import { changeListOrder } from '../../utils/dragDrop';
import modalHandler from '../../mixins/modalHandler';

export default {
  name: 'Settings',
  mixins: [modalHandler],
  data() {
    return {
      typeList: CONST.sorting.typeList,
    };
  },
  computed: {
    ...mapState({
      settings: state => state.settings,
    }),
  },
  methods: {
    changeTypeOrder(index, up) {
      try {
        const newList = changeListOrder(this.settings.deck.typePriority, index, up);
        this.$store.commit('settings/setTypePriority', newList);
      } catch (e) {
        console.warn('type order change blocked', e);
      }
    },
    changeSortingOrder(index, up) {
      try {
        const newList = changeListOrder(this.settings.deck.sorting, index, up);
        this.$store.commit('settings/setSorting', newList);
      } catch (e) {
        console.warn('sorting order change blocked', e);
      }
    },
    async resetAll() {
      try {
        await this.confirmModal(CONST.modals.confirmationMessage.allSettingsLost);
        this.$store.commit('settings/reset');
        // todo toast message
      } catch (e) {
        // todo toast message
        console.info('delete canceled');
      }
    },
  },
};
</script>

<style></style>
