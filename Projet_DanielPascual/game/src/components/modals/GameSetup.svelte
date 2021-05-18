<script lang="ts">
  import Button from "../Button.svelte";
  import TextInput from "../TextInput.svelte";
  import Select from "../Select.svelte";
  import { fly } from "svelte/transition";
  import { GameState, username, gameStart } from "../../store";
  import { socket } from "../../App.svelte";

  let roomID;

  let numOfPlayers;

  let options = [
    { id: 1, value: "2", text: "2 Players" },
    { id: 2, value: "3", text: "3 Players" },
    { id: 3, value: "4", text: "4 Players" }
  ];

  function validateRoom(link: string) {}

  function gameStarted() {
    $gameStart = true;
  }

  function createRoom() {
    $GameState.players[0].username = $username;

    socket.emit("newRoom", $GameState);
    socket.on("roomCreated", (id, deck) => {
      $GameState.roomId = id;
      $GameState.drawDeck = deck;
    });

    gameStarted();
    console.log("state:", $GameState);
  }

  function joinRoom() {
    const username = $GameState.players[0].username;
    socket.emit("join", { roomID, username });

    socket.on("joined", (state) => {
      $GameState = state;
    });
  }
</script>

<style>
  .GameSetup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
  }

  .Line {
    border: 1px solid #326dbf;
  }

  .Container {
    position: relative;
    margin: auto 0 auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: max-content;
    padding: 0 75px;
  }

  .form-element {
    width: 300px;
  }
</style>

<div
  class="GameSetup"
  in:fly={{ x: 200, duration: 250 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <div class="Container">
    <div class="form-element">
      <Select label="Number of Players" {options} bind:value={numOfPlayers} />
    </div>
    <Button text="Create" on:click={createRoom} />
  </div>
  <span class="Line" />
  <div class="Container">
    <div class="form-element">
      <TextInput label="Game URL" />
    </div>
    <Button text="Join" />
  </div>
</div>
