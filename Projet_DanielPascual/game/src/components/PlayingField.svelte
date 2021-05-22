<script lang="ts">
  import { socket } from "../App.svelte";
  import { GameState, username, getPlayerIndex } from "@store";
  import Cards from "./Cards.svelte";
  const playerIndex = getPlayerIndex($GameState, $username);
  //
  //Draw +4 or +2 on next player
  $: console.log(
    "DrewCard:",
    $GameState.players[$GameState.currentPlayer].drewCard
  );
  $: console.log("turn:", $GameState.currentPlayer);
  $: console.log("PlayFieldState:", $GameState);

  $: if ($GameState.players[playerIndex].drewCard) {
    // $GameState.topCard.value === "Draw" && $GameState.drawCard === true
    $GameState.players[playerIndex].drewCard = false;
    switch ($GameState.topCard.color) {
      case "Wild":
        console.log("Change Color and Draw 4 Cards");
        multipleDraw(4);
        break;
      default:
        console.log("Draw 2 Cards");
        multipleDraw(2);
        break;
    }

    console.log($GameState.players[$GameState.currentPlayer].cardArray);
    // $GameState.drawCard = false;
  }

  function multipleDraw(drawNb: number) {
    for (let index = 0; index < drawNb; index++) {
      const card = $GameState.drawDeck.shift();
      const last = $GameState.players[playerIndex].cardArray.length;

      $GameState.players[playerIndex].cardArray[last] = card;
    }
    console.log("MULTIPLE DRAW, UPDATE PLZ");

    socket.emit("update", $GameState);
  }
  function drawCard() {
    //refuse drawCard if not player's turn
    if ($GameState.players[playerIndex].turnToPlay === false) {
      return;
    }

    const Card = $GameState.drawDeck.shift();

    $GameState.players[playerIndex].cardArray[
      $GameState.players[playerIndex].cardArray.length
    ] = Card;

    let turnIndex: number = playerIndex + 1;
    if (turnIndex === $GameState.numOfPlayers) {
      turnIndex = 0;
    }
    $GameState.currentPlayer = turnIndex;
    $GameState.players[turnIndex].turnToPlay = true;
    $GameState.players[playerIndex].turnToPlay = false;

    console.log($username);

    socket.emit("update", $GameState);

    // socket.emit("newHand", { player, numOfCards });
  }

  //Server call functions:
  socket.on("enemyHandSize", ({ numOfCards, player }: DataPlayer) => {
    console.log("enemyHandSize ", { numOfCards, player });
    $GameState.players[player].handLength = numOfCards;
  });
  socket.on("gameStart", ({ numOfCards, player }: DataPlayer) => {
    console.log("enemyHandSize ", { numOfCards, player });
    $GameState.players[player].handLength = numOfCards;
  });

  socket.on("updateDeck", (deck: DataDeck) => {
    console.log(deck);
    $GameState.drawDeck = deck;
  });

  socket.on("topCard", (topCard: CardType) => {
    $GameState.topCard = topCard;
  });

  //TODO:UNCHECKED
  socket.on("nextPlayer", (playerIndex: number) => {
    //todo:highlight cards with filter
    $GameState.players[playerIndex].turnToPlay = true;
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
    <Cards faceDown={true} isHighlighted={true} />
  </div>

  <div id="discardPile">
    <Cards
      value={$GameState.topCard.value}
      color={$GameState.topCard.color}
      isHighlighted={true}
    />
  </div>
</div>
