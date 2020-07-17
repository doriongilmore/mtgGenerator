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

        <linearGradient id="guildsGradient">
          <stop offset="50%" stop-color="#665f5f" />
          <stop offset="100%" stop-color="#f8e7b9" />
        </linearGradient>

        <symbol id="tutu" viewBox="0 0 4000 4000">
          <path
            fill="url(#guildsGradient)"
            d="m 2665.2296,3997.0021 c -0.3751,-1.2846 -12.5569,-63.2958 -27.0704,-137.8027 -14.5135,-74.507 -43.5237,-222.8535 -64.467,-329.6589 -39.9998,-203.9886 -83.4752,-428.0505 -84.1779,-433.8332 -0.3541,-2.9137 16.2438,-21.0615 114.4155,-125.1005 l 114.8294,-121.6925 69.2332,-259.2791 c 38.0782,-142.6035 69.1406,-259.3626 69.0278,-259.4647 -0.113,-0.1016 -131.4007,67.6332 -291.7505,150.5231 -220.5612,114.0149 -292.3447,150.552 -294.8285,150.0647 -1.8058,-0.3541 -132.3145,-61.0326 -290.0196,-134.841 l -286.7364,-134.1969 h -145.6567 -145.6569 v -32.0317 -32.0316 h 241.6412 241.6412 v -163.4949 -163.4947 h -391.3538 -391.3535 l 0.018,274.6045 0.018,274.6046 211.9838,281.4095 c 116.5912,154.7752 211.7634,282.1008 211.4937,282.9461 -0.2696,0.8451 -6.4191,30.3651 -13.6656,65.5999 -21.2299,103.2257 -173.8004,837.2004 -175.3996,843.7987 l -0.7194,2.9683 -9.5048,-3.469 c -5.2275,-1.9079 -21.6197,-8.4187 -36.4267,-14.4685 -123.1956,-50.3345 -237.5294,-115.6333 -330.28659,-188.6347 -18.17691,-14.3054 -48.89755,-40.3944 -58.63323,-49.793 l -7.41582,-7.159 77.40943,-223.3799 77.40941,-223.3799 -21.4192,-22.196 C 855.44769,3085.507 732.87933,2861.5287 675.53288,2620.3805 661.39156,2560.9147 652.6108,2509.3255 644.00157,2435.1262 l -0.85172,-7.3405 -304.92955,-96.7163 C -28.3502,2214.8019 0.81001948,2224.117 1.4330668,2223.4838 1.7138821,2223.1984 149.05666,2181.49 328.8615,2130.7985 c 179.8048,-50.6915 327.83736,-92.4471 328.96123,-92.7902 1.40292,-0.4283 2.57087,-3.8138 3.72617,-10.8014 2.95261,-17.8581 15.36866,-72.2878 23.09042,-101.2241 l 7.47231,-28.0016 -3.10322,-2.6954 C 687.30163,1893.8032 558.10842,1783.883 401.91235,1651.0184 245.71629,1518.1539 118.67554,1409.2849 119.59956,1409.0873 c 0.92404,-0.1975 168.20929,25.1776 371.74503,56.389 203.53572,31.2115 370.81392,56.7483 371.72936,56.7483 0.9154,0 7.24496,-8.2363 14.06565,-18.3029 14.12351,-20.8446 43.59968,-61.3674 55.95269,-76.9219 4.57518,-5.7609 8.09846,-10.866 7.82949,-11.3446 -38.71229,-68.8843 -404.08354,-726.58371 -403.78252,-726.84288 0.24533,-0.21119 163.45644,97.13118 362.69138,216.31637 199.23486,119.18511 362.82716,216.70041 363.53826,216.70041 0.7112,0 3.7634,-1.7235 6.7828,-3.8301 3.0193,-2.1065 17.0135,-10.8574 31.0982,-19.4465 14.0849,-8.5892 26.0701,-16.0732 26.6341,-16.6313 0.5639,-0.5579 -23.835,-200.89169 -54.2199,-445.18602 -30.3848,-244.29436 -55.0528,-444.3671 -54.8176,-444.60612 0.3163,-0.32146 520.9295,725.82944 525.0406,732.32646 0.3975,0.62813 10.444,-0.61794 22.3255,-2.769 11.8816,-2.15108 25.8299,-4.58939 30.9964,-5.41845 6.8627,-1.10126 9.5475,-2.11006 9.9657,-3.74434 0.3148,-1.23031 43.0599,-207.16938 94.9894,-457.64237 51.9294,-250.47298 94.764,-454.97495906 95.188,-454.44884723 0.424,0.52611173 45.8443,205.15826723 100.9334,454.73809723 55.0893,249.57983 100.4688,455.13285 100.8432,456.78448 0.4915,2.16841 1.6448,3.0129 4.1499,3.03869 1.9081,0.0196 15.2873,2.06651 29.7316,4.54861 14.4443,2.48209 26.5592,4.03188 26.922,3.44399 6.522,-10.57027 531.3263,-733.73905 531.5781,-732.50307 0.2794,1.37198 -115.4454,860.63979 -118.6312,880.84889 -0.7443,4.7211 -0.5509,5.0188 5.5634,8.5627 12.861,7.4545 42.199,25.3736 55.6976,34.0191 l 13.9051,8.9059 360.8523,-215.4465 c 198.4687,-118.4956 361.0426,-215.25309 361.2753,-215.01664 0.2326,0.23645 -89.9567,162.82425 -200.421,361.30634 -110.4644,198.4819 -200.8442,361.1073 -200.8442,361.3896 0,0.2825 6.9998,9.6471 15.5553,20.8102 15.9786,20.8488 29.4242,39.3563 46.0155,63.3389 6.9137,9.9937 10.2112,13.6802 12.2368,13.6802 1.5249,0 165.6403,-23.4377 364.7007,-52.0837 199.0604,-28.6459 362.723,-51.9189 363.6946,-51.7176 1.2403,0.2567 -512.7942,442.8636 -552.3519,475.5997 l -3.344,2.7672 6.7215,23.9258 c 8.3918,29.8721 18.3037,71.3007 24.564,102.6702 2.637,13.213 4.9873,24.2233 5.2229,24.4672 0.2357,0.2439 145.9492,43.3299 323.8077,95.7467 177.8588,52.417 323.5673,95.4945 323.7971,95.728 0.2298,0.2335 -141.5474,43.6106 -315.0604,96.3935 -173.5131,52.7831 -315.8032,96.433 -316.2007,97.0002 -0.3972,0.5671 -1.4537,8.6975 -2.3477,18.0673 -3.568,37.3976 -12.9767,97.3894 -22.0337,140.4914 -41.4992,197.4919 -123.7579,380.8936 -243.9348,543.8705 -39.9568,54.187 -73.0201,92.9106 -123.1496,144.2328 l -30.0719,30.7877 86.0413,214.474 c 47.3228,117.9608 86.0468,214.916 86.0532,215.4558 0.013,0.5397 -1.7121,2.4829 -3.8191,4.3181 -2.107,1.8352 -9.9427,8.7951 -17.4125,15.4666 -94.4585,84.3622 -222.3843,162.7164 -361.7684,221.582 -22.6462,9.5642 -67.6234,27.2124 -69.3516,27.2124 -0.3082,0 -0.8672,-1.051 -1.2423,-2.3357 z M 2106.2828,1804.5034 v -459.7875 h -177.294 -177.2941 l 0.3313,286.6164 0.3313,286.6164 100.1367,0.3419 100.1367,0.3422 v 172.8289 172.829 h 76.826 76.8261 z m 397.92,68.0672 V 1480.8504 H 2338.731 2173.2594 v 391.7202 391.7201 h 165.4716 165.4718 z m 358.196,48.3811 0.3309,-342.6718 H 2713.6713 2564.613 v 343.0112 343.0111 l 148.7275,-0.3394 148.7275,-0.3393 z m -1171.765,-221.2186 v -218.2154 l -183.5292,-0.3384 -183.5291,-0.3383 v 218.8921 218.8923 l 183.5291,-0.3384 183.5292,-0.3383 z"
          />
        </symbol>
      </defs>

      <g>
        <use
          ref="U"
          x="400"
          y="25"
          height="200"
          width="200"
          transform="matrix(0.30901,0.95105,-0.95105,0.30901,821.019760960103,-130.03675533505043)"
          href="#U"
          opacity="0"
          style="fill: white"
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
        />

        <use ref="W" x="400" y="25" height="200" width="200" href="#W" opacity="0"/>
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

        <line
          ref="needleT"
          x1="500"
          y1="50"
          x2="500"
          y2="200"
          stroke="red"
          stroke-width="2"
        />
      </g>
    </svg>
  </div>
</template>

<script>
  import {TweenLite, Elastic, Back, Bounce, Expo, TimelineLite} from "gsap";
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
    /*TweenLite.set(this.$refs.needleT, {
      rotation: 252 + 36,
      transformOrigin: "50% 450"
    })*/
  },
  methods: {
    spinNeedlesSec() {
      function getTween(ref, pos, ox) {
        return TweenLite.to(ref, 1.5, {
          rotation: pos,
          transformOrigin: `50% ${ox}`,
          ease: Back.easeOut.config(1.7),
        });
      }

      let avaliablePos = [0, 72, 144, 216, 288].filter(p => p !== this.currentRS1 && p !== this.currentRS2);


      this.currentRS1 = avaliablePos[Math.floor(Math.random() * 3)];

      avaliablePos = avaliablePos.filter(p => p !== this.currentRS1);

      this.currentRS2 = avaliablePos[Math.floor(Math.random() * 2)];

      const onComplete = () => {
        this.lightSymbols();
      }
      const timeline = new TimelineLite({paused: true, onComplete});
      timeline.add(getTween(this.$refs.needleSec1, this.currentRS1, '350'), 0);
      timeline.add(getTween(this.$refs.needleSec2, this.currentRS2, '275'), 0);
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
        this.aoeEffect();
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
      const getTween = (s) => {
        const onComplete = () => {
          TweenLite.to(this.$refs[s], 0.5, { scale: 2, attr: { opacity: 0 } });
        };

        TweenLite.set(this.$refs[s], { scale: 1, transformOrigin: "50% 50%" });

        return TweenLite.to(this.$refs[s], 9.5, {
          attr: { opacity: 1 },
          ease: Expo.easeOut,
          onComplete
        });
      }

      const colors = {0: "W", 72: "U", 144: "B", 216: "R", 288: "G"};
      console.log(this.currentRS1)
      console.log(colors[this.currentRS1])
      console.log(this.currentRS2)
      console.log(colors[this.currentRS2])
      const timeline = new TimelineLite({paused: true});
      timeline.add(getTween(colors[this.currentRS1]), 0);
      timeline.add(getTween(colors[this.currentRS2]), 0);
      timeline.play();
    }
  }
};


/*spinSec(ref, ox) {
      const data = this.getSpinData();

      return new Promise((resolve, reject) => {
        TweenLite.to(ref, 1.5, {
          rotation: data.pos,
          transformOrigin: `50% ${ox}`,
          ease: Back.easeOut.config(1.7),
          onComplete: () => {
            resolve(data.color);
          }
        });
      });
    },*/


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