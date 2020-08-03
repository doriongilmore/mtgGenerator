<template>
  <b-modal class="import" :id="modalId" size="md" title="Import" ref="modal" lazy hide-footer>
    <div class="text-center w-100"><b-label for="importArea">Copy-Paste</b-label></div>
    <b-textarea class="mb-3" no-resize id="importArea" v-model="importText"></b-textarea>
    <input type="file" class="d-none" ref="fileInput" @change="updateFile" accept="text/plain,application/json" />
    <b-btn-group class="text-center w-100">
      <b-button variant="info" @click="chooseFile()">
        <b-icon-file-text></b-icon-file-text><span> Or choose a file</span>
      </b-button>
      <b-button variant="primary" @click="doImport()">
        <b-icon-download></b-icon-download><span> Then Import</span>
      </b-button>
    </b-btn-group>
    <b-progress
      class="mt-3"
      :value="progressValue"
      :max="progressMax"
      show-progress
      animated
      v-if="isLoading"
      height="25px"
    ></b-progress>
  </b-modal>
</template>

<script>
import DeckFactory from 'src/utils/DeckFactory';
import CONST from 'src/utils/CONST';
import modalFactory from '../../mixins/modalFactory';

const regexpQte = /\d+/g;
const regexpSet = /\(.+\)|\[.+]|{.+}/g;
const regexpCleanSet = /[()\[\]{}]/g;

export default {
  name: 'Import',
  mixins: [modalFactory],
  mounted() {
    this.listenEvents();
  },
  data() {
    return {
      eventConfig: CONST.modals.events.import,
      modalId: 'modal-import',
      importText: '',
      isLoading: false,
      progressValue: 0,
      progressMax: 0,
    };
  },
  methods: {
    async updateFile(event) {
      const file = (event && event.target && event.target.files && event.target.files[0]) || null;
      if (file) {
        this.importText = await this.getTextFromFile(file);
      }
    },
    chooseFile() {
      this.$refs.fileInput.click();
    },
    async doImport() {
      let listOrDeck;
      try {
        listOrDeck = JSON.parse(this.importText);
      } catch (e) {
        const lists = [];
        let actualList = { name: 'Main', list: [] };
        const sideboardList = { name: 'Sideboard', list: [] };
        const list = this.importText
          .split('\n')
          .map(e => e.trim())
          .filter(e => !!e);
        this.progressValue = 0;
        this.progressMax = list.length;
        this.isLoading = true;
        for (let i = 0; i < this.progressMax; i++) {
          this.progressValue = i;
          const row = list[i];
          if (row.startsWith('//')) {
            // list name -> new list
            if (actualList.list.length) {
              lists.push(actualList);
            }
            actualList = {
              name: row.replace('//', '').trim(),
              list: [],
            };
          } else if (row.startsWith('SB:')) {
            // MC Sideboard
            const cardRow = row.replace('SB:', '').trim();
            sideboardList.list.push(await this.formatCardRow(cardRow));
          } else {
            // classic card row
            actualList.list.push(await this.formatCardRow(row));
          }
        }
        if (actualList.list.length) {
          lists.push(actualList);
        }
        if (sideboardList.list.length) {
          lists.push(sideboardList);
        }
        listOrDeck = DeckFactory.getDeckToCreate();
        listOrDeck.lists = lists;
      }
      this.isLoading = false;
      this.close(listOrDeck);
    },
    async formatCardRow(row) {
      const [setPart = ''] = row.match(regexpSet) || [];
      const set = setPart.replace(regexpCleanSet, '');
      let cardName = row.replace(setPart, '');
      const [deckQte = '1'] = row.match(regexpQte) || [];
      cardName = cardName.replace(deckQte, '').trim();
      const realCard = await this.searchCard(cardName, set);
      const printConfig = realCard.type_line.includes('Basic Land')
        ? CONST.printConfig.DONT_PRINT.key
        : CONST.printConfig.BORDER_3.key;
      realCard.deckQte = +deckQte;
      realCard.printConfig = printConfig;
      return realCard;
    },
    searchCard(cardName, set) {
      const args = { name: cardName, exact: true, lang: CONST.search.lang.any.key };
      if (set) {
        args.set = set;
      }
      return new Promise(resolve => {
        this.$store.dispatch('mtg/search', args).then(results => {
          resolve(results.length ? results[0] : {});
          // todo reject if no result ?
        });
      });
    },
    getTextFromFile(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = reject;
        fileReader.readAsText(file, 'UTF-8'); // fileReader.result -> String.
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
