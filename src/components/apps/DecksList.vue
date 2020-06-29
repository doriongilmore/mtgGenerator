<template>
    <div id="decksList">
        <div
                v-for="deck in decks"
                :key="deck.id"
                class="deckRow"
        >
            <div class="name">{{deck.name}}</div>
            <Mana class="colors" :mana-cost="deck.colors"></Mana>
            <div class="cardCount">{{deck.cardCount}}</div>
            <div class="dateCreation">{{moment(deck.dateCreation).format('YY-MM-DD hh:mm')}}</div>
            <div class="dateEdition">{{moment(deck.dateEdition).format('YY-MM-DD hh:mm')}}</div>
            <div class="buttons">
                <Button :icon="'print'" :handle-click="onPrint.bind(this, deck)"></Button>
                <Button :icon="'display'" :handle-click="editDeck.bind(this, deck)"></Button>
                <Button :icon="'delete'" :handle-click="deleteDeck.bind(this, deck)"></Button>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from '../uiElements/Button.vue';
    import Mana from '../uiElements/Mana.vue';
    import moment from 'moment';
    import DeckFactory from "src/utils/DeckFactory";

    export default {
        name: "DecksList",
        components: { Button, Mana },
        data() {
            return {
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
                // todo add a spinner
                await DeckFactory.print(deck);
                // todo remove the spinner
            },
            editDeck(deck) {
                this.$router.push({ name: 'edition', params: { deckToEdit: deck } })
            },
            async deleteDeck(deck) {
                console.info('deck to be deleted', deck);
                this.$store.commit('decks/deleteDeck', deck);
                this.decks = await this.$store.dispatch('decks/getDecks');
            }
        }
    }
</script>

<style lang="less" scoped>
    #decksList {

        .deckRow{
            display: grid;
            grid-template-rows: 30px;
            grid-template-columns: 20% 16% 16% 16% 16% auto;
            grid-template-areas: "name colors cardCount dateCreation dateEdition buttons";
            .name {
                grid-area: name;
            }
            .colors {
                grid-area: colors;
            }
            .cardCount {
                grid-area: cardCount;
            }
            .dateCreation {
                grid-area: dateCreation;
            }
            .dateEdition {
                grid-area: dateEdition;
            }
            .buttons {
                grid-area: buttons;
            }
        }
    }
</style>
