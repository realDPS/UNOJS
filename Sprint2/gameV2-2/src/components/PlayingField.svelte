<script>
  import Cards from "./Cards.svelte";

  function isMoveValid(color, value) {
    let isValid = false;
    values = discardPile.getCard();
    if (values[0] == color) isValid = true;
    if (values[1] == value) isValid = true;

    //if(isValid){ chageValue of discardPile}

    return isValid;
  }

  function getRandCard() {}
</script>

<style>
</style>

<div>
  <div id="pickPile">
    <Cards faceDown={true} />
  </div>
  <div id="discardPile">
    <Cards random={true} />
  </div>
</div>
