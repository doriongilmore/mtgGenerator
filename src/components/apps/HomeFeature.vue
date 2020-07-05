<template>
    <div id="homeFeatures">
        <div class="tab" v-for="mainFeature in features">
            <Button
                    class="info"
                    :text="mainFeature.label"
                    :icon="'info'"
                    v-if="mainFeature.modal"
                    :handle-click="openFeature.bind(this, mainFeature)"
            />
            <label v-else>{{ mainFeature.label }}</label>
            <HomeFeature :features="mainFeature.list || []"></HomeFeature>
        </div>
    </div>
</template>

<script>
    import Button from "../uiElements/Button.vue";

    const HomeFeature = {
        name: "HomeFeature",
        props: ['features'],
        methods: {
            openFeature(feature) {
                this.$store.dispatch('modals/openFeature', feature);
            },
        },
    };
    HomeFeature.components = { Button, HomeFeature };
    export default HomeFeature;
</script>

<style lang="less" scoped>
    #homeFeatures {
        div.tab {
            width: 75%;
            position: relative;
            left:5%;
            .info {
                width: max-content;
            }
        }
    }
</style>
