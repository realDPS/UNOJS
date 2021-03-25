<script lang="ts">
  import { number } from "../store";

  function Add() {
    $number += 1;
  }

  console.log($number);
</script>

<div>
  <div>{$number}</div>
  <button on:click={Add}>Click to Add</button>
</div>
