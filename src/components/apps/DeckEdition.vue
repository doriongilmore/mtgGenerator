<template>
    <div id="deckEdition">
<!--    TOP LEFT    -->
        <div id="deckLists">
            <div class="deckList" v-for="deckList in deckLists">
                <h4>{{ deckList.name }}</h4>
                <draggable
                        class="dragArea list-group"
                        :list="deckList.list"
                        group="deck"
                >
                    <div class="list-group-item" v-for="element in deckList.list" :key="element.id">
                        {{ element.name }} {{ element.deckQte }}
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
                    <div class="list-group-item" v-for="element in tmpList" :key="element.id">
                        {{ element.name }} {{ element.deckQte }}
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
    import APIMtg from '../../http/mtg';
    import draggable from 'vuedraggable'

    export default {
        name: "DeckEdition",
        components: { draggable },
        data() {
            return {
                searchText: 'Black Lotus',
                isSearching: false,
                cardToDisplay: null,
                results: [],
                tmpList: [],
                deckLists: [
                    { name: 'Liste principale', list: [] }
                ],
            };
        },
        created() {
        },
        methods: {
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
            addCardToDeck(card) {
                return Object.assign({}, card, {
                    deckQte: 4,
                    printConfig: -1
                });
            },
            createNewList() {
                this.deckLists.push({
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
    grid-template-areas: "deckList search";

    #deckLists {
        grid-area: deckList;
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
