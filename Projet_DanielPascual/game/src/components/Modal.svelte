<script lang="ts">
  import InputField from "./InputField.svelte";
  import { socket } from "../App.svelte";
  import { GameState } from "../store";
  let joinRoomID: string;
  let isSetupCompleted = false;

  let choices = [
    { id: 1, text: "2 Players" },
    { id: 2, text: "3 Players" },
    { id: 3, text: "4 Players" }
  ];

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
  .LobbyModal {
    height: 100%;
    width: 500px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    background-color: #f3f3f7;
    border-radius: 25px;
    box-shadow: -25px 25px 15px rgba(0, 0, 0, 0.5);
  }

  .PlayerSetup {
    padding: 50px;
    display: flex;
    flex-basis: 50%;
    justify-content: space-around;
    align-items: center;
  }

  .Username {
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }

  .Label {
    position: absolute;
    width: 100%;
    bottom: 184px;
    left: 46px;
    pointer-events: none;
    border-bottom: 1px solid black;
  }

  .Button {
    display: flex;
    flex-basis: 50%;
    justify-content: center;
    align-items: center;
    padding: 25px;
  }

  .Top-Container {
    display: inline-block;
    padding: 10px;
  }

  .Create-btn {
    background-color: #326dbf;
    height: 50px;
    width: 150px;
    border-radius: 7.5px;
    color: #f3f3f7;
  }

  select:required:invalid {
    color: gray;
  }

  .Username,
  .Select {
    width: 200px;
  }

  option[value=""][disabled] {
    display: none;
  }

  option {
    color: black;
  }
</style>

<div class="Modal">if</div>
