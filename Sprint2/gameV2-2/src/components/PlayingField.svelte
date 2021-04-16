<script lang="ts">
  import { GameState } from "../store";
  import Cards from "./Cards.svelte";

  $: DrawDeck = $GameState.drawDeck;

  //Draw +4 or +2 on next player
  $: if ($GameState.topCard.value === "Draw" && $GameState.drawCard === true) {
    switch ($GameState.topCard.color) {
      case "Wild":
        console.log("Change Color and Draw 4 Cards");
        for (let i = 0; i < 4; ++i) {
          drawCard();
        }
        console.log($GameState.players[$GameState.currentPlayer].cardArray);
        break;
      default:
        console.log("Draw 2 Cards");
        for (let i = 0; i < 2; ++i) {
          drawCard();
        }
        console.log($GameState.players[$GameState.currentPlayer].cardArray);
        break;
    }
    $GameState.drawCard = false;
  }

  function drawCard() {
    const Card = DrawDeck.shift();

    $GameState.players[$GameState.currentPlayer].cardArray[
      $GameState.players[$GameState.currentPlayer].cardArray.length
    ] = Card;
    console.log($GameState.players[$GameState.currentPlayer].cardArray);
  }

  $GameState.topCard = $GameState.drawDeck.shift();
</script>

<style>
</style>

<div>
  <div id="drawDeck" on:click={drawCard}>
    <Cards faceDown={true} />
  </div>

  <div id="discardPile">
    {#if $GameState.topCard !== null}
      <Cards
        value={$GameState.topCard.value}
        color={$GameState.topCard.color}
      />
    {/if}
  </div>
</div>
