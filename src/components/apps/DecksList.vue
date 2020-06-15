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
                <Button :icon="'print'"></Button>
                <Button :icon="'display'"></Button>
                <Button :icon="'delete'" :handle-click="deleteDeck.bind(this, deck)"></Button>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from '../uiElements/Button.vue';
    import Mana from '../uiElements/Mana.vue';
    import moment from 'moment';

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
            deleteDeck(deck) {
                console.info('deck to be deleted', deck);
                this.decks = this.$store.commit('decks/deleteDecks', deck);
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
