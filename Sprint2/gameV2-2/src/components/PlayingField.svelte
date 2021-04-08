<script lang="ts">
  import { GameState } from "../store";
  import Cards from "./Cards.svelte";
  import { getRandomCard } from "./Game.svelte";

  // function isMoveValid(color, value) {
  //   let isValid = false;
  //   let values = discardPile.getCard();
  //   if (values[0] == color) isValid = true;
  //   if (values[1] == value) isValid = true;

  //   //if(isValid){ chageValue of discardPile}

  //   return isValid;
  // }

  $: DrawDeck = $GameState.drawDeck;
  $: DiscardPile = $GameState.discardPile;
  $: topCard = DiscardPile[DiscardPile.length - 1];
  $: console.log(DiscardPile);

  function drawCard() {
    const Card = DrawDeck.shift();
    $GameState.players[0].cardArray[
      $GameState.players[0].cardArray.length
    ] = Card;
    console.log($GameState.players[0].cardArray);
  }

  $GameState.discardPile[0] = $GameState.drawDeck.shift();
</script>

<style>
</style>

<div>
  {#if DrawDeck.length !== 0}
    <div id="drawDeck" on:click={drawCard}>
      <Cards faceDown={true} />
    </div>
  {/if}
  <div id="discardPile">
    {#if DiscardPile.length > 0}
      <Cards value={topCard.value} color={topCard.color} discardPile={true} />
    {/if}
  </div>
</div>
