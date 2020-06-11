const chai = require('chai');
const expect = chai.expect;

describe('Mtg Api Tests', () => {
    const mtg = require('mtgsdk');

    describe('card api', () => {
        describe('find method', () => {
            let card;

            before(function () {
                this.timeout(50000);
                return mtg.card.find(3).then((result) => {
                    card = result.card;
                });
            });
            it('should return a card with properties', () => {
                const properties = Object.keys(card);

                expect(properties).deep.equal([
                    'name',
                    'manaCost',
                    'cmc',
                    'colors',
                    'colorIdentity',
                    'type',
                    'supertypes',
                    'types',
                    'subtypes',
                    'rarity',
                    'set',
                    'setName',
                    'text', // only if has one
                    'artist',
                    'number',
                    'layout',
                    'multiverseid',
                    'imageUrl',
                    'rulings',
                    'foreignNames',
                    'printings',
                    'originalText', // only if has one
                    'originalType',
                    'legalities',
                    'id',
                    // 'flavor", // ambiance text - only if has one
                    // 'power", // creature only
                    // 'toughness", // creature only
                    // 'variations", // ?
                ]);
            });

        });


    });

    describe.only('set api', () => {
        describe('find method', () => {
            let set;

            before(function () {
                this.timeout(50000);
                return mtg.set.find('AER').then((result) => {
                    set = result.set;
                });
            });
            it('should return a card with properties', () => {
                const properties = Object.keys(set);

                console.info(set);

                expect(properties).deep.equal([
                    'code',
                    'name',
                    'type',
                    'booster',
                    'releaseDate',
                    'block',
                    'onlineOnly',
                ]);
            });

        });


    });


});
