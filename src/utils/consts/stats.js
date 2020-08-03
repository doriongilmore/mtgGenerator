const stats = {
  defaultOptions: {
    yBeginAtZero: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
  },
  functionalities: [
    { search: 'draw', key: 'draw' },
    { search: 'token', key: 'token' },
    { search: 'search', key: 'fetch' },
    { search: 'add {', key: 'mana' },
    { search: 'mana', key: 'mana' },
    { search: 'at the beginning of', key: 'process' },
    { search: 'at the end of', key: 'process' },
    { search: 'when this', key: 'process' },
    { search: 'lifelink', key: 'life' },
    { search: /gains? ?[X\d]* life/, key: 'life' },
    { search: 'tap target', key: 'control' },
    { search: 'extra turn', key: 'control' },
    { search: 'return target', key: 'control' },
    { search: 'destroy target', key: 'control' },
  ],
  byCmc: {
    default: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6+': 0,
      '10+': 0,
    },
    moreThan10: '10+',
    moreThan6: '6+',
  },
  byColor: {
    I: {
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      borderColor: 'rgba(100, 100, 100, 1)',
    },
    M: {
      backgroundColor: 'rgba(191, 153, 36, 0.5)',
      borderColor: 'rgba(191, 153, 36, 1)',
    },
    U: {
      backgroundColor: 'rgba(24, 113, 170, 0.5)',
      borderColor: 'rgba(24, 113, 170, 1)',
    },
    G: {
      backgroundColor: 'rgba(71, 173, 25, 0.5)',
      borderColor: 'rgba(71, 173, 25, 1)',
    },
    B: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: 'rgba(0, 0, 0, 1)',
    },
    W: {
      backgroundColor: 'rgba(255, 255, 200, 0.5)',
      borderColor: 'rgba(255, 255, 200, 1)',
    },
    R: {
      backgroundColor: 'rgba(189, 0, 0, 0.5)',
      borderColor: 'rgba(189, 0, 0, 1)',
    },
  },
};

export default stats;
