<template>
  <div class="somethingContainer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <defs>
        <radialGradient
                id="aoeGradient"
                cx="50%"
                cy="50%"
                r="50%"
        >
          <stop ref="aoeStop1" offset="70%" stop-color="#f8e7b9" stop-opacity="0"/>
          <stop ref="aoeStop2" offset="100%" stop-color="#f8e7b9" stop-opacity="0.3"/>
        </radialGradient>
      </defs>

      <g>
        <circle
                ref="middleColor"
                cx="500"
                cy="500"
                r="175"
                fill="#f8e7b9"
        />

        <use ref="manaSymbol" x="500" y="500" height="300" width="300" transform="translate(-150 -150)" :href="`#${currColor}`" />

        <circle
                cx="500"
                cy="500"
                r="175"
                fill="url(#sphereEffect)"
        />
      </g>

      <g>
        <line
                ref="needleS"
                x1="500"
                y1="50"
                x2="500"
                y2="200"
                stroke="black"
                stroke-width="2"
        />
        <line
                ref="needleM"
                x1="500"
                y1="150"
                x2="500"
                y2="275"
                stroke="black"
                stroke-width="2"
        />
        <line
                ref="needleH"
                x1="500"
                y1="225"
                x2="500"
                y2="300"
                stroke="black"
                stroke-width="2"
        />
      </g>

      <g>
        <circle
                ref="aoeCircle"
                cx="500"
                cy="500"
                r="0"
                fill="url(#aoeGradient)"
        />

      </g>
    </svg>
  </div>
</template>

<script>
  import {TweenLite, Elastic, Back} from "gsap";
  import CONST from "src/utils/CONST";

export default {
  name: "Something",
  components: {},
  data() {
    return {
      tick: 0,
      timeout: null,
      currColor: 'W',
      currentRS: 0,
      currentRM: 0,
      currentRH: 0
    };
  },
  watch: {
    tick() {
      this.timeout = setTimeout(function() {
        this.tick++
      }.bind(this), 200);
      this.moveS()
    }
  },
  computed: {},
  mounted() {
    this.tick++;
  },
  methods: {
    moveS() {
      const onComplete = () => {
        const currAngle = this.currentRS % 360;
        if(currAngle === 36) this.changeColor('U');
        else if(currAngle === 108) this.changeColor('B');
        else if(currAngle === 180) this.changeColor('R');
        else if(currAngle === 252) this.changeColor('G');
        else if(currAngle === 324) this.changeColor('W');
        else if (currAngle === 0) this.spinM();

      }

      this.currentRS += 6;
      TweenLite.to(this.$refs.needleS, 0.1, {rotation: this.currentRS, transformOrigin:"50% 450", ease: Elastic.easeOut.config(1,0.3), onComplete})
    },
    spinM() {
      const onComplete = () => {
        if (this.currentRM % 24 === 0) this.spinH();
      }

      this.currentRM += 6;
      TweenLite.to(this.$refs.needleM, 0.2, {rotation: this.currentRM, transformOrigin:"50% 350", ease: Back.easeOut.config(1.7), onComplete})
    },
    spinH() {
      this.currentRH += 6;
      TweenLite.to(this.$refs.needleH, 0.3, {rotation: this.currentRH, transformOrigin:"50% 275", ease: Back.easeOut.config(1.7)})
    },
    changeColor(color) {
      const onComplete = () => {
        this.currColor = color;
        this.aoeEffect()
        TweenLite.to(this.$refs.manaSymbol, 0.3, {scale: 1, transformOrigin:"50% 50%"})
      }

      TweenLite.to(this.$refs.manaSymbol, 0.3, {scale: 0, onComplete, transformOrigin:"50% 50%"})
      TweenLite.to(this.$refs.middleColor, 0.7, {attr: {fill: CONST.mana.colors[color]}})
    },
    aoeEffect() {
      TweenLite.set(this.$refs.aoeCircle, {attr: {r: 0}})
      TweenLite.set([this.$refs.aoeStop1, this.$refs.aoeStop2], {attr: {"stop-color": CONST.mana.colors[this.currColor]}})
      TweenLite.to(this.$refs.aoeCircle, 5, {attr: {r: 2000}})
    }
  }
};
</script>

<style lang="less" scoped>
.somethingContainer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  svg {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>