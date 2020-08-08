<template>
  <b-modal class="cardModal" :id="modalId" title="Search" size="lg" ref="modal" lazy hide-footer centered>
    <b-container fluid>
      <b-row>
        <b-col cols="3"><label for="lang">Language</label></b-col>
        <b-col cols="9">
          <b-form-select :options="langList" v-model="searchParams.lang" id="lang"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col cols="3"><label for="name">Name</label></b-col>
        <b-col cols="9"><b-form-input v-model="searchParams.name" id="name" type="text"></b-form-input></b-col>
      </b-row>
      <b-row class="mt-1" v-for="(text, index) in searchParams.texts" :key="text">
        <b-col cols="3"><label :for="`text-${index}`">Text</label></b-col>
        <b-col cols="6">
          <b-form-input v-model="searchParams.texts[index]" :id="`text-${index}`" type="text"></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-button pill @click="removeText(index)" variant="danger"><b-icon-trash></b-icon-trash></b-button>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col cols="3"><label for="tmpText">Text</label></b-col>
        <b-col cols="6"><b-form-input v-model="tmpText" id="tmpText" type="text"></b-form-input></b-col>
        <b-col cols="3">
          <b-button pill @click="addText()" variant="primary"><b-icon-plus></b-icon-plus></b-button>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col cols="3"><label for="color">Colors</label></b-col>
        <b-col cols="6" id="color" class="table-hover">
          <b-form-checkbox-group>
            <b-form-checkbox
              v-for="color in lists.colorList"
              v-model="searchParams.colors"
              :value="color.key"
              :key="color.key"
              ><Mana :mana-cost="color.value"></Mana
            ></b-form-checkbox>
          </b-form-checkbox-group>
        </b-col>
        <b-col cols="3">
          <b-form-select :options="inclusionList" v-model="searchParams.colorInclusion"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col cols="3"><label for="cost">Cost</label></b-col>
        <b-col cols="6">
          <b-form-input type="number" id="cost" min="0" number v-model="searchParams.cmc"></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-form-select :options="inclusionList" v-model="searchParams.cmcInclusion"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col cols="3"><label for="rarity">Rarity</label></b-col>
        <b-col cols="6">
          <b-form-select :options="rarityList" v-model="searchParams.rarity" id="rarity"></b-form-select>
        </b-col>
        <b-col cols="3">
          <b-form-select :options="inclusionList" v-model="searchParams.rarityInclusion"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-1" v-for="(type, index) in searchParams.types" :key="type">
        <b-col cols="3"><label :for="`type-${index}`">Type</label></b-col>
        <b-col cols="6">
          <b-form-input v-model="searchParams.types[index]" :id="`type-${index}`" type="text" disabled></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-button pill @click="removeType(index)" variant="danger"><b-icon-trash></b-icon-trash></b-button>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col cols="3"><label for="tmpType">Type</label></b-col>
        <b-col cols="6"><b-form-select :options="typeList" v-model="tmpType" id="tmpType"></b-form-select></b-col>
        <b-col cols="3">
          <b-button pill @click="addType()" variant="primary"><b-icon-plus></b-icon-plus></b-button>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col cols="6">
          <b-button variant="secondary" class="w-100" @click="clearSearch()">
            <b-icon-trash></b-icon-trash> Clean
          </b-button>
        </b-col>
        <b-col cols="6">
          <b-button variant="primary" class="w-100" @click="close()"> <b-icon-search></b-icon-search> Search </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';
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
      searchParams: state => state.search,
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
      return this.lists.typeList.map(parseList);
    },
  },
  methods: {
    clearSearch() {
      this.$store.commit('search/clearSearch');
      this.tmpText = '';
    },
    removeText(index) {
      this.$store.commit('search/removeText', index);
    },
    addText() {
      this.$store.commit('search/addText', this.tmpText);
      this.tmpText = '';
    },
    removeType(index) {
      this.$store.commit('search/removeType', index);
    },
    addType() {
      this.$store.commit('search/addType', this.tmpType);
      this.tmpType = '';
    },
  },
};
</script>

<style lang="less" scoped></style>
