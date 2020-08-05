<template>
  <b-modal :id="modalId" size="sm" title="Warning" ref="modal" lazy ok-variant="danger">{{ text }}</b-modal>
</template>

<script>
import CONST from '../../utils/CONST';
import modalFactory from '../../mixins/modalFactory';

export default {
  name: 'Confirmation',
  mixins: [modalFactory],
  mounted() {
    this.listenEvents(message => {
      if (message) {
        this.text = message;
      }
    });
  },
  data() {
    return {
      eventConfig: CONST.modals.events.confirmation,
      modalId: 'modal-confirmation',
      text: 'Are you sure ?',
    };
  },
};
</script>

<style lang="less" scoped></style>
