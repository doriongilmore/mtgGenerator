/**
 * shouldCheck true if too many results for a language search
 * too many could be > 175 (one result page), but actually 1, 2, or >10k results, so simple decision
 *
 * @link https://scryfall.com/docs/api/languages
 */
const any = { key: 'any', value: 'All', shouldCheck: true };
const en = { key: 'en', value: 'English', shouldCheck: true };
const fr = { key: 'fr', value: 'French', shouldCheck: true };
const es = { key: 'es', value: 'Spanish', shouldCheck: true };
const de = { key: 'de', value: 'German', shouldCheck: true };
const it = { key: 'it', value: 'Italian', shouldCheck: true };
const pt = { key: 'pt', value: 'Portuguese', shouldCheck: true };
const ja = { key: 'ja', value: 'Japanese', shouldCheck: true };
const ko = { key: 'ko', value: 'Korean', shouldCheck: true };
const ru = { key: 'ru', value: 'Russian', shouldCheck: true };
const zhs = { key: 'zhs', value: 'Simplified Chinese', shouldCheck: true };
const zht = { key: 'zht', value: 'Traditional Chinese', shouldCheck: true };
const he = { key: 'he', value: 'Hebrew' };
const la = { key: 'la', value: 'Latin' };
const grc = { key: 'grc', value: 'Ancient Greek' };
const ar = { key: 'ar', value: 'Arabic' };
const sa = { key: 'sa', value: 'Sanskrit' };
const ph = { key: 'ph', value: 'Phyrexian' };

const BLANK_STRING = '';
const EXACT_KEY = ':';
const BLANK_ARRAY = [];

const search = {
  getDefaultState(language = en) {
    return {
      exact: false,
      name: BLANK_STRING,
      lang: language.key,
      texts: [...BLANK_ARRAY],
      colorInclusion: EXACT_KEY,
      colors: [...BLANK_ARRAY],
      cmcInclusion: EXACT_KEY,
      cmc: BLANK_STRING,
      rarityInclusion: EXACT_KEY,
      rarity: BLANK_STRING,
      typeInclusion: EXACT_KEY,
      types: [...BLANK_ARRAY],
      results: [...BLANK_ARRAY],
      resultByPage: 25,
      pageIndex: 0,
    };
  },
  inclusion: [
    { key: EXACT_KEY, value: 'Exact' },
    { key: '>=', value: 'At least' },
    { key: '<=', value: 'At most' },
  ],
  lang: {
    any,
    en,
    fr,
    es,
    de,
    it,
    pt,
    ja,
    ko,
    ru,
    zhs,
    zht,
    he,
    la,
    grc,
    ar,
    sa,
    ph,
    list: [any, en, fr, es, de, it, pt, ja, ko, ru, zhs, zht, he, la, grc, ar, sa, ph],
  },
  colorList: [
    { key: 'b', value: '{B}' },
    { key: 'u', value: '{U}' },
    { key: 'g', value: '{G}' },
    { key: 'r', value: '{R}' },
    { key: 'w', value: '{W}' },
  ],
  rarityList: [
    { key: 'common', value: 'common' },
    { key: 'uncommon', value: 'uncommon' },
    { key: 'rare', value: 'rare' },
    { key: 'mythic', value: 'mythic' },
  ],
  typeList: [
    { key: 'Token', value: 'Token' },
    { key: 'Legendary', value: 'Legendary' },

    { key: 'Artifact', value: 'Artifact' },
    { key: 'Creature', value: 'Creature' },
    { key: 'Enchantment', value: 'Enchantment' },
    { key: 'Land', value: 'Land' },
    { key: 'Planeswalker', value: 'Planeswalker' },
    { key: 'Instant', value: 'Instant' },
    { key: 'Ritual', value: 'Ritual' },

    { key: 'Artifact-types', uri: 'https://api.scryfall.com/catalog/artifact-types' },
    { key: 'Creature-types', uri: 'https://api.scryfall.com/catalog/creature-types' },
    { key: 'Enchantment-types', uri: 'https://api.scryfall.com/catalog/enchantment-types' },
    { key: 'Land-types', uri: 'https://api.scryfall.com/catalog/land-types' },
    { key: 'Planeswalker-types', uri: 'https://api.scryfall.com/catalog/planeswalker-types' },
    { key: 'Spell-types', uri: 'https://api.scryfall.com/catalog/spell-types' },
  ],
};

export default search;
