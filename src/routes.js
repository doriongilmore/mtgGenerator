import DecksList from "src/components/apps/DecksList.vue";
import DeckEdition from "src/components/apps/DeckEdition.vue";

export const routeOpts = {
  routes: [
    { path: '/', name: 'home', component: DecksList },
    { path: '/deck', name: 'edition', component: DeckEdition, props: true },
  ]
};
