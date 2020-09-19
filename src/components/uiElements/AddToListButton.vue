<template>
  <b-dropdown class="toto" text="+" size="sm" variant="light" lazy dropright no-caret>
    <div v-for="(deck, deckIndex) in addList">
      <div v-for="(list, listIndex) in deck.lists">
        <b-dropdown-item
          @click="addCardToList(card, deck, listIndex)"
          v-if="deckIndex !== 0 || listIndex !== ignoreIndex"
        >
          {{ deck.name }} - {{ list.name }}
        </b-dropdown-item>
      </div>
      <b-dropdown-item @click="addCardToList(card, deck)"> {{ deck.name }} - New list </b-dropdown-item>
    </div>
    <b-dropdown-item @click="addCardToList(card)">
      New deck
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'AddToListButton',
  props: ['card', 'addList', 'ignoreIndex'],
  methods: {
    addCardToList(card, deck = null, listIndex = null) {
      this.$store.dispatch('decks/addCardToList', { card, deck, listIndex });
    },
  },
};
</script>

<style lang="less" scoped>
.toto {
  button {
    font-size: larger;
  }
}
</style>
