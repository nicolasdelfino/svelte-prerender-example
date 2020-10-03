<script>
  let promise;
  // document.addEventListener("buyEvent", () => {
  //   promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve([
  //         { name: "red ball" },
  //         { name: "blue ball" },
  //         { name: "green ball" },
  //       ]);
  //     }, 1000);
  //   });
  // });
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<main>
  <h1>Cart</h1>
  {#await promise}
    <span>Updating cart...</span>
  {:then data}
    {#if data}
      <ul>
        {#each data as item}
          <li>{item.name}</li>
        {/each}
      </ul>
    {:else}Cart is empty{/if}
  {:catch error}
    <blockquote>{error}</blockquote>
  {/await}
</main>
