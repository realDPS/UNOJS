<script lang="ts">
  import { socket } from "../App.svelte";
  import { GameState } from "../store/store";
  import Cards from "./Cards.svelte";

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
    const Card = $GameState.drawDeck.shift();

    $GameState.players[$GameState.currentPlayer].cardArray[
      $GameState.players[$GameState.currentPlayer].cardArray.length
    ] = Card;
    // console.log($GameState.players[$GameState.currentPlayer].cardArray);
    const playerNb = $GameState.currentPlayer;
    const hand = $GameState.players[playerNb].cardArray;

    console.log("info to send:", { playerNb, hand });

    socket.emit("newHand", { playerNb, hand });
  }

  socket.on("enemyHandSize", ({ numOfCards, playerNumber }: DataPlayer) => {
    $GameState.players[playerNumber].handLength = numOfCards;
    console.log("enemyHandSize ", { numOfCards, playerNumber });
  });

  // socket.on("playCard", ({ numOfCards, playerNumber }: DataPlayer) => {
  //   $GameState.players[playerNumber].handLength = numOfCards;
  //   console.log("lastPlayedCard ", { numOfCards, playerNumber });
  // });

  socket.on("updateDeck", (deck: DataDeck) => {
    console.log(deck);
    $GameState.drawDeck = deck;
  });

  socket.on("topCard", (topCard: CardType) => {
    console.log(topCard);
    $GameState.topCard = topCard;
  });

  //Set top card in discard pile on game launch
  $GameState.topCard = $GameState.drawDeck.shift();
</script>

<style>
  #playField {
    display: flex;
    justify-content: space-between;
    padding: 5% 20%;
  }
</style>

<div id="playField">
  <div id="drawDeck" on:click={drawCard}>
    <Cards faceDown={true} />
  </div>

  <div id="discardPile">
    <Cards value={$GameState.topCard.value} color={$GameState.topCard.color} />
  </div>
</div>
