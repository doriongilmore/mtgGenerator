<template>
  <div class="mainContainer">
    <b-navbar toggleable="sm" type="light" variant="light" fixed="sm">
      <b-navbar-brand to="/">Mtg - Builder</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse-menu"></b-navbar-toggle>

      <b-collapse id="nav-collapse-menu" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/decks" exact exact-active-class="active">Decks</b-nav-item>
          <b-nav-item to="/deck" exact exact-active-class="active">Create a deck</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="content">
      <router-view></router-view>
    </div>
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
.mainContainer {
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
    height: 95%;
    overflow-y: auto;
  }
}
</style>
