function simplifyCard({ id, name, set, deckQte, printConfig }) {
    return { id, name, set, deckQte, printConfig };
}
function simplifyList(list) {
    return list.list.map(simplifyCard);
}
function stringifyList(list) {
    return JSON.stringify({
        name: list.name,
        list: simplifyList(list)
    })
}

class DeckFactory {
    /**
     *
     * @param {[Deck]} decks
     * @returns {[Card]}
     */
    static getCards(decks) {
        const allCards = [];
        for (let i = 0, l = decks.length; i < l; i++) {
            const deck = decks[i];
            for (let i = 0, l = deck.lists.length; i < l; i++) {
                const cards = deck.lists[i].list;
                for (let i = 0, l = cards.length; i < l; i++) {
                    const card = cards[i];
                    if (!allCards.find(c => c.id === card.id)) {
                        allCards.push(card);
                    }
                }
            }
        }
        return allCards;
    }
    /**
     * reduce method to be executed on a DeckList.list
     * @param {Number} count - the acc param
     * @param {Card} card - the el param
     * @returns {Number}
     */
    static countCardByList(count, card) {
        return +card.deckQte + count;
    }
    /**
     * reduce method to be executed on a Deck.lists
     * @param {Number} totalCount - the acc param
     * @param {DeckList} list - the el param
     * @returns {Number}
     */
    static countCardByLists(totalCount, list) {
        return totalCount + list.list.reduce(DeckFactory.countCardByList, 0);
    }
    /**
     * @param {Deck} deck
     */
    static updateDeckCardCount(deck) {
        const [mainList, ...otherLists] = deck.lists;
        const mainCardCount = mainList.list.reduce(DeckFactory.countCardByList, 0);
        const otherCardCount = (otherLists || []).reduce(DeckFactory.countCardByLists, 0);
        deck.cardCount = `${mainCardCount} (+${otherCardCount})`;
    }
    /**
     * @param {Deck} deck
     */
    static updateDeckColors(deck) {
        const cards = DeckFactory.getCards([deck]);
        const colors = cards.reduce((col, card) => {
            for (let i = 0, l = card.color_identity.length; i < l; i++) {
                const color = `{${card.color_identity[i]}}`;
                if (!col.includes(color)) { col.push(color) }
            }
            return col;
        }, []);
        deck.colors = colors.join('');
    }
    /**
     * @returns {Deck}
     */
    static getDeckToCreate() {
        const now = new Date();
        return {
            id: now.getTime(),
            name: 'Default Deck Name',
            colors: '',
            cardCount: '0 (+0)',
            lists: [
                { name: 'Main List', list: [] }
            ],
            dateCreation: now,
            dateEdition: now,
        };
    }
    /**
     * @param {Deck} deckA
     * @param {Deck} deckB
     * @returns {boolean}
     */
    static areSameDeck(deckA, deckB) {
        if (!deckA || !deckB) { return false }
        const sameName = deckA.name === deckB.name;
        const sameCardCount = deckA.cardCount === deckB.cardCount;
        const sameColors = deckA.colors === deckB.colors;
        const sameListCount = deckA.lists.length === deckB.lists.length;
        const sameLists = sameListCount && deckA.lists.map(stringifyList).join('') === deckB.lists.map(stringifyList).join('');

        return sameName && sameCardCount && sameColors && sameLists;
    }
    /**
     * @param {DeckList} list
     * @returns {Array<Card>}
     */
    static simplifyList(list) {
        return simplifyList(list);
    }
}

export default DeckFactory;
