## Magic the Gathering - Deck Builder

This app brings together several tools to easily create Magic decks.

UI only - will save your lists in browser's local storage, but you should save them on other websites or on a file for
long term use.

### Features Covered :

- [x] card search (name - color - capacity - etc.)
  - use https://scryfall.com/ api
  - thanks to this sdk https://github.com/Yuudaari/scryfall-sdk
- [x] deck creation/edition
- [x] import/export from/to text format (several formats supported)
  - [x] X [edition] cardName // magiccorporation.com
  - [x] X cardName (edition) // untap.in
  - [x] JSON // doriongilmore.fr
  - more if needed ? fill an issue
- [x] graphs & stats by decks with https://vue-chartjs.org/
  - [x] mana cost repartition
  - [x] color repartition
  - [x] type repartition
  - [x] performances - continuous improvement in https://github.com/doriongilmore/mtgGenerator/issues/10
- [x] ready-to-print :scream:
  - pdf containing 9 real size cards by page
  - pdf generated with window.print()

### Feel free to propose Pull Requests

    git clone https://github.com/doriongilmore/mtgGenerator.git
    npm install
    npm run dev #run a dev server
    npm run build #build prod assets
