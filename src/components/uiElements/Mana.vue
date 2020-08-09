<template>
  <div class="manaContainer">
    <div v-for="manas of manaList">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <g v-if="manas.length === 1">
          <circle cx="20" cy="20" r="20" :fill="colors[manas[0]] || colors.C" />
          <text
            v-if="/[XYZ]/.test(manas[0])"
            x="20"
            y="20"
            font-family="ui-serif"
            font-size="35"
            transform="translate(-13 12)"
          >
            {{ manas[0] }}
          </text>
          <text
            v-if="/\d/.test(manas[0]) && manas[0].length === 1"
            x="20"
            y="20"
            font-family="ui-serif"
            font-size="40"
            transform="translate(-10 12.5)"
          >
            {{ manas[0] }}
          </text>
          <text
            v-else-if="/\d/.test(manas[0])"
            x="20"
            y="20"
            font-family="ui-serif"
            font-size="30"
            transform="translate(-14 10)"
          >
            {{ manas[0] }}
          </text>
          <use
            v-else
            x="20"
            y="20"
            height="35"
            width="35"
            transform="translate(-17.5 -17.5)"
            :href="`manaDefs.svg#${manas[0]}`"
            :class="manas[0]"
          />
          <circle cx="20" cy="20" r="20" fill="url(#sphereEffect)" />
        </g>
        <g v-else>
          <circle cx="20" cy="20" r="20" :fill="`url(manaDefs.svg#${manas.join('')})`" />
          <text v-if="manas[0] === '2'" x="8" y="18" font-family="ui-serif" font-size="20">2</text>
          <use v-else x="3" y="3" height="20" width="20" :href="`manaDefs.svg#${manas[0]}`" :class="manas[0]" />
          <use x="17" y="17" height="20" width="20" :href="`manaDefs.svg#${manas[1]}`" :class="manas[1]" />
          <circle cx="20" cy="20" r="20" fill="url(#sphereEffect)" />
        </g>
        <circle cx="20" cy="20" r="20" stroke="#000" stroke-width="1px" fill="transparent" />
      </svg>
    </div>
  </div>
</template>

<script>
import CONST from 'src/utils/CONST';

export default {
  name: 'Mana',
  props: ['manaCost'],
  data() {
    return {
      colors: CONST.mana.colors,
    };
  },
  computed: {
    manaList() {
      console.info(this.manaCost);
      return ((this.manaCost || '').match(CONST.mana.generalRegexp) || []).map(this.formatSymbol);
    },
  },
  methods: {
    formatSymbol(symbol) {
      return symbol.match(CONST.mana.cleanRegexp);
    },
  },
};
</script>

<style lang="less">
.manaContainer {
  display: flex;
  flex-wrap: wrap;
  div {
    margin: auto 2px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
