<template>
  <div ref="mainContainer" class="mainContainer" @click="onClickMainContainer">
    <div ref="mainAnim" :class="`mainAnim ${position}`" @click="onClickMainAnim">
      <div ref="modal" class="modal">
        <div v-show="canClose && currentModal" class="close" @click="onClickClose">X</div>
        <!-- close button -->
        <!--modals-->
        <Import v-if="currentModal === 'import'"></Import>
        <Export v-if="currentModal === 'export'"></Export>
        <Card v-if="currentModal === 'card'"></Card>
        <AdvancedSearch v-if="currentModal === 'search'"></AdvancedSearch>
        <HomeFeature v-if="currentModal === 'feature'"></HomeFeature>
        <Confirmation v-if="currentModal === 'confirm'"></Confirmation>
      </div>
      <div ref="loading" class="loading" v-show="isLoading && !isAnimating">
        <span>LOADING</span>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenLite, TimelineLite } from 'gsap';
import { mapState } from 'vuex';
import CONST from 'src/utils/CONST';
import Import from 'src/components/modals/Import.vue';
import Export from 'src/components/modals/Export.vue';
import Card from 'src/components/modals/Card.vue';
import AdvancedSearch from 'src/components/modals/AdvancedSearch.vue';
import HomeFeature from 'src/components/modals/HomeFeature.vue';
import Confirmation from 'src/components/modals/Confirmation.vue';

const actualModalParams = {};

export default {
  name: 'Modals',
  components: {
    Import,
    Export,
    Card,
    AdvancedSearch,
    HomeFeature,
    Confirmation,
  },
  data() {
    return {
      isAnimating: false,
      timeline: null,
      currentModal: null,
    };
  },
  computed: {
    ...mapState({
      modalName: state => state.modals.modalName,
      noAnimation: state => state.modals.noAnimation,
      resolve: state => state.modals.resolve,
      reject: state => state.modals.reject,
      modalData: state => state.modals.modalData,
      size: state => state.modals.size,
      canClose: state => state.modals.canClose,
      blurBg: state => state.modals.blurBg,
      isLoading: state => state.modals.loading,
      position: state => state.modals.position,
    }),
  },
  watch: {
    isLoading(newValue) {
      const timeline = new TimelineLite({ pause: true });
      if (newValue) {
        timeline.add(TweenLite.to(this.$refs.modal, 0.2, { opacity: 0.2 }, 0));
        timeline.add(TweenLite.to(this.$refs.loading, 0.2, { opacity: 1 }, 0.1));
      } else {
        timeline.add(TweenLite.to(this.$refs.loading, 0.2, { opacity: 0 }, 0));
        timeline.add(TweenLite.to(this.$refs.modal, 0.2, { opacity: 1 }, 0.1));
      }
      timeline.play();
    },
    modalName(newValue) {
      if (this.isAnimating) throw new Error('Opening a modal when animating');
      if (newValue === actualModalParams.modalName) return;

      this.openAnim();

      actualModalParams.size = this.size;
      actualModalParams.modalName = newValue;
      actualModalParams.canClose = this.canClose;
      actualModalParams.blurBg = this.blurBg;
    },
  },
  methods: {
    onClickMainContainer(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.isAnimating || !this.canClose) return;
      this.onClickClose();
    },
    onClickMainAnim(e) {
      e.stopPropagation();
    },
    onClickClose() {
      this.closeAnim();
      this.reject();
    },

    openAnim() {
      if (this.isAnimating) return;
      this.timeline = new TimelineLite({
        paused: true,
        onComplete: () => {
          this.isAnimating = false;
          this.currentModal = this.modalName;
          this.timeline = null;
          TweenLite.to(this.$refs.modal, 0.2, {
            opacity: 1,
          });
        },
      });
      this.timeline.add(TweenLite.to(this.$refs.mainAnim, 0.2, { opacity: 1 }), 0);
      this.timeline.add(
        TweenLite.to(this.$refs.mainContainer, 0.2, {
          backgroundColor: 'rgba(255,255,255,0.3)',
        }),
        0,
      );
      this.timeline.add(TweenLite.to(this.$refs.mainAnim, 0.2, { height: this.height }), 0.2);
      this.timeline.add(TweenLite.to(this.$refs.mainAnim, 0.2, { width: this.width }), 0.4);
      this.isAnimating = true;
      this.timeline.play();
    },
    closeAnim() {
      if (this.isAnimating) return;
      if (this.noAnimation) {
        this.isAnimating = false;
        this.$store.commit('modals/close');
        this.timeline = null;
        return;
      }

      this.timeline = new TimelineLite({
        paused: true,
        onComplete: () => {
          this.isAnimating = false;
          this.$store.commit('modals/close');
          this.timeline = null;
        },
      });

      this.timeline.add(TweenLite.to(this.$refs.modal, 0.2, { opacity: 0 }), 0);
      this.timeline.add(
        TweenLite.to(this.$refs.mainContainer, 0.2, {
          backgroundColor: 'rgba(255,255,255,0)',
        }),
      );
      this.timeline.add(TweenLite.to(this.$refs.mainAnim, 0.2, { width: 0 }), 0.2);
      this.timeline.add(TweenLite.to(this.$refs.mainAnim, 0.2, { height: 0 }), 0.4);
      this.timeline.add(TweenLite.to(this.$refs.mainAnim, 0.2, { opacity: 0 }), 0.6);

      this.isAnimating = true;
      this.timeline.play();
    },
  },
  mounted() {
    this.height = Math.round(this.$refs.mainContainer.clientHeight * CONST.modals.sizeRatio[this.size].height);
    this.width = Math.round(this.$refs.mainContainer.clientWidth * CONST.modals.sizeRatio[this.size].width);

    this.openAnim();

    actualModalParams.size = this.size;
    actualModalParams.modalName = this.modalName;
    actualModalParams.canClose = this.canClose;
    actualModalParams.blurBg = this.blurBg;
  },
  beforeDestroy() {
    if (this.timeline) this.timeline.kill();
  },
};
</script>

<style lang="less"></style>
