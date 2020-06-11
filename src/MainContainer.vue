<template>
  <div class="mainContainer">
    <div class="menu">
      <div class="item noHover">
        <router-link to="/">
          <div class="appTitle">Deck Generator</div>
        </router-link>
      </div>
      <!--user menu-->
      <router-link to="/" class="item">
        Recherche
      </router-link>

      <router-link to="/" class="item">
        Options
      </router-link>

      <!--admin menu-->
      <router-link v-if="isAdmin" to="/" class="item">
        Utilisateurs
      </router-link>
    </div>
    <div class="content" ref="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { TweenLite, TimelineLite } from "gsap";
import { mapState } from "vuex";
import Button from "src/components/uiElements/Button.vue";

export default {
  name: "MainContainer",
  components: {
    Button
  },
  data() {
    return {
      toOpen: "",
      currentOpen: ""
    };
  },
  computed: {
    ...mapState({
    })
  },
  mounted() {
    const menuItems = document.querySelectorAll(".item");
    const tl = new TimelineLite({
      paused: true
    });

    menuItems.forEach(menuItem => {
      tl.add(new TweenLite.to(menuItem, 0.1, { x: 0, y: 0 }));
    });
    tl.add(new TweenLite.to(this.$refs.content, 0.4, { x: 0, y: 0 }), 0);
    tl.add(new TweenLite.to(this.$refs.audioPlayer, 0.4, { x: 0, y: 0 }), 0);

    tl.play();
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
a {
  all: unset;
}
.mainContainer {
  overflow: hidden;
  display: grid;
  grid-template-columns: 20% auto;
  grid-template-areas: "menu content";

  .menu {
    grid-area: menu;
    padding-top: 20px;
    padding-right: 20px;

    .item {
      display: block;
      padding: 20px;
      margin-top: 20px;
      border: 1px solid white;

      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: rgba(255, 255, 255, 0.8);
      text-align: center;
      cursor: pointer;

      .quickSearch {
        display: flex;
        width: 100%;

        input[type="text"] {
          flex-grow: 1;
          outline: unset;
        }
      }

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
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>