const DONT_PRINT = { key: 'DONT_PRINT', text: "Don't print", class: 'mtg_none' };
const BORDER_0 = { key: 'BORDER_0', text: 'no bord', w: 57, h: 82, class: 'mtg_0' };
const BORDER_1 = { key: 'BORDER_1', text: '1 mm bord', w: 59, h: 84, class: 'mtg_1' };
const BORDER_2 = { key: 'BORDER_2', text: '2 mm bord', w: 61, h: 86, class: 'mtg_2' };
const BORDER_3 = { key: 'BORDER_3', text: '3 mm bord', w: 63, h: 88, class: 'mtg_3' };

/*
 * page size 210 x 297
 * card size max 63 x 88
 * 63*3 = 189 / margin available 210 - 189 = 21
 * 88*3 = 264 / margin available 297 - 264 = 33
 * 4 spaces : bord space card space card space card space bord
 * padding-x = 20/4 = 5
 * padding-y = 32/4 = 8
 * X1 = 5 / X2 = 5+63+5=73 / X3 = 5+63+5+63+5=141
 * Y1 = 8 / Y2 = 8+88+8=104 / Y3 = 8+88+8+88+8=200
 */
const CARD_Y = 88;
const CARD_X = 63;
const PADDING_X = 5;
const PADDING_Y = 8;
const X1 = PADDING_X;
const X2 = 2 * PADDING_X + CARD_X;
const X3 = 3 * PADDING_X + 2 * CARD_X;
const Y1 = PADDING_Y;
const Y2 = 2 * PADDING_Y + CARD_Y;
const Y3 = 3 * PADDING_Y + 2 * CARD_Y;

const printConfig = {
  DONT_PRINT,
  BORDER_0,
  BORDER_1,
  BORDER_2,
  BORDER_3,
  PDF_POS: {
    0: { x: X1, y: Y1 },
    1: { x: X2, y: Y1 },
    2: { x: X3, y: Y1 },
    3: { x: X1, y: Y2 },
    4: { x: X2, y: Y2 },
    5: { x: X3, y: Y2 },
    6: { x: X1, y: Y3 },
    7: { x: X2, y: Y3 },
    8: { x: X3, y: Y3 },
  },
  list: [DONT_PRINT, BORDER_0, BORDER_1, BORDER_2, BORDER_3],
};

export default printConfig;
