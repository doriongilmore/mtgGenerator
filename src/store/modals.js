export const modals = {
  namespaced: true,
  state: {
    //add modal options ?
    noAnimation: false,
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
      state.noAnimation = !!payload.noAnimation;
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
    openImport({ commit }, modalData) {
      console.group('openImport');
      return new Promise((resolve, reject) => {
        commit("open", {
          modalName: "import",
          canClose: true,
          modalData,
          resolve,
          reject
        });
      }).then((res) => {
        console.groupEnd();
        commit("close");
        return res;
      }).catch(console.groupEnd);
    },
    openExport({ commit }, modalData) {
      console.group('openExport');
      return new Promise((resolve, reject) => {
        commit("open", {
          modalName: "export",
          canClose: true,
          modalData,
          resolve,
          reject
        });
      }).then(console.groupEnd).catch(console.groupEnd);
    },
    openCard({ commit }, modalData) {
      console.group('openCard');
      return new Promise((resolve, reject) => {
        commit("open", {
          modalName: "card",
          canClose: true,
          size: 'large',
          modalData,
          resolve,
          reject
        });
      }).then(console.groupEnd).catch(console.groupEnd);
    },
    openFeature({ commit }, modalData) {
      console.group('openFeature');
      return new Promise((resolve, reject) => {
        commit("open", {
          modalName: "feature",
          noAnimation: true,
          canClose: true,
          size: 'medium',
          modalData,
          resolve,
          reject,
        });
      }).then(console.groupEnd).catch(console.groupEnd);
    },
    openConfirmation({ commit }, modalData) {
      console.group('openConfirmation');
      return new Promise((resolve, reject) => {
        commit("open", {
          modalName: "confirm",
          canClose: true,
          size: 'small',
          modalData,
          resolve,
          reject
        });
      }).then(() => {
        console.groupEnd();
        commit("close");
        return Promise.resolve();
      }).catch(() => {
        console.groupEnd();
        commit("close");
        return Promise.reject();
      });
    },
    openSearch({ commit }, modalData) {
      console.group('openSearch');
      return new Promise((resolve, reject) => {
        commit("open", {
          modalName: "search",
          canClose: true,
          size: 'medium',
          modalData,
          resolve,
          reject
        });
      }).then(() => {
        console.groupEnd();
        commit("close");
      }).catch(console.groupEnd);
    },
  }
};
