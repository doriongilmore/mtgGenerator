<template>
  <div class="container archer">
  </div>
</template>

<script>
export default {
  name: "Background"
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-image: url("https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/thumb/7/7f/Power_Nine.jpg/400px-Power_Nine.jpg?version=c2e2c8f79215ab06e26d946d4e82b588");
  /*background-image: url("https://i.pinimg.com/originals/6d/3a/3f/6d3a3f34356a9f0b13f854263714ccc7.jpg");*/
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
