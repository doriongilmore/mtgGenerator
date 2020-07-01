<template>
    <div class="export">
        <form>
            <div class="formRow" v-for="f in exportFormats" :key="f.key">
                <label :for="f.key">
                    <input type="radio" :id="f.key" :value="f" v-model="format"/> {{ f.value }}
                </label>
            </div>
            <div class="formRow" v-if="format.key !== dorionKey">
                <label for="withSets">
                    <input type="radio" id="withSets" value="withSets" v-model="setFormat"/> With Sets
                </label>
                <label for="withoutSets">
                    <input type="radio" id="withoutSets" value="withoutSets" v-model="setFormat"/> Without Sets
                </label>
            </div>

            <label for="exportArea">
                <textarea id="exportArea" class="formRow" :value="getExport"></textarea>
            </label>
        </form>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import draggable from 'vuedraggable'
    import Button from "src/components/uiElements/Button.vue";
    import CONST from "src/utils/CONST";
    import DeckFactory from "src/utils/DeckFactory";

    export default {
        name: "Export",
        components: { draggable, Button },
        data() {
            return {
                dorionKey: CONST.exportFormats.DORION.key,
                format: CONST.exportFormats.DORION,
                exportFormats: CONST.exportFormats.list,
                setFormat: 'withSets'
            };
        },
        computed: {
            ...mapState({
                deckOrList: state => state.modals.modalData,
            }),
            getExport() {
                if (this.format.key === CONST.exportFormats.DORION.key) { return JSON.stringify(this.deckOrList) }
                if (!this.deckOrList.list && !this.deckOrList.lists) {
                    console.warn('unknown format', this.deckOrList);
                    return '';
                }
                const isMagic = this.format.key === CONST.exportFormats.MAGIC_CORP.key;
                const newLine='\r\n';
                const formatSetCard = this.setFormat === 'withSets' ? this.format.set.getCardEdition : ()=>'';
                const formatCard = (sb, card) => {
                    const prop = {};
                    for (let i = 0, l = this.format.order.length; i < l; i++) {
                        const key = this.format.order[i].key;
                        const value = key === 'set' ? formatSetCard(card) : card[key];
                        prop[i] = value ? `${value} ` : '';
                    }
                    return `${sb ? 'SB: ' : ''}${prop[0]}${prop[1]}${prop[2]}`;
                };
                const formatList = (list, sb = false) => DeckFactory.simplifyList(list)
                        .map(formatCard.bind(this, sb)).join(newLine);

                if (this.deckOrList.list) {
                    return formatList(this.deckOrList);
                }
                let text = '';
                for (let i = 0, l = this.deckOrList.lists.length; i < l; i++) {
                    const sb = i !== 0 && isMagic;
                    const list = this.deckOrList.lists[i];
                    const firstLine = isMagic ? '' : `// ${list.name}${newLine}`;
                    text += `${firstLine}${formatList(list, sb)}${newLine}`;
                }
                return text;
            }
        }
    };
</script>

<style lang="less" scoped>
    .export {
        height: 100%;
        .formRow {
            height: 30px;
            margin-bottom: 5px;
        }
        textarea {
            width: 95%;
            min-width: 200px;
            max-width: 260px;
            min-height: 100px;
            max-height: 260px;
            overflow-y: auto;
        }
    }
</style>
