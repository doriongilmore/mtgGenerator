import DecksList from 'src/components/apps/DecksList.vue';
import DeckEdition from 'src/components/apps/DeckEdition.vue';
import Home from 'src/components/apps/Home.vue';
import Settings from 'src/components/apps/Settings.vue';

export const routeOpts = {
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/settings', name: 'settings', component: Settings },
    { path: '/decks', name: 'deckList', component: DecksList },
    { path: '/deck', name: 'edition', component: DeckEdition, props: true },
  ],
};
