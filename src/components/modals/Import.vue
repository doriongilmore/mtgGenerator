<template>
  <b-modal class="import" :id="modalId" size="md" title="Import" ref="modal" lazy hide-footer>
    <div class="text-center w-100"><label for="importArea">Copy-Paste</label></div>
    <b-textarea class="mb-3" no-resize id="importArea" v-model="importText"></b-textarea>
    <input type="file" class="d-none" ref="fileInput" @change="updateFile" accept="text/plain,application/json" />
    <div class="text-center w-100 btn-group">
      <div class="btn btn-info" @click="chooseFile()">
        <b-icon-file-text></b-icon-file-text><span> Or choose a file</span>
      </div>
      <div class="btn btn-primary" @click="doImport()">
        <b-icon-download></b-icon-download><span> Then Import</span>
      </div>
    </div>
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
      const notFound = [];
      const cardIds = [];
      try {
        listOrDeck = JSON.parse(this.importText);
        const cards = listOrDeck.lists
          ? DeckFactory.getCardsFromDecks([listOrDeck])
          : DeckFactory.getCardsFromLists([listOrDeck]);
        for (let i = 0; i < cards.length; i++) {
          cardIds.push(cards[i].id);
        }
      } catch (e) {
        const lists = [];
        let actualList = { name: 'Main', list: [] };
        const sideboardList = { name: 'Sideboard', list: [] };
        const list = this.importText.split('\n').map(e => e.trim());
        this.progressValue = 0;
        this.progressMax = list.length;
        this.isLoading = true;
        const addToList = async (list, row) => {
          let card = await this.formatCardRow(row);
          if (!card) {
            notFound.push(row);
            card = await this.formatCardRow(row, false);
          }
          if (card) {
            cardIds.push(card.id);
            list.list.push(card);
          }
        };
        const createList = name => {
          if (actualList.list.length) {
            lists.push(actualList);
          }
          actualList = {
            name,
            list: [],
          };
        };
        for (let i = 0; i < this.progressMax; i++) {
          this.progressValue = i;
          const row = list[i];
          if (!row) {
            createList('Default name');
          } else if (row.startsWith('//')) {
            createList(row.replace('//', '').trim());
          } else if (row.startsWith('SB:')) {
            // MC Sideboard
            const cardRow = row.replace('SB:', '').trim();
            await addToList(sideboardList, cardRow);
          } else {
            // classic card row
            await addToList(actualList, row);
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
      this.close({ listOrDeck, notFound, cardIds });
    },
    async formatCardRow(row, withSet = true) {
      const noSet = '';
      const [setPart = noSet] = row.match(regexpSet) || [];
      const set = setPart.replace(regexpCleanSet, '');
      let cardName = row.replace(setPart, '');
      const [deckQte = '1'] = row.match(regexpQte) || [];
      cardName = cardName.replace(deckQte, '').trim();
      try {
        const realCard = await this.searchCard(cardName, withSet ? set : noSet);
        const clone = DeckFactory.cloneCardForDeck(realCard);
        clone.deckQte = +deckQte;
        return clone;
      } catch (e) {
        console.warn('[Import] card not found', row, e);
      }
      return null;
    },
    searchCard(cardName, set) {
      const args = { name: cardName, exact: true, lang: CONST.search.lang.any.key };
      if (set) {
        args.set = set;
      }
      return new Promise(async (resolve, reject) => {
        const results = await this.$store.dispatch('mtg/search', args);
        if (!results.length) {
          return reject('not_found');
        }
        const card = await this.$store.dispatch('mtg/getCardById', { cardId: results[0] });
        if (!card) {
          return reject('not_found');
        }
        resolve(card);
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
