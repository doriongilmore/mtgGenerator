import { modals } from "src/store/modals";
import { mtg } from "src/store/mtg";
import { decks } from "src/store/decks";
import { search } from "src/store/search";

export const storeOpts = {
  modules: {
    modals,
    mtg,
    decks,
    search,
  }
};
