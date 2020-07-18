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
<!--                {{oracle}}-->
                <div
                        v-for="(oraclePart, index) in oracle"
                        :v-key="`oracle_${index}`"
                        class="oraclePart"
                >
                    <Mana v-if="oraclePart.isMana" :mana-cost="oraclePart.value"></Mana>
                    <span v-else>{{ oraclePart.value }}</span>
                </div>
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
                <div
                        class="rule"
                        v-for="(rule, i) in rulings"
                >

                    <div
                            v-for="(rulePart, j) in rule"
                            :v-key="`rule_${i}_${j}`"
                            class="oraclePart"
                    >
                        <Mana v-if="rulePart.isMana" :mana-cost="rulePart.value"></Mana>
                        <span v-else>{{ rulePart.value }}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { mapState } from "vuex";
    import Mana from "src/components/uiElements/Mana.vue";
    import CONST from "src/utils/CONST";

    const ManaClass = Vue.extend(Mana);

    export default {
        name: "Card",
        components: { Mana },
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
                return Object.entries(this.card.legalities)
                    .map(el => ({ format: el[0], legal: el[1] }));
            },
            oracle() {
                return this.processSymbols(this.card.oracle_text);
            },
        },
        async mounted() {
            try {
                this.rulings = (await this.$store.dispatch('mtg/fetch', this.card.rulings_uri)).map((r) => {
                    const comments = this.processSymbols(r.comment);
                    comments[0].value = `[${r.published_at}] ${comments[0].value}`;
                    return comments;
                })
            } catch(e) {
                console.error('error fetching rules', e)
                return [];
            }
        },
        methods: {
            processSymbols(text) {
                const processed = [];
                const manas = [];
                const texts = text.replace(CONST.mana.generalRegexp, (manaCost) => {
                    manas.push(manaCost);
                    return CONST.mana.textSeparator;
                }).split(CONST.mana.textSeparator);
                for (let i = 0, l = texts.length - 1; i < l; i++) {
                    processed.push({ value: texts[i].replace(/\n/g, '\n\r'), isMana: false });
                    processed.push({ value: manas[i], isMana: true });
                }
                processed.push({ value: texts[texts.length - 1].replace(/\n/g, '\n'), isMana: false });
                console.info('processSymbols', { text, processed })
                return processed;
            },
        },
    };
</script>

<style lang="less" scoped>
    #oracle, .rule {
        width: 100%;
        display: inline-block;
        .oraclePart {
            display: inline-block;
            span {
                white-space: pre-wrap;
            }
        }
    }
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
