import CONST from "src/utils/CONST";
import ColorHash from "color-hash";

const colorHash = new ColorHash();

function getColorOptions(label, colorOptions) {
    if (colorOptions[label]) { return colorOptions[label] }
    const [r, g, b] = colorHash.rgb(label);
    return {
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
        borderColor: `rgba(${r}, ${g}, ${b}, 1)`,
    }
}

function getChartData(data, label, colorOptions = {}) {
    const byColorDataset = {
        label: label,
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
    };
    const byColor = {
        labels: [],
        datasets: [byColorDataset],
    };
    for (const [label, count] of Object.entries(data)) {
        const options = getColorOptions(label, colorOptions);
        byColor.labels.push(label);
        byColorDataset.data.push(count);
        byColorDataset.backgroundColor.push(options.backgroundColor);
        byColorDataset.borderColor.push(options.borderColor);
    }
    return byColor;
}
function getTypeKey(type_line) {
    const [type, subType] = type_line.split(' — ')
    const statType = type.toLowerCase().replace('legendary', '').trim();
    return statType;
}
function getColorKey(color_identity) {
    if (color_identity.length === 1) {
        return color_identity[0];
    }
    if (color_identity.length) {
        return 'M';
    }
    return 'I';
}

/**
 * @param {Deck} deck
*/
function getStats(deck) {
    const functionalityList = CONST.stats.functionalities;
    const byColor = {};
    const byCmc = {};
    const byType = {};
    const byFunctionality = {};
    for (let i = 0, l = deck.lists.length; i < l; i++) {
        const list = deck.lists[i];
        if (list.ignoreStat) { continue }
        const cards = list.list;
        for (let i = 0, l = cards.length; i < l; i++) {
            const card = cards[i];
            const colorKey = getColorKey(card.color_identity);
            const typeKey = getTypeKey(card.type_line);
            if (!byColor[colorKey]) { byColor[colorKey] = 0 }
            if (!byType[typeKey]) { byType[typeKey] = 0 }
            if (!byCmc[card.cmc]) { byCmc[card.cmc] = 0 }
            byColor[colorKey] += +card.deckQte;
            byType[typeKey] += +card.deckQte;
            byCmc[card.cmc] += +card.deckQte;
            const oracle = (card.oracle_text || '').toLowerCase();
            for (let i = 0, l = functionalityList.length; i < l; i++) {
                const search = functionalityList[i].search;
                const match = typeof search === "string"
                    ? oracle.includes(search)
                    : oracle.match(search);
                if (match) {
                    const functionalityKey = functionalityList[i].key;
                    if (!byFunctionality[functionalityKey]) { byFunctionality[functionalityKey] = 0 }
                    byFunctionality[functionalityKey] += +card.deckQte;
                }
            }
        }
    }
    return {
        byColor: getChartData(byColor, 'Color Repartition', CONST.stats.byColor),
        byType: getChartData(byType, 'Type Repartition'),
        byFunctionality: getChartData(byFunctionality, 'Functionality Repartition'),
        byCmc: getChartData(byCmc, 'Converted Mana Cost'),
    };
}
function getEmptyStats() {
    return {
        byColor: {},
        byType: {},
        byFunctionality: {},
        byCmc: {},
    }
}

export {
    getStats,
    getEmptyStats,
};
