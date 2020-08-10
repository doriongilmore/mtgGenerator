<template>
  <div id="home" class="container">
    <h3 class="mt-3">Basic Info</h3>
    <div class="tab">
      This app brings together several tools to easily create Magic: the Gathering decks.<br />
      Your lists are only saved in your browser's local storage<br />
      <b>You should save them on a file</b> or on other websites for long term use.<br />
    </div>

    <!-- TODO tooltip where appropriate instead of this doc that nobody will read  -->
    <!--        <h3>Some features :</h3>-->
    <!--        <HomeFeature :features="homeFeatures"></HomeFeature>-->

    <h3 class="mt-3">More Info :</h3>
    <div class="tab">
      Known bugs and future features are described
      <a href="https://github.com/doriongilmore/mtgGenerator/issues" target="_blank">here</a>, feel free to comment.<br />
      You can create
      <a
        href="https://github.com/doriongilmore/mtgGenerator/issues/new?labels=bug&template=bug_report.md"
        target="_blank"
      >
        new issues here
      </a>
      and
      <a
        href="https://github.com/doriongilmore/mtgGenerator/issues/new?labels=enhancement&template=feature_request.md"
        target="_blank"
      >
        new features here</a
      >
      , please describe following the template.<br /><br />
      <a href="https://github.com/doriongilmore/mtgGenerator" target="_blank">You can find more info on GitHub</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="less" scoped>
#home {
  display: block;
  width: 100%;
  height: 97%;
  overflow-y: auto;
  padding-bottom: 2%;
  div.tab {
    width: 80%;
    position: relative;
    left: 5%;
  }
}
</style>
