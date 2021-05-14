<script lang="ts">
  import { GameState } from "../store";

  function onChange(event) {
    //: KeyboardEventHandler<HTMLInputElement>
    console.log(event.target.value);
    $GameState.players[0].username = event.target.value;
  }
</script>

<style>
  .form {
    width: 100%;
    position: relative;
    height: 50px;
    overflow: hidden;
  }

  .form input {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    outline: none;
    color: #326dbf;
  }

  .form label {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-bottom: 1px solid grey;
  }

  .form label::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 100%;
    border-bottom: 3px solid #326dbf;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }

  .content-name {
    position: absolute;
    bottom: 5px;
    left: 0;
    transition: all 0.3s ease;
  }

  .form input:focus + .label-name .content-name,
  .form input:not(:placeholder-shown) + .label-name .content-name {
    transform: translateY(-150%);
    font-size: 14px;
    color: #326dbf;
  }

  .form input:focus + .label-name::after,
  .form input:not(:placeholder-shown) + .label-name::after {
    transform: translateX(0);
  }
</style>

<div class="form">
  <input
    type="text"
    name="name"
    placeholder=" "
    autocomplete="off"
    on:keyup={onChange}
  />
  <!-- this above placeholder with just a space is necessary to trigger the input animation :not(:placeholder-shown) -->
  <label for="name" class="label-name">
    <span class="content-name">Username</span>
  </label>
</div>
