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
    openLogin(context) {
      console.group('openLogin');
      return new Promise((resolve, reject) => {
        context.commit("open", {
          modalName: "login",
          canClose: false,
          resolve,
          reject
        });
      }).then(console.groupEnd)
          .catch(console.groupEnd);
    },
    openResetPassword(context) {
      console.group('openResetPassword');
      return new Promise((resolve, reject) => {
        context.commit("open", {
          modalName: "resetPassword",
          canClose: false,
          resolve,
          reject
        });
      }).then(console.groupEnd)
          .catch(console.groupEnd);
    },
    openChangePassword(context) {
      console.group('openChangePassword');
      return new Promise((resolve, reject) => {
        context.commit("open", {
          modalName: "changePassword",
          canClose: true,
          resolve,
          reject
        });
      }).then(console.groupEnd)
          .catch(console.groupEnd);
    },
    openEditUser(context, modalData) {
      console.group('openEditUser');
      return new Promise((resolve, reject) => {
        context.commit("open", {
          modalName: "editUser",
          canClose: true,
          modalData,
          resolve,
          reject
        });
      }).then(console.groupEnd)
          .catch(console.groupEnd);
    },
    openDisplayFile(context, modalData) {
      console.group('openDisplayFile');
      return new Promise((resolve, reject) => {
        context.commit("open", {
          modalName: "displayFile",
          canClose: true,
          size: "small",
          modalData,
          resolve,
          reject
        });
      }).then(console.groupEnd)
          .catch(console.groupEnd);
    },
    openPlaylist(context) {
      const action = context.state.open ? 'close': 'open';
      let finalFn = Function.prototype;
      if (action === 'open') {
        finalFn = console.groupEnd;
        console.group('openPlaylist');
      }
      return new Promise((resolve, reject) => {
        context.commit(action, {
          modalName: "playlist",
          canClose: true,
          // position:'menu',
          resolve,
          reject
        });
      }).then(finalFn).catch(finalFn);
    }
  }
};
