<script lang="ts">
  import { socket } from "../App.svelte";
  import { GameState, username, getPlayerIndex } from "@store";
  import Cards from "./Cards.svelte";
  const playerIndex = getPlayerIndex($GameState, $username);

  //Draw +4 or +2 on next player
  $: if ($GameState.players[playerIndex].drewCard) {
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
  }

  function multipleDraw(drawNb: number) {
    for (let index = 0; index < drawNb; index++) {
      const card = $GameState.drawDeck.shift();
      const last = $GameState.players[playerIndex].cardArray.length;

      $GameState.players[playerIndex].cardArray[last] = card;
    }

    socket.emit("updateState", $GameState);
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

    socket.emit("updateState", $GameState);
  }

  socket.on("updateState", (state: GameState) => {
    $GameState = state;
    if (state.winner !== null) {
      //todo:show all cards
    }
  });

  //Set top card in discard pile on game launch
  $GameState.topCard = $GameState.drawDeck.shift();
  $GameState.currentColor = $GameState.topCard.color;
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
