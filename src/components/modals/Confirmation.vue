<template>
  <b-modal :id="modalId" size="sm" title="Warning" ref="modal" lazy>{{ text }}</b-modal>
</template>

<script>
import CONST from '../../utils/CONST';

export default {
  name: 'Confirmation',
  data() {
    return {
      modalId: 'modal-confirmation',
      text: 'Are you sure ?',
    };
  },
  mounted() {
    this.$root.$on(CONST.modals.events.vue.beforeHide, (bvEvent, modalId) => {
      if (modalId === this.modalId) {
        const event =
          bvEvent.trigger === CONST.modals.closeReason.confirm
            ? CONST.modals.events.confirmation.resolve
            : CONST.modals.events.confirmation.reject;
        console.info(this.modalId, 'closed by', bvEvent.trigger, event);
        this.$root.$emit(event);
      }
    });

    this.$root.$on(CONST.modals.events.confirmation.open, message => {
      if (message) {
        this.text = message;
      }
      console.info(this.modalId, 'opened');
      this.$refs.modal.show();
    });
  },
};
</script>

<style lang="less" scoped></style>
