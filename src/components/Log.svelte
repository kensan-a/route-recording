<script lang="ts">
  import { toStringPositionShort } from "./common/api/geolocation";
  export let positions;
</script>

{#each positions as position}
  <div>
    <span>{toStringPositionShort(position)}</span>
  </div>
{/each}
