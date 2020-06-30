## Magic the Gathering - Deck Generator - Roadmap

This app will gather several tools to easily generate Magic decks.

UI only - will save your lists in browser's local storage, but you should save them on other websites for long term use.

#### Some features :
- [X] card search (name - color - capacity - etc.)
  - ~~do not see https://docs.magicthegathering.io/~~
  - ~~do not see https://github.com/MagicTheGathering/mtg-sdk-javascript~~
  - above api seemed slow and don't support french cards
  - https://scryfall.com/ that I used in vb macro supports many languages and also has an api
  - and an sdk is available https://github.com/Yuudaari/scryfall-sdk
- [X] deck creation/edition
- [X] import/export from/to text format (several formats supported)
  - some regexp in https://github.com/doriongilmore/mtgGenerator/blob/master/vbmacro/ImportDeckForm.frm
  - [X] X [edition] cardName // magiccorporation.com
  - [X] X cardName (edition) // untap.in
  - [X] JSON // doriongilmore.fr
  - more if needed
- [X] graphs & stats by decks with https://www.chartjs.org/
  - [X] mana cost repartition
  - [X] color repartition
  - [X] type repartition
  - [X] performances
- [X] ready-to-print :scream:
  - see resizeImage method in https://github.com/doriongilmore/mtgGenerator/blob/master/vbmacro/Magic.bas
  - https://stackoverflow.com/questions/742271/generating-pdf-files-with-javascript
  - first test probably with http://pdfkit.org/ taken from discussion above (nice demo http://pdfkit.org/demo/browser.html)
