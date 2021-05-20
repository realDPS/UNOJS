<script lang="ts">
  import { fly } from "svelte/transition";
  import { GameState, username, step, getPlayerIndex } from "@store";
  import Spinner from "../Spinner.svelte";
  import { socket } from "../../App.svelte";

  console.log("waiting?");

  socket.on("joined", (name: string) => {
    //ID: string,
    //Only gameMaster can continue operation
    if ($GameState.players[0].username === $username) {
      if ($GameState.players.length < $GameState.numOfPlayers) {
        // socketID: ID,
        $GameState.players[$GameState.players.length] = {
          ...$GameState.players[0],
          username: name,
          turnToPlay: false
        };
        socket.emit("accept", $GameState.roomID, name, true);
        socket.emit("update", $GameState);
      } else {
        socket.emit("accept", $GameState.roomID, name, false);
      }
    }
  });

  socket.on("update", (state: GameState) => {
    $GameState = state;
    console.log($GameState);
  });

  socket.on("test", () => {
    console.log("wtf");
  });

  socket.on("playerLeft", (ID) => {
    console.log("player left room");

    for (let index = 0; index < $GameState.players.length; index++) {
      const element = $GameState.players[index];
      console.log(element.socketID);
      // if (element.socketID == ID) {
      //   $GameState.players.splice(index, 1);
      //   console.log($GameState);
      //   socket.emit("update", $GameState);
      //   return;
      // }
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
