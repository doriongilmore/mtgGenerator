<template>
  <div
    class="roundedButton"
    v-bind:class="{ disabled, active }"
    v-on:click.prevent="handleClick"
    v-bind:title="title"
  >
    <slot></slot>
    <Display v-if="icon === 'display'" />
    <Download v-else-if="icon === 'download'" />
    <Next v-else-if="icon === 'next'" />
    <Playlist v-else-if="icon === 'playlist'" />
    <Previous v-else-if="icon === 'previous'" />
  </div>
</template>

<script>
import Display from "src/assets/icons/Display.vue";
import Download from "src/assets/icons/Download.vue";
import Next from "src/assets/icons/Next.vue";
import Playlist from "src/assets/icons/Playlist.vue";
import Previous from "src/assets/icons/Previous.vue";

export default {
  name: "RoundedButton",
  props: ["handleClick", "icon", "disabled", "active", "title"],
  components: {
    Display,
    Download,
    Next,
    Playlist,
    Previous,
  }
};
</script>

<style lang="less" scoped>
.roundedButton {
  border: 1px black solid;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;

  svg {
    width: 30px;
    margin: auto;
  }
}

.roundedButton.disabled {
  color: gray;
}

.roundedButton.active {
  color: DarkSeaGreen;
}

.roundedButton:not(.disabled) {
  cursor: pointer;

  &:hover {
    background-image: radial-gradient(circle, white, black);
    cursor: pointer;
  }

  &:active {
    background-image: unset;
    background-color: white;
  }
}
</style>
