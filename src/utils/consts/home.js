const KEY_DECK_EDITION = { key: 'KEY_DECK_EDITION', label: 'Creation/Edition/Deletion' };
const KEY_DECK_LIST = { key: 'KEY_DECK_LIST', label: 'Lists to manage main/sideboard/tokens etc' };
const KEY_DECK_IMPRESSION = {
    key: 'KEY_DECK_IMPRESSION',
    label: 'Impression',
    modal: true,
    doc: `Click on
<img width="30px" src="http://doriongilmore.fr/mtgBuilder/assets/print.png"/>
to create a pdf file containing all your cards, saved in real size.<br><br>
Real cards size is 63 x 88 mm with a 3mm bord.<br>
I only saw "complete cards" with the api I use to find cards, but it's not the case on the Internet.<br>
In case it's not complete, you could configure the size of the bord so the rest of the card is always at real size.<br>
Also you can choose not to print some cards to the file (by default, basic lands are not printed)<br> 
`,
};
const KEY_DECK_IMPORT = {
    key: 'KEY_DECK_IMPORT',
    label: 'Import / Export',
    modal: true,
    doc: `Click on
<img width="40px" src="http://doriongilmore.fr/mtgBuilder/assets/import.png"/>
to import and on 
<img width="40px" src="http://doriongilmore.fr/mtgBuilder/assets/export.png"/>
to export<br/>Several formats are supported:<br><br>
- the json one is specific to this site<br>
- magiccorporation.com is a french website to search Magic cards and create decks,<br>format "<b>1 [vma] Black Lotus</b>"<br>
- untap.in is an english website to play many card games with personalized decks,<br>format "<b>1 Black Lotus (vma)</b>"<br>
- The format "<b>1 Black Lotus</b>" is also supported.<br/>
If you need other ones please
<a href="https://github.com/doriongilmore/mtgGenerator/issues/new?assignees=&labels=&template=format_request.md&title=" target="_blank"> fill an issue</a>
`,
};

const KEY_SEARCH_NAME = { key: 'KEY_SEARCH_NAME', label: 'By Name' };
const KEY_SEARCH_TEXT = { key: 'KEY_SEARCH_TEXT', label: 'By Text' };
const KEY_SEARCH_COLOR = { key: 'KEY_SEARCH_COLOR', label: 'By Color' };
const KEY_SEARCH_CMC = { key: 'KEY_SEARCH_CMC', label: 'By Mana Cost' };
const KEY_SEARCH_RARITY = { key: 'KEY_SEARCH_RARITY', label: 'By Rarity' };
const KEY_SEARCH_TYPE = { key: 'KEY_SEARCH_TYPE', label: 'By Type' };

const KEY_STATS_CMC = { key: 'KEY_STATS_CMC', label: 'Converted Mana Cost Repartition' };
const KEY_STATS_COLOR = { key: 'KEY_STATS_COLOR', label: 'Color Repartition' };
const KEY_STATS_TYPE = { key: 'KEY_STATS_TYPE', label: 'Type Repartition' };
const KEY_STATS_FUNCTION = { key: 'KEY_STATS_FUNCTION', label: 'Functionality Repartition' };

const KEY_FEATURE_STATS = {
    label: 'Stats',
    list: [KEY_STATS_CMC, KEY_STATS_COLOR, KEY_STATS_TYPE, KEY_STATS_FUNCTION],
    modal: true,
    doc: `By default stats are based on all your lists.<br>You can ignore some of them with the checkbox here:<br>
<img height="50px" src="http://doriongilmore.fr/mtgBuilder/assets/ignoreStats.png"/><br><br>
Four graphs are available, the first three are kinda basic (converted mana cost, color, type).<br>
The functionality one is based on the oracle text of a card, I've made choices and it can probably be improved,
<a href="https://github.com/doriongilmore/mtgGenerator/issues/10" target="_blank"> see more here</a>.
`,
};
const KEY_FEATURE_DECKS = {
    label: 'Deck Management',
    list: [KEY_DECK_EDITION, KEY_DECK_LIST, KEY_DECK_IMPRESSION, KEY_DECK_IMPORT, KEY_FEATURE_STATS],
};
const KEY_FEATURE_SEARCH = {
    label: 'Card Search',
    list: [KEY_SEARCH_NAME, KEY_SEARCH_TEXT, KEY_SEARCH_COLOR, KEY_SEARCH_CMC, KEY_SEARCH_RARITY, KEY_SEARCH_TYPE],
    modal: true,
    doc: `Click on
<img width="25px" src="http://doriongilmore.fr/mtgBuilder/assets/add.png"/>
to add texts or types (If you don't it will be ignored)<br><br>
Text will search anything in oracle text.<br>Add one line for 'lifelink' then one for 'draw' for example<br><br>
Type will search anything in type line.<br>Add one line for Legend then one for Creature then one for Elf<br><br>
Colors, cost and rarity have an inclusion list:<br>At least rare will search in all rare and mythic cards<br>
At most white and blue will search in all colorless, white, blue and white and blue cards<br><br>
Be aware advanced search is always active:<br>If you want to search only for card name in basic input,
think about cleaning your previous search parameters if any with<br>
<img height="40px" src="http://doriongilmore.fr/mtgBuilder/assets/clean.png"/>
`,
};

const home = {
    features: {
        KEY_DECK_LIST,
        KEY_DECK_EDITION,
        KEY_DECK_IMPRESSION,
        KEY_DECK_IMPORT,
        KEY_FEATURE_STATS,
        KEY_FEATURE_DECKS,
        KEY_FEATURE_SEARCH,
        list: [KEY_FEATURE_DECKS, KEY_FEATURE_SEARCH],
    },
}
export default home;
