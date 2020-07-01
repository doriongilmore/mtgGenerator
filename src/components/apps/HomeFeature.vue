<template>
    <div id="homeFeatures">
        <div class="tab" v-for="mainFeature in features">
<!--            <input type="checkbox" disabled checked/>-->
            <Button
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
                if (feature.modal) {
                    this.$store.dispatch('modals/openFeature', feature);
                }
            },
        },
    };
    HomeFeature.components = { Button, HomeFeature };
    export default HomeFeature;
</script>

<style lang="less" scoped>
    #home {
        div.tab {
            position: relative;
            left:20px;
        }
    }
</style>
