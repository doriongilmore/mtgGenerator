<template>
    <div id="featureModal" ref="featureModal"></div>
</template>

<script>
    import { mapState } from "vuex";
    import Button from "src/components/uiElements/Button.vue";

    export default {
        name: "modalFeature",
        components: { Button },
        computed: {
            ...mapState({
                feature: state => state.modals.modalData,
            }),
        },
        mounted() {
            this.$refs.featureModal.innerHTML = this.feature.doc;
        },
    };
</script>

<style lang="less" scoped>
    #featureModal {
        background-color: rgba(160, 160, 160, 1);
    }
</style>
