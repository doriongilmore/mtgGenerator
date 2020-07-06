<template>
    <div id="home">
        <h3>MtG - Deck Builder - Doc</h3>
        <div class="tab">
            This app brings together several tools to easily create Magic: the Gathering decks.<br>
            Your lists are only saved in your browser's local storage<br>
            You should save them on other websites or on a file for long term use.<br>
        </div>
        <h3>Offline Version</h3>
        <div class="tab">
            You can download an "offline" version <a href="http://doriongilmore.fr/mtgBuilder/mtgBuilder.zip">here</a>.<br>
            Once unzipped, you just have to open the index.html file in a browser.<br><br>
            Offline means without doriongilmore.fr, you will need an access to scryfall.com for card search.<br>
            Once a card is saved in a deck you won't need scryfall anymore so you still have access to your decks.<br>
            Be aware no synchronisation is done between this website and the offline version.<br>
        </div>

        <h3>Some features :</h3>
        <HomeFeature :features="homeFeatures"></HomeFeature>

        <h3>Bugs :</h3>
        <div class="tab">
            Known bugs and future features are described <a href="https://github.com/doriongilmore/mtgGenerator/issues" target="_blank">here</a>, feel free to comment.<br>
            You can create
            <a href="https://github.com/doriongilmore/mtgGenerator/issues/new?labels=bug&template=bug_report.md" target="_blank"> new issues here </a>
            and
            <a href="https://github.com/doriongilmore/mtgGenerator/issues/new?labels=enhancement&template=feature_request.md" target="_blank"> new features here</a>
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
        components: { HomeFeature },
    }
</script>

<style lang="less" scoped>
    #home {
        padding-bottom: 30px;
        div.tab {
            width: 80%;
            position: relative;
            left:5%;
        }
    }
</style>
