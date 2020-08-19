<template>
  <div>
    <div class="row mt-2 h2">Global Settings</div>
    <div class="row mt-1">
      <div class="col col-5 h4">Favorite Search Language</div>
      <div class="col col-4">
        <b-form-select
          :options="langList"
          v-model="settings.favoriteLanguage"
          @change="changeDefaultLanguage"
        ></b-form-select>
      </div>
      <div class="col col-3">
        <div @click="reset(settingKeys.favoriteLanguage)" class="btn btn-danger">Reset</div>
      </div>
    </div>
  </div>
</template>

<script>
import CONST from 'src/utils/CONST';
import { mapState } from 'vuex';

export default {
  name: 'Global',
  data() {
    return {
      actualLanguage: null,
      langList: CONST.search.lang.list.map(e => ({ text: e.value, value: e.key })),
      settingKeys: CONST.settings.keys,
    };
  },
  computed: {
    ...mapState({
      settings: state => state.settings.global,
    }),
  },
  methods: {
    async changeDefaultLanguage() {
      this.$store.commit('search/defaultLanguageChanged', {
        oldLang: this.actualLanguage,
        newLang: this.settings.favoriteLanguage,
      });
      this.actualLanguage = this.settings.favoriteLanguage;
      this.update(CONST.settings.keys.favoriteLanguage, null, null, this.actualLanguage);
    },
    async reset(setting = null) {
      this.$emit('resetKey', setting);
    },
    update(setting, index = null, up = null, value = null) {
      this.$emit('updateKey', { setting, index, up, value });
    },
  },
  mounted() {
    this.actualLanguage = this.settings.favoriteLanguage;
  },
};
</script>

<style></style>
