<script lang="ts">
  import "../app.css";
  import "flowtoken-svelte/styles.css";
  import "svelte-streamdown/styles.css";

  let { children } = $props();
</script>

{@render children()}
