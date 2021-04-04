{#each Array(3) as _, i}
  <!-- Row Flex Container x3 -->
  <div class="Row {i + 1}">
    {#each Array(3) as _, j}
      <!-- Column Flex Container x3 -->
      <div class="Column {j + 1}">
        {#if i == 2 && j == 1}
          <!-- Flex Child Element -->
          <div id="player1">Player 1</div>
        {:else if i == 1 && j == 0}
          <div id="player2">
            <!-- Flex Child Element -->
            <h1 class="Player2">Player 2</h1>
          </div>
        {:else if i == 0 && j == 1}
          <!-- Flex Child Element -->
          <div id="player3">Player 3</div>
        {:else if i == 1 && j == 2}
          <!-- Flex Child Element -->
          <div id="player4">Player 4</div>
        {/if}
      </div>
    {/each}
  </div>
{/each}
