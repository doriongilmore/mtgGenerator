<template>
  <div
    class="roundedButton"
    v-bind:class="{ disabled, active }"
    v-on:click.prevent="handleClick"
    v-bind:title="title"
  >
    <Delete v-if="icon === 'delete'" />
    <Display v-if="icon === 'display'" />
    <Download v-else-if="icon === 'download'" />
    <Export v-else-if="icon === 'export'" />
    <Import v-else-if="icon === 'import'" />
    <Info v-else-if="icon === 'info'" />
    <Plus v-else-if="icon === 'add'" />
    <Print v-if="icon === 'print'" />
    <Save v-if="icon === 'save'" />
    <Search v-else-if="icon === 'search'" />
    <span><slot>{{text}}</slot></span>
  </div>
</template>

<script>
import Delete from "src/assets/icons/Delete.vue";
import Display from "src/assets/icons/Display.vue";
import Download from "src/assets/icons/Download.vue";
import Export from "src/assets/icons/Export.vue";
import Import from "src/assets/icons/Import.vue";
import Info from "src/assets/icons/Info.vue";
import Plus from "src/assets/icons/Plus.vue";
import Print from "src/assets/icons/Print.vue";
import Save from "src/assets/icons/Save.vue";
import Search from "src/assets/icons/Search.vue";

export default {
  name: "RoundedButton",
  props: ["handleClick", "icon", "text", "disabled", "active", "title"],
  components: {
    Delete,
    Display,
    Download,
    Export,
    Import,
    Info,
    Plus,
    Print,
    Save,
    Search,
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
