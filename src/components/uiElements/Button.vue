<template>
  <div
    class="button"
    v-bind:class="{ disabled, bordered, hasText: !!this.$slots.default }"
    v-on:click.prevent="onClick"
    v-bind:title="title"
  >
    <span><slot></slot></span>
    <Display v-if="icon === 'display'" />
    <Download v-else-if="icon === 'download'" />
    <Next v-else-if="icon === 'next'" />
    <Playlist v-else-if="icon === 'playlist'" />
    <Previous v-else-if="icon === 'previous'" />
    <Search v-else-if="icon === 'search'" />
  </div>
</template>

<script>
import Display from "src/assets/icons/Display.vue";
import Download from "src/assets/icons/Download.vue";
import Next from "src/assets/icons/Next.vue";
import Playlist from "src/assets/icons/Playlist.vue";
import Previous from "src/assets/icons/Previous.vue";
import Search from "src/assets/icons/Search.vue";

export default {
  name: "Button",
  props: ["handleClick", "icon", "disabled", "bordered", "title"],
  components: {
    Display,
    Download,
    Next,
    Playlist,
    Previous,
    Search,
  },
  methods: {
    onClick() {
      if (!this.handleClick || !!this.disabled) return;
      this.handleClick();
    }
  }
};
</script>

<style lang="less" scoped>
.button {
  padding: 2px;

  height: 28px;
  display: flex;

  &.bordered {
    border: 1px black solid;
    border-radius: 5px;
  }
  &:not(.hasText) {
    width: 28px;
  }
  &.disabled {
    color: gray;
  }
  &:not(.disabled) {
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
      -webkit-box-shadow: inset 0 0 18px black;
      box-shadow: inset 0 0 18px black;
    }

    &:active {
      background-color: white;
      -webkit-box-shadow: unset;
      box-shadow: unset;
    }
  }

  span, svg {
    margin: auto
  }
  svg {
    width: 26px;
  }
}
</style>
