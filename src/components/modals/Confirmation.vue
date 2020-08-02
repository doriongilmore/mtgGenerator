<template>
  <b-modal :id="modalId" size="sm" title="Warning" ref="modal" lazy>{{ text }}</b-modal>
</template>

<script>
import CONST from '../../utils/CONST';
import modalFactory from '../../mixins/modalFactory';

export default {
  name: 'Confirmation',
  mixins: [modalFactory],
  data() {
    return {
      eventData: CONST.modals.events.confirmation,
      modalId: 'modal-confirmation',
      text: 'Are you sure ?',
    };
  },
  mounted() {
    this.listenEvents(message => {
      if (message) {
        this.text = message;
      }
    });
  },
};
</script>

<style lang="less" scoped></style>
