<script lang="ts">
  import Button from "../Button.svelte";
  import TextInput from "../TextInput.svelte";
  import Select from "../Select.svelte";
  import { fly } from "svelte/transition";
  import { GameState, username, step } from "@store";
  import { socket } from "../../App.svelte";
  import { v4 as uuidv4, validate } from "uuid";

  let gameID: string;

  let numOfPlayers: number;

  let options = [
    { id: 1, value: "2", text: "2 Players" },
    { id: 2, value: "3", text: "3 Players" },
    { id: 3, value: "4", text: "4 Players" }
  ];

  function createRoom() {
    if (numOfPlayers) {
      $GameState.players[0].username = $username;
      $GameState.numOfPlayers = numOfPlayers;
      $GameState.roomID = uuidv4();

      socket.emit("createRoom", uuidv4());

      console.log("state:", $GameState);
      $step++;
    }
  }

  function joinRoom() {
    if (validate(gameID)) {
      $GameState.roomID = gameID.trim();
      console.log(gameID.trim());

      socket.emit("joinRoom", gameID.trim(), $username);

      $step++;
    }
  }
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
    justify-content: space-around;
  }

  .Line {
    border: 1px solid #326dbf;
  }

  .Second-Container {
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
  class="Container"
  in:fly={{ x: 200, duration: 250 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <div class="Second-Container">
    <div class="form-element">
      <Select label="Number of Players" {options} bind:value={numOfPlayers} />
    </div>
    <Button text="Create" on:click={createRoom} />
  </div>
  <span class="Line" />
  <div class="Second-Container">
    <div class="form-element">
      <TextInput label="Game ID" bind:value={gameID} />
    </div>
    <Button text="Join" on:click={joinRoom} />
  </div>
</div>
