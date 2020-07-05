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
                {{oracle}}
            </div>
            <div id="legalities" class="row">
                <div
                        v-for="el in legalities"
                        :v-key="el.format"
                        :class="el.legal"
                        :title="el.legal"
                >{{el.format}}</div>
            </div>
            <div id="rulings" ref="rulings" class="row"></div>
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
                this.$refs.oracle.innerHTML = this.oracle;
                const res = await this.$store.dispatch('mtg/fetch', this.card.rulings_uri);
                for (let i = 0; i < res.length; i++) {
                    const div = document.createElement('div');
                    div.innerHTML = `[${res[i].published_at}] ${this.processSymbols(res[i].comment)}`;
                    this.$refs.rulings.appendChild(div);
                }
            } catch(e) {
                console.error('error fetching rules', e)
                return [];
            }
        },
        methods: {
            processSymbols(text) {
                return text.replace(CONST.mana.generalRegexp, (manaCost) => {
                    const instance = new ManaClass({ propsData: { manaCost } });
                    instance.$mount();
                    return instance.$el.innerHTML;
                })
            },
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
                max-height: 600px;
                max-width: 100%;
            }
        }
        .cardInfo {
            grid-area: info;
            margin-left: 5px;
            overflow-y: auto;
            .row { margin-bottom: 10px; }
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
                div { margin-bottom: 5px; }
            }
        }
    }
</style>
