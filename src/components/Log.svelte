<script lang="ts">
  import { toStringPositionShort } from "./api/geolocation";
  export let positions;
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

  {#each positions as position}
    <div>
      <span>{toStringPositionShort(position)}</span>
    </div>
  {/each}
</div>
