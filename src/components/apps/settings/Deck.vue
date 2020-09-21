<template>
  <div>
    <div class="row mt-3 h2" v-if="!deck">Deck Settings</div>

    <div class="row mt-1">
      <div class="col col-5 h4">Default Deck Background</div>
      <div class="col col-4">
        <b-form-select
          :options="backgroundDefaultList"
          v-model="settingsDeck.backgroundDefault"
          @change="updateDefaultBackground()"
        ></b-form-select>
      </div>
      <div class="col col-3">
        <div @click="reset(settingKeys.backgroundDefault)" class="btn btn-danger">Reset</div>
      </div>
    </div>
    <div class="row mt-1" v-if="deck">
      <div class="col col-5 h4">Background</div>
      <div class="col col-4">
        <b-form-select
          :options="backgroundList"
          v-model="deck.background"
          @change="updateBackground(deck.background)"
        />
      </div>
      <div class="col col-3">
        <div @click="updateBackground(defaultBackground, true)" class="btn btn-danger">Reset</div>
      </div>
    </div>

    <div class="row mt-2 tuto" v-if="!isSettingsListsUnderstood">
      <details class="col col-12">
        <summary>Click me</summary>
        To display a list you can order!
        <div class="btn btn-light" @click="settingsListsUnderstood()">Understood, don't display again.</div>
      </details>
    </div>

    <div class="row mt-2">
      <details class="col col-6 h4 pointer" @click="displayCardSorting = !displayCardSorting">
        <summary>Card Sorting</summary>
      </details>
      <div class="col col-3" />
      <div class="col col-3">
        <div @click="reset(settingKeys.sorting)" class="btn btn-danger">Reset</div>
      </div>
    </div>

    <div v-if="displayCardSorting" class="row mt-1" v-for="(sort, index) in settingsDeck.sorting">
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
      <div class="col col-6 h4" v-if="!settingsDeck.typeGrouping">Type Grouping</div>
      <details
        class="col col-6 h4 pointer"
        @click="displayTypeGrouping = !displayTypeGrouping"
        v-if="settingsDeck.typeGrouping"
        ><summary>Type Grouping</summary></details
      >
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
    <div
      class="row mt-1"
      v-for="(type, index) in settingsDeck.typePriority"
      v-if="displayTypeGrouping && (settingsDeck.typeGrouping || !deck)"
    >
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
import { mapMutations, mapState } from 'vuex';
import CONST from 'src/utils/CONST';
import { changeListOrder } from 'src/utils/dragDrop';
import DeckFactory from '../../../utils/DeckFactory';

export default {
  name: 'Deck',
  props: ['deck', 'cardsInfo'],
  data() {
    return {
      backgroundDefaultList: CONST.settings.backgroundDefault.list.map(e => ({ text: e.value, value: e.key })),
      settingKeys: CONST.settings.keys,
      displayCardSorting: false,
      displayTypeGrouping: false,
    };
  },
  computed: {
    ...mapState({
      settings: state => state.settings,
      isSettingsListsUnderstood: state => state.tutorial.settingsLists,
    }),
    settingsDeck() {
      const globalSettings = this.settings.deck;
      const deckSettings = (this.deck && this.settings.byDeck[this.deck.id]) || {};
      return Object.assign({}, globalSettings, deckSettings);
    },
    allCardIds() {
      if (!this.deck) {
        return [];
      }
      return DeckFactory.getCardsFromDecks([this.deck]).map(c => c.id);
    },
    backgroundList() {
      const cards = this.allCardIds.map(id => this.cardsInfo[id]);
      const defaultBackgroundSetting = this.settingsDeck[CONST.settings.keys.backgroundDefault.key];
      const sorted = cards.sort(CONST.settings.backgroundDefault[defaultBackgroundSetting].fn);
      const faces = [];
      const add = (id, face) => {
        const art_crop = face.image_uris.art_crop ? face.image_uris.art_crop : face.art_crop[0];
        faces.push({
          id,
          art_crop,
          artist: face.artist,
          name: face.name,
        });
      };
      for (let i = 0; i < sorted.length; i++) {
        const card = sorted[i];
        if (card.card_faces) {
          for (let j = 0; j < card.card_faces.length; j++) {
            add(card.id, card.card_faces[j]);
          }
        } else {
          add(card.id, card);
        }
      }

      return [{ text: 'None', value: null }, ...faces.map(c => ({ text: c.name, value: c }))];
    },
    defaultBackground() {
      let index = 0;
      if (this.settingsDeck[CONST.settings.keys.backgroundDefault.key] !== CONST.settings.backgroundDefault.none.key) {
        index = 1;
      }
      const defaultBackground = this.backgroundList[index];
      return defaultBackground && defaultBackground.value;
    },
    isBackgroundDefault() {
      if (!this.deck) {
        return false;
      }
      return this.defaultBackground && this.deck.background
        ? this.defaultBackground.art_crop === this.deck.background.art_crop
        : this.defaultBackground === this.deck.background;
    },
  },
  methods: {
    ...mapMutations({
      settingsListsUnderstood: 'tutorial/settingsListsUnderstood',
      _reset: 'settings/reset',
    }),
    reset(setting) {
      const shouldResetBackground =
        setting.key === CONST.settings.keys.backgroundDefault.key && this.isBackgroundDefault;
      const shouldResetTypePriority = setting.key === CONST.settings.keys.typeGrouping.key;
      const cbSuccess = () => {
        shouldResetBackground && this.updateBackground(this.defaultBackground);
        shouldResetTypePriority && this._reset({ setting: CONST.settings.keys.typePriority, deck: this.deck });
      };
      this.$emit('resetKey', { setting, cbSuccess });
    },
    update(setting, index = null, up = null, value = null) {
      this.$emit('updateKey', { setting, index, up, value });
    },
    async updateBackground(background, confirm = false) {
      const art_crop = background && background.art_crop;
      const artist = background && background.artist;
      this.update(CONST.settings.keys.backgroundImage, null, null, art_crop);
      this.update(CONST.settings.keys.backgroundArtist, null, null, artist);
      this.deck.background = background;
    },
    updateDefaultBackground() {
      const isBackgroundDefault = this.isBackgroundDefault;
      this.update(CONST.settings.keys.backgroundDefault, null, null, this.settingsDeck.backgroundDefault);
      if (isBackgroundDefault) {
        this.updateBackground(this.defaultBackground);
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
