<template>
  <div class="app">
    <Archer></Archer>
    <!-- BG FIRST ! -->
    <MainContainer></MainContainer>
    <!-- MODALS LAST ! -->
    <Modals v-if="showModal"></Modals>
  </div>
</template>
<script>
//todo center svg
import { mapState } from "vuex";
import Archer from "src/components/backgrounds/Archer.vue";
import Modals from "src/components/Modals.vue";
import MainContainer from "src/MainContainer.vue";

export default {
  name: "App",
  components: {
    Modals,
    Archer,
    MainContainer,
  },
  data() {
    return {
      showModal: false,
      showModalMenu: false
    };
  },
  computed: {
    ...mapState({
      modalOpen: state => state.modals.open,
    })
  },
  watch: {
    modalOpen(newValue) {
      this.showModal = newValue;
    }
  },
  methods: {
  },
  mounted() {
  }
};
</script>
<style lang="less">
.app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(50, 50, 50);
}

.buttons {
  margin: auto;
  border: 1px black solid;
  border-radius: 5px;
  display: flex;

  > *:not(:first-child) {
    border-left: 1px solid black;
  }
}

.centerText {
  display: flex;
  span {
    margin: auto;
  }
}
</style>
