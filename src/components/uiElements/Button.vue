<template>
  <div
    class="button"
    v-bind:class="{ disabled, bordered, hasText: !!this.$slots.default }"
    v-on:click.prevent="onClick"
    v-bind:title="title"
  >
    <span><slot></slot></span>
    <Delete v-if="icon === 'delete'" />
    <Display v-if="icon === 'display'" />
    <Download v-else-if="icon === 'download'" />
    <Export v-else-if="icon === 'export'" />
    <Import v-else-if="icon === 'import'" />
    <Next v-else-if="icon === 'next'" />
    <Playlist v-else-if="icon === 'playlist'" />
    <Previous v-else-if="icon === 'previous'" />
    <Print v-if="icon === 'print'" />
    <Save v-if="icon === 'save'" />
    <Search v-else-if="icon === 'search'" />
  </div>
</template>

<script>
import Delete from "src/assets/icons/Delete.vue";
import Display from "src/assets/icons/Display.vue";
import Download from "src/assets/icons/Download.vue";
import Export from "src/assets/icons/Export.vue";
import Import from "src/assets/icons/Import.vue";
import Next from "src/assets/icons/Next.vue";
import Playlist from "src/assets/icons/Playlist.vue";
import Previous from "src/assets/icons/Previous.vue";
import Print from "src/assets/icons/Print.vue";
import Save from "src/assets/icons/Save.vue";
import Search from "src/assets/icons/Search.vue";

export default {
  name: "Button",
  props: ["handleClick", "icon", "disabled", "bordered", "title"],
  components: {
    Delete,
    Display,
    Download,
    Export,
    Import,
    Next,
    Playlist,
    Previous,
    Print,
    Save,
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
    height: 26px;
  }
}
</style>
