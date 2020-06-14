import { CONST } from 'src/utils/CONST';

class DeckFactory {

    static getDeckToCreate() {
        const deck = window.localStorage.getItem(CONST.storageKeys.tmpDeck);
        const now = new Date();
        return deck ? deck : {
            id: now.getTime(),
            name: 'Default Deck Name',
            colors: '{}',
            cardCount: 0,
            lists: [
                { name: 'Main List', list: [] }
            ],
            dateCreation: now,
            dateEdition: now,
        };
    }
}

export default DeckFactory;
