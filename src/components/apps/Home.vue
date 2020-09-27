<template>
  <div id="home" class="container">
    <h3 class="mt-3">Basic Info</h3>
    <div class="ml-5">
      This app brings together several tools to easily create Magic: the Gathering decks.<br />
      Your lists are only saved in your browser's local storage<br />
      <b>You should save them on a file</b> or on other websites for long term use.<br />
    </div>

    <h3 class="mt-3">More Info :</h3>
    <div class="ml-5">
      Known bugs and future features are described
      <a :href="links.allIssues" target="_blank">here</a>, feel free to comment.<br />
      You can create <a :href="links.newIssues" target="_blank">new issues here</a> and
      <a :href="links.newFeatures" target="_blank">new features here</a> , please describe following the template.<br /><br />
      <a :href="links.github" target="_blank">You can find more info on GitHub</a>
    </div>
  </div>
</template>

<script>
const github = 'https://github.com/doriongilmore/mtgGenerator';

export default {
  name: 'Home',
  data() {
    return {
      links: {
        github,
        allIssues: `${github}/issues`,
        newIssues: `${github}/issues/new?labels=bug&template=bug_report.md`,
        newFeatures: `${github}/issues/new?labels=enhancement&template=feature_request.md`,
      },
    };
  },
};
</script>

<style lang="less" scoped>
#home {
  display: block;
  width: 100%;
  height: 97%;
  overflow-y: auto;
  padding-bottom: 2%;
}
</style>
