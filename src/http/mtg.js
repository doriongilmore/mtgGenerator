const scryfall = require('scryfall-sdk');

export default class APIMtg {
    /**
     * @param {String} search
     * @return {Promise<string[]>}
     */
    static async autocomplete(search) {
        try {
            return await scryfall.Cards.autoCompleteName(search);
        } catch (e) {
            console.error('autocomplete', e);
            return [];
        }
    }
    /**
     * @param {String} id
     * @return {Promise<Card|null>}
     */
    static async findCardById(id) {
        try {
            return await scryfall.Cards.byId(id);
        } catch (e) {
            console.error('findCardById', e);
            return null;
        }
    }
    /**
     * @param {String} cardName
     * @return {Promise<Card|null>}
     */
    static async findCardByName(cardName) {
        try {
            return await scryfall.Cards.byName(cardName);
        } catch (e) {
            console.error('findCardByName', e);
            return null;
        }
    }

    /**
     * @param {Card} args partial card with wanted subtype or text for example
     * @return {Promise<Card[]>}
     */
    static async findCardsBy(args) {
        try {
            // todo build query based on args see https://scryfall.com/docs/syntax
            const query = '';
            return await scryfall.Cards.query(query);
        } catch (e) {
            console.error('findCardBy', e);
            return [];
        }
    }

}
