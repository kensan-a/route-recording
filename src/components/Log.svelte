<script lang="ts">
  import { toStringPositionShort } from "./api/geolocation";
  export let positions;

  const LOG_NUM = 10;
  $: recentPositions = positions.slice(-LOG_NUM).reverse();
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
