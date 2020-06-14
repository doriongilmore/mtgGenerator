<template>
    <div id="deckEdition">
<!--    TOP LEFT    -->
        <div id="deckLists">
            <div id="deckHeader">
                <div class="deckName">
                    <input type="text" v-model="deck.name" />

                </div>
                <div class="buttons">
                    <Button :icon="'import'"></Button>
                    <Button :icon="'print'"></Button>
                    <Button :icon="'save'"></Button>
                    <Button :icon="'delete'"></Button>
                </div>
            </div>
            <div class="deckList" v-for="deckList in deck.lists">
                <input type="text" v-model="deckList.name" />
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
                        <div class="manaCost">{{ card.mana_cost }}</div>
                        <div class="deckQte">
                            <input type="number" min="0" max="99" v-model="card.deckQte" />
                        </div>
                        <div class="printConfig">
                            <select v-model="card.printConfig">
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
                    <div>
                        <label for="searchText">Nom de carte</label>
                        <input id="searchText" type="text" v-model="searchText"/>
                        <div @click="handleSearch" class="fileSearchButton">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" >
                                <path
                                        fill="none"
                                        stroke="#000"
                                        stroke-width="36"
                                        stroke-linecap="round"
                                        d="m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110"
                                />
                            </svg>
                        </div>
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
                    <div class="manaCost">manaCost</div>
                    <div class="type">type</div>
                    <div class="setName">setName</div>
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
                        <div class="manaCost">{{ result.mana_cost }}</div>
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
    import { CONST } from 'src/utils/CONST';
    import Button from '../uiElements/Button.vue';
    import moment from 'moment';

    const momentNow = moment();
    const emptyDeck = {
        id: momentNow._d.getTime(),
        name: 'Default Deck Name',
        colors: '{}',
        cardCount: 0,
        lists: [
            { name: 'Main List', list: [] }
        ],
        dateCreation: momentNow._d,
        dateEdition: momentNow._d,
    };

    export default {
        name: "DeckEdition",
        components: { draggable, Button },
        data() {
            return {
                searchText: 'Black Lotus',
                isSearching: false,
                cardToDisplay: null,
                results: [],
                tmpList: [],
                deck: emptyDeck,
                printConfig: CONST.printConfig,
            };
        },
        created() {
        },
        methods: {
            notImplemented() {
                console.warn('notImplemented');
            },
            handleSearch() {
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
                });
            },
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
            addCardToDeck(card) {
                const printConfig = card.type_line.includes('Basic Land')
                    ? this.printConfig.DONT_PRINT.key
                    : this.printConfig.BORDER_3.key;

                // Basic Land
                return Object.assign({}, card, {
                    deckQte: 4,
                    printConfig
                });
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


        .fileSearchButton {
            padding: 2px;
            float: left;
            width: 28px;
            height: 28px;
            display: flex;
            border-left: 1px solid black;
            cursor: pointer;

            &:hover {
                background-color: rgba(255, 255, 255, 0.8);
                -webkit-box-shadow: inset 0 0 18px black;
                box-shadow: inset 0 0 18px black;
            }

            &:active {
                background-color: white;
                -webkit-box-shadow: unset;
                box-shadow: unset;
            }

            svg {
                margin: auto;
                width: 26px;
            }
        }
    }

}
</style>
