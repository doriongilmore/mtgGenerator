<template>
    <div id="deckEdition">
<!--    TOP LEFT    -->
        <div id="deckLists">
            <div id="deckHeader">
                <div class="deckName"><input type="text" v-model="deck.name" /></div>
                <div class="buttons">
                    <Button :icon="'export'" :handle-click="onExport.bind(this, deck)"></Button>
                    <Button :icon="'import'" :handle-click="onImport"></Button>
                    <Button :icon="'print'" :handle-click="onPrint"></Button>
                    <Button :icon="'save'" :handle-click="saveDeck"></Button>
                    <Button :icon="'delete'" :handle-click="deleteDeck.bind(this, deck)"></Button>
                </div>
            </div>
            <div class="deckList" v-for="deckList in deck.lists">
                <div class="listHeader">
                    <div class="listName"><input type="text" v-model="deckList.name" @change="onChange" /></div>
                    <div class="cardCount">
                        {{ getCardCount(deckList.list, true) }}
                    </div>
                    <div class="buttons">
                        <Button :icon="'export'" :handle-click="onExport.bind(this, deckList)"></Button>
                    </div>

                </div>
                <draggable
                        class="dragArea list-group"
                        :list="deckList.list"
                        group="deck"
                        :move="onMove"
                >
                    <div class="cardRow" v-for="card in deckList.list" :key="card.id">
                        <div class="name"
                             v-on:click="cardToDisplay=cardToDisplay===card.id?null:card.id"
                        >{{ card.name }}</div>
                        <Mana class="manaCost" :mana-cost="card.mana_cost"></Mana>
                        <div class="deckQte">
                            <input type="number" min="0" max="99" v-model="card.deckQte" @change="onChange"/>
                        </div>
                        <div class="printConfig">
                            <select v-model="card.printConfig" @change="onChange">
                                <option v-for="conf in printConfig.list" :key="conf.key" :value="conf.key">
                                    {{ conf.text }}
                                </option>
                            </select>
                        </div>
                        <div class="image" v-if="cardToDisplay===card.id">
                            <img :src="getBestImage(card.image_uris)" alt="Rien à afficher :/"/>
                        </div>
                    </div>
                </draggable>
            </div>
            <div class="deckList">
                <h4>Nouvelle liste</h4>
                <draggable
                        class="dragArea list-group"
                        :list="tmpList"
                        group="deck"
                        @change="createNewList"
                >
                    <div class="cardRow" v-for="element in tmpList" :key="element.id">
<!--                        {{ element.name }} {{ element.deckQte }}-->
                    </div>
                </draggable>
            </div>
        </div>

<!--    TOP RIGHT    -->

        <div id="search">
            <div id="form">
                <form v-on:submit="handleSearch">
                    <div class="searchHeader">
                        <label for="searchText">Nom de carte</label>
                        <input id="searchText" type="text" v-model="searchText"/>
                        <Button :icon="'search'" :handle-click="handleSearch" class="submit"></Button>
<!--                        <div @click="handleSearch" class="fileSearchButton">-->
<!--                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" >-->
<!--                                <path-->
<!--                                        fill="none"-->
<!--                                        stroke="#000"-->
<!--                                        stroke-width="36"-->
<!--                                        stroke-linecap="round"-->
<!--                                        d="m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110"-->
<!--                                />-->
<!--                            </svg>-->
<!--                        </div>-->
                    </div>
<!--                    <details>-->
<!--                        <summary>Plus de filtres</summary>-->
<!--                    </details>-->

                    <input type="submit" style="display: none"/>
                </form>
            </div>
            <div id="results">
                <div class="header">
                    <div class="name">Name</div>
                    <div class="manaCost">Coût</div>
                    <div class="type">type</div>
                    <div class="setName">Edition</div>
                </div>
                <draggable
                        class="dragArea list-group"
                        :list="results"
                        :group="{ name: 'deck', pull: 'clone', put: false }"
                        :clone="addCardToDeck"
                        :move="onMove"
                >

                    <div
                            v-for="result in results"
                            :key="result.id"
                            class="resultRow"
                            v-on:click="cardToDisplay=cardToDisplay===result.id?null:result.id"
                    >
                        <div class="name">{{ result.name }}</div>
                        <Mana class="manaCost" :mana-cost="result.mana_cost"></Mana>
                        <div class="type">{{ result.type_line }}</div>
                        <div class="setName">{{ result.set_name }}</div>
                        <div class="image" v-if="cardToDisplay===result.id">
                            <img :src="getBestImage(result.image_uris)" alt="Rien à afficher :/"/>
                        </div>
                    </div>
                </draggable>
            </div>
        </div>


<!--    BOTTOM    -->

        <div id="deckStats"></div>


    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import CONST from 'src/utils/CONST';
    import DeckFactory from 'src/utils/DeckFactory';
    import Button from '../uiElements/Button.vue';
    import Mana from '../uiElements/Mana.vue';
    import jsPDF from 'jspdf';

    export default {
        name: "DeckEdition",
        props: ['deckToEdit'],
        components: { draggable, Button, Mana },
        data() {
            return {
                searchText: 'Black Lotus',
                isSearching: false,
                cardToDisplay: null,
                results: [],
                tmpList: [],
                tmpDeck: null,
                _deck: null,
                updateDone: false,
                printConfig: CONST.printConfig,
            };
        },
        computed: {
            deck() {
                return this._deck || this.deckToEdit || this.tmpDeck || {};
            }
        },
        beforeDestroy() {
            if (!this.updateDone) { return }
            DeckFactory.updateDeckCardCount(this.deck);
            DeckFactory.updateDeckColors(this.deck);
            this.deck.dateEdition = new Date();
            const json = JSON.stringify(this.deck);
            window.localStorage.setItem(CONST.storageKeys.tmpDeck, json);
        },
        async mounted() {
            try {
                this.tmpDeck = await this.$store.dispatch('decks/getTmpDeck');
                this._deck = this.deckToEdit || this.tmpDeck;
            } catch (e) {
                console.error('error when loading from storage', e);
            }
        },
        methods: {
            saveDeck() {
                const newDeck = DeckFactory.getDeckToCreate();
                if (DeckFactory.areSameDeck(this.deck, newDeck)) {
                    console.warn('dont save this deck ...', { deck: this.deck, newDeck });
                    this.$store.commit('decks/setTmpDeck', newDeck); // update creation time
                    return false;
                }
                DeckFactory.updateDeckCardCount(this.deck);
                DeckFactory.updateDeckColors(this.deck);
                this.deck.dateEdition = new Date();
                this.$store.commit('decks/setDecks', [this.deck]);
                this._deck = this.deck;
                this.$store.commit('decks/setTmpDeck', newDeck);
                this.tmpDeck = newDeck;
                this.updateDone = false;
            },
            onChange() { this.updateDone = true },
            onImport() {
                this.$store.dispatch('modals/openImport').then((listOrDeck) => {
                    // todo param replace/append to do = or push
                    if (listOrDeck.lists) {
                        this.deck.lists = listOrDeck.lists;
                        this.deck.name = listOrDeck.name;
                    } else {
                        this.deck.lists = listOrDeck;
                    }
                });
            },
            onExport(listOrDeck) {
                if (listOrDeck.lists) {
                    DeckFactory.updateDeckCardCount(listOrDeck);
                    DeckFactory.updateDeckColors(listOrDeck);
                }
                this.$store.dispatch('modals/openExport', listOrDeck);
            },
            async onPrint() {
                // todo add a spinner
                const doc = new jsPDF({ unit: 'mm', format: 'a4' }); // 210 x 297
                const cards = DeckFactory.getCards([this.deck]);
                for (let i = 0, printedCardCount = 0, l = cards.length; i < l; i++) {
                    const card = cards[i];
                    if (card.printConfig !== CONST.printConfig.DONT_PRINT.key) {
                        const { w, h } = CONST.printConfig[card.printConfig];
                        for (let j = 0; j < card.deckQte; j++) {
                            const posKey = printedCardCount % 9;
                            const { x, y } = CONST.printConfig.PDF_POS[posKey];
                            if (printedCardCount && posKey === 0) { doc.addPage() }
                            const image = await this.getImage(card);
                            doc.addImage(image, "JPEG", x, y, w, h);
                            printedCardCount++;
                        }
                    }
                }
                doc.save(`${this.deck.name}.pdf`);
            },
            deleteDeck(deck) {
                this.$store.commit('decks/deleteDeck', deck);
                this.$router.push({ name: 'home' });
            },
            handleSearch(event) {
                event && event.preventDefault();
                this.isSearching = true;
                const cardName = this.searchText;
                const args = {
                    name: cardName
                };
                console.info(`launch search "${cardName}"`);
                this.$store.dispatch('mtg/search', args)
                .then((results) => {
                    this.isSearching = false;
                    console.info(`results for search "${cardName}"`, results);
                    this.results = results;
                })
                .catch((error) => {
                    this.isSearching = false;
                    console.error(`error during search "${search}"`, error);
                    this.results = [];
                });
            },
            /**
             * Fires automatically when dragdrop detected, checks if allowed
             * @param {Object} event (automatic)
             * @return {boolean}
             */
            onMove({ from, to, relatedContext, draggedContext }) {
                const list = relatedContext.list;
                const draggedElement = draggedContext.element;
                const sameList = from === to;
                const isPresent = !!list.find(el => el.id === draggedElement.id);
                const allowMove = sameList || !isPresent;

                if (!allowMove) {
                    console.warn('object already present in this list.');
                }

                return allowMove;
            },
            /**
             * Fires automatically when a dragdrop succeeds, clones a card
             * add deck properties to a card from search result
             * doesn't change cards from other lists
             * @param {Card} card
             * @return {Card}
             */
            addCardToDeck(card) {
                const printConfig = card.type_line.includes('Basic Land')
                    ? this.printConfig.DONT_PRINT.key
                    : this.printConfig.BORDER_3.key;

                // Basic Land
                return Object.assign({
                    deckQte: 4,
                    printConfig
                }, card);
            },
            createNewList() {
                this.deck.lists.push({
                    name: 'Choisissez un nom',
                    list: [...this.tmpList]
                });
                this.tmpList = [];
            },
            getBestImage(images) {
                return images.large || images.normal;
            },
            getCardCount(list, getString = false) {
                const count = list.reduce(DeckFactory.countCardByList, 0);
                if (!getString) { return count }
                const lib = `carte${count>1?'s':''}`;
                return `${count} ${lib}`;
            },
            getImage(card) {
                const uri = this.getBestImage(card.image_uris);
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.src = uri;
                })

            }
        }
    }
</script>

<style lang="less" scoped>
#deckEdition {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-areas: "deckLists search";


    #deckLists {
        grid-area: deckLists;

        input {
            background-color: transparent;
        }
        #deckHeader {
            display: grid;
            grid-template-columns: 60% 30%;
            grid-template-areas: "name buttons";
            .deckName {
                grid-area: name;
            }
            .buttons {
                grid-area: buttons;
            }
        }
        .deckList {
            width: 80%;
            border: bisque solid 3px;
            /*background-color: rgba(208, 209, 212, 0.8);*/

            .listHeader {
                display: grid;
                grid-template-columns: 60% 20% 10%;
                grid-template-areas: "name cardCount buttons";
                .listName {
                    grid-area: name;
                }
                .cardCount {
                    grid-area: cardCount;
                }
                .buttons {
                    grid-area: buttons;
                }
            }

            .cardRow, .resultRow {
                display: grid;
                grid-template-columns: 40% 15% auto;
                grid-template-areas: "name manaCost deckQte printConfig";
                .name {
                    grid-area: name;
                }
                .manaCost {
                    grid-area: manaCost;
                }
                .deckQte {
                    grid-area: deckQte;
                    input {
                        width: 30px;
                    }
                }
                .printConfig {
                    grid-area: printConfig;
                    input {
                        width: 30px;
                    }
                }
                .type {
                    display: none;
                }
                .setName {
                    display: none;
                }
                .image {
                    border: 2px black;
                    position: relative;
                    img {
                        max-height: 300px;
                    }
                }
            }

        }

    }

    #search {
        .searchHeader {
            display: grid;
            grid-template-columns: auto 80% auto;
            grid-template-areas: "label input submit";
            label {
                grid-area: label;
            }
            input {
                grid-area: input;
            }
            .submit {
                grid-area: submit;
            }
        }
        #results .header, #results .resultRow {
            grid-area: search;
            display: grid;
            grid-template-columns: 40% 10% 20% 20%;
            grid-template-areas: "name manaCost type setName";
            .name {
                grid-area: name;
            }
            .manaCost {
                grid-area: manaCost;
            }
            .type {
                grid-area: type;
            }
            .setName {
                grid-area: setName;
            }
            .image {
                border: 2px black;
                position: relative;
                img {
                    max-height: 300px;
                }
            }
        }
    }

}
.dontprint { display: none }
.border0 { height: 8.2cm }
.border1 { height: 8.4cm }
.border2 { height: 8.6cm }
.border3 { height: 8.8cm }
</style>
