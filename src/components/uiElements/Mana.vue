<template>
  <div class="manaCost" :title="manaList.join('')">
    <div v-for="mana in manaList" class="mana">
      <Black v-if="mana === 'B'" />
      <Blue v-else-if="mana === 'U'" />
      <Energy v-else-if="mana === 'E'" />
      <Green v-else-if="mana === 'G'" />
      <Incolor v-else-if="mana === 'I'" />
      <Incolor v-else-if="mana === 'C'" />
      <Red v-else-if="mana === 'R'" />
      <Snow v-else-if="mana === 'S'" />
      <Tap v-else-if="mana === 'T'" />
      <Untap v-else-if="mana === 'Q'" />
      <White v-else-if="mana === 'W'" />
      <div v-else>{{mana}}</div>
    </div>
  </div>
</template>

<script>
import Black from "src/assets/mana/Black.vue";      // B
import Blue from "src/assets/mana/Blue.vue";        // U
import Energy from "src/assets/mana/Energy.vue";    // E
import Green from "src/assets/mana/Green.vue";      // G
import Incolor from "src/assets/mana/Incolor.vue";  // I | C
import Red from "src/assets/mana/Red.vue";          // R
import Snow from "src/assets/mana/Snow.vue";        // S
import Tap from "src/assets/mana/Tap.vue";          // T
import Untap from "src/assets/mana/Untap.vue";      // Q
import White from "src/assets/mana/White.vue";      // W
import CONST from "src/utils/CONST";

export default {
  name: "Mana",
  props: ["manaCost"],
  computed: {
    manaList() {
      const list = [];
      const manas = ((this.manaCost || '').match(CONST.mana.generalRegexp) || []).map(r => r.match(CONST.mana.cleanRegexp));
      for (let i = 0, l = manas.length; i < l; i++) {
        for (let j = 0, m = manas[i].length; j < m; j++) {
          list.push(manas[i][j]);
        }
      }
      return list;
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
    Tap,
    Untap,
    White,
  },
};
</script>

<style lang="less">
    .mana {
      display: inline-block;
      img {
        max-width: 20px;
        max-height: 20px;
      }
    }
</style>
