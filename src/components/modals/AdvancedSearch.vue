<template>
    <div id="advancedSearch" ref="container">
        <div class="rows" ref="content">

            <div class="row">
                <label class="label" for="searchName">Name</label>
                <input class="input" id="searchName" type="text" v-model="searchParams.name"/>
            </div>
            <div class="row" v-for="(text, index) in searchParams.texts" :v-key="text">
                <label class="label" :for="text">Text</label>
                <input class="input" :id="text" type="text" v-model="searchParams.texts[index]"/>
                <Button class="other" icon="delete" text="Remove" :handle-click="removeText.bind(this, index)"></Button>
            </div>
            <div class="row">
                <label class="label" for="newText">Text</label>
                <input
                        class="input"
                        id="newText"
                        type="text"
                        v-model="tmpText"
                        placeholder="Use '~' instead of the card name"
                />
                <Button class="other" icon="add" text="Add" :handle-click="addText"></Button>
            </div>
            <div class="row">
                <label class="label">Colors</label>
                <div class="input mana_row">
                    <div v-for="color in lists.colorList" :class="color.key">
                        <label :for="color.key">
                            <Mana :mana-cost="color.value"></Mana>
                        </label>
                        <input type="checkbox"
                               v-model="searchParams.colors"
                               :id="color.key"
                               :value="color.key"
                               multiple
                        />
                    </div>
                </div>
                <select v-model="searchParams.colorInclusion" class="other">
                    <option v-for="incParam in lists.inclusion" :value="incParam.key">{{incParam.value}}</option>
                </select>
            </div>
            <div class="row">
                <label class="label">Cost</label>
                <input class="input" type="number" min="0" v-model="searchParams.cmc"/>
                <select v-model="searchParams.cmcInclusion" class="other">
                    <option v-for="incParam in lists.inclusion" :value="incParam.key">{{incParam.value}}</option>
                </select>
            </div>
            <div class="row">
                <label class="label">Rarity</label>
                <select v-model="searchParams.rarity" class="input">
                    <option value="">Tous</option>
                    <option v-for="rarParam in lists.rarityList" :value="rarParam.key">{{rarParam.value}}</option>
                </select>
                <select v-model="searchParams.rarityInclusion" class="other">
                    <option v-for="incParam in lists.inclusion" :value="incParam.key">{{incParam.value}}</option>
                </select>
            </div>

            <div class="row" v-for="(type, index) in searchParams.types" :v-key="type">
                <label class="label" :for="type">Type</label>
                <input class="input" :id="type" type="text" v-model="searchParams.types[index]"/>
                <Button class="other" icon="delete" text="Remove" :handle-click="removeType.bind(this, index)"></Button>
            </div>
            <div class="row">
                <label class="label" for="newText">Type</label>
                <select v-model="tmpType" class="input">
                    <option v-for="type in lists.typeList" :value="type.key">{{type.value}}</option>
                </select>
                <Button class="other" icon="add" text="Add" :handle-click="addType"></Button>
            </div>
        </div>
        <div class="buttons" ref="buttons">
            <Button text="Info" icon="info" :handle-click="openInfo"></Button>
            <Button text="Clean" icon="delete" :handle-click="clearSearch"></Button>
            <Button text="Search" icon="search" :handle-click="close"></Button>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Button from "src/components/uiElements/Button.vue";
    import Mana from "src/components/uiElements/Mana.vue";
    import CONST from "src/utils/CONST";

    export default {
        name: "AdvancedSearch",
        components: { Mana, Button },
        data() {
            return {
                rules: [],
                tmpText: '',
                tmpType: '',
                lists: CONST.search
            };
        },
        computed: {
            ...mapState({
                close: state => state.modals.resolve,
                searchParams: state => state.search,
            }),
        },
        mounted() {
            const height = this.$refs.container.parentElement.clientHeight
                - this.$refs.buttons.clientHeight;
            this.$refs.content.style.height = `${height}px`;
        },
        methods: {
            openInfo() {
                this.$store.dispatch('modals/openFeature', CONST.home.features.KEY_FEATURE_SEARCH)
                    .then(() => this.$store.dispatch('modals/openSearch'));
            },
            clearSearch() {
                this.$store.commit('search/clearSearch');
                this.tmpText = '';
            },
            removeText(index) {
                this.$store.commit('search/removeText', index);
            },
            addText() {
                this.$store.commit('search/addText', this.tmpText);
                this.tmpText = '';
            },
            removeType(index) {
                this.$store.commit('search/removeType', index);
            },
            addType() {
                this.$store.commit('search/addType', this.tmpType);
                this.tmpType = '';
            },
        },
    };
</script>

<style lang="less" scoped>
    #advancedSearch {
        .rows {
            overflow-y: auto;
            .row {
                margin-top: 10px;
                margin-right: 5%;
                margin-left: 5%;
                width: 90%;
                display: grid;
                grid-template-columns: 20% 50% 30%;
                grid-template-areas: "label input other";

                .label { grid-area: label; }
                .input { grid-area: input; }
                .other { grid-area: other; }
                .mana_row {
                    grid-area: input;
                    width: 100%;
                    display: grid;
                    grid-template-columns: 20% 20% 20% 20% 20%;
                    grid-template-areas: "b u g r w";
                    .b { grid-area: b; }
                    .u { grid-area: u; }
                    .g { grid-area: g; }
                    .r { grid-area: r; }
                    .w { grid-area: w; }
                }
            }
        }
        .buttons {
            text-align: center;
            margin-right: 5%;
            margin-left: 5%;
            width: 90%;
            position: absolute;
            bottom: 0;
            display: grid;
            grid-template-columns: 33% 33% 33%;
            grid-template-areas: "info clear submit";

        }
    }
</style>
