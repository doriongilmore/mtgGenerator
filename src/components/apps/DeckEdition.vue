<template>
    <div >
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
                        <div class="name" v-on:click="openCard(card)">{{ card.name }}</div>
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
                        <label for="searchText">Nom</label>
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
                    <div class="name">Nom</div>
                    <div class="manaCost">Coût</div>
                    <div class="type">Type</div>
                    <div class="setName">Set</div>
                </div>
                <draggable
                        class="dragArea list-group"
                        :list="results"
                        :group="{ name: 'deck', pull: 'clone', put: false }"
                        :clone="addCardToDeck"
                        :move="onMove"
                        id="resultsBody"
                >

                    <div
                            v-for="result in results"
                            :key="result.id"
                            class="resultRow"
                            v-on:click="openCard(result)"
                    >
                        <div class="name">{{ result.name }}</div>
                        <Mana class="manaCost" :mana-cost="result.mana_cost"></Mana>
                        <div class="type">{{ result.type_line }}</div>
                        <div class="setName">{{ result.set_name }}</div>
                        <div class="image" v-if="cardToDisplay===result.id">
                            <img :src="result.image_uri" alt="Rien à afficher :/"/>
                        </div>
                    </div>
                </draggable>
            </div>
        </div>
    </div>

<!--    BOTTOM    -->

        <div id="deckStats">
            <PieChart id="byType" :chart-data="stats.byType"></PieChart>
            <PieChart id="byColor" :chart-data="stats.byColor"></PieChart>
            <BarChart id="byCmc" :chart-data="stats.byCmc" :options="yBeginAtZero"></BarChart>
        </div>



    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import CONST from 'src/utils/CONST';
    import DeckFactory from 'src/utils/DeckFactory';
    import { getStats, getEmptyStats } from 'src/utils/DeckStats';
    import Button from '../uiElements/Button.vue';
    import Mana from '../uiElements/Mana.vue';
    import BarChart from '../chartjs/BarChart.vue';
    import PieChart from '../chartjs/PieChart.vue';

    export default {
        name: "DeckEdition",
        props: ['deckToEdit'],
        components: { draggable, Button, Mana, BarChart, PieChart },
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
                stats: getEmptyStats(),
                yBeginAtZero: CONST.stats.defaultOptions.yBeginAtZero,
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
                this.stats = getStats(this.deck);
            } catch (e) {
                console.error('error when loading from storage', e);
            }
        },
        methods: {
            openCard(card) {
                this.$store.dispatch('modals/openCard', card);
            },
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
            onChange() {
                this.updateDone = true;
                this.stats = getStats(this.deck);
            },
            onImport() {
                this.$store.dispatch('modals/openImport').then((listOrDeck) => {
                    // todo param replace/append to do = or push
                    if (listOrDeck.lists) {
                        this.deck.lists = listOrDeck.lists;
                        this.deck.name = listOrDeck.name;
                    } else {
                        this.deck.lists = listOrDeck;
                    }
                    this.onChange();
                });
            },
            /**
             * Fires when user click on export button
             * @param {Deck|List} listOrDeck
             */
            onExport(listOrDeck) {
                if (listOrDeck.lists) {
                    // update deck state for json export
                    DeckFactory.updateDeckCardCount(listOrDeck);
                    DeckFactory.updateDeckColors(listOrDeck);
                }
                this.$store.dispatch('modals/openExport', listOrDeck);
            },
            /**
             * Fires when user click on print button
             */
            async onPrint() {
                // todo add a spinner
                await DeckFactory.print(this.deck);
                // todo remove the spinner
            },
            /**
             * Fires when user click on delete button
             */
            deleteDeck(deck) {
                // todo add a confirmation box
                this.$store.commit('decks/deleteDeck', deck);
                this.$router.push({ name: 'home' });
            },
            /**
             * Fires when user click on Enter key or search button
             */
            handleSearch(event) {
                event && event.preventDefault();
                // todo add a spinner
                this.isSearching = true;
                const args = { name: this.searchText };
                console.info('launch search', args);
                this.$store.dispatch('mtg/search', args)
                .then((results) => {
                    // todo remove the spinner
                    this.isSearching = false;
                    console.info('results for search', { args, results });
                    this.results = results;
                })
                .catch((error) => {
                    // todo remove the spinner
                    this.isSearching = false;
                    console.error('error during search', { args, error });
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
             * @return {Object}
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
            /**
             * Fires automatically when a dragdrop succeeds in new list area
             * creates a new list with default name and reset tmp list
             */
            createNewList() {
                this.deck.lists.push({
                    name: 'Choisissez un nom',
                    list: [...this.tmpList]
                });
                this.tmpList = [];
            },
            getCardCount(list, getString = false) {
                const count = list.reduce(DeckFactory.countCardByList, 0);
                if (!getString) { return count }
                const lib = `carte${count>1?'s':''}`;
                return `${count} ${lib}`;
            },
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
        height: 457px;
        overflow-x: hidden;
        overflow-y: auto;

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
        #resultsBody {
            height: 400px;
            overflow-x: hidden;
            overflow-y: auto;
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

#deckStats {
    width: 100%;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-areas: "cmc color type";

    #byColor {
        grid-area: color;
    }
    #byCmc{
        grid-area: cmc;
    }
    #byType{
        grid-area: type;
    }
}
</style>
