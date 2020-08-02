const generalRegexp = /{[\dTQXSWEICBUGR/]+}/gi;
const cleanRegexp = /[\dTQXSWEICBUGR/]/gi;
/**
 *  @see https://api.scryfall.com/symbology?pretty=true
 *  svg_uri -> uri
 *  english -> label
 */
const symbology = [
  {
    symbol: '{T}',
    uri: 'https://img.scryfall.com/symbology/T.svg',
    label: 'tap this permanent',
  },
  {
    symbol: '{Q}',
    uri: 'https://img.scryfall.com/symbology/Q.svg',
    label: 'untap this permanent',
  },
  {
    symbol: '{E}',
    uri: 'https://img.scryfall.com/symbology/E.svg',
    label: 'an energy counter',
  },
  {
    symbol: '{PW}',
    uri: 'https://img.scryfall.com/symbology/PW.svg',
    label: 'planeswalker',
  },
  {
    symbol: '{CHAOS}',
    uri: 'https://img.scryfall.com/symbology/CHAOS.svg',
    label: 'chaos',
  },
  {
    symbol: '{A}',
    uri: 'https://img.scryfall.com/symbology/A.svg',
    label: 'an acorn counter',
  },
  {
    symbol: '{X}',
    uri: 'https://img.scryfall.com/symbology/X.svg',
    label: 'X generic mana',
  },
  {
    symbol: '{Y}',
    uri: 'https://img.scryfall.com/symbology/Y.svg',
    label: 'Y generic mana',
  },
  {
    symbol: '{Z}',
    uri: 'https://img.scryfall.com/symbology/Z.svg',
    label: 'Z generic mana',
  },
  {
    symbol: '{0}',
    uri: 'https://img.scryfall.com/symbology/0.svg',
    label: 'zero mana',
  },
  {
    symbol: '{½}',
    uri: 'https://img.scryfall.com/symbology/HALF.svg',
    label: 'one-half generic mana',
  },
  {
    symbol: '{1}',
    uri: 'https://img.scryfall.com/symbology/1.svg',
    label: 'one generic mana',
  },
  {
    symbol: '{2}',
    uri: 'https://img.scryfall.com/symbology/2.svg',
    label: 'two generic mana',
  },
  {
    symbol: '{3}',
    uri: 'https://img.scryfall.com/symbology/3.svg',
    label: 'three generic mana',
  },
  {
    symbol: '{4}',
    uri: 'https://img.scryfall.com/symbology/4.svg',
    label: 'four generic mana',
  },
  {
    symbol: '{5}',
    uri: 'https://img.scryfall.com/symbology/5.svg',
    label: 'five generic mana',
  },
  {
    symbol: '{6}',
    uri: 'https://img.scryfall.com/symbology/6.svg',
    label: 'six generic mana',
  },
  {
    symbol: '{7}',
    uri: 'https://img.scryfall.com/symbology/7.svg',
    label: 'seven generic mana',
  },
  {
    symbol: '{8}',
    uri: 'https://img.scryfall.com/symbology/8.svg',
    label: 'eight generic mana',
  },
  {
    symbol: '{9}',
    uri: 'https://img.scryfall.com/symbology/9.svg',
    label: 'nine generic mana',
  },
  {
    symbol: '{10}',
    uri: 'https://img.scryfall.com/symbology/10.svg',
    label: 'ten generic mana',
  },
  {
    symbol: '{11}',
    uri: 'https://img.scryfall.com/symbology/11.svg',
    label: 'eleven generic mana',
  },
  {
    symbol: '{12}',
    uri: 'https://img.scryfall.com/symbology/12.svg',
    label: 'twelve generic mana',
  },
  {
    symbol: '{13}',
    uri: 'https://img.scryfall.com/symbology/13.svg',
    label: 'thirteen generic mana',
  },
  {
    symbol: '{14}',
    uri: 'https://img.scryfall.com/symbology/14.svg',
    label: 'fourteen generic mana',
  },
  {
    symbol: '{15}',
    uri: 'https://img.scryfall.com/symbology/15.svg',
    label: 'fifteen generic mana',
  },
  {
    symbol: '{16}',
    uri: 'https://img.scryfall.com/symbology/16.svg',
    label: 'sixteen generic mana',
  },
  {
    symbol: '{17}',
    uri: 'https://img.scryfall.com/symbology/17.svg',
    label: 'seventeen generic mana',
  },
  {
    symbol: '{18}',
    uri: 'https://img.scryfall.com/symbology/18.svg',
    label: 'eighteen generic mana',
  },
  {
    symbol: '{19}',
    uri: 'https://img.scryfall.com/symbology/19.svg',
    label: 'nineteen generic mana',
  },
  {
    symbol: '{20}',
    uri: 'https://img.scryfall.com/symbology/20.svg',
    label: 'twenty generic mana',
  },
  {
    symbol: '{100}',
    uri: 'https://img.scryfall.com/symbology/100.svg',
    label: 'one hundred generic mana',
  },
  {
    symbol: '{1000000}',
    uri: 'https://img.scryfall.com/symbology/1000000.svg',
    label: 'one million generic mana',
  },
  {
    symbol: '{∞}',
    uri: 'https://img.scryfall.com/symbology/INFINITY.svg',
    label: 'infinite generic mana',
  },
  {
    symbol: '{W/U}',
    uri: 'https://img.scryfall.com/symbology/WU.svg',
    label: 'one white or blue mana',
  },
  {
    symbol: '{W/B}',
    uri: 'https://img.scryfall.com/symbology/WB.svg',
    label: 'one white or black mana',
  },
  {
    symbol: '{B/R}',
    uri: 'https://img.scryfall.com/symbology/BR.svg',
    label: 'one black or red mana',
  },
  {
    symbol: '{B/G}',
    uri: 'https://img.scryfall.com/symbology/BG.svg',
    label: 'one black or green mana',
  },
  {
    symbol: '{U/B}',
    uri: 'https://img.scryfall.com/symbology/UB.svg',
    label: 'one blue or black mana',
  },
  {
    symbol: '{U/R}',
    uri: 'https://img.scryfall.com/symbology/UR.svg',
    label: 'one blue or red mana',
  },
  {
    symbol: '{R/G}',
    uri: 'https://img.scryfall.com/symbology/RG.svg',
    label: 'one red or green mana',
  },
  {
    symbol: '{R/W}',
    uri: 'https://img.scryfall.com/symbology/RW.svg',
    label: 'one red or white mana',
  },
  {
    symbol: '{G/W}',
    uri: 'https://img.scryfall.com/symbology/GW.svg',
    label: 'one green or white mana',
  },
  {
    symbol: '{G/U}',
    uri: 'https://img.scryfall.com/symbology/GU.svg',
    label: 'one green or blue mana',
  },
  {
    symbol: '{2/W}',
    uri: 'https://img.scryfall.com/symbology/2W.svg',
    label: 'two generic mana or one white mana',
  },
  {
    symbol: '{2/U}',
    uri: 'https://img.scryfall.com/symbology/2U.svg',
    label: 'two generic mana or one blue mana',
  },
  {
    symbol: '{2/B}',
    uri: 'https://img.scryfall.com/symbology/2B.svg',
    label: 'two generic mana or one black mana',
  },
  {
    symbol: '{2/R}',
    uri: 'https://img.scryfall.com/symbology/2R.svg',
    label: 'two generic mana or one red mana',
  },
  {
    symbol: '{2/G}',
    uri: 'https://img.scryfall.com/symbology/2G.svg',
    label: 'two generic mana or one green mana',
  },
  {
    symbol: '{P}',
    uri: 'https://img.scryfall.com/symbology/P.svg',
    label: 'one colored mana or two life',
  },
  {
    symbol: '{W/P}',
    uri: 'https://img.scryfall.com/symbology/WP.svg',
    label: 'one white mana or two life',
  },
  {
    symbol: '{U/P}',
    uri: 'https://img.scryfall.com/symbology/UP.svg',
    label: 'one blue mana or two life',
  },
  {
    symbol: '{B/P}',
    uri: 'https://img.scryfall.com/symbology/BP.svg',
    label: 'one black mana or two life',
  },
  {
    symbol: '{R/P}',
    uri: 'https://img.scryfall.com/symbology/RP.svg',
    label: 'one red mana or two life',
  },
  {
    symbol: '{G/P}',
    uri: 'https://img.scryfall.com/symbology/GP.svg',
    label: 'one green mana or two life',
  },
  {
    symbol: '{HW}',
    uri: 'https://img.scryfall.com/symbology/HW.svg',
    label: 'one-half white mana',
  },
  {
    symbol: '{HR}',
    uri: 'https://img.scryfall.com/symbology/HR.svg',
    label: 'one-half red mana',
  },
  {
    symbol: '{W}',
    uri: 'https://img.scryfall.com/symbology/W.svg',
    label: 'one white mana',
  },
  {
    symbol: '{U}',
    uri: 'https://img.scryfall.com/symbology/U.svg',
    label: 'one blue mana',
  },
  {
    symbol: '{B}',
    uri: 'https://img.scryfall.com/symbology/B.svg',
    label: 'one black mana',
  },
  {
    symbol: '{R}',
    uri: 'https://img.scryfall.com/symbology/R.svg',
    label: 'one red mana',
  },
  {
    symbol: '{G}',
    uri: 'https://img.scryfall.com/symbology/G.svg',
    label: 'one green mana',
  },
  {
    symbol: '{C}',
    uri: 'https://img.scryfall.com/symbology/C.svg',
    label: 'one colorless mana',
  },
  {
    symbol: '{S}',
    uri: 'https://img.scryfall.com/symbology/S.svg',
    label: 'one snow mana',
  },
];

const mana = {
  textSeparator: ' /// ',
  cleanRegexp,
  generalRegexp,
  symbology,
};

export default mana;
