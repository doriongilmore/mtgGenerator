<template>
  <div class="mana">
<!--    {{ manaCost }}-->
    <div v-for="mana in manaList">
      <Black v-if="mana === 'B'" />
      <Blue v-else-if="mana === 'U'" />
      <Energy v-else-if="mana === 'E'" />
      <Green v-else-if="mana === 'G'" />
      <Incolor v-else-if="mana === 'I'" />
      <Red v-else-if="mana === 'R'" />
      <Snow v-else-if="mana === 'S'" />
      <White v-else-if="mana === 'W'" />
      <div v-else>{{mana}}</div>
    </div>
  </div>
</template>

<script>
import Black from "src/assets/mana/Black.vue";      // B
import Blue from "src/assets/mana/Blue.vue";        // U
import Energy from "src/assets/mana/Energy.vue";    //
import Green from "src/assets/mana/Green.vue";      // G
import Incolor from "src/assets/mana/Incolor.vue";  //
import Red from "src/assets/mana/Red.vue";          // R
import Snow from "src/assets/mana/Snow.vue";        // S
import White from "src/assets/mana/White.vue";      // W

const regexp = /\d+|X|S|W|B|U|G|R/gi;

export default {
  name: "Mana",
  props: ["manaCost"],
  computed: {
    manaList() {
      return this.manaCost.match(regexp);
    }
  },
  components: {
    Black,
    Blue,
    Energy,
    Green,
    Incolor,
    Red,
    Snow,
    White,
  },
};
</script>

<style lang="less">
  .mana {
    div {
      float: left;
    }
    img {
      max-width: 20px;
      max-height: 20px;
    }
  }
</style>
