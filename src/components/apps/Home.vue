<template>
    <div id="home">
        <h3>MtG - Deck Builder - Doc</h3>
        <div class="tab">
            This app brings together several tools to easily create Magic: the Gathering decks.
            <br/>
            Your lists are only saved in your browser's local storage<br>You should save them on other websites or on a file for long term use.
        </div>

        <h3>Some features :</h3>
        <HomeFeature :features="homeFeatures"></HomeFeature>

        <h3>Bugs :</h3>
        <div class="tab">
            Known bugs and future features are described <a href="https://github.com/doriongilmore/mtgGenerator/issues" target="_blank">here</a>, feel free to comment.<br>
            You can create
            <a href="https://github.com/doriongilmore/mtgGenerator/issues/new?assignees=&labels=&template=bug_report.md&title=" target="_blank"> new issues here </a>
            and
            <a href="https://github.com/doriongilmore/mtgGenerator/issues/new?assignees=&labels=&template=feature_request.md&title=" target="_blank"> new features here</a>
            , please describe following the template.<br><br>
            <a href="https://github.com/doriongilmore/mtgGenerator" target="_blank">You can find more info on GitHub</a>
        </div>
    </div>
</template>

<script>
    import HomeFeature from "src/components/apps/HomeFeature.vue";
    import CONST from "src/utils/CONST";

    export default {
        name: "Home",
        data() {
            return {
                homeFeatures: CONST.home.features.list
            };
        },
        created() {},
        components: {
            HomeFeature,
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    #home {
        div.tab {
            width: 80%;
            position: relative;
            left:5%;
        }
    }
</style>
