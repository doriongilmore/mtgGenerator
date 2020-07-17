<template>
  <div class="somethingContainer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <defs>
        <radialGradient id="aoeGradient" cx="50%" cy="50%" r="50%">
          <stop
            ref="aoeStop1"
            offset="70%"
            stop-color="#f8e7b9"
            stop-opacity="0"
          />
          <stop
            ref="aoeStop2"
            offset="100%"
            stop-color="#f8e7b9"
            stop-opacity="0.3"
          />
        </radialGradient>
      </defs>

      <g>
        <use ref="WU" x="400" y="25" height="200" width="200" href="#azorius" opacity="0" transform="matrix(0.80901,0.58778,-0.58778,0.80901,389.38412895876286,-198.4011233337103)"/>

        <use ref="UB" x="400" y="25" height="200" width="200" href="#dimir" opacity="0" transform="matrix(-0.30901,0.95105,-0.95105,-0.30901,1130.0367553350504,178.98023903989684)"/>

        <use ref="BR" x="400" y="25" height="200" width="200" href="#rakdos" opacity="0" transform="matrix(-1,0,0,-1,1000,1000)"/>

        <use ref="RG" x="400" y="25" height="200" width="200" href="#gruul" opacity="0" transform="matrix(-0.30901,-0.95105,0.95105,-0.30901,178.98023903989701,1130.0367553350507)"/>

        <use
          ref="GW"
          x="400"
          y="25"
          height="200"
          width="200"
          href="#selesnya"
          opacity="0"
          transform="matrix(0.80901,-0.58778,0.58778,0.80901,-198.4011233337103,389.38412895876303)"
        />

        <use ref="WB" x="400" y="25" height="200" width="200" href="#orzhov" opacity="0" transform="matrix(0.30901,0.95105,-0.95105,0.30901,821.019760960103,-130.03675533505043)" />

        <use ref="BG" x="400" y="25" height="200" width="200" href="#golgari" opacity="0" transform="matrix(-0.80901,-0.58778,0.58778,-0.80901,610.6158710412371,1198.4011233337103)"/>

        <use ref="GU" x="400" y="25" height="200" width="200" href="#simic" opacity="0" />

        <use ref="UR" x="400" y="25" height="200" width="200" href="#izzet" opacity="0" transform="matrix(-0.80901,0.58778,-0.58778,-0.80901,1198.4011233337103,610.615871041237)" />

        <use ref="RW" x="400" y="25" height="200" width="200" href="#boros" opacity="0" transform="matrix(0.30901,-0.95105,0.95105,0.30901,-130.03675533505043,821.0197609601032)"/>

        <use
          ref="U"
          x="400"
          y="25"
          height="200"
          width="200"
          transform="matrix(0.30901,0.95105,-0.95105,0.30901,821.019760960103,-130.03675533505043)"
          href="#U"
          opacity="0"
          fill="#0e67ab"
        />

        <use
          ref="B"
          x="400"
          y="25"
          height="200"
          width="200"
          transform="matrix(-0.80901,0.58778,-0.58778,-0.80901,1198.4011233337103,610.615871041237)"
          href="#B"
          opacity="0"
          fill="#130c0e"
        />

        <use
          ref="G"
          x="400"
          y="25"
          height="200"
          width="200"
          transform="matrix(0.30901,-0.95105,0.95105,0.30901,-130.03675533505043,821.0197609601032)"
          href="#G"
          opacity="0"
          fill="#00733d"
        />

        <use
          ref="R"
          x="400"
          y="25"
          height="200"
          width="200"
          transform="matrix(-0.80901,-0.58778,0.58778,-0.80901,610.6158710412371,1198.4011233337103)"
          href="#R"
          opacity="0"
          fill="#d32029"
        />

        <use
          ref="W"
          x="400"
          y="25"
          height="200"
          width="200"
          href="#W"
          opacity="0"
          fill="#f8e7b9"
        />
      </g>

      <g>
        <circle ref="middleColor" cx="500" cy="500" r="175" fill="#f8e7b9" />

        <use
          ref="manaSymbol"
          x="500"
          y="500"
          height="300"
          width="300"
          transform="translate(-150 -150)"
          :href="`#${currColor}`"
          :class="currColor[0]"
        />

        <circle cx="500" cy="500" r="175" fill="url(#sphereEffect)" />
      </g>

      <g>
        <line
          ref="needleMain"
          x1="500"
          y1="50"
          x2="500"
          y2="200"
          stroke="black"
          stroke-width="2"
        />
        <line
          ref="needleSec1"
          x1="500"
          y1="150"
          x2="500"
          y2="275"
          stroke="black"
          stroke-width="2"
        />
        <line
          ref="needleSec2"
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
import { TweenLite, Elastic, Back, Bounce, Expo, TimelineLite } from "gsap";
import CONST from "src/utils/CONST";

export default {
  name: "Something",
  components: {},
  data() {
    return {
      tick: 0,
      currColor: "W",
      currentRM: 0,
      currentRS1: 0,
      currentRS2: 0
    };
  },
  watch: {
    tick() {
      setTimeout(
        function() {
          this.tick++;
        }.bind(this),
        1000
      );
      this.spinNeedleM();
    }
  },
  computed: {},
  mounted() {
    this.tick++;
  },
  methods: {
    spinNeedlesSec() {
      function getTween(ref, pos, ox) {
        return TweenLite.to(ref, 1.5, {
          rotation: pos,
          transformOrigin: `50% ${ox}`,
          ease: Back.easeOut.config(1.7)
        });
      }

      let avaliablePos = [0, 72, 144, 216, 288].filter(
        p => p !== this.currentRS1 && p !== this.currentRS2
      );

      this.currentRS1 = avaliablePos[Math.floor(Math.random() * 3)];

      avaliablePos = avaliablePos.filter(p => p !== this.currentRS1);

      this.currentRS2 = avaliablePos[Math.floor(Math.random() * 2)];

      const onComplete = () => {
        this.lightSymbols();
      };
      const timeline = new TimelineLite({ paused: true, onComplete });
      timeline.add(getTween(this.$refs.needleSec1, this.currentRS1, "350"), 0);
      timeline.add(getTween(this.$refs.needleSec2, this.currentRS2, "275"), 0);
      timeline.play();
    },

    spinNeedleM() {
      const onComplete = () => {
        const currAngle = this.currentRM % 360;
        if (currAngle === 36) this.changeColor("U");
        else if (currAngle === 108) this.changeColor("B");
        else if (currAngle === 180) this.changeColor("R");
        else if (currAngle === 252) this.changeColor("G");
        else if (currAngle === 324) this.changeColor("W");
      };

      this.currentRM += 6;
      TweenLite.to(this.$refs.needleMain, 0.7, {
        rotation: this.currentRM,
        transformOrigin: "50% 450",
        ease: Elastic.easeOut.config(2, 0.1),
        onComplete
      });
    },

    changeColor(color) {
      const onComplete = () => {
        this.currColor = color;
        //this.aoeEffect();
        this.spinNeedlesSec();

        TweenLite.to(this.$refs.manaSymbol, 0.3, {
          scale: 1,
          transformOrigin: "50% 50%"
        });
      };

      TweenLite.to(this.$refs.manaSymbol, 0.3, {
        scale: 0,
        onComplete,
        transformOrigin: "50% 50%"
      });

      TweenLite.to(this.$refs.middleColor, 0.7, {
        attr: { fill: CONST.mana.colors[color] }
      });
    },

    async aoeEffect() {
      TweenLite.set(this.$refs.aoeCircle, { attr: { r: 0 } });
      TweenLite.set([this.$refs.aoeStop1, this.$refs.aoeStop2], {
        attr: { "stop-color": CONST.mana.colors[this.currColor] }
      });

      TweenLite.to(this.$refs.aoeCircle, 5, { attr: { r: 2000 } });
    },

    lightSymbols() {
      const getTween = s => {
        const onComplete = () => {
          TweenLite.to(this.$refs[s], 0.5, { scale: 2, attr: { opacity: 0 } });
        };

        TweenLite.set(this.$refs[s], { scale: 1, transformOrigin: "50% 50%" });

        return TweenLite.to(this.$refs[s], 10.5 - s.length, {
          attr: { opacity: 1 },
          ease: Expo.easeOut,
          onComplete
        });
      };

      const combine = {
        144: {
          72: "UB",
          288: "BG",
          216: "BR",
          0: "WB"
        },
        72: {
          144: "UB",
          288: "GU",
          216: "UR",
          0: "WU"
        },
        288: {
          144: "BG",
          72: "GU",
          216: "RG",
          0: "GW"
        },
        216: {
          144: "BR",
          72: "UR",
          288: "RG",
          0: "RW"
        },
        0: {
          144: "WB",
          72: "WU",
          288: "GW",
          216: "RW"
        }
      };

      const colors = { 0: "W", 72: "U", 144: "B", 216: "R", 288: "G" };
      const timeline = new TimelineLite({ paused: true });

      timeline.add(getTween(colors[this.currentRS1]), 0);
      timeline.add(getTween(colors[this.currentRS2]), 0);
      timeline.add(getTween(combine[this.currentRS1][this.currentRS2]), 1);
      timeline.play();
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