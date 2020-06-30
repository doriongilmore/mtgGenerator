<template>
  <div ref="mainContainer" class="mainContainer" @click="onClickMainContainer">
    <div
      ref="mainAnim"
      :class="`mainAnim ${position}`"
      @click="onClickMainAnim"
    >
      <div ref="modal" class="modal">
        <div
          v-show="canClose && currentModal"
          class="close"
          @click="onClickClose"
        >
          X
        </div>
        <!-- close button -->
        <!--modals-->
        <Import
          v-if="currentModal === 'import'"
          @closeModal="closeAnim"
        ></Import>
        <Export
          v-if="currentModal === 'export'"
          @closeModal="closeAnim"
        ></Export>
        <Card
                v-if="currentModal === 'card'"
                @closeModal="closeAnim"
        ></Card>
        <AdvancedSearch
                v-if="currentModal === 'search'"
                @closeModal="closeAnim"
        ></AdvancedSearch>
      </div>
      <div ref="loading" class="loading" v-show="isLoading && !isAnimating">
        <span>LOADING</span>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenLite, TimelineLite } from "gsap";
import { mapState } from "vuex";
import CONST from "src/utils/CONST";
import Import from "src/components/modals/Import.vue";
import Export from "src/components/modals/Export.vue";
import Card from "src/components/modals/Card.vue";
import AdvancedSearch from "src/components/modals/AdvancedSearch.vue";

const actualModalParams = {};

export default {
  name: "Modals",
  components: {
    Import,
    Export,
    Card,
    AdvancedSearch,
  },
  data() {
    return {
      isAnimating: false,
      timeline: null,
      currentModal: null
    };
  },
  computed: {
    ...mapState({
      modalName: state => state.modals.modalName,
      resolve: state => state.modals.resolve,
      reject: state => state.modals.reject,
      modalData: state => state.modals.modalData,
      size: state => state.modals.size,
      canClose: state => state.modals.canClose,
      blurBg: state => state.modals.blurBg,
      isLoading: state => state.modals.loading,
      position: state => state.modals.position
    })
  },
  watch: {
    isLoading(newValue) {
      if (newValue) {
        const timeline = new TimelineLite({ pause: true });
        timeline.add(TweenLite.to(this.$refs.modal, 0.2, { opacity: 0.2 }, 0));
        timeline.add(
          TweenLite.to(this.$refs.loading, 0.2, { opacity: 1 }, 0.1)
        );
        timeline.play();
      } else {
        const timeline = new TimelineLite({ pause: true });
        timeline.add(TweenLite.to(this.$refs.loading, 0.2, { opacity: 0 }, 0));
        timeline.add(TweenLite.to(this.$refs.modal, 0.2, { opacity: 1 }, 0.1));
        timeline.play();
      }
    },
    modalName(newValue) {
      if (this.isAnimating) throw new Error("Opening a modal when animating");
      if (newValue === actualModalParams.modalName) return;

      this.timeline = new TimelineLite({
        paused: true,
        onComplete: () => {
          this.isAnimating = false;
          this.currentModal = newValue;
          this.timeline = null;
          TweenLite.to(this.$refs.modal, 0.2, {
            opacity: 1
          });
        }
      });

      this.timeline.add(
        TweenLite.to(this.$refs.modal, 0.2, {
          opacity: 0,
          onComplete: () => {
            this.currentModal = null;
          }
        }),
        0
      );

      if (this.size !== actualModalParams.size) {
        this.height = Math.round(
          this.$refs.mainContainer.clientHeight *
            CONST.modals.sizeRatio[this.size].height
        );
        this.width = Math.round(
          this.$refs.mainContainer.clientWidth *
            CONST.modals.sizeRatio[this.size].width
        );
        this.timeline.add(
          TweenLite.to(this.$refs.mainAnim, 0.2, { height: this.height }),
          0.2
        );
        this.timeline.add(
          TweenLite.to(this.$refs.mainAnim, 0.2, { width: this.width }),
          0.4
        );
      }

      this.isAnimating = true;
      this.timeline.play();

      actualModalParams.size = this.size;
      actualModalParams.modalName = newValue;
      actualModalParams.canClose = this.canClose;
      actualModalParams.blurBg = this.blurBg;
    }
  },
  methods: {
    onClickMainContainer(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.isAnimating || !this.canClose) return;
      this.reject();
      this.closeAnim();
    },
    onClickMainAnim(e) {
      e.stopPropagation();
    },
    onClickClose() {
      this.reject();
      this.closeAnim();
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
            opacity: 1
          });
        }
      });
      this.timeline.add(
        TweenLite.to(this.$refs.mainAnim, 0.2, { opacity: 1 }),
        0
      );
      this.timeline.add(
        TweenLite.to(this.$refs.mainContainer, 0.2, {
          backgroundColor: "rgba(255,255,255,0.3)"
        }),
        0
      );
      this.timeline.add(
        TweenLite.to(this.$refs.mainAnim, 0.2, { height: this.height }),
        0.2
      );
      this.timeline.add(
        TweenLite.to(this.$refs.mainAnim, 0.2, { width: this.width }),
        0.4
      );
      this.isAnimating = true;
      this.timeline.play();
    },
    closeAnim() {
      if (this.isAnimating) return;

      this.timeline = new TimelineLite({
        paused: true,
        onComplete: () => {
          this.isAnimating = false;
          this.$store.commit("modals/close");
          this.timeline = null;
        }
      });

      this.timeline.add(TweenLite.to(this.$refs.modal, 0.2, { opacity: 0 }), 0);
      this.timeline.add(
        TweenLite.to(this.$refs.mainContainer, 0.2, {
          backgroundColor: "rgba(255,255,255,0)"
        })
      );
      this.timeline.add(
        TweenLite.to(this.$refs.mainAnim, 0.2, { width: 0 }),
        0.2
      );
      this.timeline.add(
        TweenLite.to(this.$refs.mainAnim, 0.2, { height: 0 }),
        0.4
      );
      this.timeline.add(
        TweenLite.to(this.$refs.mainAnim, 0.2, { opacity: 0 }),
        0.6
      );

      this.isAnimating = true;
      this.timeline.play();
    }
  },
  mounted() {
    this.height = Math.round(
      this.$refs.mainContainer.clientHeight *
        CONST.modals.sizeRatio[this.size].height
    );
    this.width = Math.round(
      this.$refs.mainContainer.clientWidth *
        CONST.modals.sizeRatio[this.size].width
    );

    this.openAnim();

    actualModalParams.size = this.size;
    actualModalParams.modalName = this.modalName;
    actualModalParams.canClose = this.canClose;
    actualModalParams.blurBg = this.blurBg;
  },
  beforeDestroy() {
    if (this.timeline) this.timeline.kill();
  }
};
</script>

<style lang="less">
.mainContainer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;

  .mainAnim {
    position: relative;
    padding: 10px;
    border-radius: 15px;
    border-width: 2px;
    border-color: white;
    border-style: solid;
    width: 0;
    height: 0;
    opacity: 0;
    background-color: rgba(100, 100, 100, 0.5);

    .loading {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      opacity: 0;

      > span {
        margin: auto;
      }
    }

    .modal {
      opacity: 0;
      height: 100%;
      overflow: hidden;

      .close {
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .container {
        display: flex;
        flex-direction: column;
        height: 100%;

        .modalHeader {
          height: 40px;
          border-bottom: 1px white solid;
          display: flex;

          .title {
            margin: auto;
          }
        }

        .modalBody {
          flex-grow: 1;
        }

        .modalFooter {
          height: 40px;
          border-top: 1px white solid;
          display: flex;

          .actions {
            flex-grow: 1;
            margin: auto;
            padding: 0 10px;
          }
        }
      }
    }
  }

  .mainAnim.center {
    margin: auto;
  }

  .mainAnim.menu {
    margin: auto auto auto 380px;
  }
}
</style>
