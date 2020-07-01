<template>
    <div class="import">
        <label>
            <textarea v-model="importText"></textarea>
        </label>
        <button @click="doImport">Import</button>
        <PulseLoader id="spinner" ref="spinner" :loading="isLoading"></PulseLoader>
    </div>
</template>

<script>
    import DeckFactory from "src/utils/DeckFactory";
    import { mapState } from "vuex";
    import CONST from "src/utils/CONST";
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    const regexpQte = /\d+/g;
    const regexpSet = /\(.+\)|\[.+]|{.+}/g;
    const regexpCleanSet = /[()\[\]{}]/g;

    export default {
        name: "Import",
        components: { PulseLoader },
        data() {
            return {
                importText: '',
                isLoading: false,
            };
        },
        computed: {
            ...mapState({
                closeImport: state => state.modals.resolve,
            }),
        },
        methods: {
            async doImport() {
                let listOrDeck;
                try {
                    listOrDeck = JSON.parse(this.importText);
                } catch (e) {
                    this.isLoading = true;
                    const lists = [];
                    let actualList = { name: 'Main', list: [] };
                    const sideboardList = { name: 'Sideboard', list: [] };
                    const list = this.importText.split('\n').map(e => e.trim()).filter(e => !!e);
                    for (let i = 0, l = list.length; i < l; i++) {
                        const row = list[i];
                        if (row.startsWith('//')) { // list name -> new list
                            if (actualList.list.length) {
                                lists.push(actualList);
                            }
                            actualList = {
                                name: row.replace('//', '').trim(),
                                list: []
                            };
                        } else if (row.startsWith('SB:')) { // MC Sideboard
                            const cardRow = row.replace('SB:', '').trim();
                            sideboardList.list.push(await this.formatCardRow(cardRow));
                        } else { // classic card row
                            actualList.list.push(await this.formatCardRow(row));
                        }
                    }
                    if (actualList.list.length) { lists.push(actualList) }
                    if (sideboardList.list.length) { lists.push(sideboardList) }
                    listOrDeck = DeckFactory.getDeckToCreate();
                    listOrDeck.lists = lists;
                }
                this.isLoading = false;
                this.closeImport(listOrDeck);
            },
            async formatCardRow(row) {
                const [setPart = ''] = row.match(regexpSet) || [];
                const set = setPart.replace(regexpCleanSet, '');
                let cardName = row.replace(setPart, '');
                const [deckQte = '1'] = row.match(regexpQte) || [];
                cardName = cardName.replace(deckQte, '').trim();
                const realCard = (await this.searchCard(cardName, set));
                const printConfig = realCard.type_line.includes('Basic Land')
                    ? CONST.printConfig.DONT_PRINT.key
                    : CONST.printConfig.BORDER_3.key;
                realCard.deckQte = +deckQte;
                realCard.printConfig = printConfig;
                return realCard;
            },
            searchCard(cardName, set) {
                const args = { name: cardName, exact: true };
                if (set) { args.set = set }
                return new Promise((resolve) => {
                    this.$store.dispatch('mtg/search', args).then((results) => {
                        resolve(results.length?results[0]:{})
                        // todo reject if no result ?
                    });
                })
            }
        }
    };
</script>

<style lang="less" scoped>
    .import {
        height: 100%;
        /*.formRow {*/
        /*    height: 30px;*/
        /*    margin-bottom: 5px;*/
        /*}*/
        textarea {
            width: 95%;
            min-width: 200px;
            max-width: 260px;
            min-height: 100px;
            max-height: 260px;
            overflow-y: auto;
        }
    }
</style>
