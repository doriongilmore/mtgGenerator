import CONST from '../utils/CONST';

export default {
  data() {
    return {
      eventData: null,
      modalId: null,
    };
  },
  methods: {
    listenEvents(cbOpen = () => {}) {
      if (!this.eventData || !this.modalId || !this.$refs.modal) {
        console.error('check your params', {
          cbOpen: cbOpen,
          'this.modalId': this.modalId,
          'this.eventData': this.eventData,
          'this.$refs.modal': this.$refs.modal,
        });
        throw new Error('wrong params to create a modal');
      }
      this.$root.$on(CONST.modals.events.vue.beforeHide, (bvEvent, modalId) => {
        if (modalId === this.modalId) {
          const event =
            bvEvent.trigger === CONST.modals.closeReason.confirm ? this.eventData.resolve : this.eventData.reject;
          console.info(this.modalId, 'closed by', bvEvent.trigger, event);
          this.$root.$emit(event);
        }
      });

      this.$root.$on(this.eventData.open, data => {
        cbOpen(data);
        console.info(this.modalId, 'opened with', data);
        this.$refs.modal.show();
      });
    },
  },
};
