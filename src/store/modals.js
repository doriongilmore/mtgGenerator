export const modals = {
  namespaced: true,
  state: {
    //add modal options ?
    modalName: null,
    modalData: null,
    resolve: null, //NIM
    reject: null, //NIM
    size: "small",
    canClose: true,
    blurBg: true,
    open: false,
    loading: false,
    position: 'center'
  },
  getters: {},
  mutations: {
    open(state, payload) {
      if (!payload.modalName || !payload.resolve || !payload.reject) {
        throw new Error(
          "wrong modals params :\n" + JSON.stringify(payload, null, 4)
        );
      }
      state.modalData = payload.modalData;
      state.modalName = payload.modalName;
      state.resolve = payload.resolve;
      state.reject = payload.reject;

      state.size = payload.size || "small";
      state.canClose = payload.canClose !== false;
      state.blurBg = payload.blurBg || true;
      state.loading = false;
      state.open = true;
      state.position = payload.position || 'center';
    },
    close(state) {
      state.open = false;
      state.resolve();
    },
    setLoading(state, loading) {
      state.loading = !!loading;
    }
  },
  actions: {
    openImport(context, modalData) {
      console.group('openImport');
      return new Promise((resolve, reject) => {
        context.commit("open", {
          modalName: "import",
          canClose: true,
          modalData,
          resolve,
          reject
        });
      }).then(console.groupEnd).catch(console.groupEnd);
    },
    openExport(context, modalData) {
      console.group('openExport');
      return new Promise((resolve, reject) => {
        context.commit("open", {
          modalName: "export",
          canClose: true,
          modalData,
          resolve,
          reject
        });
      }).then(console.groupEnd).catch(console.groupEnd);
    },
  }
};
