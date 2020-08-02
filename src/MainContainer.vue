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
import { TweenLite, TimelineLite } from 'gsap';

export default {
  name: 'MainContainer',
  components: {},
  data() {
    return {
      displayMenu: true,
      toOpen: '',
      currentOpen: '',
    };
  },
  computed: {},
  mounted() {
    const menuItems = document.querySelectorAll('.item');
    const tl = new TimelineLite({
      paused: true,
    });

    menuItems.forEach(menuItem => {
      tl.add(new TweenLite.to(menuItem, 0.1, { x: 0, y: 0 }));
    });
    tl.add(new TweenLite.to(this.$refs.content, 0.4, { x: 0, y: 0 }), 0);

    tl.play();
  },
  methods: {
    toggleDisplayMenu() {
      this.displayMenu = !this.displayMenu;
    },
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
