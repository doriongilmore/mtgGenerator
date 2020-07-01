## Magic the Gathering - Deck Builder

This app brings together several tools to easily create Magic decks.

UI only - will save your lists in browser's local storage, but you should save them on other websites or on a file for long term use.

#### Features Covered :
- [X] card search (name - color - capacity - etc.)
  - use https://scryfall.com/ api
  - thanks to this sdk https://github.com/Yuudaari/scryfall-sdk
- [X] deck creation/edition
- [X] import/export from/to text format (several formats supported)
  - [X] X [edition] cardName // magiccorporation.com
  - [X] X cardName (edition) // untap.in
  - [X] JSON // doriongilmore.fr
  - more if needed ? fill an issue
- [X] graphs & stats by decks with https://vue-chartjs.org/
  - [X] mana cost repartition
  - [X] color repartition
  - [X] type repartition
  - [X] performances - continuous improvement in https://github.com/doriongilmore/mtgGenerator/issues/10
- [X] ready-to-print :scream:
  - pdf containing 9 real size cards by page
  - pdf generated with https://github.com/MrRio/jsPDF

Feel free to propose Pull Requests

    git clone https://github.com/doriongilmore/mtgGenerator.git
    npm install
    npm run dev #run a dev server
    npm run build #build prod assets
