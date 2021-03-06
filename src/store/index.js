import { mtg } from 'src/store/mtg';
import { decks } from 'src/store/decks';
import { search } from 'src/store/search';
import { settings } from 'src/store/settings';
import { tutorial } from 'src/store/tutorial';

export const storeOpts = {
  modules: {
    mtg,
    decks,
    search,
    settings,
    tutorial,
  },
};
