<template>
    <div id="decksList">
        <GridLoader ref="spinner" id="spinner" :loading="isLoading" size="40px"></GridLoader>
        <div class="decksContainer">
            <div
                    v-for="deck in decks"
                    :key="deck.id"
                    class="deck"
                    v-on:click="editDeck(deck)"
            >
                <div class="name">{{deck.name}}</div>
                <Mana class="colors" :mana-cost="deck.colors"></Mana>
                <div class="cardCount">{{deck.cardCount}}</div>
                <div class="dateCreation">{{moment(deck.dateCreation).format('YY-MM-DD HH:mm')}}</div>
                <div class="dateEdition">{{moment(deck.dateEdition).format('YY-MM-DD HH:mm')}}</div>
                <div class="buttons">
                    <Button :icon="'print'" :handle-click="onPrint.bind(this, deck)"></Button>
                    <Button :icon="'delete'" :handle-click="deleteDeck.bind(this, deck)"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from '../uiElements/Button.vue';
    import Mana from '../uiElements/Mana.vue';
    import moment from 'moment';
    import DeckFactory from "src/utils/DeckFactory";
    import GridLoader from 'vue-spinner/src/GridLoader.vue';

    export default {
        name: "DecksList",
        components: { Button, Mana, GridLoader },
        data() {
            return {
                isLoading: false,
                decks: [],
                moment
            };
        },
        computed: {
        },
        async created() {
            try {
                this.decks = await this.$store.dispatch('decks/getDecks');
            } catch (e) {
                console.error('error when loading from storage', e);
            }
        },
        methods: {
            async onPrint(deck) {
                this.isLoading = true;
                await DeckFactory.print(deck);
                this.isLoading = false;
            },
            editDeck(deck) {
                this.$router.push({ name: 'edition', params: { deckToEdit: deck } })
            },
            async deleteDeck(deck) {
                try {
                    await this.$store.dispatch('modals/openConfirmation');
                    this.$store.commit('decks/deleteDeck', deck);
                    this.decks = await this.$store.dispatch('decks/getDecks');
                } catch (e) {
                    console.info('delete canceled')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #spinner{
        position: absolute;
        top: 30%;
        left: 40%;
    }

    .decksContainer {
        display: flex;

        .deck {
            margin: 15px;
            padding: 15px;
            flex-grow: 0;
            border: 1px black solid;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            > div {
                margin: 5px auto;
            }

            .name {}
            .colors {}
            .cardCount {}
            .dateCreation {}
            .dateEdition {}
            .buttons {}
        }
        .deck:hover {
            cursor: pointer;
            background: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 90%, rgba(0,0,0,1));
        }
    }
</style>
