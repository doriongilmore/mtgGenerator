import CONST from '../utils/CONST';
import { mapState } from 'vuex';

const settingsFavoriteDisplay = CONST.settings.favoriteDisplay;

export default {
  data() {
    return {
      chosenDisplay: null,
      settingsFavoriteDisplay,
    };
  },
  computed: {
    ...mapState({
      favoriteDisplay: state => state.settings.global.favoriteDisplay,
    }),
    cardDisplay() {
      return this.chosenDisplay ? this.chosenDisplay : this.favoriteDisplay;
    },
  },
  methods: {
    toggleDisplay() {
      let newDisplay = settingsFavoriteDisplay.basic.key;
      if (this.cardDisplay === settingsFavoriteDisplay.basic.key) {
        newDisplay = settingsFavoriteDisplay.detailed.key;
      } else if (this.cardDisplay === settingsFavoriteDisplay.detailed.key) {
        newDisplay = settingsFavoriteDisplay.complete.key;
      }
      this.chosenDisplay = newDisplay;
    },
  },
};
