import DecksList from 'src/components/apps/DecksList.vue';
import DeckEdition from 'src/components/apps/DeckEdition.vue';
import Home from 'src/components/apps/Home.vue';
import Settings from 'src/components/apps/Settings.vue';
import Poc from 'src/components/apps/Poc.vue';

export const routeOpts = {
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/settings', name: 'settings', component: Settings },
    { path: '/poc', name: 'poc', component: Poc },
    { path: '/decks', name: 'deckList', component: DecksList },
    { path: '/deck', name: 'edition', component: DeckEdition, props: true },
  ],
};
