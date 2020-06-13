<template>
    <div id="deckEdition">
<!--    TOP LEFT    -->
        <div id="deckList">
            Toto
        </div>

<!--    TOP RIGHT    -->

        <div id="search">
            <div id="form">
                <form v-on:submit="handleSearch">
                    <div>
                        <label for="searchText">Nom de carte</label>
                        <input id="searchText" type="text" v-model="searchText"/>
                    </div>
<!--                    <details>-->
<!--                        <summary>Plus de filtres</summary>-->
<!--                    </details>-->
                    <input type="submit"/>
                </form>
            </div>
            <div id="results">
                <div class="header">
                    <div class="name">Name</div>
                    <div class="manaCost">manaCost</div>
                    <div class="type">type</div>
                    <div class="setName">setName</div>
                </div>
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
            </div>
        </div>


<!--    BOTTOM    -->

        <div id="deckStats"></div>


    </div>
</template>

<script>
    import APIMtg from '../../http/mtg';

    export default {
        name: "DeckEdition",
        data() {
            return {
                searchText: 'Black Lotus',
                isSearching: false,
                cardToDisplay: null,
                results: [],
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

    #deckList {
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


    }

}
</style>
