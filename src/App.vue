<template>
  <div class="app">
    <!--héhéhé, bg is not here =p-->
    <MainContainer></MainContainer>
    <!-- MODALS LAST ! -->
    <Modals v-if="showModal"></Modals>
  </div>
</template>
<script>
//todo center svg
import { mapState } from "vuex";
import Modals from "src/components/Modals.vue";
import MainContainer from "src/MainContainer.vue";
import CONST from "src/utils/CONST";

export default {
  name: "App",
  components: {
    Modals,
    MainContainer,
  },
  data() {
    return {
      showModal: false
    };
  },
  computed: {
    ...mapState({
      modalOpen: state => state.modals.open,
    })
  },
  async mounted() {
    const typeList = CONST.search.typeList.map((el) => {
      if (!el.uri) { return Promise.resolve([el]) }
      return this.$store.dispatch('mtg/fetch', el.uri)
              .then(res => res.map(t => ({ key: t, value: t })));
    });
    CONST.search.typeList = (await Promise.all(typeList))
            .reduce((list, arr) => [...list, ...arr], []);
  },
  watch: {
    modalOpen(newValue) {
      this.showModal = newValue;
    }
  },
};
</script>
<style lang="less">
body {
  overflow: hidden;
}
.app {
  font-family: Georgia, sans-serif;
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
