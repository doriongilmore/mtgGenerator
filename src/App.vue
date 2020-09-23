<template>
  <div class="app">
    <MainContainer></MainContainer>
    <!-- MODALS LAST ! -->
    <Modals></Modals>
  </div>
</template>
<script>
import Modals from 'src/components/Modals.vue';
import MainContainer from 'src/MainContainer.vue';

export default {
  name: 'App',
  components: {
    Modals,
    MainContainer,
  },
};
</script>
<style lang="less">
.app {
  font-family: Georgia, sans-serif;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.modal-content,
.card {
  background-color: #fffa;
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
.tuto {
  font-style: italic;
  font-size: smaller;
}
.pointer {
  cursor: pointer;
}
.btn-drag {
  cursor: grab;
}
</style>
