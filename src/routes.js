import DecksList from "src/components/apps/DecksList.vue";
import DeckEdition from "src/components/apps/DeckEdition.vue";
import Home from "src/components/apps/Home.vue";

export const routeOpts = {
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/decks', name: 'deckList', component: DecksList },
    { path: '/deck', name: 'edition', component: DeckEdition, props: true },
  ]
};
