<template>
    <div id="home">
        <Mana :manaCost="svgToTest" />
    </div>
</template>

<script>
    import Mana from 'src/components/uiElements/Mana.vue'
    import HomeFeature from "src/components/apps/HomeFeature.vue";
    import CONST from "src/utils/CONST";

    export default {
        name: "Home",
        data() {
            return {
                homeFeatures: CONST.home.features.list,
                svgToTest: "{W/U}{W/B}{B/R}{B/G}{U/B}{U/R}{R/G}{R/W}{G/W}{G/U}{2/W}{2/U}{2/B}{2/R}{2/G}{W/P}{U/P}{B/P}{R/P}{G/P}{W}{U}{B}{G}{R}{C}{S}{X}{Y}{Z}{1}{2}{3}{4}{5}{20}"
            };
        },
        components: { HomeFeature,Mana },
    }
</script>

<style lang="less" scoped>

</style>
