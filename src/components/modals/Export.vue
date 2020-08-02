<template>
  <b-modal class="export" :id="modalId" size="sm" title="Export" ref="modal" lazy ok-only ok-variant="light">
    <form>
      <div id="type" class="formRow">
        <div v-for="f in exportFormats" :key="f.key">
          <label :for="f.key" :class="f.short" :title="f.value">
            <input type="radio" :id="f.key" :value="f" v-model="format" /> {{ f.short }}
          </label>
        </div>
      </div>
      <div id="setType" class="formRow" v-if="format.key !== dorionKey">
        <label for="withSets" class="left">
          <input type="radio" id="withSets" value="withSets" v-model="setFormat" /> With Sets
        </label>
        <label for="withoutSets" class="right">
          <input type="radio" id="withoutSets" value="withoutSets" v-model="setFormat" /> Without Sets
        </label>
      </div>
      <div class="res"><label for="exportArea">Copy-Paste</label></div>
      <div><textarea id="exportArea" class="formRow" :value="getExport"></textarea></div>
      <b-button class="listExport" variant="primary" @click="saveFile()">
        <b-icon-upload></b-icon-upload><span> Or save into a file</span>
      </b-button>
      <a class="d-none" ref="exportLink"></a>
    </form>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';
import draggable from 'vuedraggable';
import Button from 'src/components/uiElements/Button.vue';
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
  components: { draggable, Button },
  mixins: [modalFactory],
  data() {
    return {
      eventData: CONST.modals.events.export,
      modalId: 'modal-export',
      dorionKey: CONST.exportFormats.DORION.key,
      format: CONST.exportFormats.DORION,
      exportFormats: CONST.exportFormats.list,
      setFormat: 'withSets',
      deckOrList: null,
    };
  },
  mounted() {
    this.listenEvents(deckOrList => {
      if (deckOrList) {
        this.deckOrList = deckOrList;
      }
    });
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
