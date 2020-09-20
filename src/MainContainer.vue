<template>
  <div id="mainContainer">
    <b-nav tabs class="bg-light pl-4" id="menu">
      <b-navbar-brand to="/">Mtg - Builder</b-navbar-brand>
      <b-nav-item to="/decks" exact exact-active-class="active">Decks</b-nav-item>
      <b-nav-item to="/settings" exact exact-active-class="active">Settings</b-nav-item>
    </b-nav>
    <div class="content"><router-view></router-view></div>
  </div>
</template>

<script>
export default {
  name: 'MainContainer',
  data() {
    return {
      displayMenu: true,
      toOpen: '',
      currentOpen: '',
    };
  },
};
</script>

<style lang="less" scoped>
#mainContainer {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .card {
    height: 100%;
  }
  .content {
    padding: 0 1%;
    background-color: #fffa;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
