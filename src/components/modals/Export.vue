<template>
  <b-modal class="export" :id="modalId" size="sm" title="Export" ref="modal" lazy hide-footer>
    <form>
      <b-form-row class="mb-2">
        <b-col cols="4" v-for="f in exportFormats" :key="f.key">
          <b-radio :id="f.key" :value="f" v-model="format"> {{ f.short }}</b-radio>
        </b-col>
      </b-form-row>

      <b-form-row class="mb-2" v-if="format.key !== dorionKey">
        <b-col cols="6"><b-radio value="withSets" v-model="setFormat"> With Sets</b-radio></b-col>
        <b-col cols="6"><b-radio value="withoutSets" v-model="setFormat"> Without Sets</b-radio></b-col>
      </b-form-row>

      <div class="text-center w-100 mb-1">Copy-Paste</div>

      <b-textarea id="exportArea" class="formRow mb-3" :value="getExport" no-resize></b-textarea>
      <b-btn-group class="text-center w-100">
        <b-button class="listExport" variant="primary" @click="saveFile()">
          <b-icon-upload></b-icon-upload><span> Or save into a file</span>
        </b-button>
      </b-btn-group>
      <a class="d-none" ref="exportLink"></a>
    </form>
  </b-modal>
</template>

<script>
import CONST from 'src/utils/CONST';
import DeckFactory from 'src/utils/DeckFactory';
import modalFactory from '../../mixins/modalFactory';

let textFile = null;
function makeTextFile(text) {
  const data = new Blob([text], { type: 'text/plain' });

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }
  textFile = window.URL.createObjectURL(data);
  return textFile;
}

export default {
  name: 'Export',
  mixins: [modalFactory],
  mounted() {
    this.listenEvents(deckOrList => {
      if (deckOrList) {
        this.deckOrList = deckOrList;
      }
    });
  },
  data() {
    return {
      eventConfig: CONST.modals.events.export,
      modalId: 'modal-export',
      dorionKey: CONST.exportFormats.DORION.key,
      format: CONST.exportFormats.DORION,
      exportFormats: CONST.exportFormats.list,
      setFormat: 'withSets',
      deckOrList: null,
    };
  },
  computed: {
    getExport() {
      if (this.format.key === CONST.exportFormats.DORION.key) {
        return JSON.stringify(this.deckOrList);
      }
      if (!this.deckOrList.list && !this.deckOrList.lists) {
        console.warn('unknown format', this.deckOrList);
        return '';
      }
      const isMagic = this.format.key === CONST.exportFormats.MAGIC_CORP.key;
      const newLine = '\r\n';
      const formatSetCard = this.setFormat === 'withSets' ? this.format.set.getCardEdition : () => '';
      const formatCard = (sb, card) => {
        const prop = {};
        for (let i = 0, l = this.format.order.length; i < l; i++) {
          const key = this.format.order[i].key;
          const value = key === 'set' ? formatSetCard(card) : card[key];
          prop[i] = value ? `${value} ` : '';
        }
        return `${sb ? 'SB: ' : ''}${prop[0]}${prop[1]}${prop[2]}`;
      };
      const formatList = (list, sb = false) =>
        DeckFactory.simplifyList(list)
          .map(formatCard.bind(this, sb))
          .join(newLine);

      if (this.deckOrList.list) {
        return formatList(this.deckOrList);
      }
      let text = '';
      for (let i = 0, l = this.deckOrList.lists.length; i < l; i++) {
        const sb = i !== 0 && isMagic;
        const list = this.deckOrList.lists[i];
        const firstLine = isMagic ? '' : `// ${list.name}${newLine}`;
        text += `${firstLine}${formatList(list, sb)}${newLine}`;
      }
      return text;
    },
  },
  methods: {
    saveFile() {
      const format = this.format.key === CONST.exportFormats.DORION.key ? 'json' : 'txt';
      this.$refs.exportLink.download = `${this.deckOrList.name}[${this.format.value}].${format}`;
      this.$refs.exportLink.href = makeTextFile(this.getExport);
      this.$refs.exportLink.click();
    },
  },
};
</script>

<style lang="less" scoped></style>
