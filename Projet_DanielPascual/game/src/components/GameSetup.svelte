<script lang="ts">
  import { text } from "svelte/internal";
  import Button from "./Button.svelte";
  import InputField from "./InputField.svelte";
</script>

<style>
  :global(body) {
    display: grid;
    place-items: center;
  }

  .GameSetup {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .Line {
    border: 1px solid black;
  }

  .Container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: max-content;
    padding: 20px;
  }

  .select {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    position: relative;
    width: 350px;
  }

  .select-text {
    position: relative;
    font-family: inherit;
    background-color: transparent;
    width: 350px;
    padding: 10px 10px 10px 0;
    font-size: 18px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  /* Remove focus */
  .select-text:focus {
    outline: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
  }

  /* Use custom arrow */
  .select .select-text {
    appearance: none;
    -webkit-appearance: none;
  }

  .select:after {
    position: absolute;
    top: 18px;
    right: 10px;
    /* Styling the down arrow */
    width: 0;
    height: 0;
    padding: 0;
    content: "";
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(0, 0, 0, 0.12);
    pointer-events: none;
  }

  /* LABEL ======================================= */
  .select-label {
    color: rgba(0, 0, 0, 0.26);
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 10px;
    transition: 0.2s ease all;
  }

  /* active state */
  .select-text:focus ~ .select-label,
  .select-text:valid ~ .select-label {
    color: #326dbf;
    top: -20px;
    transition: 0.2s ease all;
    font-size: 14px;
  }

  /* BOTTOM BARS ================================= */
  .select-bar {
    position: relative;
    display: block;
    width: 350px;
  }

  .select-bar:before,
  .select-bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #326dbf;
    transition: 0.2s ease all;
  }

  .select-bar:before {
    left: 50%;
  }

  .select-bar:after {
    right: 50%;
  }

  /* active state */
  .select-text:focus ~ .select-bar:before,
  .select-text:focus ~ .select-bar:after {
    width: 50%;
  }

  /* HIGHLIGHTER ================================== */
  .select-highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  .URL {
    width: 400px;
  }

  option[value=""][disabled] {
    display: none;
  }
</style>

<div class="GameSetup">
  <div class="Container">
    <div class="select">
      <select class="select-text" required>
        <option value="" disabled selected />
        <option value="2">2 Players</option>
        <option value="3">3 Players</option>
        <option value="4">4 Players</option>
      </select>
      <span class="select-highlight" />
      <span class="select-bar" />
      <label class="select-label" for="select-text">Number of Players</label>
    </div>
    <Button text="Create Game" />
  </div>
  <span class="Line" />
  <div class="Container">
    <div class="URL">
      <InputField text="Game URL" />
    </div>
    <Button text="Join" />
  </div>
</div>
