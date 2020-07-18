<template>
    <div class="cardModal">
        <div class="cardImage">
            <img v-for="uri in card.image_uris" :src="uri"/>
        </div>

        <div class="cardInfo">
            <div class="cardName row">
                <div class="name">{{card.name}}</div>
                <Mana class="manaCost" :mana-cost="card.mana_cost"/>
            </div>
            <div class="cardType row">
                <div class="type">{{card.type_line}}</div>
                <div class="rarity">{{card.rarity}}</div>
            </div>
            <div id="oracle" ref="oracle" class="row" v-if="card.oracle_text">
                <MtgText :text="card.oracle_text"></MtgText>
            </div>
            <div id="legalities" class="row">
                <div
                        v-for="el in legalities"
                        :v-key="el.format"
                        :class="el.legal"
                        :title="el.legal"
                >{{el.format}}</div>
            </div>
            <div id="rulings" ref="rulings" class="row">
                <div class="rule" v-for="rule in rulings">
                    <MtgText :text="rule"></MtgText>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Mana from "src/components/uiElements/Mana.vue";
    import MtgText from "src/components/apps/MtgText.vue";

    export default {
        name: "Card",
        components: { Mana, MtgText },
        data() {
            return {
                rulings: [],
            };
        },
        computed: {
            ...mapState({
                /** @returns {Card} */
                card: state => state.modals.modalData,
            }),
            legalities() {
                return Object.entries(this.card.legalities).map(([format, legal]) => ({ format, legal }));
            },
        },
        async mounted() {
            try {
                this.rulings = (await this.$store.dispatch('mtg/fetch', this.card.rulings_uri))
                    .map(r => `[${r.published_at}] ${r.comment}`)
            } catch(e) {
                console.error('error fetching rules', e)
                this.rulings = [];
            }
        },
    };
</script>

<style lang="less" scoped>
    .cardModal {
        height: 100%;
        display: grid;
        grid-template-columns: 40% 60%;
        grid-template-areas: "image info";
        .cardImage {
            grid-area: image;
            overflow-y: auto;
            img {
                max-height: 99%;
                max-width: 100%;
            }
        }
        .cardInfo {
            grid-area: info;
            margin-left: 5px;
            overflow-y: auto;
            .row { margin: 10px 0; }
            .cardName {
                display: grid;
                grid-template-columns: auto auto;
                grid-template-areas: "name mana";
                .name {
                    grid-area: name;
                }
                .manaCost {
                    grid-area: mana;
                }
            }
            .cardType {
                display: grid;
                grid-template-columns: auto auto;
                grid-template-areas: "type rarity";
                .type {
                    grid-area: type;
                }
                .rarity {
                    grid-area: rarity;
                }
            }
            #oracle {
                padding: 5px 10px;
                margin-right:15px;
                border-style:outset;
                border-color:rgba(255, 255, 255, 0.5);
                border-width:5px;
            }
            #legalities {
                display: inline-block;
                div { float: left; margin-right: 3px; }
                .legal { background-color: rgba(0, 255, 0, 0.3); }
                .not_legal { background-color: rgba(255, 0, 0, 0.3); }
                .banned { background-color: rgba(255, 0, 0, 0.3); }
                .restricted { background-color: rgba(255, 160, 0, 0.4); }
            }
            #rulings {
               .rule { margin: 10px 0; }
            }
        }
    }
</style>
