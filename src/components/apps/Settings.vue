<template>
  <div :class="`container ${deck ? 'deck' : ''}`" id="settings">
    <Global v-if="!deck" v-on:resetKey="reset"></Global>
    <Deck :deck="deck" v-on:resetKey="reset"></Deck>
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
import CONST from '../../utils/CONST';
import modalHandler from '../../mixins/modalHandler';
import Deck from './settings/Deck.vue';
import Global from './settings/Global.vue';

export default {
  name: 'Settings',
  components: { Global, Deck },
  props: ['deck'],
  mixins: [modalHandler],
  methods: {
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
