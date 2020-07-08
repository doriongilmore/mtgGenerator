<template>
  <div :class="`mainContainer ${displayMenu ? 'displayMenu' : 'hideMenu'}`">
    <div class="menu">
      <router-link to="/" class="item" title="Home">
        {{ displayMenu ? 'Home' : 'H' }}
      </router-link>
      <router-link to="/decks" class="item" title="Decks">
        {{ displayMenu ? 'Decks' : 'D' }}
      </router-link>
      <router-link to="/deck" class="item" title="Create">
        {{ displayMenu ? 'Create a deck' : 'C' }}
      </router-link>
      <div class="item" @click="toggleDisplayMenu" title="Display/Hide">
        {{ displayMenu ? 'Hide Menu' : 'M' }}
      </div>
    </div>
    <div class="content" ref="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { TweenLite, TimelineLite } from "gsap";

export default {
  name: "MainContainer",
  components: {},
  data() {
    return {
      displayMenu: true,
      toOpen: "",
      currentOpen: ""
    };
  },
  computed: {},
  mounted() {
    const menuItems = document.querySelectorAll(".item");
    const tl = new TimelineLite({
      paused: true
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
    }
  },
};
</script>

<style lang="less" scoped>
a {
  all: unset;
}

.mainContainer.hideMenu {
  grid-template-columns: 5% auto;
}
.mainContainer.displayMenu {
  grid-template-columns: 20% auto;
}
.mainContainer {
  overflow: hidden;
  display: grid;
  grid-template-areas: "menu content";

  .menu {
    grid-area: menu;
    padding-top: 20px;
    padding-right: 20px;

    .item {
      display: block;
      padding: 20px 0;
      margin-top: 20px;
      border: 1px solid white;

      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: rgba(255, 255, 255, 0.8);
      text-align: center;
      cursor: pointer;

      .appTitle {
        /*background-image: url("/assets/logoblack.png");*/
        width: 100%;
        height: 25px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }

      &.router-link-active,
      &:not(.noHover):hover {
        background-color: white;
      }
    }
  }

  .content {
    grid-area: content;
    overflow-y: auto;
    border: 1px white solid;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: rgba(200, 200, 200, 0.8);
    padding: 1% 2%;
    width: 94%;
  }
}
</style>
