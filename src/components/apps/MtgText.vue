<script>
import Mana from 'src/components/uiElements/Mana.vue';
import CONST from '../../utils/CONST';

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
        const domPart = !part.isMana ? part.value : createElement(Mana, { props: { manaCost: part.value } });
        domParts.push(domPart);
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
        const row = [];
        const manas = [];
        const texts = textRows[ri]
          .replace(CONST.mana.generalRegexp, manaCost => {
            manas.push(manaCost);
            return CONST.mana.textSeparator;
          })
          .split(CONST.mana.textSeparator);
        for (let i = 0, l = texts.length - 1; i < l; i++) {
          row.push({ value: texts[i], isMana: false });
          row.push({ value: manas[i], isMana: true });
        }
        row.push({ value: texts[texts.length - 1], isMana: false });
        rows.push(row);
      }
      return rows;
    },
  },
};
</script>

<style lang="less" scoped></style>
