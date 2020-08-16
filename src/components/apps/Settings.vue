<template>
  <div class="container" id="settings">
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

    <div class="row mt-2">
      <div class="col col-6 h4">Type Grouping</div>
      <div class="col col-3">
        <div @click="changeTypeGrouping()" :class="`btn btn-${settings.deck.typeGrouping ? 'light' : 'secondary'}`">
          {{ settings.deck.typeGrouping ? 'Enabled' : 'Disabled' }}
        </div>
      </div>
      <div class="col col-3">
        <div @click="reset(settingKeys.typeGrouping)" class="btn btn-danger">Reset</div>
      </div>
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
        <div @click="reset()" class="btn btn-danger">
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
      settingKeys: CONST.settings.keys,
    };
  },
  computed: {
    ...mapState({
      settings: state => state.settings,
    }),
  },
  methods: {
    changeTypeGrouping() {
      this.$store.commit('settings/setTypeGrouping', !this.settings.deck.typeGrouping);
    },
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
    async reset(setting = null) {
      try {
        const message = setting
          ? CONST.modals.confirmationMessage.settingLost
          : CONST.modals.confirmationMessage.allSettingsLost;
        await this.confirmModal(message);
        this.$store.commit('settings/reset', setting);
        if (setting.key === CONST.settings.keys.typeGrouping.key) {
          this.$store.commit('settings/reset', CONST.settings.keys.typePriority);
        }
        // todo toast message
      } catch (e) {
        // todo toast message
        console.info('delete canceled');
      }
    },
  },
};
</script>

<style lang="less" scoped>
#settings {
  height: 95%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
