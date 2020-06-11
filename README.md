## Magic the Gathering - Deck Generator

This app will gather several tools to easily generate Magic decks.

UI only - will save your lists in browser's local storage, but you should save them on other websites for long term use.

#### Some features :
- card search (name - color - capacity - etc.)
  - see https://docs.magicthegathering.io/
  - see https://github.com/MagicTheGathering/mtg-sdk-javascript
- deck creation/edition
- import/export from/to text format (several formats supported)
  - some regexp in ImportDeckForm.frm
- graphs & stats by decks (mana cost, color repartition, etc.)
  - https://github.com/lwardlegit/mtgbuild seems to have nice stats
- ready-to-print
  - see resizeImage method in Magic.bas
  - https://stackoverflow.com/questions/742271/generating-pdf-files-with-javascript
  - first test probably with http://pdfkit.org/ taken from discussion above
