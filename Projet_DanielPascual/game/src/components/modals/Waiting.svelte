<script lang="ts">
  import { fly } from "svelte/transition";
  import { GameState, username } from "@store";
  import Spinner from "../Spinner.svelte";
  import { socket } from "../../App.svelte";
  import Player from "../Player.svelte";

  let numOfPlayers = 1;

  socket.on("joined", (name: string) => {
    console.log("joined");

    numOfPlayers += 1;

    $GameState.players[$GameState.players.length] = {
      ...$GameState.players[0],
      username: name,
      turnToPlay: false
    };

    if ($GameState.players[0].username === $username) {
      socket.emit("update", $GameState);
    }
  });

  socket.on("update", (state: GameState) => {
    $GameState = state;
    console.log($GameState);
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
  <h6>Waiting {numOfPlayers}/{$GameState.numOfPlayers} players</h6>
  <Spinner />
</div>
