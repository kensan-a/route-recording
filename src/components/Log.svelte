<script lang="ts">
  import { toStringPositionShort } from "./api/geolocation";
  export let positions;

  $: recentPositions = positions.slice(-10).reverse();
</script>

<style>
  .log {
    height: 100%;
    overflow: auto;
  }
</style>


<div class="log">
  <!-- {#each new Array(30) as _}
    <div>ダミー</div>
  {/each} -->

  {#each recentPositions as position}
    <div>
      <span>{toStringPositionShort(position)}</span>
    </div>
  {/each}
</div>
