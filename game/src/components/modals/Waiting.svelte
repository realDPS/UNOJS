<script lang="ts">
  import { fly } from "svelte/transition";
  import { GameState, ID } from "@store";
  import Spinner from "../elements/Spinner.svelte";
  import { socket } from "../../App.svelte";

  const HANDSIZE: number = 7;
  $: if (
    $GameState.players[$GameState.numOfPlayers - 1] !== undefined &&
    $GameState.players[$GameState.numOfPlayers - 1].cardArray.length ===
      HANDSIZE
  ) {
    $GameState.gameStarted = true;
    console.log($GameState);
  }

  $: console.log("GameStart: ", $GameState.gameStarted);

  socket.on("joined", (name: string, userID: string) => {
    //Only gameMaster can continue operation
    if ($GameState.players[0].id === $ID) {
      if ($GameState.players.length < $GameState.numOfPlayers) {
        //give hand to new player
        const hand: Array<CardType> = [];
        console.log(">>", $GameState);

        for (let index = 0; index < HANDSIZE; index++) {
          hand.push($GameState.drawDeck.pop());
        }
        socket.emit("updateDeck", $GameState.drawDeck);

        $GameState.players[$GameState.players.length] = {
          ...$GameState.players[0],
          id: userID,
          cardArray: hand,
          handLength: hand.length,
          username: name,
          turnToPlay: false
        };
        console.log(name, " joined");
        socket.emit("accept", $GameState.roomID, name, true);
        socket.emit("update", $GameState);
      } else {
        socket.emit("accept", ID, name, false);
      }
    }
  });

  socket.on("initialDeck", (deck: CardType[]) => {
    const hand: Array<CardType> = [];
    $GameState.drawDeck = deck;
    for (let index = 0; index < HANDSIZE; index++) {
      hand.push($GameState.drawDeck.pop());
    }
    $GameState.players[0].cardArray = hand;
  });

  socket.on("update", (state: GameState) => {
    if ($GameState.players[0].id !== $ID) {
      $GameState = state;
      console.log($GameState);
    }
  });

  socket.on("playerLeft", (userID) => {
    console.log("player left room:", userID);

    if ($GameState.players[0].id === $ID)
      for (let index = 0; index < $GameState.players.length; index++) {
        const player = $GameState.players[index];

        if (player.id == userID) {
          $GameState.players.splice(index, 1);
          console.log("updated:", $GameState);
          socket.emit("update", $GameState);
          return;
        }
      }
  });
</script>

<style>
  .Container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
  }

  h1 {
    color: #326dbf;
  }
</style>

<div
  class="Container"
  in:fly={{ x: 200, duration: 250 }}
  out:fly={{ x: -200, duration: 250 }}
>
  <h1>Waiting for Other Players...</h1>
  <h3>{$GameState.roomID}</h3>
  <h5>Copy this ID to invite other players...</h5>
  <h6>Waiting {$GameState.players.length}/{$GameState.numOfPlayers} players</h6>
  <Spinner />
</div>
