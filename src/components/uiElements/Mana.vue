<template>
  <div class="manaCost" :title="manaList.join('')">
    <div v-for="mana in manaList" class="mana">
      <img :src="mana.uri" :alt="mana.symbol" :title="mana.label">
    </div>
  </div>
</template>

<script>
import CONST from "src/utils/CONST";

export default {
  name: "Mana",
  props: ["manaCost"],
  computed: {
    manaList() {
      return ((this.manaCost || '').match(CONST.mana.generalRegexp) || []).map(this.getCompleteSymbol);
    },
  },
  methods: {
    getCompleteSymbol(symbol) {
      return CONST.mana.symbology.find(e => e.symbol === symbol) || {
          symbol,
          uri: "",
          label: "symbol not found, please fill an issue on GitHub",
        };
    },
  },
};
</script>

<style lang="less">
  .mana {
    display: inline-block;
    img {
      width: 20px;
      height: 20px;
    }
  }
</style>
