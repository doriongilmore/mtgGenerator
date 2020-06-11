const mtg = require('mtgsdk');

export class APIMtg {
    /**
     *  @typedef Card
     *  @property {string} id
     *  @property {string} name
     *  @property {string} manaCost
     *  @property {string} cmc
     *  @property {string} colors
     *  @property {string} colorIdentity
     *  @property {string} type
     *  @property {string} originalType
     *  @property {string} supertypes
     *  @property {string} types
     *  @property {string} subtypes
     *  @property {string} rarity
     *  @property {string} set
     *  @property {string} setName
     *  @property {string} text
     *  @property {string} originalText
     *  @property {string} artist
     *  @property {string} number
     *  @property {string} layout
     *  @property {string} multiverseid
     *  @property {string} imageUrl
     *  @property {string} rulings
     *  @property {string} foreignNames
     *  @property {string} printings
     *  @property {string} legalities
     *  @property {string} flavor
     *  @property {string} power
     *  @property {string} toughness
     *  @property {string} variations
     *  @property {string} names
     *  @property {string} reserved
     *  @property {string} source
     */
    /**
     *  @typedef Set
     *  @property {string} code
     *  @property {string} name
     *  @property {string} type
     *  @property {string} booster
     *  @property {string} releaseDate
     *  @property {string} block
     *  @property {string} onlineOnly
     */


    /**
     *
     * @param {Integer} id
     * @return {Promise<Card|null>}
     */
    static async findCardById(id) {
        try {
            const result = mtg.card.find(id);
            return result.card;
        } catch (e) {
            console.error('findCardById', e);
            return null;
        }
    }

    /**
     *
     * @param {Card} args partial card with wanted subtype or text for example
     * @return {Promise<Array<Card>>}
     */
    static async findCardBy(args) {
        try {
            return mtg.card.where(args);
        } catch (e) {
            console.error('findCardBy', e);
            return null;
        }
    }

    /**
     *
     * @param {String} code
     * @return {Promise<Set|null>}
     */
    static async findSetByCode(code) {
        try {
            const result = mtg.set.find(code);
            return result.set;
        } catch (e) {
            console.error('findSetByCode', e);
            return null;
        }
    }
}
