const search = {
    inclusion: [
        { key: ':', value: 'Exact' },
        { key: '>=', value: 'At least' },
        { key: '<=', value: 'At most' },
    ],
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

        { key: 'artifact-types', uri: 'https://api.scryfall.com/catalog/artifact-types' },
        { key: 'creature-types', uri: 'https://api.scryfall.com/catalog/creature-types' },
        { key: 'enchantment-types', uri: 'https://api.scryfall.com/catalog/enchantment-types' },
        { key: 'land-types', uri: 'https://api.scryfall.com/catalog/land-types' },
        { key: 'planeswalker-types', uri: 'https://api.scryfall.com/catalog/planeswalker-types' },
        { key: 'spell-types', uri: 'https://api.scryfall.com/catalog/spell-types' },
    ],
};

export default search;
