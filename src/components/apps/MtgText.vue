<script>
import Mana from 'src/components/uiElements/Mana.vue';
import CONST from '../../utils/CONST';

function addToRow(row, part) {
  if (Array.isArray(part)) {
    for (let j = 0, m = part.length; j < m; j++) {
      row.push(part[j]);
    }
  } else {
    row.push(part);
  }
}

export default {
  name: 'MtgText',
  props: ['text'],
  components: { Mana },
  render(createElement) {
    const domRows = [];
    for (let i = 0, l = this.rows.length; i < l; i++) {
      const domParts = [];
      for (let j = 0, m = this.rows[i].length; j < m; j++) {
        const part = this.rows[i][j];
        if (part && part.value) {
          const domPart = !part.isMana
            ? createElement('div', { class: 'mr-1' }, part.value)
            : createElement(Mana, { props: { manaCost: part.value } });
          domParts.push(domPart);
        }
      }
      domRows.push(createElement('span', { class: 'row' }, domParts));
    }

    return createElement('div', { class: 'mtgText' }, domRows);
  },
  computed: {
    rows() {
      const rows = [];
      const textRows = this.text.split('\n');
      for (let ri = 0, rl = textRows.length; ri < rl; ri++) {
        rows.push(this.getRow(textRows[ri]));
      }
      return rows;
    },
  },
  methods: {
    getRowPart(value, isMana) {
      return { value, isMana };
    },
    getTextParts(text) {
      const parts = [];
      const words = text.split(' ');
      for (let j = 0, m = words.length; j < m; j++) {
        parts.push(this.getRowPart(words[j], false));
      }
      return parts;
    },
    getRow(textRow) {
      const manas = [];
      const texts = textRow
        .replace(CONST.mana.generalRegexp, manaCost => {
          manas.push(manaCost);
          return CONST.mana.textSeparator;
        })
        .split(CONST.mana.textSeparator);
      const row = [];
      for (let i = 0, l = texts.length - 1; i < l; i++) {
        addToRow(row, this.getTextParts(texts[i]));
        addToRow(row, this.getRowPart(manas[i], true));
      }
      addToRow(row, this.getTextParts(texts[texts.length - 1]));
      return row;
    },
  },
};
</script>

<style lang="less" scoped>
.mtgText {
  .row {
    margin: 5px 0;
    width: 100%;
    white-space: pre-wrap;
    div {
      display: inline;
      div {
        display: inline;
      }
    }
  }
}
</style>
