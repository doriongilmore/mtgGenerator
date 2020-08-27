<template>
  <div class="container h-100 m-2">
    <div class="row row-cols-3 h-75">
      <div class="col mb-2" v-for="(item, index) in list" :key="item.name">
        <div
          @click="e => onCheckBoxClick(e, index)"
          :class="`card h-100 w-100 ${item.selected ? 'border-primary' : 'border-light'}`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
const SHIFT_KEY_CODE = 16;
const CTRL_KEY_CODE = 17;

let cpt = 0;
class Item {
  constructor() {
    this.id = cpt++;
    this.name = `Item-${this.id}`;
    this.selected = false;
  }
}

export default {
  name: 'Poc',
  data() {
    return {
      list: [new Item(), new Item(), new Item(), new Item(), new Item(), new Item(), new Item()],
      lastClicked: null,
      shiftEnabled: false,
      ctrlEnabled: false,
    };
  },
  methods: {
    onCheckBoxClick(event, targetIndex) {
      const resetSelected = !this.ctrlEnabled;
      const delta = this.lastClicked === null || !this.shiftEnabled ? 0 : targetIndex - this.lastClicked;
      for (let i = 0, l = this.list.length; i < l; i++) {
        const item = this.list[i];
        let newValue = resetSelected ? false : item.selected;

        if (delta < 0 && targetIndex <= i && i <= this.lastClicked) {
          newValue = true;
        } else if (delta > 0 && this.lastClicked <= i && i <= targetIndex) {
          newValue = true;
        } else if (i === targetIndex) {
          newValue = !this.ctrlEnabled && !this.shiftEnabled ? true : !item.selected;
        }
        item.selected = newValue;
      }
      if (this.lastClicked === null || this.ctrlEnabled || !this.shiftEnabled) {
        this.lastClicked = targetIndex;
      }
    },
    listenKeyDown(event) {
      if (event.keyCode === SHIFT_KEY_CODE) {
        this.shiftEnabled = true;
      } else if (event.keyCode === CTRL_KEY_CODE) {
        this.ctrlEnabled = true;
      }
    },
    listenKeyUp(event) {
      if (event.keyCode === SHIFT_KEY_CODE) {
        this.shiftEnabled = false;
      } else if (event.keyCode === CTRL_KEY_CODE) {
        this.ctrlEnabled = false;
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.listenKeyDown.bind(this));
    window.addEventListener('keyup', this.listenKeyUp.bind(this));
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.listenKeyDown.bind(this));
    window.removeEventListener('keyup', this.listenKeyUp.bind(this));
  },
};
</script>

<style lang="less" scoped></style>
