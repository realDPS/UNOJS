<script lang="ts">
  import { UsernameSetup, GameSetup } from "./modals";
  import { socket } from "../App.svelte";
  import { GameState } from "../store";
  let joinRoomID: string;
  let isSetupCompleted = false;

  function createRoom() {
    isSetupCompleted = !isSetupCompleted;
    socket.emit("newRoom", $GameState);
    socket.on("roomIdCreated", (id) => {
      $GameState.roomId = id;
    });
  }

  function setJoinRoom(event) {
    joinRoomID = event.target.value;
  }
  function joinRoom() {
    const username = $GameState.players[0].username;
    const id = joinRoomID;
    socket.emit("join", { id, username });

    socket.on("joined", (state) => {
      $GameState = state;
    });
  }
</script>

<style>
</style>

<div class="Modal">if</div>
