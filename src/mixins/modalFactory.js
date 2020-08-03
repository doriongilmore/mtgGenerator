import CONST from '../utils/CONST';

export default {
  data() {
    return {
      eventConfig: null,
      modalId: null,
      modalDataToReturn: null,
    };
  },
  methods: {
    close(data) {
      this.modalDataToReturn = data;
      this.$refs.modal.hide(CONST.modals.closeReason.confirm);
    },
    listenEvents(cbOpen = () => {}) {
      if (!this.eventConfig || !this.modalId || !this.$refs.modal) {
        console.error('check your params', {
          cbOpen: cbOpen,
          'this.modalId': this.modalId,
          'this.eventConfig': this.eventConfig,
          'this.$refs.modal': this.$refs.modal,
        });
        throw new Error('wrong params to create a modal');
      }
      this.$root.$on(CONST.modals.events.vue.beforeHide, (bvEvent, modalId) => {
        if (modalId === this.modalId) {
          const event =
            bvEvent.trigger === CONST.modals.closeReason.confirm ? this.eventConfig.resolve : this.eventConfig.reject;
          console.info(this.modalId, 'closed by', bvEvent.trigger, event);
          this.$root.$emit(event, this.modalDataToReturn);
        }
      });

      this.$root.$on(this.eventConfig.open, data => {
        cbOpen(data);
        console.info(this.modalId, 'opened with', data);
        this.$refs.modal.show();
      });
    },
  },
};
