<template>
  <div :class="`container ${deck ? 'deck' : ''}`" id="settings">
    <!--    <div class="row mt-2 h2" v-if="!deck">Global Settings</div>-->
    <!--    <div class="row mt-1" v-if="!deck"></div>-->
    <div class="row mt-3 h2">Deck Settings</div>
    <div class="row mt-2">
      <div class="col col-6 h4">Card Sorting</div>
      <div class="col col-3" />
      <div class="col col-3">
        <div @click="reset(settingKeys.sorting)" class="btn btn-danger">Reset</div>
      </div>
    </div>

    <div class="row mt-1" v-for="(sort, index) in settingsDeck.sorting">
      <div class="col col-2 col-md-1">
        <div :class="`btn  btn-light text-center${!index ? ' disabled' : ''}`" @click="changeSortingOrder(index, true)">
          <b-icon-arrow-up scale="1.2"></b-icon-arrow-up>
        </div>
      </div>
      <div class="col col-2 col-md-1">
        <div
          :class="`btn btn-light text-center${index === settingsDeck.sorting.length - 1 ? ' disabled' : ''}`"
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
        <div @click="changeTypeGrouping()" :class="`btn btn-${settingsDeck.typeGrouping ? 'light' : 'secondary'}`">
          {{ settingsDeck.typeGrouping ? 'Enabled' : 'Disabled' }}
        </div>
      </div>
      <div class="col col-3">
        <div @click="reset(settingKeys.typeGrouping)" class="btn btn-danger">Reset</div>
      </div>
    </div>
    <div class="row mt-1" v-for="(type, index) in settingsDeck.typePriority" v-if="settingsDeck.typeGrouping || !deck">
      <div class="col col-2 col-md-1">
        <div :class="`btn  btn-light text-center${!index ? ' disabled' : ''}`" @click="changeTypeOrder(index, true)">
          <b-icon-arrow-up scale="1.2"></b-icon-arrow-up>
        </div>
      </div>
      <div class="col col-2 col-md-1">
        <div
          :class="`btn btn-light text-center${index === settingsDeck.typePriority.length - 1 ? ' disabled' : ''}`"
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
  props: ['deck'],
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
    settingsDeck() {
      const globalSettings = this.settings.deck;
      const deckSettings = (this.deck && this.settings.byDeck[this.deck.id]) || {};
      return Object.assign({}, globalSettings, deckSettings);
    },
  },
  methods: {
    changeTypeGrouping() {
      const oldValue = this.settingsDeck.typeGrouping;
      this.$store.commit('settings/setTypeGrouping', { value: !oldValue, deck: this.deck });
    },
    changeTypeOrder(index, up) {
      try {
        const oldList = this.settingsDeck.typePriority;
        const newList = changeListOrder(oldList, index, up);
        this.$store.commit('settings/setTypePriority', { value: newList, deck: this.deck });
      } catch (e) {
        console.warn('type order change blocked', e);
      }
    },
    changeSortingOrder(index, up) {
      try {
        const oldList = this.settingsDeck.sorting;
        const newList = changeListOrder(oldList, index, up);
        this.$store.commit('settings/setSorting', { value: newList, deck: this.deck });
      } catch (e) {
        console.warn('sorting order change blocked', e);
      }
    },
    async reset(setting = null) {
      try {
        const message = setting
          ? CONST.modals.confirmationMessage.settingLost
          : CONST.modals.confirmationMessage.allSettingsLost;
        const precision = this.deck
          ? CONST.modals.confirmationMessage.deckSetting
          : CONST.modals.confirmationMessage.globalSetting;
        await this.confirmModal(message + precision);
        this.$store.commit('settings/reset', { setting, deck: this.deck });
        if (setting && setting.key === CONST.settings.keys.typeGrouping.key) {
          this.$store.commit('settings/reset', { setting: CONST.settings.keys.typePriority, deck: this.deck });
        }
        // todo toast message
      } catch (e) {
        // todo toast message
        console.info('reset setting canceled', e);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#settings.deck {
  max-height: 250px;
}
#settings {
  height: 95%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
