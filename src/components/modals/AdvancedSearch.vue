<template>
  <b-modal class="cardModal" :id="modalId" title="Search" size="lg" ref="modal" lazy hide-footer centered>
    <div class="container-fluid">
      <div class="row flex-nowrap" v-if="!isSearchLanguageUnderstood">
        <div class="col-6">/!\ The search language only works for card name</div>
        <div class="col-6">
          <div class="btn btn-light w-100" @click="searchLanguageUnderstood">Understood, don't display again.</div>
        </div>
      </div>
      <div class="row flex-nowrap">
        <div class="col-3"><label for="lang">Language</label></div>
        <div class="col-9">
          <b-form-select :options="langList" v-model="searchParams.lang" id="lang"></b-form-select>
        </div>
      </div>
      <div class="row flex-nowrap mt-1">
        <div class="col-3"><label for="name">Name</label></div>
        <div class="col-9"><b-form-input v-model="searchParams.name" id="name" type="text"></b-form-input></div>
      </div>
      <div class="row flex-nowrap mt-1" v-for="(text, index) in searchParams.texts" :key="text">
        <div class="col-3"><label :for="`text-${index}`">Text</label></div>
        <div class="col-6">
          <b-form-input v-model="searchParams.texts[index]" :id="`text-${index}`" type="text"></b-form-input>
        </div>
        <div class="col-3">
          <div class="btn btn-danger w-100" @click="removeText(index)"><b-icon-trash></b-icon-trash></div>
        </div>
      </div>
      <div class="row flex-nowrap mt-1">
        <div class="col-3"><label for="tmpText">Text</label></div>
        <div class="col-6"><b-form-input v-model="tmpText" id="tmpText" type="text"></b-form-input></div>
        <div class="col-3">
          <div class="btn btn-light w-100" @click="addText()"><b-icon-plus-circle-fill></b-icon-plus-circle-fill></div>
        </div>
      </div>
      <div class="row flex-nowrap mt-1">
        <div class="col-3"><label for="color">Colors</label></div>
        <div id="color" class="col-6 table-hover">
          <b-form-checkbox-group>
            <b-form-checkbox
              v-for="color in lists.colorList"
              v-model="searchParams.colors"
              :value="color.key"
              :key="color.key"
              ><Mana :mana-cost="color.value"></Mana
            ></b-form-checkbox>
          </b-form-checkbox-group>
        </div>
        <div class="col-3">
          <b-form-select :options="inclusionList" v-model="searchParams.colorInclusion"></b-form-select>
        </div>
      </div>
      <div class="row flex-nowrap mt-1">
        <div class="col-3"><label for="cost">Cost</label></div>
        <div class="col-6">
          <b-form-input type="number" id="cost" min="0" number v-model="searchParams.cmc"></b-form-input>
        </div>
        <div class="col-3">
          <b-form-select :options="inclusionList" v-model="searchParams.cmcInclusion"></b-form-select>
        </div>
      </div>
      <div class="row flex-nowrap mt-1">
        <div class="col-3"><label for="rarity">Rarity</label></div>
        <div class="col-6">
          <b-form-select :options="rarityList" v-model="searchParams.rarity" id="rarity"></b-form-select>
        </div>
        <div class="col-3">
          <b-form-select :options="inclusionList" v-model="searchParams.rarityInclusion"></b-form-select>
        </div>
      </div>
      <div class="row flex-nowrap mt-1" v-for="(type, index) in searchParams.types" :key="type">
        <div class="col-3"><label :for="`type-${index}`">Type</label></div>
        <div class="col-6">
          <b-form-input v-model="searchParams.types[index]" :id="`type-${index}`" type="text" disabled></b-form-input>
        </div>
        <div class="col-3">
          <div class="btn btn-danger w-100" @click="removeType(index)"><b-icon-trash></b-icon-trash></div>
        </div>
      </div>
      <div class="row flex-nowrap mt-1">
        <div class="col-3"><label for="tmpType">Type</label></div>
        <div class="col-6"><b-form-select :options="typeList" v-model="tmpType" id="tmpType"></b-form-select></div>
        <div class="col-3">
          <div class="btn btn-light w-100" @click="addType()"><b-icon-plus-circle-fill></b-icon-plus-circle-fill></div>
        </div>
      </div>
      <div class="row flex-nowrap mt-2">
        <div class="col-6">
          <div class="btn btn-secondary w-100" @click="clearSearch()"><b-icon-trash></b-icon-trash> Clean</div>
        </div>
        <div class="col-6">
          <div class="btn btn-primary w-100" @click="onClose()"><b-icon-search></b-icon-search> Search</div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Mana from 'src/components/uiElements/Mana.vue';
import CONST from 'src/utils/CONST';
import modalFactory from '../../mixins/modalFactory';

const parseList = e => ({ text: e.value, value: e.key });

export default {
  name: 'AdvancedSearch',
  components: { Mana },
  mixins: [modalFactory],
  mounted() {
    this.listenEvents();
  },
  data() {
    return {
      eventConfig: CONST.modals.events.search,
      modalId: 'modal-search',
      rules: [],
      tmpText: '',
      tmpType: '',
      lists: CONST.search,
    };
  },
  computed: {
    ...mapState({
      defaultLang: state => state.settings.global.favoriteLanguage,
      searchParams: state => state.search,
      isSearchLanguageUnderstood: state => state.tutorial.searchLanguage,
    }),
    inclusionList() {
      return this.lists.inclusion.map(parseList);
    },
    langList() {
      return this.lists.lang.list.map(parseList);
    },
    rarityList() {
      return this.lists.rarityList.map(parseList);
    },
    typeList() {
      return this.lists.typeList.filter(t => !!t.value).map(parseList);
    },
  },
  methods: {
    ...mapMutations({
      searchLanguageUnderstood: 'tutorial/searchLanguageUnderstood',
      _clearSearch: 'search/clearSearch',
      removeText: 'search/removeText',
      removeType: 'search/removeType',
      _addText: 'search/addText',
      _addType: 'search/addType',
    }),
    onClose() {
      this.addText();
      this.addType();
      this.close();
    },
    clearSearch() {
      this._clearSearch(CONST.search.lang[this.defaultLang]);
      this.tmpText = '';
    },
    addText() {
      this._addText(this.tmpText);
      this.tmpText = '';
    },
    addType() {
      const newType = this.tmpType;
      this._addType(newType);
      this.tmpType = '';
      const subTypeIndex = CONST.search.typeList.findIndex(t => t.key === `${newType}-types`);
      if (subTypeIndex !== -1) {
        const [subType] = CONST.search.typeList.splice(subTypeIndex, 1);
        this.$store
          .dispatch('mtg/fetch', subType.uri)
          .then(res => CONST.search.typeList.push(...res.map(t => ({ key: t, value: t }))));
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
